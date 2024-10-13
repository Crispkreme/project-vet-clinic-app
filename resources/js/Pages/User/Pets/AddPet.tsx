import React, { useState } from "react";
import Modal from "@/Components/Modal";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import Title from "@/Components/Title";
import { MdOutlinePets } from "react-icons/md";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Select from "@/Components/Select";
import Textarea from "@/Components/Textarea";
import toastr from "toastr";

interface AddPetProps {
    showModal: boolean;
    toggleModal: () => void;
}

const AddPet: React.FC<AddPetProps> = ({ showModal, toggleModal }) => {
    const { props } = usePage();
    const { errors } = props;
    const user = usePage().props.auth.user;
    const [notification, setNotification] = useState<string | null>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (value === "") {
            setData({ ...data, weight: value });
            return;
        }

        if (/^\d*\.?\d{0,2}$/.test(value)) {
            setData({ ...data, weight: value });
        }
    };

    const { data, setData, post, processing } = useForm({
        user_id: user.id,
        name: "",
        breed: "",
        age: "",
        weight: "",
        status: "",
        medical_history: "",
    });

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

    const statusOptions = [
        { value: "Healthy", label: "Healthy" },
        { value: "Due for Vaccination", label: "Due for Vaccination" },
        { value: "Under Treatment", label: "Under Treatment" },
        { value: "Post-Surgery", label: "Post-Surgery" },
        { value: "Needs Medication", label: "Needs Medication" },
        { value: "In Quarantine", label: "In Quarantine" },
        { value: "Emergency", label: "Emergency" },
        { value: "Adopted", label: "Adopted" },
        { value: "Lost", label: "Lost" },
        { value: "Pending Vet Visit", label: "Pending Vet Visit" },
    ];

    const openEditModal = (pet) => {
        setSelectedPet(pet);
        setData(pet);
        setIsEditing(true);
        toggleModal();
    };

    return (
        <Modal show={showModal} onClose={toggleModal}>
            <div className="p-6">
                <Title>
                    {isEditing ? "Edit Pet" : "Add New Pet"}{" "}
                    <span>
                        <MdOutlinePets />
                    </span>
                </Title>
                <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                        <InputLabel htmlFor="name" value="Pet Name" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mt-2">
                        <InputLabel htmlFor="breed" value="Pet Breed" />
                        <TextInput
                            id="breed"
                            name="breed"
                            value={data.breed}
                            className="mt-1 block w-full"
                            autoComplete="breed"
                            isFocused={true}
                            onChange={(e) => setData("breed", e.target.value)}
                            required
                        />
                        <InputError message={errors.breed} className="mt-2" />
                    </div>
                    <div className="mt-2 flex gap-4">
                        <div className="w-1/2">
                            <InputLabel htmlFor="age" value="Age" />
                            <TextInput
                                id="age"
                                name="age"
                                type="number"
                                className="mt-1 block w-full px-3 py-2 border rounded-md"
                                placeholder="Enter age"
                                min="0"
                                max="99"
                                step="1"
                                value={data.age}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (
                                        value.length <= 2 &&
                                        (value === "" || /^\d+$/.test(value))
                                    ) {
                                        setData({ ...data, age: value });
                                    }
                                }}
                            />
                            <InputError message={errors.age} className="mt-2" />
                        </div>
                        <div className="w-1/2">
                            <InputLabel htmlFor="weight" value="Weight" />
                            <TextInput
                                id="weight"
                                name="weight"
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border rounded-md"
                                placeholder="Enter weight"
                                value={data.weight}
                                onChange={handleWeightChange}
                            />
                            <InputError
                                message={errors.weight}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <InputLabel htmlFor="status" value="Status" />
                        <Select
                            id="status"
                            label=""
                            name="status"
                            value={data.status}
                            onChange={(e) =>
                                setData({ ...data, status: e.target.value })
                            }
                            options={statusOptions}
                        />
                        <InputError message={errors.status} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <InputLabel
                            htmlFor="medical_history"
                            value="Medical History"
                        />
                        <Textarea
                            id="medical_history"
                            name="medical_history"
                            value={data.medical_history}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    medical_history: e.target.value,
                                })
                            }
                            placeholder="Enter medical history"
                            label=""
                        />
                        <InputError
                            message={errors.medical_history}
                            className="mt-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        {isEditing ? "Update" : "Submit"}
                    </button>
                </form>

                {notification && (
                    <div className="notification">{notification}</div>
                )}
            </div>
        </Modal>
    );
};

export default AddPet;
