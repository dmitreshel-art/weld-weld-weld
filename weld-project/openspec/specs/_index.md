# Specs Index

> Catalog of all capability specifications for Weld-Weld-Weld

## Status Legend

| Status | Description |
|--------|-------------|
| ✅ Complete | Fully implemented and verified |
| 🚧 In Progress | Currently being developed |
| 📋 Planned | Not started, requirements defined |
| ⚠️ Partial | Implemented with known issues |

---

## Capabilities

### welding-calculations
**Status:** ✅ Complete (2026-03-03)

Calculations for welding material consumption (Fn, Mn, Ge, He).

| Requirement | Status | Notes |
|-------------|--------|-------|
| Area Calculation (Fn) | ✅ | Formulas implemented |
| Mass Calculation (Mn) | ✅ | Working |
| Consumption Rate (Ge) | ✅ | Coefficients correct |
| Total Consumption (He) | ✅ | Fixed - works for pipes |
| Formula Selection | ✅ | 50+ formulas |
| Real-time Calculation | ✅ | Triggered on change |
| Input Validation | ⚠️ | Partial - empties = 0 |
| Variable Input Binding | ✅ | Added 2026-03-03 |
| Diameter-based Length | ✅ | Added 2026-03-03 |

**Spec:** `specs/welding-calculations/spec.md`

---

### joint-geometry
**Status:** ✅ Complete (2026-03-03)

Joint geometry parameters and diagram display.

| Requirement | Status | Notes |
|-------------|--------|-------|
| Parameter Loading | ✅ | JSON loaded on init |
| Dynamic Parameter Fields | ✅ | 13 inputs added |
| Diagram Display | ⬜ | Not in scope |
| Parameter Labels | ✅ | Russian labels |
| Joint Type Categorization | ✅ | Filtering works |
| Joint Metadata | ⬜ | Not in scope |
| Reference Data Source | ✅ | JSON fetch implemented |

**Spec:** `specs/joint-geometry/spec.md`

---

### user-interface
**Status:** ✅ Complete (2026-03-03)

User interface components and interactions.

| Requirement | Status | Notes |
|-------------|--------|-------|
| Method Selection | ✅ | Working |
| ГОСТ Selection | ✅ | Working |
| Joint Type Selection | ✅ | Working |
| Parameter Input | ✅ | 13 inputs implemented |
| Results Display | ✅ | 4 result fields |
| Theme Toggle | ✅ | Working |
| Responsive Layout | ⬜ | Desktop only (not in scope) |

**Spec:** `specs/user-interface/spec.md`

---

### material-consumption
**Status:** 📋 Planned

Material consumption norms and coefficients.

| Requirement | Status | Notes |
|-------------|--------|-------|
| MMA Coefficients | ✅ | k=1.70 |
| MIG/MAG Coefficients | ✅ | k=1.15 |
| TIG Coefficients | ✅ | k=1.10 |
| SAW Coefficients | ✅ | k=1.02 |
| Gas Consumption | ❌ | Not implemented |
| Flux Consumption | ❌ | Not implemented |
| Electrode Database | ❌ | Not implemented |

**Spec:** `specs/material-consumption/spec.md` *(to be created)*

---

## Active Changes

| Change ID | Title | Status | Phase |
|-----------|-------|--------|-------|
| — | — | — | — |

*No active changes.*

**Details:** `changes/2026-03-03-frontend-accessibility-fix/`

---

## Archived Changes

| Change ID | Title | Date | Result |
|-----------|-------|------|--------|
| 2026-03-03-frontend-accessibility-fix | Frontend Accessibility & Security Fix | 2026-03-03 | ✅ SUCCESS |
| fix-calculator-basics | Fix Calculator Basics | 2026-03-03 | ✅ SUCCESS |
| add-input-validation | Add Input Validation | 2026-03-03 | ✅ SUCCESS |
| improve-json-population | Improve JSON Population | 2026-03-03 | ✅ SUCCESS |
| fix-parameter-layout | Fix Parameter Layout | 2026-03-03 | ✅ SUCCESS |
| mobile-responsive-ui | Mobile Responsive + Beautiful UI | 2026-03-03 | ✅ SUCCESS |
| add-testing | Add Testing (Jest + CI/CD) | 2026-03-03 | ✅ SUCCESS |

