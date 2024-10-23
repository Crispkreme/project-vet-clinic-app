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
import type { Appointment, AppointmentListProps } from "@/Interfaces";

const Appointment: React.FC<AppointmentListProps> = ({ appointments, doctors, pets }) => {
    
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

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
            <div className="container mx-auto max-w-full bg-white p-4 sm:p-6 md:p-8 rounded-2xl dark:bg-gray-600 dark:text-gray-400">
                <div className="mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                            <Title>{t('Your Pets')}</Title>
                            <MdOutlinePets className="text-2xl" />
                        </div>
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
                    </div>
                </div>
                <div className="mt-5">
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