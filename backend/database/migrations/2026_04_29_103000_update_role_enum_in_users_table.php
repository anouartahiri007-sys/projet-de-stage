<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * SQLite stores ENUM as TEXT internally, so we just need to
     * recreate the column as a plain string to remove the enum constraint.
     */
    public function up(): void
    {
        $driver = Schema::getConnection()->getDriverName();

        if ($driver === 'sqlite') {
            // SQLite: Create new table, copy data, swap
            DB::statement('PRAGMA foreign_keys = OFF');

            DB::statement('CREATE TABLE users_temp AS SELECT * FROM users');
            DB::statement('DROP TABLE users');

            Schema::create('users', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email')->unique();
                $table->string('role', 50)->default('candidat');
                $table->timestamp('email_verified_at')->nullable();
                $table->string('password');
                $table->rememberToken();
                $table->string('department')->nullable();
                $table->string('phone')->nullable();
                $table->string('language')->default('fr');
                $table->json('preferences')->nullable();
                $table->timestamps();
            });

            DB::statement('INSERT INTO users (id, name, email, role, email_verified_at, password, remember_token, department, phone, language, preferences, created_at, updated_at) SELECT id, name, email, role, email_verified_at, password, remember_token, department, phone, language, preferences, created_at, updated_at FROM users_temp');
            DB::statement('DROP TABLE users_temp');

            DB::statement('PRAGMA foreign_keys = ON');
        } else {
            // MySQL / PostgreSQL
            DB::statement("ALTER TABLE users MODIFY COLUMN role VARCHAR(50) DEFAULT 'candidat'");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No-op: we don't want to revert to a restrictive enum
    }
};
