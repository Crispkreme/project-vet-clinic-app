<?php

namespace App\Http\Controllers;

use App\Contracts\AppointmentContract;
use App\Contracts\PetContract;
use App\Contracts\UserContract;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    protected $appointmentContract;
    protected $userContract;
    protected $petContract;

    public function __construct(
        AppointmentContract $appointmentContract,
        UserContract $userContract,
        PetContract $petContract
    ) {
        $this->appointmentContract = $appointmentContract;
        $this->userContract = $userContract;
        $this->petContract = $petContract;
    }

    public function ownerCalendar() 
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        $userId = $user->id;
        $appointments = $this->appointmentContract->getAllAppointmentsByOwner($userId);
        $doctors = $this->userContract->getAllDoctor();
        $pets = $this->petContract->getPetByOwner($userId);

        return Inertia::render('User/Appointments/Appointment', [
            'appointments' => $appointments,
            'doctors' => $doctors,
            'pets' => $pets,
        ]);
    }

    public function storeAppointment(Request $request, $id = null)
    {
        DB::beginTransaction();

        try {
            $validated = $request->validate([
                'vet_id' => 'nullable|exists:users,id',
                'pet_id' => 'nullable|exists:pets,id',
                'title' => 'required|string|max:255',
                'appointment_date' => 'required|date',
                'appointment_start' => 'required|date_format:H:i', 
                'appointment_end' => 'required|date_format:H:i|after:appointment_start', 
                'status' => 'nullable|in:In-Process,Pending,Confirmed,Cancelled,Completed',
                'notes' => 'nullable|string',
            ]);

            if ($id) {
                $validated['id'] = $id;
            }

            $this->appointmentContract->createOrUpdateAppointment($validated);

            DB::commit();

            if ($request->wantsJson()) {
                return response()->json(['success' => true]);
            }

            Session::flash('success', 'Appointment saved successfully!');
            return redirect()->back();

        } catch (Exception $e) {
            Log::error('Error during storeAppointment: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
            ]);

            DB::rollBack();

            if ($request->wantsJson()) {
                return response()->json(['error' => true, 'message' => 'An error occurred during appointment saving.'], 500);
            }

            Session::flash('error', 'An error occurred during appointment saving.');
            return redirect()->back();
        }
    }

    public function appointmentList()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        $appointments = $this->appointmentContract->getAllAppointment();

        return Inertia::render('Admin/Appointments/Appointment', [
            'appointments' => $appointments,
        ]);
    }

    public function admitAppointment(Request $request, $id)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        DB::beginTransaction();

        try {

            $status = "Pending";
            $this->appointmentContract->updateAppointmentStatus($status, $id);

            DB::commit();

            if ($request->wantsJson()) {
                return response()->json(['success' => true]);
            }

            Session::flash('success', 'Appointment admitted successfully!');
            return redirect()->back();

        } catch (Exception $e) {
            Log::error('Error during admitAppointment: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
            ]);

            DB::rollBack();

            if ($request->wantsJson()) {
                return response()->json(['error' => true], 500);
            }

            Session::flash('error', 'An error occurred during appointment admitting.');
            return redirect()->back();
        }
    }

    public function appointmentCalendar()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        $userId = $user->id;
        $appointments = $this->appointmentContract->getAllAppointmentsByDoctor($userId);

        return Inertia::render('Admin/Appointments/CalendarAppointment', [
            'appointments' => $appointments,
        ]);
    }
}
