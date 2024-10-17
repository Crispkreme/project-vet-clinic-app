import React from 'react';
import Item from './Item';
import Title from '../Title';

interface Appointment {
  id: number;   
  title: string;
  appointment_date: string;
  appointment_start: string;
  appointment_end: string;
}

interface EventProps {
  appointments: Appointment[];
  usertype: string;
}

const Event: React.FC<EventProps> = ({ appointments, usertype }) => {
  return (
    <div className='bg-white p-5 rounded-2xl dark:bg-gray-300 flex-1 flex flex-col gap-5'>
      <Title>{usertype === 'admin' ? 'My Activities' : 'Appointments'}</Title>

      {appointments.map((appointment) => (
        <Item key={appointment.id} event={appointment} />
      ))}
      
    </div>
  );
}

export default Event;
