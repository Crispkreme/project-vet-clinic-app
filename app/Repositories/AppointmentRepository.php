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
        return $this->model
            ->join('pets', 'appointments.pet_id', '=', 'pets.id')
            ->join('users', 'appointments.vet_id', '=', 'users.id')
            ->select(
                'appointments.*',
                'pets.name as pet_name',
                'users.name as vet_name'
            )
            ->get();
    }

    public function getAllAppointmentsByOwner($ownerId)
    {
        return $this->model
            ->join('pets', 'appointments.pet_id', '=', 'pets.id')
            ->where('pets.user_id', $ownerId)
            ->select(
                'appointments.*',
                'pets.name as pet_name',
                'pets.breed',
                'pets.birthday',
>>>>>>>>> Temporary merge branch 2
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
                'pets.birthday',
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

    public function getAllAppointmentsByDoctor($doctorId)
    {
        return $this->model
            ->join('users', 'appointments.vet_id', '=', 'users.id')
            ->where('appointments.vet_id', $doctorId)
            ->where('appointments.status', 'Pending')
            ->get();
    }

    public function getCountAllPendingAppointments()
    {
        return $this->model
            ->join('pets', 'appointments.pet_id', '=', 'pets.id')
            ->where('appointments.status', 'Pending')
            ->count();
    }

    public function updateAppointmentStatus($status, $id)
    {
        $appointment = $this->model->findOrFail($id);
        return $appointment->update(['status' => $status]);
    }

    public function getAppointmentStatus($status)
    {
        return $this->model
            ->join('pets', 'appointments.pet_id', '=', 'pets.id')
            ->join('users', 'appointments.vet_id', '=', 'users.id')
            ->select(
                'appointments.*',
                'pets.name as pet_name',
                'users.name as vet_name'
            )
            ->where('appointments.status', $status)
            ->get();
    }
}
