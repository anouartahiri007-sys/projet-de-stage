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
            $table->string('sexe')->nullable();
            $table->string('nom_ar')->nullable();
            $table->string('prenom_ar')->nullable();
            $table->string('lieu_naissance_ar')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('fonctionnaires', function (Blueprint $table) {
            $table->dropColumn(['sexe', 'nom_ar', 'prenom_ar', 'lieu_naissance_ar']);
        });
    }
};
