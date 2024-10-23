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
import { AddPetProps } from "@/Interfaces";
import { useTranslation } from 'react-i18next';

const AddPet: React.FC<AddPetProps> = ({ showModal, toggleModal, selectedPet, isEditing }) => {

    const { t } = useTranslation();
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
        birthday: "",
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
        
        const url = route(isUpdating ? "admin.update" : "admin.store", isUpdating ? selectedPet.id : null);
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
        { value: "Healthy", label: t('Healthy') },
        { value: "Due for Vaccination", label: t('Due for Vaccination') },
        { value: "Under Treatment", label: t('Under Treatment') },
        { value: "Post-Surgery", label: t('Post-Surgery') },
        { value: "Needs Medication", label: t('Needs Medication') },
        { value: "In Quarantine", label: t('In Quarantine') },
        { value: "Emergency", label: t('Emergency') },
        { value: "Adopted", label: t('Adopted') },
        { value: "Lost", label: t('Lost') },
        { value: "Pending Vet Visit", label: t('Pending Vet Visit') },
    ];

    useEffect(() => {
        if (showModal) {
            if (selectedPet) {
                setData((prevData: any) => ({
                    ...prevData,
                    user_id: selectedPet.user_id || user.id,
                    name: selectedPet.name || "",
                    breed: selectedPet.breed || "",
                    birthday: selectedPet.birthday ? selectedPet.birthday.toString() : "",
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
                    birthday: "",
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
                        <InputLabel htmlFor="name" value={t('Pet Name')}/>
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
                        <InputLabel htmlFor="breed" value={t('Breed')} />
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
                            <InputLabel htmlFor="birthday" value={t('Birthday')} />
                            <TextInput
                                id="birthday"
                                name="birthday"
                                type="date"
                                className="mt-1 block w-full px-3 py-2 border rounded-md"
                                placeholder="Choose Birthday"
                                value={data.birthday}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setData(prevData => ({ ...prevData, birthday: value }));
                                    
                                }}
                            />

                            <InputError message={errors.birthday} className="mt-2" />
                        </div>
                        <div className="w-1/2">
                            <InputLabel htmlFor="weight" value={t('Weight(Kg)')} />
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
                        <InputLabel htmlFor="status" value={t('Status')} />
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
                            value={t('Medical History')}
                        />
                        <Textarea
                            id="medical_history"
                            name="medical_history"
                            value={data.medical_history}
                            onChange={(e) => setData(prevData => ({ ...prevData, medical_history: e.target.value })) }
                            placeholder={t('Enter medical history')}
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
                        {isEditing ? t('Update') : t('Add Pet')}
                    </button>

                    {notification && <div className="mt-4 text-green-500">{notification}</div>}
                </form>
            </div>
        </Modal>
    );
};

export default AddPet;