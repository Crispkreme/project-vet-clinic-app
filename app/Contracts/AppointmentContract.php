<?php

namespace App\Contracts;

interface AppointmentContract {

    public function getAllAppointment();
    public function getAllAppointmentsByOwner($id);
    public function getActiveAppointmentsByOwner($id);
    public function createOrUpdateAppointment($data);
    public function getCountAllAppointmentsByOwner($id);
    public function getCountAllPendingAppointmentsByOwner($id);
    public function getCountAllAppointments();
    public function getCountAllPendingAppointments();
    public function updateAppointmentStatus($status, $id);
    public function getAllAppointmentsByDoctor($id);
}
