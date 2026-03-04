# user-interface Spec Delta

## ADDED Requirements

### Requirement: Parameter Input Fields

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
  - Example: "Зазор (b), мм"

#### Scenario: Input fields have placeholders
- GIVEN calculator is loaded
- WHEN user views empty input
- THEN placeholder shows example value or "0"

## MODIFIED Requirements

### Requirement: Result Display

- BEFORE: Results displayed in unnamed input fields
- AFTER: Results displayed in fields with specific IDs

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