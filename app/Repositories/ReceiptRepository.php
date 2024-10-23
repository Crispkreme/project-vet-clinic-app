<?php

namespace App\Repositories;

use App\Models\Receipt;
use App\Contracts\ReceiptContract;

class ReceiptRepository implements ReceiptContract
{

    protected $model;

    public function __construct(Receipt $model)
    {
        $this->model = $model;
    }

    public function createOrUpdateReceipt($data)
    {
        return $this->model->updateOrCreate(
            [
                'id' => $data['id'] ?? null, 
            ],
            [
                'invoice_no' => $data['invoice_no'], 
                'transaction_no' => $data['transaction_no'],
                'prescription_id' => $data['prescription_id'],
                'payment_method' => $data['payment_method'],
                'amount_paid' => $data['amount_paid'],
                'status' => $data['status'] ?? 'Pending',
            ]
        );
    }
}
