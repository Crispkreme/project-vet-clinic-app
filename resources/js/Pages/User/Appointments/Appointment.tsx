import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import Title from '@/Components/Title';
import interactionPlugin from '@fullcalendar/interaction';
import { MdOutlinePets } from "react-icons/md";
import AppointmentModal from './AppointmentModal';
import { LuCalendarDays } from "react-icons/lu";
import { useTranslation } from 'react-i18next';

interface Appointment {
    id: number;
    title: string;
    appointment_date: string; 
    appointment_start: string;
    appointment_end: string;  
    status: string;
}

interface AppointmentListProps {
    showModal: boolean;
    toggleModal: () => void;
    selectedAppointment: Appointment | null;
    doctors: any[];
    pets: any[]; 
    appointments: any[]; 
}

const Appointment: React.FC<AppointmentListProps> = ({ appointments, doctors, pets }) => {
    const { t } = useTranslation();

    
    const [showModal, setShowModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null); // Correct type

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const booking = appointments.map((appointment: Appointment) => ({
        title: appointment.title,
        start: `${appointment.appointment_date}T${appointment.appointment_start}`,
        end: `${appointment.appointment_date}T${appointment.appointment_end}`,    
    }));

    return (
        <AuthenticatedLayout>
            <div className="container bg-white p-6 rounded-2xl dark:bg-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-between mb-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                        onClick={() => {
                            setSelectedAppointment(null);
                            toggleModal();
                        }}
                    >
                        {t('Add Appointment')}
                        <span className="ml-2">
                            <LuCalendarDays />
                        </span>
                    </button>
                    <Title>
                        {t('Appointments')}
                        <span className="ml-4">
                            <MdOutlinePets />
                        </span>
                    </Title>
                </div>
                <div className='mt-2'></div>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={'dayGridMonth'}
                    headerToolbar={{
                        start: "today, prev, next",
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    events={booking}
                    selectable={false}
                />
            </div>

            {showModal && (
                <AppointmentModal
                    showModal={showModal}
                    toggleModal={toggleModal}
                    selectedAppointment={selectedAppointment}
                    doctors={doctors}
                    pets={pets}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default Appointment;
