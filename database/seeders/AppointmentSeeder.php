<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Pet;
use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        
        $appointments = [
            [
                'vet_id'            => 1, 
                'pet_id'            => 1,
                'title'             => 'Routine Checkup',
                'appointment_date'  => '2024-10-07',
                'appointment_start' => '09:13:00',
                'appointment_end'   => '10:00:00',
                'status'            => 'Pending',
                'notes'             => $faker->sentence(),
            ],
            [
                'vet_id'            => 1,
                'pet_id'            => 2,
                'title'             => 'Vaccination',
                'appointment_date'  => '2024-10-08',
                'appointment_start' => '11:30:00',
                'appointment_end'   => '12:00:00',
                'status'            => 'Confirmed',
                'notes'             => $faker->sentence(),
            ],
            [
                'vet_id'            => 1,
                'pet_id'            => 3,
                'title'             => 'Dental Cleaning',
                'appointment_date'  => '2024-10-09',
                'appointment_start' => '14:00:00',
                'appointment_end'   => '15:00:00',
                'status'            => 'Completed',
                'notes'             => $faker->sentence(),
            ]
        ];

        DB::table('appointments')->insert($appointments);
    }
}
