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

interface AppointmentModalProps {
    showModal: boolean;
    toggleModal: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ showModal, toggleModal, selectedAppointment }) => {
    const { props } = usePage();
    const { errors } = props;
    const user = props.auth.user;

    const [notification, setNotification] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null); 

    const { data, setData, post, processing } = useForm({
        vet_id: "",
        pet_id: "",
        appointment_date: "",
        status: "Pending",
        notes: "",
    });

    const statusOptions = [
        { value: "Pending", label: "Pending" },
        { value: "Confirmed", label: "Confirmed" },
        { value: "Cancelled", label: "Cancelled" },
        { value: "Completed", label: "Completed" },
    ];

    const vetOptions = [
        // Example data; should be fetched dynamically
        { value: "1", label: "Dr. Smith" },
        { value: "2", label: "Dr. Doe" },
    ];

    const petOptions = [
        // Example data; should be fetched dynamically
        { value: "1", label: "Buddy" },
        { value: "2", label: "Bella" },
    ];

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const endpoint = isEditing
            ? route("user.update", selectedPet.id)
            : route("user.store");

        post(endpoint, {
            data: {
                ...data,
                id: isEditing ? selectedPet.id : undefined,
            },
            onSuccess: (response) => {
                setNotification(response.props.message);
                toggleModal();
            },
            onError: (error) => {
                setNotification(error.props.error || "An error occurred.");
            },
        });
    };

    return (
        <Modal show={showModal} onClose={toggleModal}>
            <div className="p-6">
                <Title>{isEditing ? "Edit Appointment" : "Add Appointment"}</Title>
                <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                        <InputLabel htmlFor="vet_id" value="Doctor Name" />
                        <Select
                            id="vet_id"
                            name="vet_id"
                            value={data.vet_id}
                            onChange={(e) => setData("vet_id", e.target.value)}
                            options={vetOptions}
                        />
                        <InputError message={errors.vet_id} className="mt-2" />
                    </div>

                    <div className="mt-2">
                        <InputLabel htmlFor="pet_id" value="Pet Name" />
                        <Select
                            id="pet_id"
                            name="pet_id"
                            value={data.pet_id}
                            onChange={(e) => setData("pet_id", e.target.value)}
                            options={petOptions}
                        />
                        <InputError message={errors.pet_id} className="mt-2" />
                    </div>

                    <div className="mt-2">
                        <InputLabel htmlFor="appointment_date" value="Appointment Date" />
                        <TextInput
                            id="appointment_date"
                            name="appointment_date"
                            value={data.appointment_date}
                            className="mt-1 block w-full"
                            autoComplete="appointment_date"
                            isFocused={true}
                            onChange={(e) => setData("appointment_date", e.target.value)}
                            required
                        />
                        <InputError message={errors.appointment_date} className="mt-2" />
                    </div>

                    <div className="mt-2">
                        <InputLabel htmlFor="status" value="Status" />
                        <Select
                            id="status"
                            name="status"
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            options={statusOptions}
                        />
                        <InputError message={errors.status} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="notes" value="Notes" />
                        <Textarea
                            id="notes"
                            name="notes"
                            value={data.notes}
                            onChange={(e) => setData("notes", e.target.value)}
                            placeholder="Enter appointment notes"
                        />
                        <InputError message={errors.notes} className="mt-2" />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        disabled={processing}
                    >
                        {isEditing ? "Update" : "Submit"}
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
