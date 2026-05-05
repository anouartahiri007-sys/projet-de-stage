<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Update existing acts table to support versioning if needed, or create/adjust
        Schema::table('administrative_acts', function (Blueprint $table) {
            if (!Schema::hasColumn('administrative_acts', 'current_version')) {
                $table->integer('current_version')->default(1);
            }
            if (!Schema::hasColumn('administrative_acts', 'installed_at')) {
                $table->timestamp('installed_at')->nullable();
            }
        });

        Schema::create('administrative_act_versions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('administrative_act_id')->constrained('administrative_acts')->onDelete('cascade');
            $table->integer('version_number');
            $table->json('data'); // Stores the form data for this version
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('administrative_act_versions');
    }
};
