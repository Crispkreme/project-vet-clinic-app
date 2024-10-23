import MainContent from '@/Components/MainContent';
import UserProfile from '@/Components/Profile/UserProfile';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DashboardProps } from "@/Interfaces";

export default function Dashboard({ pets, appointments, allAppointments, pendingAppointments }: DashboardProps) {

    return (
        <AuthenticatedLayout>
            <MainContent 
                pets={pets} 
                appointments={appointments} 
                allAppointments={allAppointments} 
                pendingAppointments={pendingAppointments}
            />
            <UserProfile />
        </AuthenticatedLayout>
    );
}
