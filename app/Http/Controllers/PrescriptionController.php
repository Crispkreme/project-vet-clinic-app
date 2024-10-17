<?php

namespace App\Http\Controllers;

use App\Contracts\AppointmentContract;
use App\Contracts\InvoiceContract;
use App\Contracts\PrescriptionContract;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class PrescriptionController extends Controller
{
    protected $appointmentContract;
    protected $prescriptionContract;
    protected $invoiceContract;

    public function __construct(
        AppointmentContract $appointmentContract,
        PrescriptionContract $prescriptionContract,
        InvoiceContract $invoiceContract,
    ) {
        $this->appointmentContract = $appointmentContract;
        $this->prescriptionContract = $prescriptionContract;
        $this->invoiceContract = $invoiceContract;
    }

    public function prescription()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }
        
        $status = 'Pending';
        $prescriptions = $this->appointmentContract->getAppointmentStatus($status);

        return Inertia::render('Admin/Prescriptions/Prescription', [
            'prescriptions' => $prescriptions,
        ]);
    }

    public function createOrUpdatePrescription(Request $request, $id)
    {
        DB::beginTransaction();

        try {

            $status = "Confirmed";
            $this->appointmentContract->updateAppointmentStatus($status, $id);

            $validatedPrescription = $request->validate([
                'vet_id' => 'nullable|exists:users,id', 
                'pet_id' => 'nullable|exists:pets,id',
                'diagnosis' => 'required|string|max:65535',
                'treatment_plan' => 'required|string|max:65535',
                'prescribed_medication' => 'required|string|max:65535',
            ]);

            $prescriptions = $this->prescriptionContract->createOrUpdatePrescription($validatedPrescription);

            $invoiceData = [
                'prescription_id' => $prescriptions->id, 
                'total_amount' => $request->total_amount ?? 100, 
                'status' => $request->status ?? 'Pending',
            ];
     
            $this->invoiceContract->createOrUpdateInvoice($invoiceData);
   
            DB::commit();

            Session::flash('success', 'Pet saved successfully!');
            return response()->json(['success' => true]);

        } catch (Exception $e) {
            Log::error('Error during createOrUpdatePrescription: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
            ]);

            DB::rollback();

            Session::flash('error', 'An error occurred during createOrUpdatePrescription.');
            return response()->json(['error' => true]);
        }
    }
}
