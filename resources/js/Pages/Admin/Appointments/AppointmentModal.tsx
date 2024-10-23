import React, { useState, useEffect } from 'react';
import Modal from "@/Components/Modal";
import Title from "@/Components/Title";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Select from "@/Components/Select";
import Textarea from "@/Components/Textarea";
import InputError from "@/Components/InputError";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { TbUserPlus } from "react-icons/tb";
import { FiUserCheck } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { User, Pet, AppointmentModalProps } from "@/Interfaces";
import { useTranslation } from 'react-i18next';

const AppointmentModal: React.FC<AppointmentModalProps> = ({ 
    selectedAppointment, 
    isViewing, 
    isCreating,
    isAdmitting, 
    isEditing, 
    showModal, 
    toggleModal, 
    doctors = [],
    pets = []    
}) => {
    const { t } = useTranslation();
    const { props } = usePage();
    const { errors } = props;
    const [notification, setNotification] = useState<string | null>(null);

    const { data, setData, post, processing } = useForm({
        vet_id: selectedAppointment?.vet_id || "",
        pet_id: selectedAppointment?.pet_id || "",
        title: selectedAppointment?.title || "",
        appointment_date: selectedAppointment?.appointment_date || "",
        appointment_start: selectedAppointment?.appointment_start || "",
        appointment_end: selectedAppointment?.appointment_end || "",
        status: selectedAppointment?.status || "In-Process",
        notes: selectedAppointment?.notes || "",
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {

        e.preventDefault();
        const isUpdating = isEditing && selectedAppointment;
        const formData = {
            ...data,
            id: isUpdating ? selectedAppointment?.id : undefined,
        };
    
        let url;
        if (isUpdating) {
            url = route("admin.appointment.update", selectedAppointment.id);
        } else if (isCreating) {
            url = route("admin.appointment.store");
        } else if (isAdmitting) {
            url = route("admin.admit.appointment", selectedAppointment.id);
        } else {
            url = route("admin.appointment.store");
        }
    
        post(url, {
            data: formData,
            onSuccess: (response: { props: { message: string } }) => {
                setNotification(response.props.message);
                toggleModal();
            },
            onError: (error: { props?: { error: string } }) => {
                const errorMessage = error?.props?.error || "An error occurred.";
                setNotification(errorMessage);
            },
        });
    };
    
    const statusOptions = [
        { value: "Pending", label: t('Pending') },
        { value: "Confirmed", label: t('Confirmed') },
        { value: "Cancelled", label: t('Cancelled') },
        { value: "Completed", label: t('Completed') },
    ];

    const vetOptions = doctors?.map((doctor: User) => ({
        value: String(doctor.id),
        label: doctor.name
    })) || [];

    const petOptions = pets?.map((pet: Pet) => ({
        value: String(pet.id),
        label: pet.name
    })) || [];

    useEffect(() => {
        if (showModal && selectedAppointment) {
            setData({
                vet_id: selectedAppointment?.vet_id ?? "",
                pet_id: selectedAppointment?.pet_id ?? "",
                title: selectedAppointment?.title || "",
                appointment_date: selectedAppointment?.appointment_date || "",
                appointment_start: selectedAppointment?.appointment_start || "",
                appointment_end: selectedAppointment?.appointment_end || "",
                status: selectedAppointment?.status || "Pending",
                notes: selectedAppointment?.notes || "",
            });
        } else {
            setData({
                vet_id: "",
                pet_id: "",
                title: "",
                appointment_date: "",
                appointment_start: "",
                appointment_end: "",
                status: "In-Process",
                notes: "",
            });
        }
    }, [showModal, selectedAppointment]);

    return (
        <Modal show={showModal} onClose={toggleModal}>
            <div className="p-6">
                <Title>
                    {isCreating && t('Create Appointment') }
                    {isViewing && t('View Appointment')}
                    {isAdmitting && t('Admit Appointment')}
                    {isEditing && t('Update Appointment')}
                    {!isViewing && !isAdmitting && !isEditing && t('Add Appointment') }
                </Title>

                <form onSubmit={handleSubmit}>
                    {!isCreating && (
                        <>
                            <input type="hidden" name="vet_id" value={selectedAppointment?.vet_id ?? ""} />
                            <input type="hidden" name="pet_id" value={selectedAppointment?.pet_id ?? ""} />
                        </>
                    )}

                    <div className="mt-2">
                        <InputLabel htmlFor="title" value={t('Title')} />
                        <TextInput
                            id="title"
                            name="title"
                            value={data.title}
                            className="mt-1 block w-full"
                            autoComplete="title"
                            isFocused={true}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                            disabled={isViewing || isAdmitting}
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className="mt-2 flex gap-4">
                        <div className="w-1/2">
                            <InputLabel htmlFor="pet_name" value={t('Pet Name')} />
                            <TextInput
                                id="pet_name"
                                name="pet_name"
                                className="mt-1 block w-full"
                                value={isCreating ? "" : selectedAppointment?.pet_name ?? ""}
                                placeholder="Enter pet name"
                                disabled={true}
                            />
                            <InputError message={errors.pet_id} className="mt-2" />
                        </div>

                        <div className="w-1/2">
                            <InputLabel htmlFor="vet_name" value={t('Doctor Name')} />
                            <TextInput
                                id="vet_name"
                                name="vet_name"
                                className="mt-1 block w-full"
                                value={isCreating ? "" : selectedAppointment?.vet_name ?? ""}
                                placeholder="Enter doctor name"
                                disabled={true}
                            />
                            <InputError message={errors.vet_id} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-2 flex gap-4">
                        <div className="w-1/3">
                            <InputLabel htmlFor="appointment_date" value={t('Date')} />
                            <TextInput
                                type="date"
                                id="appointment_date"
                                name="appointment_date"
                                value={data.appointment_date}
                                className="mt-1 block w-full"
                                autoComplete="appointment_date"
                                onChange={(e) => setData('appointment_date', e.target.value)}
                                required
                                disabled={isViewing || isAdmitting}
                            />
                            <InputError message={errors.appointment_date} className="mt-2" />
                        </div>

                        <div className="w-1/3">
                            <InputLabel htmlFor="appointment_start" value={t('Start')} />
                            <TextInput
                                type="time"
                                id="appointment_start"
                                name="appointment_start"
                                value={data.appointment_start}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('appointment_start', e.target.value)}
                                required
                                disabled={isViewing || isAdmitting}
                            />
                            <InputError message={errors.appointment_start} className="mt-2" />
                        </div>

                        <div className="w-1/3">
                            <InputLabel htmlFor="appointment_end" value={t('End')} />
                            <TextInput
                                type="time"
                                id="appointment_end"
                                name="appointment_end"
                                value={data.appointment_end}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('appointment_end', e.target.value)}
                                required
                                disabled={isViewing || isAdmitting}
                            />
                            <InputError message={errors.appointment_end} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-2">
                        <InputLabel htmlFor="status" value={t('Status')} />
                        <Select
                            id="status"
                            label=""
                            name="status"
                            value={data.status}
                            onChange={(e) => setData(prevData => ({ ...prevData, status: e.target.value }))}
                            options={statusOptions}
                        />
                        <InputError message={errors.status} className="mt-2" />
                    </div>

                    <div className="mt-2">
                        <InputLabel htmlFor="notes" value={t('Notes')} />
                        <Textarea
                            id="notes"
                            placeholder=''
                            label=''
                            name="notes"
                            value={data.notes}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('notes', e.target.value)}
                            disabled={isViewing}
                        />
                        <InputError message={errors.notes} className="mt-2" />
                    </div>

                    <div className="mt-4 flex justify-end">
                        {isAdmitting && (
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded-md inline-flex items-center"
                                disabled={processing}
                            >
                                <TbUserPlus className="mr-1" /> {t('Admin')}
                            </button>
                        )}
                        {isCreating && (
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md inline-flex items-center"
                                disabled={processing}
                            >
                                <MdPostAdd className="mr-1" /> {t('Create')}
                            </button>
                        )}
                        {isEditing && (
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md inline-flex items-center"
                                disabled={processing}
                            >
                                <FiUserCheck className="mr-1" /> {t('Update')}
                            </button>
                        )}
                        {isViewing && (
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded-md inline-flex items-center"
                                onClick={toggleModal}
                            >
                                <FaTimes className="mr-1" /> {t('Close')}
                            </button>
                        )}
                    </div>
                </form>

                {notification && (
                    <div className="mt-4 text-green-500">{notification}</div>
                )}
            </div>
        </Modal>
    );
};

export default AppointmentModal;
