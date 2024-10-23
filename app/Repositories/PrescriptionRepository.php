<?php

namespace App\Repositories;

use App\Models\Prescription;
use App\Contracts\PrescriptionContract;

class PrescriptionRepository implements PrescriptionContract
{

    protected $model;

    public function __construct(Prescription $model)
    {
        $this->model = $model;
    }

    public function getPrescriptionByDoctorId($id)
    {
        return $this->model
            ->where('user_id', $id)
            ->select('id', 'name', 'breed', 'birthday', 'weight', 'status', 'medical_history')
            ->get();
    }

    public function createOrUpdatePrescription($data)
    {
        return $this->model->updateOrCreate(
            [
                'id' => $data['id'] ?? null,
            ],
            [
                'vet_id' => $data['vet_id'],
                'pet_id' => $data['pet_id'],
                'diagnosis' => $data['diagnosis'],
                'treatment_plan' => $data['treatment_plan'],
                'prescribed_medication' => $data['prescribed_medication'],
            ]
        );
    }

    public function getAllOwnerByDoctorID($id)
    {
        return $this->model
            ->select('pets.name as pet_name', 'vets.name as owner_name', 'pets.breed', 'pets.birthday', 'pets.weight')
            ->join('pets', 'prescriptions.pet_id', '=', 'pets.id')
            ->join('users as vets', 'prescriptions.vet_id', '=', 'vets.id')
            ->where('prescriptions.vet_id', $id)
            ->groupBy('prescriptions.pet_id', 'pets.name', 'vets.name', 'pets.breed', 'pets.birthday', 'pets.weight')
            ->get();
    }
    
}
