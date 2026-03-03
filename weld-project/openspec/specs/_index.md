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

---

## Archived Changes

| Change ID | Title | Date | Result |
|-----------|-------|------|--------|
| fix-calculator-basics | Fix Calculator Basics | 2026-03-03 | ✅ SUCCESS |

**Summary:** Added 13 input fields, connected variables, loaded JSON, results display correctly.

---

## Known Issues (Updated 2026-03-03)

| ID | Title | Severity | Status | Resolution |
|----|-------|----------|--------|------------|
| CRIT-001 | Missing input fields | 🔴 10/10 | ✅ FIXED | Added 13 inputs |
| CRIT-002 | Variables not connected | 🔴 10/10 | ✅ FIXED | Connected via getParamValue() |
| CRIT-003 | exel.json not loaded | 🔴 8/10 | ✅ FIXED | fetch() added |
| CRIT-004 | Thickness limited to select | 🟠 6/10 | ⬜ OPEN | Future change |
| CRIT-005 | No error handling | 🟠 7/10 | ⬜ OPEN | Future change |
| QUAL-001 | Duplicate code | 🟡 Medium | ⬜ OPEN | Future change |
| QUAL-002 | Magic numbers | 🟡 Medium | ⬜ OPEN | Future change |
| QUAL-003 | No input validation | 🟡 Medium | ⬜ OPEN | Future change |

**Note:** 3 of 7 critical issues resolved in fix-calculator-basics change.

---

## Roadmap (Updated 2026-03-03)

### Phase 1: Critical Fixes ✅ DONE
1. ✅ Fix BUG-001: Parameter loading
2. ✅ Fix BUG-002: Diameter input
3. ⬜ Implement input validation (future)
4. ⬜ Add error handling (future)

### Phase 2: Enhancements
1. Mobile responsive design
2. Export to PDF
3. History (LocalStorage)
4. PWA support

### Phase 3: Scale
1. Material database
2. Spatial position coefficients
3. Multi-language support
4. Backend API option