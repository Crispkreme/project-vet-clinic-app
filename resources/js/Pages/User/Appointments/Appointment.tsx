import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import Title from '@/Components/Title';
import interactionPlugin from '@fullcalendar/interaction';
import { MdOutlinePets } from "react-icons/md";
import AppointmentModal from './AppointmentModal';
import { BsCalendar2Range } from "react-icons/bs";

interface Appointment {
    id: number;
    name: string;
    breed: string;
    age: number;
    weight: number;
    status: string;
}

interface AppointmentListProps {
    appointments: Appointment[];
}

const Appointment: React.FC<AppointmentListProps> = ({ appointments }) => {
    // State management inside the component
    const [showModal, setShowModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const booking = [
        {
            title: 'Pet Appointment',
            start: '2024-10-15',
            end: '2024-10-15',
        },
        {
            title: 'Vaccination',
            start: '2024-10-20',
            end: '2024-10-20',
        },
    ];

    return (
        <AuthenticatedLayout>
            <div className="container bg-white p-6 rounded-2xl dark:bg-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-between mb-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                        onClick={() => {
                            setSelectedAppointment(null);
                            setIsEditing(false);
                            toggleModal();
                        }}
                    >
                        Add Appointment{" "}
                        <span>
                            <BsCalendar2Range />
                        </span>
                    </button>
                    <Title>
                        Appointments{" "}
                        <span className="flex justify-end">
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
                    selectable={true}
                    selectHelper={true}
                    select={(info) => {
                        console.log('Selected from', info.startStr, 'to', info.endStr);
                    }}
                />
            </div>

            {/* Conditionally render the modal */}
            {showModal && (
                <AppointmentModal
                    showModal={showModal}
                    toggleModal={toggleModal}
                    selectedAppointment={selectedAppointment}
                    isEditing={isEditing}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default Appointment;
