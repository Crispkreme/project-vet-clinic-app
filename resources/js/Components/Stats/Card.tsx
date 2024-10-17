import React, { ReactNode } from 'react';

interface CardProps {
    countAll: number; 
    countCurrent: number; 
    title: string;
    icon: ReactNode;
}
  
const Card: React.FC<CardProps> = ({ countAll, countCurrent, title, icon }) => {

    return (
        <div className='bg-white p-6 rounded-2xl flex items-center gap-4 dark:bg-gray-600 dark:text-gray-400'>
            <span className={`px-3 py-6 text-2xl rounded-2xl dark:bg-gray-500`}>
                {icon}
            </span>
            <div>
                <h2 className='text-xl flex items-center'>
                    <span className='text-2xl font-bold'>{countCurrent}</span>
                    <span className='mx-1'>/{countAll}</span>
                </h2>
                <p className='font-bold'>{title}</p>
            </div>
        </div>
    )
}

export default Card