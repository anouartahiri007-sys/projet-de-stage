# Phase 3 — Technical Specification

## 1. Stack Overview

### Frontend
- **Framework**: React 18 with TypeScript.
- **Build Tool**: Vite.
- **State Management**: **Zustand** (Lightweight, modular state).
- **Styling**: TailwindCSS with the custom design system integrated into the `tailwind.config.js`.
- **Architecture**: **Feature-based modular architecture**. Each feature (e.g., `/features/employees`) contains its own components, hooks, services, and types.

### Backend
- **Framework**: Laravel 11.
- **Pattern**: Service Layer + Repository Pattern.
- **Modules**: Domain-Driven Design (DDD) inspired structure (`app/Domain/Staff`, `app/Domain/Promotion`).
- **Authentication**: JWT (JSON Web Tokens) with refresh token logic.

### Database
- **Engine**: MySQL 8.0.
- **Schema**: Fully normalized with enforced foreign keys and strict indexing on searchable fields (`national_id`, `professional_id`).
- **Auditing**: Every table includes `created_by`, `updated_by`, `deleted_at` (Soft Deletes).

## 2. Multi-tenancy & Data Isolation

### Strategy: Row-Level Tenancy (Shared Schema)
To maintain performance while ensuring strict public-sector data isolation, the system will use a hierarchical filtering strategy:

1.  **Organizational Context**: Every record (Employee, Promotion, Evaluation) is linked to an `institution_id`.
2.  **Scope Filtering**: A Laravel Global Scope will automatically filter results based on the logged-in user's level.
    -   *Hospital Admin*: Sees data where `institution_id = user->institution_id`.
    -   *Regional Admin*: Sees data for all institutions within their `region_id`.
    -   *Ministry Admin*: No global filters applied (Universal access).
3.  **Audit Trail**: Every data access and modification is logged in a centralized `audit_logs` table (Who, what, when, old_value, new_value).

## 3. Modular Structure (Backend)

```
app/
├── Domain/
│   ├── Personnel/          # Employee, Candidate, Contract
│   ├── Career/             # Grade, Echelon, Promotion
│   ├── Org/                # Ministry, Region, Institution
│   └── Finance/            # Compensation, Allowances
├── Infrastructure/
│   ├── Repositories/       # Data access implementation
│   └── Services/           # Business logic orchestration
└── Interfaces/
    ├── Http/               # Controllers & Requests
    └── API/                # REST Resources
```

## 4. Modular Structure (Frontend)

```
src/
├── app/                    # Store config, Providers
├── components/             # Common UI components (design system)
├── features/
│   ├── employees/          # Everything related to employees
│   ├── recruitment/        # Workflows for candidates
│   └── dashboard/          # Analytics and overview
├── hooks/                  # Global hooks
└── services/               # API clients (Axios)
```
