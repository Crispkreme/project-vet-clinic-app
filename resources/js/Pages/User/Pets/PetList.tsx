import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Title from "@/Components/Title";

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
    return (
        <AuthenticatedLayout>
            <div className="container bg-white p-6 rounded-2xl dark:bg-gray-600 dark:text-gray-400">
            <Title>Your Pets</Title>
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
        </AuthenticatedLayout>
    );
};

export default PetList;
