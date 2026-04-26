<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\CareerService;
use App\Models\Employee;
use App\Models\Evaluation;
use App\Models\Echelon;
use App\Models\Grade;
use App\Models\Organization;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CareerServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_echelon_progression_logic()
    {
        // 1. Setup
        $service = new CareerService();
        $org = Organization::create(['name' => 'Test Org', 'type' => 'Hospital']);
        $grade = Grade::create(['name' => 'Test Grade', 'cadre' => 'Medical']);
        $e1 = Echelon::create(['grade_id' => $grade->id, 'level' => 1, 'index_value' => 100]);
        $e2 = Echelon::create(['grade_id' => $grade->id, 'level' => 2, 'index_value' => 150]);
        
        $employee = Employee::create([
            'national_id' => 'TEST1',
            'professional_id' => 'P1',
            'first_name' => 'Test',
            'last_name' => 'User',
            'hire_date' => now(),
            'organization_id' => $org->id,
            'grade_id' => $grade->id,
            'echelon_id' => $e1->id
        ]);

        // 2. Test Fast Progression (Score 18)
        Evaluation::create(['employee_id' => $employee->id, 'score' => 18, 'year' => 2024]);
        $result = $service->checkEchelonProgression($employee);
        
        $this->assertTrue($result['eligible']);
        $this->assertEquals(18, $result['required_months']);
        $this->assertEquals(2, $result['next_echelon']->level);
    }
}
