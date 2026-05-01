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
        Schema::create('medical_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fonctionnaire_id')->constrained('fonctionnaires')->onDelete('cascade');
            $table->foreignId('medecin_id')->constrained('users')->onDelete('cascade'); // the doctor who made the record
            $table->string('type'); // consultation, certificate, treatment
            $table->text('description');
            $table->string('attachment_path')->nullable(); // PDF certificate path
            $table->date('record_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_records');
    }
};
