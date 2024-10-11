<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name'     => 'Marvin Ramos',
                'usertype' => 'admin',
                'email'    => 'admin@admin.com',
                'password' => Hash::make('password'),
            ],
            [
                'name'     => 'Tomomi Nagasu',
                'usertype' => 'user',
                'email'    => 'user@user.com',
                'password' => Hash::make('password'),
            ],
        ];

        DB::table('users')->insert($users);
    }
}
