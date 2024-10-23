import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Title from '@/Components/Title';
import { MdOutlinePets } from 'react-icons/md';
import AddPet from './AddPet';
import { Pet, PetListProps } from "@/Interfaces";
import { useTranslation } from 'react-i18next';

const PetList: React.FC<PetListProps> = ({ pets, user }) => {
    const { t } = useTranslation();

    const [showModal, setShowModal] = useState(false);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [petList, setPetList] = useState<Pet[]>(pets);

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

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    
    const openEditModal = (pet: Pet) => {
        if (pet.user_id !== undefined) {
            console.log(`User ID is defined: ${pet.user_id}`);
        }
        setSelectedPet(pet); 
        setIsEditing(true); 
        setShowModal(true); 
    };

    const closeModal = () => {
        setShowModal(false); 
        setSelectedPet(null); 
        setIsEditing(false);
    };

    const handleDelete = (id: number) => {
        console.log(`Delete pet with id: ${id}`);
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto bg-white p-4 sm:p-6 rounded-2xl dark:bg-gray-600 dark:text-gray-400">
                <div className="mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Title>{t('Your Pets')}</Title>
                            <MdOutlinePets className="text-2xl" />
                        </div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                            onClick={() => { setSelectedPet(null); setIsEditing(false); toggleModal(); }}
                        >
                            {t('Add Pet')}
                            <MdOutlinePets />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="px-2 py-1 text-left">{t('Name')}</th>
                                <th className="px-2 py-1 text-left">{t('Breed')}</th>
                                <th className="px-2 py-1 text-left">{t('Birthday')}</th>
                                <th className="px-2 py-1 text-left">{t('Age')}</th>
                                <th className="px-2 py-1 text-left">{t('Weight')}</th>
                                <th className="px-2 py-1 text-left">{t('Status')}</th>
                                <th className="px-2 py-1 text-left">{t('Actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {petList.length > 0 ? petList.map((pet) => (
                                <tr key={`${pet.id}-${pet.name}`}>
                                    <td className="border px-4 py-2 text-sm">{pet.name}</td>
                                    <td className="border px-4 py-2 text-sm">{pet.breed}</td>
                                    <td className="border px-4 py-2 text-sm">{pet.birthday}</td>
                                    <td className="border px-4 py-2 text-sm">{calculateAge(pet.birthday)}</td>
                                    <td className="border px-4 py-2 text-sm">{pet.weight}</td>
                                    <td className="border px-4 py-2 text-sm">{pet.status}</td>
                                    <td className="border px-4 py-2 flex gap-2">
                                        <button
                                            onClick={() => openEditModal(pet)} 
                                            className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs sm:text-sm"
                                        >
                                            {t('Update')}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(pet.id)} 
                                            className="bg-red-500 text-white px-2 py-1 rounded-md text-xs sm:text-sm"
                                        >
                                            {t('Delete')}
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-4 text-gray-500">{t('No pets available')}.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
    
            {showModal && (
                <AddPet
                    showModal={showModal}
                    toggleModal={closeModal}
                    selectedPet={selectedPet}
                    isEditing={isEditing}
                />
            )}
        </AuthenticatedLayout>
    );   
};

export default PetList;
