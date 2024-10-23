import { usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import Header from '@/Components/Header/Header';
import Sidebar from '@/Components/Sidebar/Sidebar';

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
            <div className={`${darkMode ? "dark" : ""} font-sans`}>
                <Header 
                    toggleDarkMode={toggleDarkMode} 
                    darkMode={darkMode}
                    toogleSidebar={toogleSidebar}
                />
                <Sidebar isSidebarOpen={isSidebarOpen} />
    
                <main className={`text-gray-500 bg-gray-100 p-4 ${isSidebarOpen ? 'sm:ml-64' : 'ml-0'} flex flex-col lg:flex-row gap-4 translate-all duration-300 mt-14 dark:bg-gray-800`}>
                    {children}
                </main>
            </div>
        </>
    );
}
