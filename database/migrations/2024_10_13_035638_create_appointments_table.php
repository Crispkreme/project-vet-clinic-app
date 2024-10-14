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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vet_id')->nullable(); 
            $table->unsignedBigInteger('pet_id')->nullable(); 
            $table->string('title');
            $table->date('appointment_date');
            $table->time('appointment_start');
            $table->time('appointment_end');
            $table->enum('status', [
                'Pending', 
                'Confirmed', 
                'Cancelled', 
                'Completed'
            ])
            ->nullable()
            ->default('Pending');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('vet_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('pet_id')->references('id')->on('pets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
