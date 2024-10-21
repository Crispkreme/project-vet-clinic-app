<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contracts\PaypalContract;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PaypalController extends Controller
{
    protected $paypalContract;

    public function __construct(
        PaypalContract $paypalContract,
    ) {
        $this->paypalContract = $paypalContract;
    }

    public function payPaypal(Request $request)
    {
        $validated = $request->validate([
            'prescription_id' => 'nullable|exists:prescriptions,id',
            'total_amount' => 'required|numeric|min:0|max:999999.99',
            'status' => 'nullable|in:Pending,Paid,Unpaid,Failed',
            'medical_status' => 'nullable|in:Healthy,Due for Vaccination,Under Treatment,Post-Surgery,Needs Medication,In Quarantine,Emergency,Adopted,Lost,Pending Vet Visit',
        ]);
        
        $this->paypalContract->createPaypal($validated);        

    }
    
    public function paypalSuccess(Request $request)
    {   
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken(); 
        $response = $provider->capturePaymentOrder($request->token);
        dd($response);
    }

    public function paypalCancel()
    {

    }
}
