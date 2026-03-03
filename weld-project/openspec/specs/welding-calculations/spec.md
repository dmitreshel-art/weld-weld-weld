# welding-calculations Specification

> Calculations for welding material consumption

## Purpose

Calculate material consumption norms for various welding methods and joint types according to Russian ГОСТ standards.

## Requirements

### Requirement: Area Calculation (Fn)

System shall calculate cross-sectional area of deposited metal based on joint type and geometry.

#### Scenario: Butt joint without edge preparation (С2)
- GIVEN joint type is С2 (butt joint, no edge prep)
- GIVEN thickness S = 3mm and gap b = 2mm
- WHEN user triggers calculation
- THEN system calculates Fn = 0.75 × b × S
- AND displays Fn = 4.5 mm²

#### Scenario: Butt joint with V-preparation (С8)
- GIVEN joint type is С8 (butt joint, V-prep)
- GIVEN thickness S = 10mm, gap b = 2mm, width e = 20mm, height g = 3mm
- WHEN user triggers calculation
- THEN system calculates Fn = e × g + b × S
- AND displays Fn = 80 mm²

#### Scenario: Fillet joint (У1)
- GIVEN joint type is У1 (fillet joint)
- GIVEN leg size k = 5mm
- WHEN user triggers calculation
- THEN system calculates Fn = 0.5 × k²
- AND displays Fn = 12.5 mm²

### Requirement: Mass Calculation (Mn)

System shall calculate mass of deposited metal per meter of weld.

#### Scenario: Mass from area
- GIVEN cross-sectional area Fn = 50 mm²
- WHEN system calculates Mn
- THEN Mn = 0.00785 × Fn
- AND displays Mn = 0.3925 g/m

### Requirement: Consumption Rate (Ge)

System shall apply material loss coefficient based on welding method.

#### Scenario: MMA (covered electrode) consumption
- GIVEN Mn = 10 g/m
- GIVEN method is MMA
- WHEN system calculates Ge
- THEN Ge = Mn × 1.70
- AND displays Ge = 17 g/m

#### Scenario: MIG/MAG (wire + gas) consumption
- GIVEN Mn = 10 g/m
- GIVEN method is MIG/MAG
- WHEN system calculates Ge
- THEN Ge = Mn × 1.15
- AND displays Ge = 11.5 g/m

#### Scenario: TIG (tungsten + argon) consumption
- GIVEN Mn = 10 g/m
- GIVEN method is TIG
- WHEN system calculates Ge
- THEN Ge = Mn × 1.10
- AND displays Ge = 11 g/m

#### Scenario: SAW (wire + flux) consumption
- GIVEN Mn = 10 g/m
- GIVEN method is SAW
- WHEN system calculates Ge
- THEN Ge = Mn × 1.02
- AND displays Ge = 10.2 g/m

### Requirement: Total Consumption (He)

System shall calculate total material consumption per joint.

#### Scenario: Flat joint (1 meter)
- GIVEN Ge = 17 g/m
- GIVEN joint length Lh = 1m
- WHEN system calculates He
- THEN He = Ge × Lh
- AND displays He = 17 g

#### Scenario: Pipe joint (circumference)
- GIVEN Ge = 17 g/m
- GIVEN pipe diameter d = 100mm = 0.1m
- WHEN system calculates He
- THEN Lh = d × π = 0.1 × 3.14159
- AND He = Ge × Lh = 17 × 0.314159
- AND displays He = 5.34 g

### Requirement: Formula Selection

System shall select correct formula based on joint type.

#### Scenario: Joint type C2 formula
- GIVEN joint type is C2
- WHEN system needs area formula
- THEN formula Fn = 0.75 × b × S is selected

#### Scenario: Joint type C8 formula
- GIVEN joint type is C8
- WHEN system needs area formula
- THEN formula Fn = e × g + b × S is selected

#### Scenario: Joint type U1 formula
- GIVEN joint type is U1
- WHEN system needs area formula
- THEN formula Fn = 0.5 × k² is selected

### Requirement: Real-time Calculation

System shall update results as user changes parameters.

