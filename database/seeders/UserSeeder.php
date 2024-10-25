<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $users = [
            [
                'name'     => 'Dr. Maria Santos',
                'usertype' => 'admin',
                'phone_number' => '+63' . $faker->numerify('9#########'),
                'email'    => 'maria.santos@clinic.com',
                'password' => Hash::make('admin'),
                'email_verified_at' => now(),
                'profile' => 'doctor1.jpg',
            ],
            [
                'name'     => 'Dr. Juan Reyes',
                'usertype' => 'admin',
                'phone_number' => '+63' . $faker->numerify('9#########'),
                'email'    => 'juan.reyes@clinic.com',
                'password' => Hash::make('admin'),
                'email_verified_at' => now(),
                'profile' => 'doctor4.jpg',
            ],
            [
                'name'     => 'Dr. Anna Cruz',
                'usertype' => 'admin',
                'phone_number' => '+63' . $faker->numerify('9#########'),
                'email'    => 'anna.cruz@clinic.com',
                'password' => Hash::make('admin'),
                'email_verified_at' => now(),
                'profile' => 'doctor2.jpg',
            ],
            [
                'name'     => 'Dr. Roberto Garcia',
                'usertype' => 'admin',
                'phone_number' => '+63' . $faker->numerify('9#########'),
                'email'    => 'roberto.garcia@clinic.com',
                'password' => Hash::make('admin'),
                'email_verified_at' => now(),
                'profile' => 'doctor3.jpg',
            ],
            [
                'name'     => 'Dr. Liza Flores',
                'usertype' => 'admin',
                'phone_number' => '+63' . $faker->numerify('9#########'),
                'email'    => 'liza.flores@clinic.com',
                'password' => Hash::make('admin'),
                'email_verified_at' => now(),
                'profile' => 'doctor5.jpg',
            ],
            [
                'name'     => 'Tomomi Nagasu',
                'usertype' => 'user',
                'phone_number' => '+63' . $faker->numerify('9#########'),
                'email'    => 'user@user.com',
                'password' => Hash::make('user'),
                'email_verified_at' => now(),
                'profile' => 'user02.png',
            ],
        ];
        

        DB::table('users')->insert($users);
    }
}
