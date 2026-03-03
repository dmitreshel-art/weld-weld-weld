# welding-calculations Spec Delta

## ADDED Requirements

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

## MODIFIED Requirements

### Requirement: Calculation Execution

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

## ADDED Requirements

### Requirement: Diameter-based Length Calculation

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