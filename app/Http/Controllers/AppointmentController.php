<?php

namespace App\Http\Controllers;

use App\Contracts\AppointmentContract;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    protected $appointmentContract;

    public function __construct(
        AppointmentContract $appointmentContract,
    ) {
        $this->appointmentContract = $appointmentContract;
    }

    public function appointment() 
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        $userId = $user->id;
        $appointments = $this->appointmentContract->getAppointmentsByOwner($userId);

        return Inertia::render('User/Appointments/Appointment', [
            'appointments' => $appointments,
        ]);
    }
}
