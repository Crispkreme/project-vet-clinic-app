<?php

namespace App\Repositories;

use App\Models\Invoice;
use App\Contracts\InvoiceContract;

class InvoiceRepository implements InvoiceContract
{

    protected $model;

    public function __construct(Invoice $model)
    {
        $this->model = $model;
    }

    public function getAllInvoice()
    {
        return $this->model->get();
    }

    public function getInvoiceByOwner($userId)
    {
        return $this->model
            ->join('prescriptions', 'invoices.prescription_id', '=', 'prescriptions.id')
            ->where('prescriptions.user_id', $userId)
            ->select('invoices.id', 'invoices.total_amount', 'invoices.status', 'invoices.created_at', 'invoices.updated_at')
            ->get();
    }


    public function createOrUpdateInvoice($data)
    {
        return $this->model->updateOrCreate(
            [
                'id' => $data['id'] ?? null, 
            ],
            [
                'prescription_id' => $data['prescription_id'], 
                'total_amount' => $data['total_amount'],
                'status' => $data['status'] ?? 'Pending',
            ]
        );
    }
}
