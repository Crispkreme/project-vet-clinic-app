<?php

namespace App\Http\Controllers;

use App\Contracts\AppointmentContract;
use App\Contracts\PetContract;
use App\Contracts\PrescriptionContract;
use App\Contracts\UserContract;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    protected $petContract;
    protected $appointmentContract;
    protected $userContract;
    protected $prescriptionContract;

    public function __construct(
        PetContract $petContract,
        UserContract $userContract,
        AppointmentContract $appointmentContract,
        PrescriptionContract $prescriptionContract,
    ) {
        $this->petContract = $petContract;
        $this->appointmentContract = $appointmentContract;
        $this->userContract = $userContract;
        $this->prescriptionContract = $prescriptionContract;
    }

    public function user()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        $userId = $user->id;
        $pets = $this->petContract->getPetByOwner($userId);
        $appointments = $this->appointmentContract->getActiveAppointmentsByOwner($userId);
        $allAppointments = $this->appointmentContract->getCountAllAppointmentsByOwner($userId);
        $pendingAppointments = $this->appointmentContract->getCountAllPendingAppointmentsByOwner($userId);

        return Inertia::render('User/Dashboard', [
            'pets' => $pets,
            'appointments' => $appointments,
            'allAppointments' => $allAppointments,
            'pendingAppointments' => $pendingAppointments,
        ]);
    }

    public function getDoctor()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        $doctors = $this->userContract->getAllDoctor();
        
        return Inertia::render('User/Doctors/Doctor', [
            'doctors' => $doctors,
        ]);
    }

    public function getClient()
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }

        $clients = $this->prescriptionContract->getAllOwnerByDoctorID($user->id);
        
        return Inertia::render('Admin/Clients/Client', [
            'clients' => $clients,
        ]);
    }
}
