import React from 'react';
import { getLinks } from '../../constants';
import LinkItem from './LinkItem';
import { usePage } from '@inertiajs/react';
import { SidebarProps } from "@/Interfaces";

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {

    const user = usePage().props.auth.user;
    const userType = user.usertype;
    const userId = user.id;
    const links = getLinks(userId, userType);

    return (
        <aside className={`fixed lg:relative top-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className='h-full px-3 pb-4 overflow-y-auto'>
                <ul className='space-y-2 font-medium'>
                    {links.map((link, index) => (
                        <LinkItem key={index} {...link} />
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar
