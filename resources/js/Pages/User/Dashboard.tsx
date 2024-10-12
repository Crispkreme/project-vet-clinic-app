import MainContent from '@/Components/MainContent';
import UserProfile from '@/Components/Profile/UserProfile';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>

            <MainContent />
            <UserProfile />

        </AuthenticatedLayout>
    );
}
