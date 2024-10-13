<?php

namespace App\Repositories;

use App\Models\Pet;
use App\Contracts\PetContract;

class PetRepository implements PetContract
{

    protected $model;

    public function __construct(Pet $model)
    {
        $this->model = $model;
    }

    public function getAllPet()
    {
        return $this->model->get();
    }

    public function getPetByOwner($id)
    {
        return $this->model
            ->where('user_id', $id)
            ->select('name', 'breed', 'age', 'weight', 'status')
            ->get();
    }

    public function createOrUpdatePet($data)
    {
        return $this->model->updateOrCreate(
            [
                'user_id' => $data['user_id'],
                'name' => $data['name'],
            ],
            [
                'breed' => $data['breed'],
                'age' => $data['age'],
                'weight' => $data['weight'],
                'medical_history' => $data['medical_history'],
                'status' => $data['status'],
            ]
        );
    }
}
