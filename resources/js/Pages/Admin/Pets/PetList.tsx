import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Title from '@/Components/Title';
import { MdOutlinePets } from 'react-icons/md';
import AddPet from './AddPet';
import { Pet, PetListProps } from "@/Interfaces";

const PetList: React.FC<PetListProps> = ({ pets, user }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [petList, setPetList] = useState<Pet[]>(pets);

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
            <div className="container bg-white p-6 rounded-2xl dark:bg-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-between mb-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                        onClick={() => { setSelectedPet(null); setIsEditing(false); toggleModal(); }}
                    >
                        Add Pet{" "}
                        <span>
                            <MdOutlinePets />
                        </span>
                    </button>
                    <div className="flex items-center gap-2">
                        <Title>Your Pets</Title>
                        <span>
                            <MdOutlinePets />
                        </span>
                    </div>
                </div>

                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Breed</th>
                            <th>Age</th>
                            <th>Weight</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {petList.map((pet) => (
                            <tr key={`${pet.id}-${pet.name}`}>
                                <td className="border px-4 py-2">{pet.name}</td>
                                <td className="border px-4 py-2">{pet.breed}</td>
                                <td className="border px-4 py-2">{pet.age}</td>
                                <td className="border px-4 py-2">{pet.weight}</td>
                                <td className="border px-4 py-2">{pet.status}</td>
                                <td className="border px-4 py-2 flex gap-2">
                                    <button
                                        onClick={() => openEditModal(pet)} 
                                        className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pet.id)} 
                                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
