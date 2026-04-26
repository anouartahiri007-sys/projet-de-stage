# Phase 1 Validation - Sample Scenarios

This document validates the business rules defined in `business_rules.md` against practical HR scenarios.

## Scenario 1: Fast Echelon Progression
**Employee**: Dr. Alice Smith (Consultant)
**Current State**: Grade: Senior Surgeon, Echelon: 2, Current Duration in Echelon: 19 months.
**Evaluation Score**: 18.5 (Average).
**Rule Applied**: Score >= 16 (Fast Category).
**Expected Outcome**: 
- Eligibility duration is 18 months.
- Since Alice has been in Echelon 2 for 19 months, she is eligible for immediate promotion to **Echelon 3**.

## Scenario 2: Grade Promotion by Seniority
**Employee**: Nurse Bob (State Registered)
**Current State**: Grade: Nurse Grade 1, Echelon: 7, Time in Grade: 6 years, 2 months.
**Rule Applied**: Seniority (6 years in grade + reached Echelon 6).
**Expected Outcome**:
- Bob is eligible for the annual "Promotion by Choice" pool.
- Actual promotion depends on the 20% quota ranking among all eligible staff.

## Scenario 3: Salary Calculation
**Employee**: Dr. Charlie (Regional Veterinarian)
**Grade**: Vet Specialist (Echelon 4, Index: 650)
**Location**: Rural Region.
**Index Point Value**: $5.00.
**Calculation**:
- Base Salary: 650 * $5.00 = $3,250.
- Risk Allowance: 15% of $3,250 = $487.50.
- Transport (Rural): $200.00.
- Specialization: $500.00.
**Total Monthly Gross**: **$4,437.50**.

## Scenario 4: Mandatory Retirement
**Employee**: Director David (Administrator)
**Current State**: Age 62, Service Years: 30.
**Rule Applied**: Retirement at age 62 for non-medical staff.
**Expected Outcome**: David must be flagged for mandatory retirement processing.
