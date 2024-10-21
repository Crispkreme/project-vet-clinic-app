import MainContent from '@/Components/MainContent';
import UserProfile from '@/Components/Profile/UserProfile';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';
import { DashboardProps } from "@/Interfaces";

export default function Dashboard({ pets, appointments, countAll, countCurrent }: DashboardProps) {

    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout>

            <MainContent 
                pets={pets} 
                appointments={appointments} 
                countAll={countAll} 
                countCurrent={countCurrent}
                usertype={user.usertype}
            />
            <UserProfile />

        </AuthenticatedLayout>
    );
}