import { users } from '@/constants'
import React from 'react'
import Member from './Member'

const Doctor = () => {
  return (
    <div className='bg-white p-3 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1 flex flex-col gap-5'>
      <h1>Doctors</h1>
        { users.map((user, index) => (
            <Member key={index} user={user} />
        ))}
    </div>
  )
}

export default Doctor
