<?php

namespace App\Http\Controllers;

use App\Contracts\AppointmentContract;
use App\Contracts\PetContract;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
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
}
