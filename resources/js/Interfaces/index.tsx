import { ReactNode } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    usertype: string;
    phone_number?: string | null;
}

export interface Pet {
    id: number;
    user_id?: number | null;
    name: string;
    breed?: string | null;
    age?: number | null;
    weight?: number | null;
    medical_history?: string | null;
    status?: 'Healthy' | 'Due for Vaccination' | 'Under Treatment' | 'Post-Surgery' | 'Needs Medication' | 'In Quarantine' | 'Emergency' | 'Adopted' | 'Lost' | 'Pending Vet Visit';
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

export interface Invoice {
    id: number;
    prescription_id: number;
    total_amount: number;
    user_name: string;
    pet_name: string;
    medical_status: 'Healthy' | 'Due for Vaccination' | 'Under Treatment' | 'Post-Surgery' | 'Needs Medication' | 'In Quarantine' | 'Emergency' | 'Adopted' | 'Lost' | 'Pending Vet Visit';
    status: 'Pending' | 'Paid' | 'Unpaid' | 'Failed';
}

export interface AppointmentListProps {
    appointments: Appointment[];
    user?: { id: number };
    doctors: any[];
    pets: any[];
}

export interface AppointmentModalProps {
    showModal: boolean;
    isViewing: boolean;
    isAdmitting: boolean;
    isCreating: boolean;
    isEditing: boolean;
    toggleModal: () => void;
    doctors: User[];
    pets: Pet[];
    selectedAppointment: any;
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
    doctors: User[];
    pets: Pet[];
}

export interface PetInfo {
    id: number;
    pet_name: string;
    owner_name: string;
    breed: string;
    age: number;
    weight: string;
}

export interface DoctorInfo {
    id: number;
    name: string;
    usertype: string;
    phone_number: string;
    email: string;
}

export interface AddPetProps {
    showModal: boolean;
    toggleModal: () => void;
    selectedPet: Pet | null;
    isEditing: boolean;
}

export interface PetListProps {
    pets: Pet[];
    user?: { id: number }; 
}

export interface DashboardProps {
    pets: Pet[]; 
    appointments: Appointment[]; 
    countAll: number;
    countCurrent: number;
}

export interface PaymentModalProps {
    showModal: boolean;
    toggleModal: () => void;
    selectedPayment?: Invoice;
}

export interface MainContentProps {
    pets: Pet[]; 
    appointments: Appointment[]; 
    countAll: number;
    countCurrent: number;
    usertype: string;
}

export interface StatsProps {
    darkMode: boolean;
    countAll: number;
    countCurrent: number;
    usertype: string;
}

export interface SidebarProps {
    isSidebarOpen: boolean;
}

export interface Badge {
    text: string;
    color: string;
    darkColor: string;
}
  
export interface LinkItemProps {
    href: string;
    icon: React.ElementType;
    text: string;
    badge?: Badge; 
}

export interface CardProps {
    countAll: number; 
    countCurrent: number; 
    title: string;
    icon: ReactNode;
}