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
import { useTranslation } from "react-i18next";
import { AddPetProps } from "@/Interfaces";
import { use } from "i18next";

const AddPet: React.FC<AddPetProps> = ({ showModal, toggleModal, selectedPet, isEditing }) => {
    const  { t } = useTranslation();

    const { props } = usePage();
    const { errors } = props;
    const user = usePage().props.auth.user;
    const [notification, setNotification] = useState<string | null>(null);
    const { data, setData, post, processing, reset } = useForm({
        user_id: user.id,
        name: "",
        breed: "",
        birthday: "",
        // age: "",
        weight: "",
        status: "",
        medical_history: "",
        id: undefined,
    });

    const [birthday, setBirthday] = useState<string | null>(null);
    // const [age, setAge] = useState<number| null>(null);

    // const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setBirthday(e.target.value);
    // }

    // const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setAge(Number(e.target.value));
    // }

    

    const calculateAge = (birthday: string) => {
        const today = new Date();
        const birthDate = new Date(birthday);

        let ageYears = today.getFullYear() - birthDate.getFullYear();
        const ageMonths = today.getMonth() - birthDate.getMonth();
        const ageDays = today.getDate() - birthDate.getDate();

        if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
            ageYears--;
        }
        
        let months = ageMonths < 0 ? 12 + ageMonths : ageMonths;

        if (ageYears === 0) {
            return `${months} months`;
        } else {
            return `${ageYears} years ${months} months`;
        }
    }

    useEffect(() => {
        if(data.birthday) {
            const age = calculateAge(data.birthday);
            setData(prevData => ({ ...prevData, age }));
        }
    }, [data.birthday]);

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
        
        // const { age, ...dataWithoutAge } = data;

        /* prettier-ignore */ (() => { const QuickLog = data; const isObject = (obj: unknown): obj is Record<string, unknown> => { return obj !== null && typeof obj === 'object'; }; const isArrayOfObjects = (arr: unknown): arr is Record<string, unknown>[] => { return Array.isArray(arr) && arr.every(isObject); }; const parentDiv: HTMLElement = document.getElementById('quicklogContainer') ?? (() => { const div = document.createElement('div'); div.id = 'quicklogContainer'; div.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 1000; display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; max-height: 90vh; overflow-y: auto; padding: 10px; box-sizing: border-box;'; const helperButtonsDiv = document.createElement('div'); helperButtonsDiv.style.cssText = 'position: sticky; bottom: 0; display: flex; flex-direction: column; z-index: 1001;'; const clearButton = document.createElement('button'); clearButton.textContent = 'Clear'; clearButton.style.cssText = 'margin-top: 10px; background-color: red; color: white; border: none; padding: 5px; cursor: pointer; border-radius: 5px;'; clearButton.onclick = () => { if (parentDiv instanceof HTMLElement) { parentDiv.remove(); } }; helperButtonsDiv.appendChild(clearButton); document.body.appendChild(div); div.appendChild(helperButtonsDiv); return div; })(); const createTable = (obj: Record<string, unknown>): HTMLTableElement => { const table = document.createElement('table'); table.style.cssText = 'border-collapse: collapse; background-color: yellow; box-shadow: white 0px 0px 5px 1px; padding: 5px; border: 3px solid black; border-radius: 10px; color: black !important; cursor: pointer; font: bold 25px "Comic Sans MS"; margin-bottom: 10px;'; Object.entries(obj).forEach(([key, value]) => { const row = document.createElement('tr'); const keyCell = document.createElement('td'); const valueCell = document.createElement('td'); keyCell.textContent = key; valueCell.textContent = String(value); keyCell.style.cssText = 'border: 1px solid black; padding: 5px;'; valueCell.style.cssText = 'border: 1px solid black; padding: 5px;'; row.appendChild(keyCell); row.appendChild(valueCell); table.appendChild(row); }); return table; }; const createTableFromArray = ( arr: Record<string, unknown>[], ): HTMLTableElement => { const table = document.createElement('table'); table.style.cssText = 'border-collapse: collapse; background-color: yellow; box-shadow: white 0px 0px 5px 1px; padding: 5px; border: 3px solid black; border-radius: 10px; color: black !important; cursor: pointer; font: bold 25px "Comic Sans MS"; margin-bottom: 10px;'; const headers = Object.keys(arr[0]); const headerRow = document.createElement('tr'); headers.forEach((header) => { const th = document.createElement('th'); th.textContent = header; th.style.cssText = 'border: 1px solid black; padding: 5px;'; headerRow.appendChild(th); }); table.appendChild(headerRow); arr.forEach((obj) => { const row = document.createElement('tr'); headers.forEach((header) => { const td = document.createElement('td'); td.textContent = String(obj[header]); td.style.cssText = 'border: 1px solid black; padding: 5px;'; row.appendChild(td); }); table.appendChild(row); }); return table; }; const createChildDiv = (data: unknown): HTMLElement => { const newDiv = document.createElement('div'); const jsonData = JSON.stringify(data, null, 2); if (isArrayOfObjects(data)) { const table = createTableFromArray(data); newDiv.appendChild(table); } else if (isObject(data)) { const table = createTable(data); newDiv.appendChild(table); } else { newDiv.textContent = String(data); } newDiv.style.cssText = 'font: bold 25px "Comic Sans MS"; width: max-content; max-width: 500px; word-wrap: break-word; background-color: yellow; box-shadow: white 0px 0px 5px 1px; padding: 5px; border: 3px solid black; border-radius: 10px; color: black !important; cursor: pointer; margin-bottom: 10px;'; const handleMouseDown = (e: MouseEvent) => { e.preventDefault(); const clickedDiv = e.target instanceof Element && e.target.closest('div'); if (clickedDiv !== null && e.button === 0 && clickedDiv === newDiv) { void navigator.clipboard.writeText(jsonData).then(() => { clickedDiv.style.backgroundColor = 'gold'; setTimeout(() => { clickedDiv.style.backgroundColor = 'yellow'; }, 1000); }); } }; const handleRightClick = (e: MouseEvent) => { e.preventDefault(); if (parentDiv.contains(newDiv)) { parentDiv.removeChild(newDiv); if (!parentDiv.hasChildNodes()) { parentDiv.remove(); } } }; newDiv.addEventListener('mousedown', handleMouseDown); newDiv.addEventListener('contextmenu', handleRightClick); return newDiv; }; parentDiv.prepend(createChildDiv(QuickLog)); })();
        post(url, {
            data,
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
                    birthday: selectedPet.birthday || "",
                    // age: selectedPet.age ? selectedPet.age.toString() : "",
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
                    birthday: "",
                    // age: "",
                    weight: "",
                    status: "",
                    medical_history: "",
                    id: "",
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
                    {isEditing ? t('Edit Pet') : t('Add New Pet')}{" "}
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
                        {/* <div className="w-1/3">
                            <InputLabel htmlFor="age" value={t('Age')} />
                            <TextInput
                                id="age"
                                name="age"
                                type="string"
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
                                disabled={!!birthday}
                            />
                            <InputError message={errors.age} className="mt-2" />
                        </div> */}
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