<!--
Sync Impact Report:
- Version change: N/A → 1.0.0
- Initial constitution creation
- Principles defined:
  1. Type Safety First
  2. Component Modularity
  3. User Experience Priority
  4. Performance & Optimization
  5. Deployment Readiness
- Templates requiring updates:
  ✅ plan-template.md - aligned with constitution check requirements
  ✅ spec-template.md - requirements align with UX and type safety principles
  ✅ tasks-template.md - task categories reflect principles
- Follow-up TODOs: None
-->

# Invoice Helper Constitution

## Core Principles

### I. Type Safety First (NON-NEGOTIABLE)

TypeScript MUST be used throughout the codebase with strict mode enabled. All components, utilities, and services MUST have explicit type definitions. No use of `any` type unless absolutely necessary and justified in code comments.

**Rationale**: Type safety prevents runtime errors, improves developer experience with autocomplete, and serves as living documentation. For invoice generation accuracy is critical—type errors could lead to incorrect calculations.

### II. Component Modularity

Features MUST be implemented as self-contained, reusable React components. Each component should have a single responsibility and be independently testable. Components MUST separate presentation logic from business logic.

**Rationale**: Modular components enable easier maintenance, testing, and future feature additions. Invoice forms and previews need to be composable for different use cases.

### III. User Experience Priority

All user-facing features MUST support responsive design for mobile and desktop. Form validation MUST provide clear, immediate feedback. Loading states and error messages MUST be user-friendly and localized (Traditional Chinese primary).

**Rationale**: Invoice generation is a business-critical task. Poor UX leads to data entry errors and user frustration. Mobile support is essential for on-the-go invoice creation.

### IV. Performance & Optimization

Components MUST use React best practices (memoization, lazy loading where appropriate). Bundle size MUST be monitored. URL parameter handling MUST not cause unnecessary re-renders.

**Rationale**: As a client-side application, performance directly impacts user satisfaction. Slow invoice preview or calculation updates frustrate users and reduce productivity.

### V. Deployment Readiness

All features MUST be compatible with Cloudflare Pages deployment. Build process MUST succeed without warnings. Environment-specific configurations MUST use proper environment variable handling.

**Rationale**: The application is designed for Cloudflare Workers platform. Features that break deployment or require server-side processing violate the architectural constraints.

## Testing Standards

### Unit Testing

All utility functions (invoice calculations, date formatting, validation) MUST have comprehensive unit tests. Edge cases (tax calculations, rounding, zero amounts) MUST be covered.

### Integration Testing

User flows (form submission, URL parameter loading, invoice preview) MUST be tested end-to-end. Screenshot functionality MUST be verified across browsers.

### Manual Testing Checklist

Before feature completion:
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Verify URL parameter pre-fill functionality
- [ ] Validate tax calculations for all tax types (general, zero-rate, tax-exempt)
- [ ] Check responsive layout breakpoints
- [ ] Verify Traditional Chinese text rendering

## Code Quality Standards

### File Organization

- `src/components/` - Reusable UI components
- `src/hooks/` - Custom React hooks
- `src/services/` - External API integrations
- `src/types/` - TypeScript type definitions
- `src/utils/` - Pure utility functions

### Naming Conventions

- Components: PascalCase (e.g., `InvoiceForm.tsx`)
- Utilities: camelCase (e.g., `invoiceUtils.ts`)
- Types/Interfaces: PascalCase with descriptive names (e.g., `InvoiceFormData`)
- CSS classes: Follow Tailwind conventions

### Documentation

Public APIs and complex utility functions MUST include JSDoc comments. Component props MUST be documented when behavior is non-obvious.

## Governance

### Constitution Authority

This constitution governs all development practices for the Invoice Helper project. All code reviews, feature planning, and implementation MUST verify compliance with these principles.

### Amendment Procedure

1. Propose amendment with clear rationale
2. Document impact on existing codebase
3. Update affected templates and documentation
4. Increment version following semantic versioning:
   - MAJOR: Fundamental principle changes
   - MINOR: New principle additions
   - PATCH: Clarifications and wording improvements

### Compliance Review

All pull requests MUST:
- Pass TypeScript compilation with no errors
- Include appropriate tests
- Follow component modularity principles
- Not introduce performance regressions
- Maintain Cloudflare Pages compatibility

**Version**: 1.0.0 | **Ratified**: 2025-10-06 | **Last Amended**: 2025-10-06
