import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Pet {
    id: number;
    name: string;
    breed: string;
    status: string;
}

interface PetListProps {
    pets: Pet[]; 
}

const PetList: React.FC<PetListProps> = ({ pets }) => {
    return (
        <AuthenticatedLayout>
            <div className="container">
                <h1>Your Pets</h1>
                {pets.length === 0 ? (
                    <p>No pets found.</p>
                ) : (
                    <ul>
                        {pets.map((pet) => (
                            <li key={pet.id}>
                                {pet.name} (Breed: {pet.breed}) - Status: {pet.status}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default PetList;
