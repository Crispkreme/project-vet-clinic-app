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
        return $this->model
            ->join('prescriptions', 'invoices.prescription_id', '=', 'prescriptions.id')
            ->join('pets', 'prescriptions.pet_id', '=', 'pets.id')
            ->join('users', 'pets.user_id', '=', 'users.id')
            ->select(
                'users.name as user_name',
                'pets.name as pet_name',
                'invoices.total_amount',
                'invoices.status'
            )
            ->get();
    }

    public function getInvoiceByOwner($userId)
    {
        return $this->model
            ->join('prescriptions', 'invoices.prescription_id', '=', 'prescriptions.id')
            ->join('pets', 'prescriptions.pet_id', '=', 'pets.id')
            ->join('users', 'pets.user_id', '=', 'users.id')
            ->where('pets.user_id', $userId)
            ->select(
                'invoices.id', 
                'invoices.prescription_id', 
                'users.name as user_name',
                'pets.name as pet_name',
                'pets.status as medical_status',
                'invoices.total_amount', 
                'invoices.status', 
                'invoices.created_at', 
                'invoices.updated_at'
            )
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

    public function updateInvoiceStatus($id, $status) 
    {
        $invoice = $this->model->where('prescription_id', $id)->first();

        if ($invoice) {
            return $invoice->update(['status' => $status]);
        }
        
        return false;
    }
}
