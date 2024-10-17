import MainContent from '@/Components/MainContent';
import UserProfile from '@/Components/Profile/UserProfile';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';

interface Pet {
    id: number;
    name: string;
    breed: string;
    age: number;
    weight: number;
    status: string;
}

interface Appointment {
    id: number;
    vet_id: number | null;       
    pet_id: number | null; 
    title: string;
    appointment_date: string;  
    appointment_start: string;
    appointment_end: string;
    status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
    notes?: string | null;
}

interface DashboardProps {
    pets: Pet[]; 
    appointments: Appointment[]; 
    countAll: number;
    countCurrent: number;
}

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