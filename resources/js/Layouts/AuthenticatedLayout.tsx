import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';

export default function Authenticated({
    header,
    children
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const toogleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <>
        
            <div className={`${darkMode && "dark"} font-sans`}>
                <Header 
                    toggleDarkMode={toggleDarkMode} 
                    darkMode={darkMode}
                    toogleSidebar={toogleSidebar}
                />

                <div className="flex">
                    <Sidebar isSidebarOpen={isSidebarOpen} />
                    <main className="flex-1 min-h-screen bg-gray-100 p-4">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
