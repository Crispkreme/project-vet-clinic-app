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
        Schema::create('receipts', function (Blueprint $table) {

            $table->id();
            $table->string('invoice_no')->unique();
            $table->string('transaction_no')->unique();
            $table->unsignedBigInteger('prescription_id')->nullable();
            $table->string('payment_method'); 
            $table->decimal('amount_paid', 10, 2);
            $table->enum('status', [
                'Pending', 
                'Paid',
                'Unpaid',
                'Failed'
            ])->default('Pending');

            $table->foreign('prescription_id')
                ->references('id')
                ->on('prescriptions')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('receipts');
    }
};
