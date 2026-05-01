<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Payroll;
use App\Models\Fonctionnaire;
use Illuminate\Support\Facades\Auth;

class PayrollController extends Controller
{
    public function index()
    {
        $payrolls = Payroll::with('fonctionnaire.user')->get();
        return response()->json($payrolls);
    }

    public function myPayroll()
    {
        $user = Auth::user();
        if (!$user || !$user->fonctionnaire) {
            return response()->json(['message' => 'Fonctionnaire not found'], 404);
        }

        $payrolls = Payroll::where('fonctionnaire_id', $user->fonctionnaire->id)->get();
        return response()->json($payrolls);
    }

    public function store(Request $request)
    {
        $request->validate([
            'fonctionnaire_id' => 'required|exists:fonctionnaires,id',
            'base_salary' => 'required|numeric',
            'bonuses' => 'nullable|numeric',
            'deductions' => 'nullable|numeric',
            'payment_date' => 'required|date'
        ]);

        $base = $request->base_salary;
        $bonuses = $request->bonuses ?? 0;
        $deductions = $request->deductions ?? 0;
        $net_salary = $base + $bonuses - $deductions;

        $payroll = Payroll::create([
            'fonctionnaire_id' => $request->fonctionnaire_id,
            'base_salary' => $base,
            'bonuses' => $bonuses,
            'deductions' => $deductions,
            'net_salary' => $net_salary,
            'payment_date' => $request->payment_date,
            'status' => 'paid'
        ]);

        return response()->json(['message' => 'Payroll generated successfully', 'payroll' => $payroll], 201);
    }
}
