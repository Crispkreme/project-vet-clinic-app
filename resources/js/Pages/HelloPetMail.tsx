import { usePage } from '@inertiajs/react';

const HelloPetMail = () => {
    const { props } = usePage();
    const { message, user } = props;

    return (
        <div>
            <h1>{message}</h1>
            <p>Welcome, {user.name}!</p>
        </div>
    );
};

export default HelloPetMail;
