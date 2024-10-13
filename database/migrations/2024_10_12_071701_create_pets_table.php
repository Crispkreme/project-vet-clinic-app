<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable(); 
            $table->string('name', 50);
            $table->string('breed', 50)->nullable();
            $table->integer('age')->nullable();
            $table->decimal('weight', 5, 2)->nullable(); 
            $table->text('medical_history')->nullable();
            $table->enum('status', [
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
            ])->nullable()->default('Healthy');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
