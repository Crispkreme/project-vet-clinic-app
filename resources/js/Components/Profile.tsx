import React from 'react';
import { Link, usePage } from '@inertiajs/react';
const user01 = `${window.location.origin}/assets/user01.png`;

const Profile = () => {
  const user = usePage().props.auth.user;

  return (
    <div className='flex gap-3 items-center bg-white p-4 rounded-full dark:bg-gray-600 dark:text-gray-300'>
      <img src={user01} alt="profile" className='w-14 h-14 rounded-full' />
      <div>
        <h3 className='font-semibold text-2xl'>{user.name}</h3>
        <p>{user.usertype}</p>
      </div>
    </div>
  )
}

export default Profile
