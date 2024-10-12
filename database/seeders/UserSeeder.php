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
                'name'     => 'Marvin Ramos',
                'usertype' => 'admin',
                'phone_number' => '+63' . $faker->numerify('9#########'),
                'email'    => 'admin@admin.com',
                'password' => Hash::make('admin'),
                'email_verified_at' => now(),
            ],
            [
                'name'     => 'Tomomi Nagasu',
                'usertype' => 'user',
                'phone_number' => '+63' . $faker->numerify('9#########'),
                'email'    => 'user@user.com',
                'password' => Hash::make('user'),
                'email_verified_at' => now(),
            ],
        ];

        DB::table('users')->insert($users);
    }
}
