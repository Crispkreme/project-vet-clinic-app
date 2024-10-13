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

interface MainContentProps {
  pets: Pet[]; 
}

const MainContent: React.FC<MainContentProps> = ({ pets }) => {
  
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className='flex-1 flex flex-col gap-5'>
      <Stats darkMode={darkMode}/>

      <div className='flex flex-col gap-3 lg:flex-row'>
        <PetComponent pets={pets} />
        <Event />
      </div>
    </div>
  );
}

export default MainContent;
