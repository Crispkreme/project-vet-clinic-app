<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Pet;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $pets = Pet::inRandomOrder()->limit(10)->get();

        foreach ($pets as $pet) {
            Appointment::create([
                'vet_id' => 1,
                'pet_id' => $pet->id,
                'appointment_date' => Carbon::now()->addDays(rand(1, 30)),
                'status' => 'Pending',
                'notes' => 'Routine checkup for ' . $pet->name,
            ]);
        }
    }
}
