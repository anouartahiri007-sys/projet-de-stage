<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('concours', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('date');
            $table->string('lieu');
            $table->json('conditions')->nullable(); // age, diplômes, expérience
            $table->json('required_documents')->nullable(); // list of docs
            $table->enum('status', ['open', 'closed', 'cancelled'])->default('open');
            $table->integer('positions_available')->default(0);
            $table->timestamp('publication_date')->useCurrent();
            $table->timestamp('closing_date')->nullable();
            $table->timestamp('deadline')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('concours');
    }
};
