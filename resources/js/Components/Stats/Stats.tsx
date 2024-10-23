import React from 'react';
import Card from './Card';
import Balance from './Balance';
import { AiOutlineAudit } from "react-icons/ai";
import { StatsProps } from "@/Interfaces";
import { useTranslation } from "react-i18next";

const Stats: React.FC<StatsProps> = ({ darkMode, countAll, countCurrent, usertype }) => {
  const { t } = useTranslation();
  return (
    <div className='flex flex-col md:flex-row gap-5'>
      <div className='flex flex-col gap-4 h-full'>
        <Card 
          countAll={countAll} 
          countCurrent={countCurrent} 
          title={usertype === 'admin' ? 'Appointments' : 'Events'}
          icon={<AiOutlineAudit />}
        />
        <Card 
          countAll={countAll} 
          countCurrent={countCurrent} 
          title={usertype === 'admin' ? 'Accounts' : 'Events'}
          icon={<AiOutlineAudit />}
        />
        <Card 
          countAll={countAll} 
          countCurrent={countCurrent} 
          title={usertype === 'admin' ? 'Patients' : 'Events'}
          icon={<AiOutlineAudit />}
        />
      </div>

      <Balance darkMode={darkMode} />

    </div>
  )
}

export default Stats
