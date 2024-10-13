<?php

namespace App\Contracts;

interface AppointmentContract {

    public function getAllAppointment();
    public function getAppointmentsByOwner($id);
    public function createOrUpdateAppointment($data);
}
