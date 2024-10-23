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
        Schema::table('pets', function (Blueprint $table) {
            //Delete Age
            $table->dropColumn('age');

            //Add Birthday
            $table->date('birthday')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pets', function (Blueprint $table) {
            //Delete Birthday
            $table->dropColumn('birthday');

            //Rollback Age
            $table->integer('age')->nullable();
        });
    }
};
