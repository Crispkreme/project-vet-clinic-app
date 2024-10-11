import MainContent from '@/Components/MainContent';
import UserProfile from '@/Components/UserProfile';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-5 mt-3">
                        <div className="flex flex-col gap-5 md:flex-row justify-between">
                            <div className="flex-1 md:w-8/12"> 
                                <MainContent />
                            </div>
                            <div className="flex-1 md:w-4/12">  
                                <UserProfile />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
