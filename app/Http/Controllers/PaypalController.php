<?php

namespace App\Http\Controllers;

use App\Contracts\InvoiceContract;
use App\Contracts\PaypalContract;
use App\Contracts\ReceiptContract;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PaypalController extends Controller
{
    protected $paypalContract;
    protected $receiptContract;
    protected $invoiceContract;

    public function __construct(
        PaypalContract $paypalContract,
        ReceiptContract $receiptContract,
        InvoiceContract $invoiceContract,
    ) {
        $this->paypalContract = $paypalContract;
        $this->invoiceContract = $invoiceContract;
        $this->receiptContract = $receiptContract;
    }

    public function payPaypal(Request $request)
    {
        $validated = $request->validate([
            'prescription_id' => 'nullable|exists:prescriptions,id',
            'total_amount' => 'required|numeric|min:0|max:999999.99',
            'status' => 'nullable|in:Pending,Paid,Unpaid,Failed',
            'medical_status' => 'nullable|in:Healthy,Due for Vaccination,Under Treatment,Post-Surgery,Needs Medication,In Quarantine,Emergency,Adopted,Lost,Pending Vet Visit',
        ]);
        
        $response = $this->paypalContract->createPaypal($validated);        

        if (isset($response['id']) && !empty($response['id'])) {
            foreach ($response['links'] as $link) {
                if (isset($link['rel']) && strtolower($link['rel']) === 'approve') {
                    session()->put('prescription_id', $validated['prescription_id']);
                    session()->put('total_amount', $validated['total_amount']);
                    return Inertia::location($link['href']);
                }
            }
        } else {
            return redirect()->route('user.paypal.cancel');
        }
    }
    
    public function paypalSuccess(Request $request)
    {   
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken(); 
        $response = $provider->capturePaymentOrder($request->token);
        
        if (isset($response['status']) && !empty($response['status'])) {
            
            DB::beginTransaction();

            try {

                $invoice_no = 'INV-' . strtoupper(uniqid()) . '-' . rand(1000, 9999);
                $data = [
                    'invoice_no' => $invoice_no, 
                    'transaction_no' => $response['id'],
                    'prescription_id' => session()->get('prescription_id'),
                    'payment_method' => 'Paypal',
                    'amount_paid' => session()->get('total_amount'),
                    'status' => 'Paid',
                ];

                $this->receiptContract->createOrUpdateReceipt($data);

                $id = $data['prescription_id'];
                $status = $data['status'];

                $this->invoiceContract->updateInvoiceStatus($id, $status);
                
                DB::commit();

                if ($request->wantsJson()) {
                    return response()->json(['success' => true]);
                }

                Session::flash('success', 'Payment successfully created!');
                return redirect()->back();

            } catch (Exception $e) {
                
                Log::error('Error during paypalSuccess: ' . $e->getMessage(), [
                    'exception' => $e,
                    'trace' => $e->getTraceAsString(),
                ]);

                DB::rollBack();

                Session::flash('error', 'An error occurred during appointment saving.');
                return redirect()->back();
            }
        }
    }

    public function paypalCancel()
    {

    }
}
