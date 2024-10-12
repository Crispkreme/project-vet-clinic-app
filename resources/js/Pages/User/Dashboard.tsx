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

interface DashboardProps {
    pets: Pet[]; 
}

export default function Dashboard({ pets }: DashboardProps) {
    console.log(pets);

    return (
        <AuthenticatedLayout>
            <MainContent pets={pets}/>
            <UserProfile />
        </AuthenticatedLayout>
    );
}
