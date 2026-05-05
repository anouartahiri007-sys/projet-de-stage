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
        Schema::create('nomination_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fonctionnaire_id')->constrained('fonctionnaires')->onDelete('cascade');
            $table->foreignId('administrative_act_id')->nullable()->constrained('administrative_acts')->onDelete('cascade');
            $table->string('acte_reference');
            $table->date('date_decision');
            $table->date('date_effet');
            $table->date('date_prise_service')->nullable();
            $table->string('nouveau_grade')->nullable();
            $table->string('nouvel_echelon')->nullable();
            $table->string('indice')->nullable();
            $table->string('poste')->nullable();
            $table->string('service')->nullable();
            $table->enum('type_nomination', ['nomination', 'titularisation', 'affectation', 'promotion'])->default('nomination');
            $table->text('articles_extra')->nullable(); // For any dynamic article content
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nomination_records');
    }
};
