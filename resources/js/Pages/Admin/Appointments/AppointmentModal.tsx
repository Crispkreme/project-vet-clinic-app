import React, { useState, useEffect } from 'react';
import Modal from "@/Components/Modal";
import Title from "@/Components/Title";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Textarea from "@/Components/Textarea";
import InputError from "@/Components/InputError";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { TbUserPlus } from "react-icons/tb";
import { FiUserCheck } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";

interface Doctor {
    id: number;
    name: string;
}

interface Pet {
    id: number;
    name: string;
}

interface AppointmentModalProps {
    showModal: boolean;
    isViewing: boolean;
    isAdmitting: boolean;
    isEditing: boolean;
    toggleModal: () => void;
    doctors: Doctor[];
    pets: Pet[];
    selectedAppointment: any;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ 
    selectedAppointment, 
    isViewing, 
    isAdmitting, 
    isEditing, 
    showModal, 
    toggleModal, 
    doctors, 
    pets 
}) => {
    const { props } = usePage();
    const { errors } = props;
    const [notification, setNotification] = useState<string | null>(null);

    // Initialize the form data with the selected appointment details
    const { data, setData, post, processing } = useForm({
        vet_id: selectedAppointment.vet_id || "",
        pet_id: selectedAppointment.pet_id || "",
        title: selectedAppointment.title || "",
        appointment_date: selectedAppointment.appointment_date || "",
        appointment_start: selectedAppointment.appointment_start || "",
        appointment_end: selectedAppointment.appointment_end || "",
        status: selectedAppointment.status || "In-Process",
        notes: selectedAppointment.notes || "",
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        post(route('user.appointment.store'), {
            data,
            onSuccess: (response) => {
                setNotification(response.message);
                toggleModal();
            },
            onError: (errors) => {
                setNotification(errors.message || "An error occurred.");
            },
        });
    };

    useEffect(() => {
        if (showModal && selectedAppointment) {
            setData({
                vet_id: selectedAppointment.vet_id ?? "",
                pet_id: selectedAppointment.pet_id ?? "",
                title: selectedAppointment.title || "",
                appointment_date: selectedAppointment.appointment_date || "",
                appointment_start: selectedAppointment.appointment_start || "",
                appointment_end: selectedAppointment.appointment_end || "",
                status: selectedAppointment.status || "Pending",
                notes: selectedAppointment.notes || "",
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
                    {isViewing && 'View Appointment'}
                    {isAdmitting && 'Admitting Appointment'}
                    {isEditing && 'Updating Appointment'}
                    {!isViewing && !isAdmitting && !isEditing && 'Add Appointment'}
                </Title>

                <form onSubmit={handleSubmit}>
                    <input type="hidden" value={selectedAppointment.vet_id}/>
                    <input type="hidden" value={selectedAppointment.pet_id}/>
                    <div className="mt-2">
                        <InputLabel htmlFor="title" value="Title" />
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
                            <InputLabel htmlFor="pet_id" value="Pet Name" />
                            <TextInput
                                id="pet_name"
                                name="pet_name"
                                className="mt-1 block w-full"
                                value={selectedAppointment.pet_name}
                                placeholder="Enter pet name"
                                disabled={true}
                            />
                            <input type="hidden" name="pet_id" value={data.pet_id} />
                            <InputError message={errors.pet_id} className="mt-2" />
                        </div>
                        <div className="w-1/2">
                            <InputLabel htmlFor="vet_id" value="Doctor Name" />
                            <TextInput
                                id="vet_name"
                                name="vet_name"
                                className="mt-1 block w-full"
                                value={selectedAppointment.vet_name}
                                placeholder="Enter doctor name"
                                disabled={true}
                            />
                            <input type="hidden" name="vet_id" value={data.vet_id} />
                            <InputError message={errors.vet_id} className="mt-2" />
                        </div>
                    </div>
                    <div className="mt-2 flex gap-4">
                        <div className="w-1/3">
                            <InputLabel htmlFor="appointment_date" value="Date" />
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
                            <InputLabel htmlFor="appointment_start" value="Start" />
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
                            <InputLabel htmlFor="appointment_end" value="End" />
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
                    <div className="mb-4">
                        <InputLabel htmlFor="notes" value="Notes" />
                        <Textarea
                            id="notes"
                            name="notes"
                            label=""
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            placeholder="Enter appointment notes"
                            disabled={isViewing || isAdmitting}
                        />
                        <InputError message={errors.notes} className="mt-2" />
                    </div>
                    {isAdmitting ? (
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md inline-flex items-center"
                            disabled={processing}
                        >
                            <TbUserPlus className="mr-1" /> Admitting 
                        </button>
                    ) : !isViewing ? (
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md inline-flex items-center"
                            disabled={processing}
                        >
                            <FiUserCheck className='mr-1'/> Updating
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded-md inline-flex items-center"
                            onClick={toggleModal}
                        >
                            <FaTimes className='mr-1' /> Close
                        </button>
                    )}
                </form>

                {notification && (
                    <div className="notification mt-4 text-green-600">{notification}</div>
                )}
            </div>
        </Modal>
    );
};

export default AppointmentModal;
