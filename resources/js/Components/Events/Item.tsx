import React from 'react';

interface Appointment {
  appointment_date: string;
  title: string;
  appointment_start: string;
  appointment_end: string;
  notes?: string; 
}

interface ItemProps {
  event: Appointment;
}

const Item: React.FC<ItemProps> = ({ event }) => {
    const date = new Date(event.appointment_date);
    
    const day = date.toLocaleDateString('en-GB', { day: '2-digit' });
    const month = date.toLocaleDateString('en-GB', { month: 'short' });

    return (
        <div className='flex gap-5 items-center'>
            <div className='text-center bg-gray-300 text-gray-800 p-2 rounded-lg h-16 w-16 font-bold flex flex-col items-center justify-center'>
                <span className='text-xl'>{day}</span>
                <span className='text-sm'>{month}</span>
            </div>
            <div>
                <h1 className='text-xl font-bold'>{event.title}</h1>
                <p className='text-gray-400'>{event.notes}</p>
            </div>
        </div>
    );
}

export default Item;
