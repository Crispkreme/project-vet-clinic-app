<?php

namespace App\Repositories;

use App\Models\Appointment;
use App\Contracts\AppointmentContract;

class AppointmentRepository implements AppointmentContract
{

    protected $model;

    public function __construct(Appointment $model)
    {
        $this->model = $model;
    }

    public function getAllAppointment()
    {
        return $this->model->get();
    }

    public function getAllAppointmentsByOwner($ownerId)
    {
        return $this->model
            ->join('pets', 'appointments.pet_id', '=', 'pets.id') 
            ->where('pets.user_id', $ownerId)
            ->select(
                'appointments.*', 
                'pets.name as pet_name', 
                'pets.breed', 'pets.age', 
                'pets.weight', 
                'pets.status as pet_status'
            )
            ->get();
    }

    public function getActiveAppointmentsByOwner($ownerId)
    {
        return $this->model
            ->join('pets', 'appointments.pet_id', '=', 'pets.id') 
            ->where('pets.user_id', $ownerId)
            ->where('appointments.status', 'Pending')
            ->select(
                'appointments.*', 
                'pets.name as pet_name', 
                'pets.breed', 
                'pets.age', 
                'pets.weight', 
                'pets.status as pet_status'
            )
            ->get();
    }

    public function createOrUpdateAppointment($data)
    {
        return $this->model->updateOrCreate(
            [
                'id' => $data['id'] ?? null, 
            ],
            [
                'vet_id' => $data['vet_id'] ?? null, 
                'pet_id' => $data['pet_id'] ?? null, 
                'title' => $data['title'],
                'appointment_date' => $data['appointment_date'],
                'appointment_start' => $data['appointment_start'],
                'appointment_end' => $data['appointment_end'],
                'status' => $data['status'] ?? 'Pending',
                'notes' => $data['notes'] ?? null,
            ]
        );
    }

    public function getCountAllAppointmentsByOwner($ownerId)
    {
        return $this->model
            ->join('pets', 'appointments.pet_id', '=', 'pets.id')
            ->where('pets.user_id', $ownerId)
            ->count();
    }

    public function getCountAllAppointments()
    {
        return $this->model
            ->join('pets', 'appointments.pet_id', '=', 'pets.id')
            ->count();
    }

    public function getCountAllPendingAppointmentsByOwner($ownerId)
    {
        return $this->model
            ->join('pets', 'appointments.pet_id', '=', 'pets.id')
            ->where('pets.user_id', $ownerId)
            ->where('appointments.status', 'Pending')
            ->count();
    }

    public function getCountAllPendingAppointments()
    {
        return $this->model
            ->join('pets', 'appointments.pet_id', '=', 'pets.id')
            ->where('appointments.status', 'Pending')
            ->count();
    }

}
