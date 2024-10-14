import MainContent from '@/Components/MainContent';
import UserProfile from '@/Components/Profile/UserProfile';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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
    allAppointments: number;
    pendingAppointments: number;
}

export default function Dashboard({ pets, appointments, allAppointments, pendingAppointments }: DashboardProps) {
    console.log(appointments);

    return (
        <AuthenticatedLayout>
            <MainContent pets={pets} appointments={appointments} allAppointments={allAppointments} pendingAppointments={pendingAppointments}/>
            <UserProfile />
        </AuthenticatedLayout>
    );
}
