import React from 'react';
import Item from './Item';

interface Appointment {
  id: number;   
  title: string;
  appointment_date: string;
  appointment_start: string;
  appointment_end: string;
}

interface EventProps {
  appointments: Appointment[];
}

const Event: React.FC<EventProps> = ({ appointments }) => {
  return (
    <div className='bg-white p-5 rounded-2xl dark:bg-gray-300 flex-1 flex flex-col gap-5'>
      <h1>Event</h1>

      {appointments.map((appointment) => (
        <Item key={appointment.id} event={appointment} />
      ))}
      
    </div>
  );
}

export default Event;
