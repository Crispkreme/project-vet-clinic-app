import { useEffect } from 'react';
import MainContent from '@/Components/MainContent';
import UserProfile from '@/Components/Profile/UserProfile';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DashboardProps } from "@/Interfaces";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const Dashboard: React.FC<DashboardProps> = ({ pets, appointments, allAppointments, pendingAppointments, flash }) => {

    useEffect(() => {
        if(flash.message.success) {
            toast.success(flash.message.success);
        }
        if(flash.message.error) {
            toast.error(flash.message.error);
        }
    }, [flash]);

    return (
        <AuthenticatedLayout>
            <ToastContainer />
            <MainContent 
                pets={pets} 
                appointments={appointments} 
                countAll={allAppointments} 
                countCurrent={pendingAppointments}
            />

            <UserProfile />
        </AuthenticatedLayout>
    );
}

export default Dashboard;