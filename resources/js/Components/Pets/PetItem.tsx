import React from 'react';

interface Pet {
  id: number;
  name: string;
  breed: string;
  status: string;
}
  
interface PetProps {
  pet: Pet;  // Change to a single pet object
}
  
const PetItem: React.FC<PetProps> = ({ pet }) => {  // Update prop destructuring
    return (
        <div className='flex justify-between items-center mb-2'>
            <div className='flex items-center gap-2'>
                {/* <img src={user.image} alt={user.name} className='w-12 h-12 rounded-full flex'/> */}
                <div>
                    <h2 className='font-bold'>{pet.name}</h2>
                    <span className='font-semibold text-gray-400 text-sm'>{pet.breed}</span>
                </div>
            </div>
            <span className={`p-3 rounded-full text-xs text-gray-700 font-semibold dark:bg-gray-500 dark:text-gray-300`}>
                {pet.status}
            </span>
        </div>
    );
};

export default PetItem;
