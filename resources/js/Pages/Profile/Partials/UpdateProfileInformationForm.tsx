import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AddProfileModal from '@/Pages/Profile/Partials/AddProfileModal';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { FormEventHandler, useState } from 'react';
import { FaUserPen } from "react-icons/fa6";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const { t } = useTranslation();
    const user = usePage().props.auth.user;
    const [modalOpen, setModalOpen] = useState(false);
    const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
        name: user.name,
        email: user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    
    return (
        <section className={className}>

            <div className="relative flex justify-center mt-5">
                <div className="absolute -top-36 w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <button className='absolute bottom-2 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600' title='Change Profile' onClick={() => setModalOpen(true)}>
                    <FaUserPen />
                </button>
                {modalOpen && <AddProfileModal closeModal={() => setModalOpen(false)} />}
            </div>

            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    {t('Profile Information')}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {t('Update your accounts profile information and email address')}.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value={t('Name')} />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value={t('Email')} />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            {t('Your email address is unverified')}.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {t('Click here to re-send the verification email')}.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                {t('A new verification link has been sent to your email address')}.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>{t('Save')}</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            {t('Saved')}.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
