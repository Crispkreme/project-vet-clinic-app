export interface User {
    id: number;
    name: string;
    usertype: string;
    email: string;
    phone_number: string;
}

export interface UserProps {
    doctors: User[];
}

export interface Appointment {
    id: number;
    vet_id: number | null;
    pet_id: number | null;
    title: string;
    pet_name: string;
    vet_name: string;
    appointment_date: string;
    appointment_start: string;
    appointment_end: string;
    status: "In-Process" | "Pending" | "Confirmed" | "Cancelled" | "Completed";
    notes?: string | null;
    created_at: string;
    updated_at: string;
}

export interface AppointmentListProps {
    appointments: Appointment[];
    user?: { id: number };
    doctors: any[];
    pets: any[];
}

export interface Doctor {
    id: number;
    name: string;
}

export interface Pet {
    id: number;
    name: string;
}

export interface Prescription {
    id?: number;
    vet_id?: number;
    pet_id?: number;
    diagnosis?: string;
    treatment_plan?: string;
    prescribed_medication?: string;
}

export interface PrescriptionModalProps {
    showModal: boolean;
    toggleModal: () => void;
    selectedPrescription?: Prescription;
    doctors: Doctor[];
    pets: Pet[];
}
