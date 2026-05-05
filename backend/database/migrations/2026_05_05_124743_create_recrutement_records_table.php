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
        Schema::create('recrutement_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidat_id')->nullable()->constrained('candidats')->onDelete('cascade');
            $table->foreignId('fonctionnaire_id')->nullable()->constrained('fonctionnaires')->onDelete('cascade');
            $table->foreignId('administrative_act_id')->nullable()->constrained('administrative_acts')->onDelete('cascade');
            $table->string('reference_acte')->nullable();
            $table->date('date_acte')->nullable();
            $table->date('date_recrutement')->nullable();
            $table->string('grade_recrutement')->nullable();
            $table->string('echelle_recrutement')->nullable();
            $table->string('echelon_recrutement')->nullable();
            $table->string('indice_recrutement')->nullable();
            $table->string('service_affectation')->nullable();
            $table->string('type_recrutement')->default('direct'); // direct, concours
            $table->string('diplome')->nullable();
            $table->string('specialite')->nullable();
            $table->date('date_diplome')->nullable();
            $table->date('date_effet')->nullable();
            $table->string('num_telegramme')->nullable();
            $table->date('date_telegramme')->nullable();
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
        Schema::dropIfExists('recrutement_records');
    }
};
