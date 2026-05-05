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
        Schema::create('reclassement_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fonctionnaire_id')->constrained('fonctionnaires')->onDelete('cascade');
            $table->foreignId('administrative_act_id')->nullable()->constrained('administrative_acts')->onDelete('cascade');
            $table->string('ancien_grade')->nullable();
            $table->string('ancien_echelon')->nullable();
            $table->string('ancien_indice')->nullable();
            $table->string('nouveau_grade')->nullable();
            $table->string('nouvel_echelon')->nullable();
            $table->string('nouvel_indice')->nullable();
            $table->date('date_effet');
            $table->text('description_missions')->nullable();
            $table->text('avis_superieur')->nullable();
            $table->text('avis_chef')->nullable();
            $table->text('avis_admin')->nullable();
            $table->string('decision')->nullable(); // propose, no_propose
            $table->string('lieu_redaction')->default('العرائش');
            $table->date('date_redaction')->nullable();
            $table->string('signataire')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reclassement_records');
    }
};
