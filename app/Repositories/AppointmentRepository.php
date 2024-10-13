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

    public function getAppointmentsByOwner($ownerId)
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


    public function createOrUpdateAppointment($data)
    {
        return $this->model->updateOrCreate(
            [
                'pet_id' => $data['pet_id'],
                'appointment_date' => $data['appointment_date'],
            ],
            [
                'vet_id' => $data['vet_id'],
                'status' => $data['status'],
                'notes' => $data['notes'] ?? null,
            ]
        );
    }

}
