<?php

namespace App\Http\Controllers;

use App\Contracts\AppointmentContract;
use App\Contracts\PetContract;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    protected $petContract;
    protected $appointmentContract;

    public function __construct(
        PetContract $petContract,
        AppointmentContract $appointmentContract,
    ) {
        $this->petContract = $petContract;
        $this->appointmentContract = $appointmentContract;
    }

    public function dashboard()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        $pets = $this->petContract->getAllPet();
        $appointments = $this->appointmentContract->getAllAppointment();
        $allAppointments = $this->appointmentContract->getCountAllAppointments();
        $pendingAppointments = $this->appointmentContract->getCountAllPendingAppointments();

        return Inertia::render('Admin/Dashboard', [
            'pets' => $pets,
            'appointments' => $appointments,
            'allAppointments' => $allAppointments,
            'pendingAppointments' => $pendingAppointments,
        ]);
    }
}
