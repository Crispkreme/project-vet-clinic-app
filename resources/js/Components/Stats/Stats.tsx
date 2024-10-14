import { empolyeesData } from '@/constants'
import React from 'react'
import Card from './Card'
import Balance from './Balance';
import { AiOutlineAudit } from "react-icons/ai";

interface StatsProps {
  darkMode: boolean;
  allAppointments: number;
  pendingAppointment: number;
  usertype: string;
}

const Stats: React.FC<StatsProps> = ({ darkMode, allAppointments, pendingAppointment, usertype }) => {
  console.log(usertype);
  return (
    <div className='flex flex-col md:flex-row gap-5'>
      <div className='flex flex-col gap-4 h-full'>
        <Card 
          allAppointments={allAppointments} 
          pendingAppointment={pendingAppointment} 
          title={usertype === 'admin' ? 'Appointments' : 'Events'}
          icon={<AiOutlineAudit />}
        />
      </div>

      <Balance darkMode={darkMode} />

    </div>
  )
}

export default Stats
