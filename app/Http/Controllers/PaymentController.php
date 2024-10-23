<?php

namespace App\Http\Controllers;

use App\Contracts\InvoiceContract;
use App\Mail\HelloPetMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PaymentController extends Controller
{
    protected $invoiceContract;

    public function __construct(
        InvoiceContract $invoiceContract,
    ) {
        $this->invoiceContract = $invoiceContract;
    }

    public function getPayment()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }
        
        $payments = $this->invoiceContract->getAllInvoice();

        return Inertia::render('Admin/Payments/Payment', [
            'payments' => $payments,
        ]);
    }

    public function getPaymentByUser()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }
        
        $payments = $this->invoiceContract->getInvoiceByOwner($user->id);
        
        return Inertia::render('User/Payments/Payment', [
            'payments' => $payments,
        ]);
    }

    public function emailTest()
    {
        $emailTo = "marvinramos.nutnull@gmail.com";
        $message = "Sample Message here";

        Mail::to($emailTo)->send(new HelloPetMail($emailTo, $message));
    }
}
