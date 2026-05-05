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
        Schema::table('fonctionnaires', function (Blueprint $table) {
            $table->string('telephone')->nullable();
            $table->date('date_grade')->nullable();
            $table->date('date_echelon')->nullable();
            $table->string('direction')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('fonctionnaires', function (Blueprint $table) {
            $table->dropColumn(['telephone', 'date_grade', 'date_echelon', 'direction']);
        });
    }
};
