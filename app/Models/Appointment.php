<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'vet_id',
        'pet_id',
        'appointment_date',
        'status',
        'notes'
    ];

    public function vet()
    {
        return $this->belongsTo(User::class, 'vet_id');
    }

    public function pet()
    {
        return $this->belongsTo(Pet::class, 'pet_id');
    }
}
