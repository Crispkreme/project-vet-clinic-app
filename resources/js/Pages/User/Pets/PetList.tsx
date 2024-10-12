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
    // State to manage modal visibility
    const [showModal, setShowModal] = useState(false);

    // Toggle modal visibility
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <AuthenticatedLayout>
            <div className="container bg-white p-6 rounded-2xl dark:bg-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-between mb-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                        onClick={toggleModal} // Open modal on click
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
                                </tr>
                            </thead>
                            <tbody>
                                {pets.map((pet) => (
                                    <tr key={pet.id}>
                                        <td className="border px-4 py-2">
                                            {pet.name}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {pet.breed}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {pet.age}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {pet.weight}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {pet.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Pass modal state and toggle function to AddPet component */}
            <AddPet showModal={showModal} toggleModal={toggleModal} />
        </AuthenticatedLayout>
    );
};

export default PetList;
