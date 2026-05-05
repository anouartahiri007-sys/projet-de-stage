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
            $table->string('nom')->nullable();
            $table->string('prenom')->nullable();
            $table->string('cnie')->nullable();
            $table->date('date_naissance')->nullable();
            $table->string('lieu_naissance')->nullable();
            $table->string('situation_familiale')->nullable();
            $table->integer('nombre_enfants')->default(0);
            $table->string('poste')->nullable();
            $table->text('adresse')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('fonctionnaires', function (Blueprint $table) {
            $table->dropColumn([
                'nom', 'prenom', 'cnie', 'date_naissance', 'lieu_naissance', 
                'situation_familiale', 'nombre_enfants', 'poste', 'adresse'
            ]);
        });
    }
};
