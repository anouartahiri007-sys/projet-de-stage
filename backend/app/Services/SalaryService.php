<?php

namespace App\Services;

use App\Models\Employee;

class SalaryService
{
    protected $indexPointValue = 5.00;

    public function calculateMonthlyGross(Employee $employee)
    {
        $employee->load(['grade', 'echelon', 'organization']);
        
        $baseSalary = $employee->echelon->index_value * $this->indexPointValue;
        
        // Allowances
        $riskAllowance = 0;
        if ($employee->grade->cadre === 'Medical') {
            $riskAllowance = $baseSalary * 0.15;
        } elseif ($employee->grade->cadre === 'Paramedical') {
            $riskAllowance = $baseSalary * 0.10;
        }

        $transportAllowance = 100; // Fixed base
        if ($employee->organization->type === 'Hospital' && str_contains($employee->organization->name, 'Rural')) {
            $transportAllowance = 200;
        }

        return [
            'base_salary' => $baseSalary,
            'risk_allowance' => $riskAllowance,
            'transport_allowance' => $transportAllowance,
            'total_gross' => $baseSalary + $riskAllowance + $transportAllowance
        ];
    }
}
