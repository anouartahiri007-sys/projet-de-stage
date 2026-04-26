# Phase 2 — UX/UI Design System

This document defines the visual language and reusable tokens for the Healthcare HRIS platform.

## 1. Visual Identity (Mockups)

### Dashboard Overview
![HRIS Premium Dashboard Mockup](file:///C:/Users/Dell/.gemini/antigravity/brain/75b32685-0f82-4db3-b193-526c416ba135/hris_premium_dashboard_mockup_1777069410196.png)

### Staff Profile & Workflow Visualizer
![HRIS Staff Profile Mockup](file:///C:/Users/Dell/.gemini/antigravity/brain/75b32685-0f82-4db3-b193-526c416ba135/hris_staff_profile_workflow_mockup_1777069445287.png)

## 2. Design Tokens

### 2.1 Color Palette
Based on a professional GovTech aesthetic, prioritizing legibility and authority.

| Token | Value | usage |
| :--- | :--- | :--- |
| `--primary-900` | `#0F172A` | Backgrounds, Sidebars, Main Headings |
| `--primary-600` | `#2563EB` | Primary Actions, Links |
| `--success-600` | `#059669` | Healthcare indicators, Approved status |
| `--warning-500` | `#F59E0B` | Pending actions, Alerts |
| `--error-600` | `#DC2626` | Rejections, Critical alerts |
| `--bg-slate` | `#F8FAFC` | Main application background |
| `--card-white` | `#FFFFFF` | Component backgrounds |

### 2.2 Typography
- **Primary Font**: `Inter` (Sans-serif) - chosen for exceptional legibility on digital screens.
- **Heading Font**: `Plus Jakarta Sans` - for a modern, contemporary institutional feel.

| Role | Size | weight |
| :--- | :--- | :--- |
| `H1` | `2.25rem` | `700` |
| `H2` | `1.5rem` | `600` |
| `Body Large` | `1.125rem` | `400` |
| `Body Base` | `1rem` | `400` |
| `Caption` | `0.875rem` | `500` |

### 2.3 Spacing & Radius
- **Base Unit**: `4px`
- **Border Radius**: `8px` (Standard components), `12px` (Cards), `9999px` (Pills/Buttons).
- **Shadows**: Soft, multi-layered shadows for a "lifted" professional feel.

## 3. Core Components

### 3.1 Analytics Cards
High-impact cards with sparkline charts and clear metric labeling.

### 3.2 Professional Data Tables
- Sticky headers.
- Row highlighting on hover.
- Integrated status badges (Emerald for Active, Slate for Trainee, etc.).

### 3.3 Workflow Visualizer
A vertical or horizontal timeline component displaying the current state in an HR process (e.g., Promotion Workflow).

## 4. Accessibility (WCAG 2.1)
- Contrast ratio >= 4.5:1 for all text.
- Focus rings for keyboard navigation.
- Semantic HTML tags for screen readers.
