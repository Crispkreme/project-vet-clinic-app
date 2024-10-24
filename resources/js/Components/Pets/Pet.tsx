import React from "react";
import PetItem from "./PetItem";
import Title from "../Title";
import { PetProps } from "@/Interfaces";

const Pet: React.FC<PetProps> = ({ pets, usertype }) => {
    return (
        <div className="bg-white p-3 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1 flex flex-col gap-5">
            <Title>{usertype === 'admin' ? 'Pets Record' : 'My Pets'}</Title>

            <div className="max-h-48 overflow-y-auto">
                {pets.map((pet) => (
                    <PetItem key={pet.id} pet={pet} />
                ))}
            </div>
        </div>
    );
};

export default Pet;
