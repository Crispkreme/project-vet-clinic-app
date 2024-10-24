import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InputMask from 'react-input-mask';
import { FormEventHandler } from 'react';

export default function Register() {
    const { props } = usePage();
    const { errors } = props;

    const { data, setData, post, processing } = useForm({
        usertype: '',
        name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('phone_number', e.target.value);
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={handleSubmit}>
                <div>
                    <InputLabel htmlFor="usertype" value="User_Type" />
                    <div className='flex'>
                        <label className='ml-1'>
                            <input 
                                type="radio"
                                name="usertype"
                                value="admin"
                                checked={data.usertype === 'admin'}
                                onChange={(e) => setData('usertype', e.target.value)}
                                required
                            />
                            Veterinarian
                        </label>
                        <label className='ml-5'>
                            <input 
                                type="radio"
                                name="usertype"
                                value="user"
                                checked={data.usertype === 'user'}
                                onChange={(e) => setData('usertype', e.target.value)}
                                required
                            />
                            PetOwner
                        </label>
                    </div>
                    <InputError message={errors.usertype} className="mt-2" />
                </div>
                <div className='mt-4'>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="phone_number" value="Phone Number" />
                    <InputMask
                        mask="+63 999 999 9999"
                        maskChar={null}
                        value={data.phone_number}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let value = e.target.value;
                            
                            if (value.startsWith('+63 0')) {
                                value = '+63 ' + value.substring(5);
                            }
                            if (!value.startsWith('+63 9')) {
                                value = '+63 9' + value.substring(5);
                            }

                            const cleanedValue = value.replace(/\s+/g, '');

                            const finalValue = cleanedValue.substring(0, 13);

                            setData('phone_number', finalValue);
                        }}
                    >
                        {(inputProps: React.ComponentPropsWithoutRef<'input'>) => (
                            <TextInput
                                {...inputProps}
                                id="phone_number"
                                name="phone_number"
                                className="mt-1 block w-full"
                                required
                            />
                        )}
                    </InputMask>
                    <InputError message={errors.phone_number} className="mt-2" />
                </div>


                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
