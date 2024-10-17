import React from 'react'
import Profile from './Profile'
import DonutChart from './DonutChart'
import Shortcut from './Shortcut';
import { PropsWithChildren, ReactNode, useState } from 'react';

const UserProfile = () => {

  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <div className='px-2 py-4 mt-2 bg-gray-200 rounded-lg w-full dark:bg-gray-700 lg:w-60 xl:w-80 flex flex-col justify-between gap-4'>
      <Profile />
      <Shortcut />
      <DonutChart darkMode={darkMode}/>
    </div>
  )
}

export default UserProfile