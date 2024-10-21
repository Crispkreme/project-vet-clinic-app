<?php

namespace App\Repositories;

use App\Contracts\PaypalContract;
use App\Models\Invoice;
use Exception;
use Illuminate\Support\Facades\Log;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PaypalRepository implements PaypalContract
{

    protected $model;

    public function __construct(Invoice $model)
    {
        $this->model = $model;
    }

    // public function createPaypal($data)
    // {
    //     try {

    //         $provider = new PayPalClient;
    //         $provider->setApiCredentials(config('paypal'));
    //         $provider->getAccessToken();       
    //         $response = $provider->createOrder([
    //             "intent" => "CAPTURE",
    //             "application_context" => [
    //                 "return_url" => route('user.paypal.success'),
    //                 "cancel_url" => route('user.paypal.cancel'),
    //             ],
    //             "purchase_units" => [
    //                 [
    //                     "amount" => [
    //                         "currency_code" => "USD",
    //                         "value" => $data['total_amount'],
    //                     ]
    //                 ]
    //             ]
    //         ]);

    //         if (isset($response['id']) && !empty($response['id'])) {
    //             foreach ($response['links'] as $link) {
    //                 if (isset($link['rel']) && strtolower($link['rel']) === 'approve') {
    //                     session()->put('product_name', $data['medical_status']);
    //                     session()->put('quantity', 1);
    //                     return redirect()->away($link['href']);
    //                 }
    //             }
    //         } else {
    //             return redirect()->route('user.paypal.cancel');
    //         }

    //     } catch (Exception $e) {

    //         Log::error('Error creating PayPal order', ['error' => $e->getMessage()]);
    //         return redirect()->route('user.paypal.cancel')->withErrors('Error: Unable to create PayPal order.');

    //     }
        
    // }
    public function createPaypal($data)
{
    try {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();       
        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('user.paypal.success'),
                "cancel_url" => route('user.paypal.cancel'),
            ],
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => $data['total_amount'],
                    ]
                ]
            ]
        ]);

        if (isset($response['id']) && !empty($response['id'])) {
            foreach ($response['links'] as $link) {
                if (isset($link['rel']) && strtolower($link['rel']) === 'approve') {
                    return response()->json(['redirect_url' => $link['href']]);
                }
            }
        } else {
            return response()->json(['error' => 'Order creation failed.'], 400);
        }

    } catch (Exception $e) {
        return response()->json(['error' => 'Something went wrong.'], 500);
    }
}

}
