# user-interface Specification

> User interface components and interactions

## Purpose

Manage user interface for Weld-Weld-Weld calculator.

## Requirements

### Requirement: Method Selection
System shall allow user to select welding method (MMA, MIG/MAG, TIG, SAW).

#### Scenario: Select MMA Method
- GIVEN calculator is loaded
- WHEN user selects MMA method
- THEN system shows ГОСТ 5264 and ГОСТ 11534 options

### Requirement: ГОСТ Selection
System shall allow user to select applicable ГОСТ based on method.

#### Scenario: Select ГОСТ 5264
- GIVEN MMA method selected
- WHEN user selects ГОСТ 5264
- THEN system shows joint types for that ГОСТ

### Requirement: Joint Type Selection
System shall allow user to select joint type.

#### Scenario: Select Joint Type
- GIVEN ГОСТ selected
- WHEN user selects joint type
- THEN system loads parameters for that joint

### Requirement: Parameter Input Fields (ADDED 2026-03-03)

System shall provide input fields for all weld geometry parameters.

#### Scenario: All parameter inputs exist
- GIVEN calculator is loaded
- WHEN user views the parameter section
- THEN the following input fields are present:
  - Thickness (S) — select or input
  - Gap (b) — number input
  - Blunting (c) — number input
  - Weld width (e) — number input
  - Reinforcement height (g) — number input
  - Upper groove angle (α) — number input
  - Lower groove angle (β) — number input
  - Transition radius (R) — number input
  - Pipe diameter (d) — number input
  - Refractive height (h) — number input
  - Protrusion end (n) — number input
  - Second weld width (e1) — number input
  - Second reinforcement height (g1) — number input

#### Scenario: Input fields have labels
- GIVEN calculator is loaded
- WHEN user views parameter inputs
- THEN each input has a label in Russian with parameter symbol

#### Scenario: Input fields have placeholders
- GIVEN calculator is loaded
- WHEN user views empty input
- THEN placeholder shows "0"

### Requirement: Result Display (ADDED 2026-03-03)

System shall display calculation results in designated fields.

#### Scenario: Result fields are identifiable
- GIVEN calculator is loaded
- WHEN user views result section
- THEN result fields have IDs:
  - resultFn — cross-sectional area
  - resultMn — deposited metal mass
  - resultGe — consumption rate
  - resultHe — total consumption

#### Scenario: Results are formatted
- GIVEN calculation is complete
- WHEN result is displayed
- THEN values show 2-4 decimal places
- AND units are visible (мм², г/м, г)

## Status

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Method Selection | ✅ Working | calculation.js |
| ГОСТ Selection | ✅ Working | calculation.js |
| Joint Type Selection | ✅ Working | calculation.js |
| Parameter Input Fields | ✅ Implemented | index.html |
| Result Display | ✅ Implemented | formulas.js, index.html |
| Input Validation | ✅ Implemented | validation.js |
| Error Display | ✅ Implemented | validation.js |
| Clear on Type Change | ✅ Implemented | calculation.js |

## Change History

| Date | Change | Impact |
|------|--------|--------|
| 2026-03-03 | Added 13 input fields | ADDED: Parameter Input Fields |
| 2026-03-03 | Added result field IDs | ADDED: Result Display |
| 2026-03-03 | Added validation | ADDED: Input Validation |
| 2026-03-03 | Added error display | ADDED: Error Display |
| 2026-03-03 | Added clear on change | MODIFIED: Clear on Type Change |