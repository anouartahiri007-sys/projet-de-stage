# Business Rules - Healthcare HRIS

## 1. HR Lifecycle & Administrative Rules

### 1.1 Recruitment
- **Mechanism**: Competitive external exams or direct recruitment for specific medical specialists.
- **Rules**: Initial placement at the lowest echelon (E1) of the entry grade.
- **Output**: Recruitment Decree (Document).

### 1.2 Onboarding & Probation
- **Status**: Trainee (Stagiaire).
- **Duration**: 12 months.
- **Reporting**: Monthly feedback from supervisor for the first 3 months.

### 1.3 Titularisation (Confirmation)
- **Eligibility**: 12 months of service with a "Positive" recommendation from the direct supervisor and institutional director.
- **Outcome**: Permanent status (Titulariser). Triggers eligibility for time-based promotion.

### 1.4 Annual Evaluation
- **Periodicity**: Once per year (usually December).
- **Score Range**: 0 to 20.
- **Criteria**: Quality of work, output, conduct, administrative discipline.

### 1.5 Retirement
- **Rules**: 
  - Mandatory age 65 for Medical Staff.
  - Mandatory age 62 for Administrative and Paramedical Staff.
  - Automatic workflow triggered 12 months before the retirement target date.

## 2. Career Progression Rules

### 1.1 Echelon Progression (Time-Based)
Progression between echelons within the same grade depends on the annual evaluation score (Average of the last 2 years).

| Evaluation Score (S) | Progression Category | Duration in Current Echelon |
| :--- | :--- | :--- |
| **16 <= S <= 20** | **Fast** | 18 Months |
| **10 <= S < 16** | **Medium** | 24 Months |
| **0 <= S < 10** | **Slow** | 36 Months |

### 1.2 Grade Promotion Rules
Promotion to a higher grade requires satisfying one of the following criteria:

- **By Seniority (Choice)**: 6 years in the current grade AND reached at least Echelon 6. (Subject to 20% annual quota of eligible staff).
- **By Competitive Exam**: 4 years in the current grade. (Subject to exam success and available positions).
- **By Exceptional Performance**: 5 years in grade AND average score > 18.

## 2. Compensation Rules

### 2.1 Base Salary Formula
The base salary is calculated using the Index System.

`Base_Salary = Index(Grade, Echelon) * Index_Point_Value`
- *Default Index Point Value*: $5.00.

### 2.2 Allowances (Bonuses)
- **Risk Allowance**:
  - Medical Staff: 15% of Base Salary.
  - Paramedical Staff: 10% of Base Salary.
- **Transport Allowance**:
  - Fixed $100/month for Urban areas.
  - Fixed $200/month for Rural/Remote areas.
- **Specialization Allowance**:
  - Specialist Doctor: $500/month.
  - PhD holder: $300/month.

### 2.3 Retirement Logic
- Mandatory retirement at **age 65** for Doctors and **age 62** for other staff.
- Early retirement possible after **25 years of service**.

## 3. Hiring & Onboarding
- New employees enter at **Echelon 1** of the recruitment Grade.
- Probation period: **12 months**.
- After probation, a **Titularisation** workflow must be triggered to confirm permanent status.
