import { empolyeesData } from '@/constants'
import React from 'react'
import Card from './Card'
import Balance from './Balance';
import { AiOutlineAudit } from "react-icons/ai";
import { PiUsersThreeBold } from "react-icons/pi";

interface StatsProps {
  darkMode: boolean;
  countAll: number;
  countCurrent: number;
  usertype: string;
}

const Stats: React.FC<StatsProps> = ({ darkMode, countAll, countCurrent, usertype }) => {
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
