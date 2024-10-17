<?php

namespace App\Contracts;

interface PetContract {

    public function getAllPet();
    public function getPetByOwner($id);
    public function createOrUpdatePet($data);
}
