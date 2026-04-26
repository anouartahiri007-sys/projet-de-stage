# Domain Specification - Healthcare HRIS

## 1. Introduction
This document defines the domain scope and organizational structure for the Public Healthcare HRIS. The system manages human resources for a multi-layered administration including ministries, regional directorates, and individual health institutions.

## 2. Organizational Hierarchy (Administrative Chart)

### Level 1: Ministry of Health (National)
- **Functions**: National policy setting, global budgeting, legal framework.
- **Reporting**: Minister → Secretary General.

### Level 2: Central Directorate (Central)
- **Examples**: Directorate of Human Resources (DRH), Directorate of Hospitals (DHSA).
- **Functions**: Detailed management of specific domains at the national level.

### Level 3: Regional Directorate (Regional - DRS)
- **Functions**: Regional coordination, implementation of national strategies at the region level.

### Level 4: Provincial Delegation (Provincial - DP)
- **Functions**: Oversight of hospitals and health centers within a specific province or prefecture.

### Level 5: Health Institution / Hospital / Unit (Local)
- **Types**: University Hospitals (CHU), Regional Hospitals (HR), Health Centers.
- **Final Service Point**: Where employees are physically assigned.

## 3. Administrative Roles & Reporting Chain
- **Minister / Secretary General**: High-level approvals (e.g., International assignments).
- **Director of HR**: National-level recruitment and grade promotions.
- **Regional Director**: Regional transfers and regional budget oversight.
- **Provincial Delegate**: Local oversight of staffing needs.
- **Hospital Director**: Daily management, annual evaluations, attendance tracking.
- **Staff (Employee)**: Doctors, Nurses, Vets, Admin.

### Employee
- **Attributes**: National ID, Professional Registration Number, Full Name, DOB, Gender, Martial Status, Hire Date, Status (Candidate, Titular, Retired).
- **Relationships**: Belong to a Grade, Echelon, Institution, and Unit.

### Grade
- Represents a professional level (e.g., General Practitioner, Consultant Surgeon).
- Defines the salary ceiling and floor.
- Associated with a "Cadre" (Medical, Paramedical, Admin).

### Echelon
- Steps within a Grade.
- Linked to an "Index" for salary calculation.
- Defines the "Seniority Required" (e.g., 2 years to move from E1 to E2).

### Assignment
- Links an Employee to an Institution/Unit for a period.
- Stores the role title (e.g., "Head of Cardiology").

### Promotion
- Records the history of grade and echelon changes.
- Stores the "Source" (Automatic, Exam, Score-based).

### Evaluation
- Annual performance reviews.
- **Score (0-20)**: Used to determine the speed of progression.
- **Annotator**: The direct supervisor or department head.

## 4. Healthcare Staff Categories

### Doctors
- General Practitioners, Specialists, Surgeons.
- Career track: Grade 1 → Principal → Exceptional.

### Nurses
- State Registered, Specialized, Midwives.
- Career track: Grade 2 → Grade 1 → Principal.

### Veterinarians
- Public health vet officers.
- Career track: Grade 1 → Principal → Exceptional.

## 5. Medical Roles
