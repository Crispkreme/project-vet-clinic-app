import React from 'react';
import BarChart from './BarChart';
import Title from '../Title';
import { useTranslation } from 'react-i18next';
import { MdOutlinePets } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";

interface BalanceProps {
  darkMode: boolean;
}

const Balance: React.FC<BalanceProps> = ({ darkMode }) => {
  const { t } = useTranslation();

  return (
    <div className='bg-white p-5 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1'>
      <div className='flex justify-between items-center'>
        <Title>{t('Appointments')}</Title>
        <LuCalendarDays className='bg-gray-500 p-2 rounded-full text-gray-300 w-8 h-8 ml-2'/>
      </div>
      <div>
        <h1 className="font-bold text-2xl inline-flex items-center">
          Pets <span className="font-medium text-xl ml-2 inline-flex items-center"><MdOutlinePets /></span>
        </h1>
        <span className="block mt-2">on October 10, 2024</span>
      </div>
      <BarChart darkMode={darkMode} />
    </div>
  )
}

export default Balance