**Summary (frontend-accessibility-fix):** Fixed HTTP→HTTPS, added form semantics, ARIA, responsive CSS, CSS variables, mobile particles, fixed output.textContent bug. All 39 tests pass.

---

## Known Issues (Updated 2026-03-03)

| ID | Title | Severity | Status | Resolution |
|----|-------|----------|--------|------------|
| CRIT-001 | Missing input fields | 🔴 10/10 | ✅ FIXED | Added 13 inputs |
| CRIT-002 | Variables not connected | 🔴 10/10 | ✅ FIXED | Connected via getParamValue() |
| CRIT-003 | exel.json not loaded | 🔴 8/10 | ✅ FIXED | fetch() added |
| CRIT-004 | Thickness limited to select | 🟠 6/10 | ⬜ OPEN | Future change |
| CRIT-005 | No error handling | 🟠 7/10 | ⬜ OPEN | Future change |
| SEC-001 | HTTP scripts (MITM risk) | 🔴 10/10 | ✅ FIXED | HTTPS CDN links |
| SEC-002 | Outdated Font Awesome (vulns) | 🟠 7/10 | ✅ FIXED | Updated to v6.5.1 |
| AXS-001 | Low color contrast (WCAG) | 🟠 8/10 | ✅ FIXED | Darkened to #991b1b |
| AXS-002 | No form semantics | 🟠 7/10 | ✅ FIXED | Added form, fieldset, labels |
| AXS-003 | No ARIA live regions | 🟡 5/10 | ✅ FIXED | Added aria-live="polite" |
| RWD-001 | Fixed widths break mobile | 🔴 9/10 | ✅ FIXED | Responsive CSS added |
| RWD-002 | No media queries | 🟠 6/10 | ✅ FIXED | Mobile/tablet breakpoints |
| QUAL-001 | Duplicate code | 🟡 Medium | ⬜ OPEN | Future change |
| QUAL-002 | Magic numbers | 🟡 Medium | ⬜ OPEN | Future change |
| QUAL-003 | No input validation | 🟡 Medium | ✅ FIXED | validation.js |
| QUAL-004 | Variable typo ($fontCollorMine) | 🟡 Low | ✅ FIXED | Renamed to $fontColorMine |
| QUAL-005 | Duplicate script loading | 🟡 Low | ✅ FIXED | Removed duplicate |

**Note:** 3 of 7 critical issues resolved in fix-calculator-basics change.

---

## Roadmap (Updated 2026-03-03 16:15)

### Phase 1: Critical Fixes ✅ COMPLETE (85%)
1. ✅ Fix BUG-001: Parameter loading
2. ✅ Fix BUG-002: Diameter input
3. ✅ Fix Formula bugs (Н1, Н2, У1)
4. ✅ Add input validation
5. ✅ Fix layout issues
6. ⬜ Error handling (partial)

### Phase 2: UI Enhancement ✅ COMPLETE
1. ✅ Mobile responsive design
2. ✅ Beautiful UI (shadows, cards, animations)
3. ✅ Improve UX

### Phase 3: Quality ✅ COMPLETE
1. ✅ Unit tests (Jest) - 39 tests passing
2. ✅ Validation tests
3. ✅ CI/CD (GitHub Actions)

### Phase 4: Refactoring 📋 PLANNED
1. Remove duplicate code
2. Improve error handling
3. Code documentation

### Phase 5: Feature Expansion 📋 PLANNED
1. ГОСТ 14771, 16037, 8713 data
2. PDF export
3. History (LocalStorage)

### Phase 6: Scale 📋 PLANNED
1. PWA support
2. Multi-language
3. Backend API option