<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    use HasFactory;

    protected $fillable = [
        'vet_id',
        'pet_id',
        'diagnosis',
        'treatment_plan',
        'prescribed_medication',
    ];

    public function vet()
    {
        return $this->belongsTo(User::class, 'vet_id');
    }

    public function pet()
    {
        return $this->belongsTo(Pet::class, 'pet_id');
    }

    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }
}
