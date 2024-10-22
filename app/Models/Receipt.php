<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_no',
        'transaction_no',
        'prescription_id',
        'payment_method',
        'amount_paid',
        'status',
    ];

    public function prescription()
    {
        return $this->belongsTo(Prescription::class);
    }
}
