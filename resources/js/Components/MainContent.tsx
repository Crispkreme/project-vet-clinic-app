import React, { useState } from 'react';
import Stats from './Stats/Stats';
import PetComponent from './Pets/Pet';
import { usePage } from '@inertiajs/react';
import Event from './Events/Event';
import { MainContentProps } from "@/Interfaces";

const MainContent: React.FC<MainContentProps> = ({ pets, appointments, countAll, countCurrent }) => {
  
  const user = usePage().props.auth.user;
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className='flex-1 flex flex-col gap-5'>

      <Stats 
        darkMode={darkMode} 
        countAll={countAll} 
        countCurrent={countCurrent} 
        usertype={user.usertype}
      />

      <div className='flex flex-col gap-3 lg:flex-row'>
        <PetComponent 
          pets={pets} 
          usertype={user.usertype}
        />
        <Event 
          appointments={appointments} 
          usertype={user.usertype}
        />
      </div>
    </div>
  );
}

export default MainContent;
