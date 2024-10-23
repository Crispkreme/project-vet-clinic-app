import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Title from '@/Components/Title';
import { FaRegHospital } from "react-icons/fa6";
import PrescriptionModal from './PrescriptionModal';
import type { AppointmentListProps, Appointment } from '@/Interfaces';
import { useTranslation } from 'react-i18next';

const Prescription = ({ appointments, doctors, pets }: AppointmentListProps) => {
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation();
    const [selectedPrescription, setSelectedPrescription] = useState<Appointment | null>(null);

    const toggleModal = () => {
        setShowModal((prev) => !prev);
    };
    
    const openAdmitModal = (appointments: Appointment) => {
        setSelectedPrescription(appointments); 
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false); 
        setSelectedPrescription(null); 
    };

    const handleDelete = (id: number) => {
        console.log(`Delete prescription with id: ${id}`);
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto bg-white p-4 sm:p-6 rounded-2xl dark:bg-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-between mb-4">
                    <Title>
                        {t('Admission')}
                        <span className="ml-4">
                            <FaRegHospital />
                        </span>
                    </Title>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="px-4 py-2 text-left text-sm font-medium">{t('Doctor Name')}</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">{t('Pet Name')}</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">{t('Subject')}</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">{t('Description')}</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">{t('Appointment Date')}</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">{t('Appointment Time')}</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">{t('Status')}</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">{t('Actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <tr key={appointment.id} className="border-b dark:border-gray-600">
                                        <td className="border px-4 py-2 text-sm">{appointment.vet_name}</td>
                                        <td className="border px-4 py-2 text-sm">{appointment.pet_name}</td>
                                        <td className="border px-4 py-2 text-sm">{appointment.title}</td>
                                        <td className="border px-4 py-2 text-sm max-h-24 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                            {appointment.notes}
                                        </td>
                                        <td className="border px-4 py-2 text-sm">{appointment.appointment_date}</td>
                                        <td className="border px-4 py-2 text-sm">
                                            {`${appointment.appointment_start} - ${appointment.appointment_end}`}
                                        </td>
                                        <td className="border px-4 py-2 text-sm">{appointment.status}</td>
                                        <td className="border px-4 py-2 flex flex-col sm:flex-row gap-2">
                                            {appointment.status === 'Pending' && (
                                                <button
                                                    onClick={() => openAdmitModal(appointment)}
                                                    className="bg-yellow-500 text-white px-2 py-1 rounded-md flex items-center text-xs"
                                                >
                                                    <FaRegHospital className='mr-1' />
                                                    <span className="text-xs">{t('Admit')}</span>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="text-center text-gray-500">{t('No prescriptions available')}.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
    
            {showModal && (
                <PrescriptionModal
                    showModal={showModal}
                    toggleModal={closeModal}
                    selectedPrescription={selectedPrescription}
                    doctors={doctors}
                    pets={pets}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default Prescription;
