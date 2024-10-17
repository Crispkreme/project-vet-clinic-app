import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import Title from '@/Components/Title';
import interactionPlugin from '@fullcalendar/interaction';
import { MdOutlinePets } from "react-icons/md";

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
    appointments: any[]; 
}

const CalendarAppointment: React.FC<AppointmentListProps> = ({ appointments }) => {
    console.log(appointments);
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
            <div className="container bg-white p-6 rounded-2xl dark:bg-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-between mb-4">
                    <Title>
                        Appointments
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
        </AuthenticatedLayout>
    );
};

export default CalendarAppointment;
