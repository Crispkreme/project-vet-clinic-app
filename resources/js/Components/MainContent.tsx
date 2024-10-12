import React, {useState} from 'react'
import Stats from './Stats/Stats'
import Doctor from './Doctors/Doctor';
import Event from './Events/Event';

const MainContent = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className='flex-1 flex flex-col gap-5'>
      
      <Stats darkMode={darkMode}/>

      <div className='flex flex-col gap-3 lg:flex-row'>
        <Doctor />
        <Event />
      </div>

    </div>
  )
}

export default MainContent