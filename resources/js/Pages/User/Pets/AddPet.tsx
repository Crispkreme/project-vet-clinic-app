import React, { useState, useEffect } from "react";
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

interface Pet {
    id: number;
    user_id: number | null;
    name: string;
    breed: string | null;
    age: number | null;
    weight: number | null;
    medical_history: string | null;
    status: 'Healthy' | 'Due for Vaccination' | 'Under Treatment' | 'Post-Surgery' | 'Needs Medication' | 'In Quarantine' | 'Emergency' | 'Adopted' | 'Lost' | 'Pending Vet Visit' | null;
    created_at: string;
    updated_at: string;
}

interface AddPetProps {
    showModal: boolean;
    toggleModal: () => void;
    selectedPet: Pet | null;
    isEditing: boolean;
}

const AddPet: React.FC<AddPetProps> = ({ showModal, toggleModal, selectedPet, isEditing }) => {
    const { props } = usePage();
    const { errors } = props;
    const user = usePage().props.auth.user;
    const [notification, setNotification] = useState<string | null>(null);
    const { data, setData, post, processing, reset } = useForm({
        user_id: user.id,
        name: "",
        breed: "",
        age: "",
        weight: "",
        status: "",
        medical_history: "",
        id: undefined,
    });

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
    
        if (value === "") {
            setData(prevData => ({ ...prevData, weight: value }));
            return;
        }
    
        if (/^\d*\.?\d{0,2}$/.test(value)) {
            setData(prevData => ({ ...prevData, weight: value }));
        }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const isUpdating = isEditing && selectedPet;

        setData((prevData: any) => ({
            ...prevData,
            id: isUpdating ? selectedPet?.id : undefined, 
        }));
        
        const url = route(isUpdating ? "user.update" : "user.store", isUpdating ? selectedPet.id : null);
        post(url, {
            data: {
                ...data,
            },
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

    useEffect(() => {
        if (showModal) {
            if (selectedPet) {
                setData((prevData: any) => ({
                    ...prevData,
                    user_id: selectedPet.user_id || user.id,
                    name: selectedPet.name || "",
                    breed: selectedPet.breed || "",
                    age: selectedPet.age ? selectedPet.age.toString() : "",
                    weight: selectedPet.weight ? selectedPet.weight.toString() : "",
                    status: selectedPet.status || "",
                    medical_history: selectedPet.medical_history || "",
                    id: selectedPet.id,
                }));
            } else {
                setData({
                    user_id: user.id,
                    name: "",
                    breed: "",
                    age: "",
                    weight: "",
                    status: "",
                    medical_history: "",
                    id: undefined,
                });
            }
        }
    }, [showModal, selectedPet, user.id]);

    const handleClose = () => {
        reset();
        toggleModal();
    };

    return (
        <Modal show={showModal} onClose={handleClose}>
            <div className="p-6">

                <Title>
                    {isEditing ? "Edit Pet" : "Add New Pet"}{" "}
                    <span>
                        <MdOutlinePets />
                    </span>
                </Title>

                <form onSubmit={handleSubmit}>
                    {isEditing && (
                        <input type="hidden" name="id" value={data.id} />
                    )}
                    <div className="mt-2">
                        <InputLabel htmlFor="name" value="Pet Name" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData(prevData => ({ ...prevData, name: e.target.value }))}
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
                            onChange={(e) => setData(prevData => ({ ...prevData, breed: e.target.value }))}
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
                                        setData(prevData => ({ ...prevData, age: value }));
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
                            onChange={(e) => setData(prevData => ({ ...prevData, status: e.target.value })) }
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
                            onChange={(e) => setData(prevData => ({ ...prevData, medical_history: e.target.value })) }
                            placeholder="Enter medical history"
                            label=""
                            disabled={false}
                        />
                        <InputError
                            message={errors.medical_history}
                            className="mt-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                        disabled={processing}
                    >
                        {isEditing ? "Update Pet" : "Add Pet"}
                    </button>

                    {notification && <div className="mt-4 text-green-500">{notification}</div>}
                </form>
            </div>
        </Modal>
    );
};

export default AddPet;