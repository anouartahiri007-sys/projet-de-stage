<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Organization;
use App\Models\Grade;
use App\Models\Echelon;
use App\Models\Employee;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Organizations
        $ministry = Organization::create(['name' => 'Ministry of Health', 'type' => 'Ministry']);
        $region = Organization::create(['name' => 'Casablanca-Settat Region', 'type' => 'Region', 'parent_id' => $ministry->id]);
        $hospital = Organization::create(['name' => 'Mohammed V University Hospital', 'type' => 'Hospital', 'parent_id' => $region->id]);

        // 2. Grades & Echelons
        $doctorGrade = Grade::create(['name' => 'Specialist Doctor', 'cadre' => 'Medical']);
        for ($i = 1; $i <= 5; $i++) {
            Echelon::create([
                'grade_id' => $doctorGrade->id,
                'level' => $i,
                'index_value' => 300 + ($i * 50),
                'months_required' => 24
            ]);
        }

        $nurseGrade = Grade::create(['name' => 'State Registered Nurse', 'cadre' => 'Paramedical']);
        for ($i = 1; $i <= 5; $i++) {
            Echelon::create([
                'grade_id' => $nurseGrade->id,
                'level' => $i,
                'index_value' => 200 + ($i * 30),
                'months_required' => 24
            ]);
        }

        // 3. Sample Employee
        Employee::create([
            'national_id' => 'AB123456',
            'professional_id' => 'DOC-001',
            'first_name' => 'Alice',
            'last_name' => 'Smith',
            'hire_date' => '2020-01-01',
            'status' => 'Titular',
            'organization_id' => $hospital->id,
            'grade_id' => $doctorGrade->id,
            'echelon_id' => $doctorGrade->echelons()->first()->id
        ]);

        // 4. Admin User
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@hris.gov',
            'password' => bcrypt('password'),
        ]);
    }
}
