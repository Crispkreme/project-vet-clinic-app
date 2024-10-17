<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    use HasFactory;
    
    protected $table = 'pets';

    protected $fillable = [
        'user_id',
        'name',
        'breed',
        'age',
        'weight',
        'medical_history',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'pet_id');
    }

    public function prescriptions()
    {
        return $this->hasMany(Prescription::class, 'pet_id');
    }

}
