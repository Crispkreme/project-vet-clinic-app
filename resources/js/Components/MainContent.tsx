import React, { useState } from 'react';
import Stats from './Stats/Stats';
import PetComponent from './Pets/Pet';
import Event from './Events/Event';
import { MainContentProps } from "@/Interfaces";

const MainContent: React.FC<MainContentProps> = ({ pets, appointments, countAll, countCurrent, usertype }) => {
  
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className='flex-1 flex flex-col gap-5'>

      <Stats 
        darkMode={darkMode} 
        countAll={countAll} 
        countCurrent={countCurrent} 
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
