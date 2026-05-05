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
        Schema::create('administrative_acts', function (Blueprint $table) {
            $table->id();
            $table->enum('type', [
                'recrutement', 
                'nomination', 
                'titularisation', 
                'notation', 
                'avancement', 
                'reclassement'
            ]);
            $table->foreignId('fonctionnaire_id')->nullable()->constrained('fonctionnaires')->onDelete('cascade');
            $table->foreignId('candidat_id')->nullable()->constrained('candidats')->onDelete('cascade');
            $table->json('original_data')->nullable(); // For version comparison
            $table->json('new_data'); // Updated info entered by RH
            $table->string('status')->default('draft'); // draft, validated
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('administrative_acts');
    }
};
