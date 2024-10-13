import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Title from '@/Components/Title';
import { MdOutlinePets } from 'react-icons/md';
import AddPet from './AddPet'; // Import the AddPet component

interface Pet {
    id: number;
    name: string;
    breed: string;
    age: number;
    weight: number;
    status: string;
}

interface PetListProps {
    pets: Pet[];
}

const PetList: React.FC<PetListProps> = ({ pets }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null); 
    const [isEditing, setIsEditing] = useState(false);

    // Toggle modal visibility
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // Handle delete functionality
    const handleDelete = (petId: number) => {
        if (confirm("Are you sure you want to delete this pet?")) {
            const updatedPets = pets.filter(pet => pet.id !== petId);
            alert(`Pet with ID ${petId} has been deleted.`);
        }
    };

    const openEditModal = (pet: Pet) => {
        setSelectedPet(pet);
        setData(pet);
        setIsEditing(true); 
        toggleModal();
    };

    return (
        <AuthenticatedLayout>
            <div className="container bg-white p-6 rounded-2xl dark:bg-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-between mb-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                        onClick={() => { setSelectedPet(null); setIsEditing(false); toggleModal(); }} // Reset modal for adding
                    >
                        Add Pet{" "}
                        <span>
                            <MdOutlinePets />
                        </span>
                    </button>
    
                    {/* Title with icon */}
                    <Title>
                        Your Pets{" "}
                        <span className="flex justify-end">
                            <MdOutlinePets />
                        </span>
                    </Title>
                </div>
    
                <div className="flex items-center gap-4">
                    {pets.length === 0 ? (
                        <p>No pets found.</p>
                    ) : (
                        <table className="table-fixed w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Breed</th>
                                    <th className="px-4 py-2">Age</th>
                                    <th className="px-4 py-2">Weight</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Actions</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {pets.map((pet) => (
                                    <tr key={pet.id}>
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
                    )}
                </div>
            </div>
    
            <AddPet 
                showModal={showModal} 
                toggleModal={toggleModal} 
                selectedPet={selectedPet} 
                isEditing={isEditing} 
            />
        </AuthenticatedLayout>
    );
};

export default PetList;
