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
        Schema::create('titularisation_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fonctionnaire_id')->constrained('fonctionnaires')->onDelete('cascade');
            $table->foreignId('administrative_act_id')->nullable()->constrained('administrative_acts')->onDelete('cascade');
            $table->string('reference_acte')->nullable();
            $table->date('date_acte')->nullable();
            $table->date('date_effet')->nullable();
            $table->date('date_titularisation')->nullable();
            $table->string('duree_stage')->nullable();
            $table->string('decision_stage')->default('valide');
            $table->string('old_grade')->nullable();
            $table->string('old_echelle')->nullable();
            $table->string('old_echelon')->nullable();
            $table->string('old_indice')->nullable();
            $table->string('new_grade')->nullable();
            $table->string('new_echelle')->nullable();
            $table->string('new_echelon')->nullable();
            $table->string('new_indice')->nullable();
            $table->string('service_affectation')->nullable();
            $table->string('lieu_redaction')->default('العرائش');
            $table->string('signataire')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('titularisation_records');
    }
};