#### Scenario: Parameter change triggers recalculation
- GIVEN user has selected joint and entered parameters
- WHEN user changes any parameter value
- THEN system recalculates all results
- AND updates display within 100ms

### Requirement: Input Validation

System shall validate parameters against joint type limits.

#### Scenario: Parameter within limits
- GIVEN joint type C2 with S min=1, max=4
- WHEN user enters S = 3
- THEN input is accepted
- AND calculation proceeds

#### Scenario: Parameter below minimum
- GIVEN joint type C2 with S min=1, max=4
- WHEN user enters S = 0.5
- THEN input is rejected
- AND error message "Значение должно быть не менее 1 мм" is shown

#### Scenario: Parameter above maximum
- GIVEN joint type C2 with S min=1, max=4
- WHEN user enters S = 5
- THEN input is rejected
- AND error message "Значение должно быть не более 4 мм" is shown

## Edge Cases

### Missing Parameters
- IF any required parameter is empty
- THEN show placeholder or default
- AND calculation shows "—"

### Invalid Joint Type
- IF selected joint type not in formula mapping
- THEN show error "Неподдерживаемый тип соединения"

### Zero Division
- IF calculation involves division by zero
- THEN show error or handle gracefully

### Negative Values
- IF any parameter is negative
- THEN reject with error message

## Requirements (ADDED 2026-03-03)

### Requirement: Variable Input Binding

System shall read parameter values from UI inputs before calculation.

#### Scenario: Read all parameter values
- GIVEN user has entered values in input fields
- WHEN user clicks calculate button
- THEN system reads values from all input fields
- AND assigns them to calculation variables

#### Scenario: Handle empty inputs
- GIVEN user has not entered value in some field
- WHEN system reads the field value
- THEN the variable is set to 0 (not undefined)

#### Scenario: Handle non-numeric inputs
- GIVEN user has entered non-numeric text in field
- WHEN system reads the field value
- THEN the variable is set to 0 (not NaN)

### Requirement: Calculation Execution (MODIFIED 2026-03-03)

- BEFORE: Variables declared but never assigned, calculation produces NaN
- AFTER: Variables assigned from inputs, calculation produces valid results

#### Scenario: Calculate with all inputs
- GIVEN all required inputs are filled with valid numbers
- WHEN user clicks calculate
- THEN Fn is calculated using correct formula
- AND Mn = ρ × Fn
- AND Ge = k × Mn (based on selected method)
- AND He = Ge × Lh (or Ge × d × π for pipes)

#### Scenario: Calculate with some empty inputs
- GIVEN some inputs are empty
- WHEN user clicks calculate
- THEN empty inputs are treated as 0
- AND calculation proceeds (may give 0 result)
- AND no NaN appears in results

#### Scenario: No NaN in results
- GIVEN any combination of inputs
- WHEN user clicks calculate
- THEN result fields never show "NaN" or "undefined"
- AND if calculation invalid, show "—" or "0"

### Requirement: Diameter-based Length Calculation (ADDED 2026-03-03)

System shall calculate weld length based on pipe diameter when applicable.

#### Scenario: Pipe weld length calculation
- GIVEN diameter input has value > 0
- WHEN system calculates He
- THEN Lh = d × π (circumference)
- AND He = Ge × Lh

#### Scenario: Flat weld length
- GIVEN diameter input is empty or 0
- WHEN system calculates He
- THEN Lh = 1 (1 meter)
- AND He = Ge × 1

## Status (Updated 2026-03-03)

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Area Calculation (Fn) | ✅ Working | formulas.js |
| Mass Calculation (Mn) | ✅ Working | formulas.js |
| Consumption Rate (Ge) | ✅ Working | formulas.js |
| Total Consumption (He) | ✅ Working | formulas.js |
| Variable Input Binding | ✅ Implemented | formulas.js |
| Diameter-based Length | ✅ Implemented | formulas.js |

## Change History

| Date | Change | Impact |
|------|--------|--------|
| 2026-03-03 | Added input binding | ADDED: Variable Input Binding |
| 2026-03-03 | Fixed calculation | MODIFIED: Calculation Execution |
| 2026-03-03 | Added diameter support | ADDED: Diameter-based Length |