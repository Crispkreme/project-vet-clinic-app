import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Title from '@/Components/Title';
import { MdOutlinePets } from 'react-icons/md';
import { FaRegTrashAlt } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import { GrFormView } from "react-icons/gr";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegHospital } from "react-icons/fa6";
import PrescriptionModal from './PrescriptionModal';

interface Prescription {
    id: number;
    vet_id: number | null;
    pet_id: number | null;
    title: string;
    pet_name: string;
    vet_name: string;
    appointment_date: string;
    appointment_start: string;
    appointment_end: string;
    status: 'In-Process' | 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
    notes?: string | null;
    created_at: string;
    updated_at: string;
}  

interface PrescriptionListProps {
  prescriptions: Prescription[];
    user?: { id: number }; 
    doctors: any[];
    pets: any[]; 
}

const Prescription: React.FC<PrescriptionListProps> = ({ prescriptions, user, doctors, pets }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    
    const openAdmitModal = (prescription: Prescription) => {
        console.log("Opening Admit Modal:", prescription);
        setSelectedPrescription(prescription); 
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false); 
        setSelectedPrescription(null); 
    };

    const handleDelete = (id: number) => {
        console.log(`Delete pet with id: ${id}`);
    };

    return (
        <AuthenticatedLayout>
            <div className="container bg-white p-6 rounded-2xl dark:bg-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-between mb-4">
                    <Title>
                        Admissions
                        <span className="ml-4">
                            <FaRegHospital />
                        </span>
                    </Title>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="px-4 py-2 text-left text-sm font-medium">Doctor Name</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Pet Name</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Subject</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Description</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Appointment Date</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Appointment Time</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                                <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prescriptions.map((appointment) => (
                                <tr key={`${appointment.id}-${appointment.title}`} className="border-b dark:border-gray-600">
                                    <td className="border px-4 py-2 text-sm">{appointment.vet_name}</td>
                                    <td className="border px-4 py-2 text-sm">{appointment.pet_name}</td>
                                    <td className="border px-4 py-2 text-sm">{appointment.title}</td>
                                    <td className="border px-4 py-2 text-sm max-h-24 overflow-hidden overflow-ellipsis whitespace-nowrap">{appointment.notes}</td>
                                    <td className="border px-4 py-2 text-sm">{appointment.appointment_date}</td>
                                    <td className="border px-4 py-2 text-sm">{appointment.appointment_start} - {appointment.appointment_end}</td>
                                    <td className="border px-4 py-2 text-sm">{appointment.status}</td>
                                    <td className="border px-4 py-2 flex flex-col sm:flex-row gap-2">
                                        {appointment.status === 'Pending' && (
                                            <button onClick={() => openAdmitModal(appointment)} className="bg-yellow-500 text-white px-2 py-1 rounded-md flex items-center text-xs">
                                                <FaRegHospital className='mr-1' /> 
                                                <span className="text-xs">Admit</span>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
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
