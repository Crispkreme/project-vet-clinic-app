<?php

namespace App\Contracts;

interface PrescriptionContract {

    public function getPrescriptionByDoctorId($id);
    public function createOrUpdatePrescription($data);
    public function getAllOwnerByDoctorID($id);
}
