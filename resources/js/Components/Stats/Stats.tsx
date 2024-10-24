import React from 'react';
import Card from './Card';
import Balance from './Balance';
import { AiOutlineAudit } from "react-icons/ai";
import { StatsProps } from "@/Interfaces";
import { useTranslation } from "react-i18next";
import { TbCalendarSearch } from "react-icons/tb";
import { MdOutlinePets } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { LuBellRing } from "react-icons/lu";

const Stats: React.FC<StatsProps> = ({ darkMode, countAll, countCurrent, usertype }) => {
  const { t } = useTranslation();
  return (
    <div className='flex flex-col md:flex-row gap-5'>
      <div className='flex flex-col gap-4 h-full'>
        <Card 
          countAll={countAll} 
          countCurrent={countCurrent} 
          title={usertype === 'admin' ? 'Appointments' : 'Appointments'}
          icon={<TbCalendarSearch />}
        />
        <Card 
          countAll={countAll} 
          countCurrent={countCurrent} 
          title={usertype === 'admin' ? 'Accounts' : 'Pets'}
          icon={usertype === 'admin' ? <AiOutlineAudit /> : <MdOutlinePets />}
        />
        <Card 
          countAll={countAll} 
          countCurrent={countCurrent} 
          title={usertype === 'admin' ? 'Patients' : 'Reminders'}
          icon={usertype === 'admin' ? <FiFileText /> : <LuBellRing />}
        />
      </div>

      <Balance darkMode={darkMode} />

    </div>
  )
}

export default Stats
