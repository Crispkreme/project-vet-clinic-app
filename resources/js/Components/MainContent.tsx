import React, { useState } from 'react';
import Stats from './Stats/Stats';
import Doctor from './Doctors/Doctor';
import PetComponent from './Pets/Pet';
import Event from './Events/Event';

interface Pet { 
  id: number;
  name: string;
  breed: string;
  status: string;
}

interface Appointment {
  id: number;
  vet_id: number | null;       
  pet_id: number | null; 
  title: string;
  appointment_date: string;  
  appointment_start: string;
  appointment_end: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  notes?: string | null;
}

interface MainContentProps {
  pets: Pet[]; 
  appointments: Appointment[]; 
  allAppointments: number;
  pendingAppointments: number;
  usertype: string;
}

const MainContent: React.FC<MainContentProps> = ({ pets, appointments, allAppointments, pendingAppointments, usertype }) => {
  
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className='flex-1 flex flex-col gap-5'>

      <Stats 
        darkMode={darkMode} 
        allAppointments={allAppointments} 
        pendingAppointment={pendingAppointments} 
        usertype={usertype}
      />

      <div className='flex flex-col gap-3 lg:flex-row'>
        <PetComponent 
          pets={pets} 
          usertype={usertype}
        />
        <Event 
          appointments={appointments} 
          usertype={usertype}
        />
      </div>
    </div>
  );
}

export default MainContent;
