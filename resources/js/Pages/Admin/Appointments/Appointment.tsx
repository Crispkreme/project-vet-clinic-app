import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FaRegTrashAlt, FaRegHospital } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import { GrFormView } from "react-icons/gr";
import AppointmentModal from './AppointmentModal';
import type { Appointment, AppointmentListProps } from '@/Interfaces';
import { useTranslation } from 'react-i18next';

const Appointment: React.FC<AppointmentListProps> = ({ appointments, user, doctors, pets }) => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [isViewing, setIsViewing] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdmitting, setIsAdmitting] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [appointmentList, setappointmentList] = useState<Appointment[]>(appointments);

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    
    const openCreateModal = (appointment: Appointment) => {
        setSelectedAppointment(null); 
        setIsEditing(true); 
        setIsViewing(false);
        setIsAdmitting(false);
        setShowModal(true);
        setIsCreating(true);
    };

    const openEditModal = (appointment: Appointment) => {
        setSelectedAppointment(appointment); 
        setIsEditing(true); 
        setIsViewing(false);
        setIsAdmitting(false);
        setShowModal(true);
    };

    const openAdmitModal = (appointment: Appointment) => {
        console.log("Opening Admit Modal:", appointment);
        setSelectedAppointment(appointment); 
        setIsEditing(false); 
        setIsViewing(false);
        setIsAdmitting(true);
        setShowModal(true);
    };

    const openViewModal = (appointment: Appointment) => {
        setSelectedAppointment(appointment); 
        setIsEditing(false); 
        setIsViewing(true);
        setIsAdmitting(false);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false); 
        setSelectedAppointment(null); 
        setIsEditing(false);
        setIsViewing(false);
        setIsAdmitting(false);
    };

    const handleDelete = (id: number) => {
        console.log(`Delete pet with id: ${id}`);
    };

    return (
        <AuthenticatedLayout>
            <div className="container bg-white p-6 rounded-2xl dark:bg-gray-600 dark:text-gray-400">
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
                            {appointmentList.map((appointment) => (
                                <tr key={`${appointment.id}-${appointment.title}`} className="border-b dark:border-gray-600">
                                    <td className="border px-4 py-2 text-sm">{appointment.vet_name}</td>
                                    <td className="border px-4 py-2 text-sm">{appointment.pet_name}</td>
                                    <td className="border px-4 py-2 text-sm">{appointment.title}</td>
                                    <td className="border px-4 py-2 text-sm max-h-24 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                        {appointment.notes}
                                    </td>
                                    <td className="border px-4 py-2 text-sm">{appointment.appointment_date}</td>
                                    <td className="border px-4 py-2 text-sm">
                                        {appointment.appointment_start} - {appointment.appointment_end}
                                    </td>
                                    <td className="border px-4 py-2 text-sm">{appointment.status}</td>
                                    <td className="border px-4 py-2 flex flex-col sm:flex-row gap-2">
                                        {appointment.status === 'In-Process' && (
                                            <button
                                                onClick={() => openAdmitModal(appointment)}
                                                className="bg-yellow-500 text-white px-2 py-1 rounded-md flex items-center text-xs"
                                            >
                                                <FaRegHospital className='mr-1' />
                                                <span className="text-xs">{t('Admit')}</span>
                                            </button>
                                        )}
                                        <button
                                            onClick={() => openEditModal(appointment)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded-md flex items-center text-xs"
                                        >
                                            <LuClipboardEdit className='mr-1' />
                                            <span className="text-xs">{t('Update')}</span>
                                        </button>
                                        <button
                                            onClick={() => openViewModal(appointment)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded-md flex items-center text-xs"
                                        >
                                            <GrFormView className='mr-1' />
                                            <span className="text-xs">{t('View')}</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(appointment.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded-md flex items-center text-xs"
                                        >
                                            <FaRegTrashAlt className='mr-1' />
                                            <span className="text-xs">{t('Delete')}</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
    
                {showModal && (
                    <AppointmentModal
                        showModal={showModal}
                        toggleModal={closeModal}
                        selectedAppointment={selectedAppointment}
                        isEditing={isEditing}
                        isAdmitting={isAdmitting}
                        isCreating={isCreating}
                        isViewing={isViewing}
                        doctors={doctors}
                        pets={pets}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    ); 
};

export default Appointment;