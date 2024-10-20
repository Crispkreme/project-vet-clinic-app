import React, { useState } from 'react';
import Modal from "@/Components/Modal";
import Title from "@/Components/Title";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Select from "@/Components/Select";
import Textarea from "@/Components/Textarea";
import InputError from "@/Components/InputError";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { useTranslation } from 'react-i18next';

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
    toggleModal: () => void;
    doctors: Doctor[];
    pets: Pet[];
    selectedAppointment: any;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ selectedAppointment, showModal, toggleModal, doctors, pets }) => {
    const { t } = useTranslation();

    const { props } = usePage();
    const { errors } = props;
    const [notification, setNotification] = useState<string | null>(null);

    const { data, setData, post, processing } = useForm({
        vet_id: "",
        pet_id: "",
        title: "",
        appointment_date: "",
        appointment_start: "",
        appointment_end: "",
        status: "In-Process",
        notes: "",
    });

    const statusOptions = [
        { value: "Pending", label: "Pending" },
        { value: "Confirmed", label: "Confirmed" },
        { value: "Cancelled", label: "Cancelled" },
        { value: "Completed", label: "Completed" },
    ];

    const vetOptions = doctors.map((doctor: Doctor) => ({
        value: String(doctor.id),
        label: doctor.name
    }));

    const petOptions = pets.map((pet: Pet) => ({
        value: String(pet.id),
        label: pet.name
    }));

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
    
        post(route('user.appointment.store'), {
            onSuccess: (response) => {
                setNotification(response.message); 
                toggleModal();
            },
            onError: (errors) => {
                setNotification(errors.message || "An error occurred."); 
            },
        });
    };
    

    return (
        <Modal show={showModal} onClose={toggleModal}>
            <div className="p-6">
                <Title>{t('Add Appointment')}</Title>
                <form onSubmit={handleSubmit}>
                    <div className="hidden">
                        <input
                            type="hidden"
                            id="status"
                            name="status"
                            value="In-Progress"
                        />
                    </div>
                    <div className="mt-2">
                        <InputLabel htmlFor="title" value={t('Title')} />
                        <TextInput
                            id="title"
                            name="title"
                            value={data.title}
                            className="mt-1 block w-full"
                            autoComplete="title"
                            isFocused={true}
                            onChange={(e) => setData(prevData => ({ ...prevData, title: e.target.value }))}
                            required
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>
                    <div className="mt-2 flex gap-4">
                        <div className="w-1/2">
                            <InputLabel htmlFor="pet_id" value={t('Pet Name')} />
                            <Select
                                label=""
                                id="pet_id"
                                name="pet_id"
                                value={data.pet_id}
                                onChange={(e) => setData(prevData => ({ ...prevData, pet_id: e.target.value }))}
                                options={petOptions}
                            />
                            <InputError message={errors.pet_id} className="mt-2" />
                        </div>
                        <div className="w-1/2">
                            <InputLabel htmlFor="vet_id" value={t('Doctor Name')} />
                            <Select
                                label=""
                                id="vet_id"
                                name="vet_id"
                                value={data.vet_id}
                                onChange={(e) => setData(prevData => ({ ...prevData, vet_id: e.target.value }))}
                                options={vetOptions}
                            />
                            <InputError message={errors.vet_id} className="mt-2" />
                        </div>
                    </div>
                    <div className="mt-2 flex gap-4">
                        <div className="w-3/4">
                            <InputLabel htmlFor="appointment_date" value={t('Date')} />
                            <TextInput
                                type="date"
                                id="appointment_date"
                                name="appointment_date"
                                value={data.appointment_date}
                                className="mt-1 block w-full"
                                autoComplete="appointment_date"
                                isFocused={true}
                                onChange={(e) => setData(prevData => ({ ...prevData, appointment_date: e.target.value }))}
                                required
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>
                        <div className="w-3/4">
                            <InputLabel htmlFor="appointment_start" value={t('Start')} />
                            <TextInput
                                type="time"
                                id="appointment_start"
                                name="appointment_start"
                                value={data.appointment_start}
                                className="mt-1 block w-full"
                                autoComplete="appointment_start"
                                isFocused={true}
                                onChange={(e) => setData(prevData => ({ ...prevData, appointment_start: e.target.value }))}
                                required
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>
                        <div className="w-3/4">
                            <InputLabel htmlFor="appointment_end" value={t('End')} />
                            <TextInput
                                type="time"
                                id="appointment_end"
                                name="appointment_end"
                                value={data.appointment_end}
                                className="mt-1 block w-full"
                                autoComplete="appointment_end"
                                isFocused={true}
                                onChange={(e) => setData(prevData => ({ ...prevData, appointment_end: e.target.value }))}
                                required
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <InputLabel htmlFor="notes" value={t('Notes')} />
                        <Textarea
                            id="notes"
                            name="notes"
                            label=""
                            value={data.notes}
                            onChange={(e) => setData(prevData => ({ ...prevData, notes: e.target.value }))}
                            placeholder={t('Enter appointment notes')}
                        />
                        <InputError message={errors.notes} className="mt-2" />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        disabled={processing}
                    >
                        {t('Submit')}
                    </button>
                </form>

                {notification && (
                    <div className="notification mt-4 text-green-600">{notification}</div>
                )}
            </div>
        </Modal>
    );
};

export default AppointmentModal;
