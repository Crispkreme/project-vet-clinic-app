<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class PetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $statusOptions = [
            'Healthy', 
            'Due for Vaccination', 
            'Under Treatment', 
            'Post-Surgery', 
            'Needs Medication', 
            'In Quarantine', 
            'Emergency', 
            'Adopted', 
            'Lost', 
            'Pending Vet Visit'
        ]; 

        for ($i = 0; $i < 10; $i++) {
            DB::table('pets')->insert([
                'user_id' => 2, 
                'name' => $faker->name,  
                'breed' => $faker->word,  
                'age' => $faker->numberBetween(1, 15),  
                'weight' => $faker->numberBetween(5, 50),  
                'medical_history' => $faker->sentence, 
                'status' => $faker->randomElement($statusOptions), 
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
