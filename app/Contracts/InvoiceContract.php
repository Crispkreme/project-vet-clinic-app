<?php

namespace App\Contracts;

interface InvoiceContract {

    public function getAllInvoice();
    public function getInvoiceByOwner($id);
    public function createOrUpdateInvoice($data);
}
