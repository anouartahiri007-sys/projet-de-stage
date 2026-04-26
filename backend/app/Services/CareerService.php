<?php

namespace App\Services;

use App\Models\Employee;
use App\Models\Echelon;
use App\Models\Promotion;
use Carbon\Carbon;

class CareerService
{
    /**
     * Check and process echelon progression for an employee based on their latest evaluation.
     */
    public function checkEchelonProgression(Employee $employee)
    {
        $latestEvaluation = $employee->evaluations()->latest('year')->first();
        if (!$latestEvaluation) return false;

        $currentEchelon = $employee->echelon;
        $nextEchelon = Echelon::where('grade_id', $employee->grade_id)
            ->where('level', $currentEchelon->level + 1)
            ->first();

        if (!$nextEchelon) return false; // Already at max echelon

        $score = $latestEvaluation->score;
        $requiredMonths = 24; // Default medium

        if ($score >= 16) {
            $requiredMonths = 18; // Fast
        } elseif ($score < 10) {
            $requiredMonths = 36; // Slow
        }

        // Logic check: calculate if enough time has passed
        // This is a simplified check for the demonstration
        return [
            'eligible' => true, 
            'required_months' => $requiredMonths,
            'next_echelon' => $nextEchelon
        ];
    }

    public function promote(Employee $employee, $toGradeId, $toEchelonId, $type = 'Seniority')
    {
        $oldGradeId = $employee->grade_id;
        $oldEchelonId = $employee->echelon_id;

        $employee->update([
            'grade_id' => $toGradeId,
            'echelon_id' => $toEchelonId
        ]);

        return Promotion::create([
            'employee_id' => $employee->id,
            'from_grade_id' => $oldGradeId,
            'to_grade_id' => $toGradeId,
            'from_echelon_id' => $oldEchelonId,
            'to_echelon_id' => $toEchelonId,
            'effective_date' => now(),
            'type' => $type
        ]);
    }
}
