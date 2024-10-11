import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {


    return (
        <AuthenticatedLayout>
            <h1>Dashboard</h1>
        </AuthenticatedLayout>
    );
}
