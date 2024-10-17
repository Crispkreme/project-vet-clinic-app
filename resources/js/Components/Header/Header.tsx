import React, { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { MdSpaceDashboard } from 'react-icons/md';
import { usePage } from '@inertiajs/react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  toogleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, toogleSidebar }) => {
  const user = usePage().props.auth.user;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
      <div className='px-3 py-3 lg:px-5 lg:pl-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start rtl:justify-end'>
            <button
              className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              onClick={toogleSidebar}
            >
              <HiOutlineMenuAlt2 className='text-2xl' />
            </button>
            <a href="#" className='flex ms-2 md:me-24'>
              <MdSpaceDashboard className='h-8 me-3 text-xl text-violet-500' />
              <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
                HelloPets
              </span>
            </a>
          </div>
          <div className='flex items-center'>
            <button
              className='dark:bg-slate-50 dark:text-slate-700 rounded-full p-2 me-4'
              onClick={toggleDarkMode}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <div className='relative'>
              <button
                onClick={toggleDropdown}
                className='flex items-center focus:outline-none'
              >
                <span className='text-gray-800 dark:text-white me-2'>{user.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                  <div className="px-4 py-2">
                    <div className="text-base font-medium text-gray-800 dark:text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {user.email}
                    </div>
                  </div>

                  <div className="mt-3 space-y-1">
                    <ResponsiveNavLink href={route('profile.edit')}>
                      Profile
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                      method="post"
                      href={route('logout')}
                      as="button"
                    >
                      Log Out
                    </ResponsiveNavLink>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
