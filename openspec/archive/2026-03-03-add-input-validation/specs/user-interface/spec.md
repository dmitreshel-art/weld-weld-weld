# user-interface Spec Delta

## ADDED Requirements

### Requirement: Input Validation

System shall validate user input before performing calculations.

#### Scenario: Validate positive values
- GIVEN user enters a negative number
- WHEN validation runs
- THEN error message "Значение должно быть положительным" is displayed
- AND calculation is blocked

#### Scenario: Validate max values
- GIVEN user enters value exceeding maximum for joint type
- WHEN validation runs
- THEN error message "Значение должно быть не более {max}" is displayed
- AND calculation is blocked

#### Scenario: Validate min values
- GIVEN user enters value below minimum for joint type
- WHEN validation runs
- THEN error message "Значение должно быть не менее {min}" is displayed
- AND calculation is blocked

#### Scenario: Clear validation errors on valid input
- GIVEN validation error is shown
- WHEN user corrects the value
- THEN error message is cleared
- AND input styling returns to normal

### Requirement: Error Display

System shall display validation errors near the corresponding input field.

#### Scenario: Error appears below input
- GIVEN input field fails validation
- WHEN error is generated
- THEN error message appears directly below the input field
- AND input field has error styling (red border)

#### Scenario: Multiple errors shown
- GIVEN multiple inputs fail validation
- WHEN validation runs
- THEN all error messages are displayed simultaneously
- AND each appears below its corresponding input

#### Scenario: Errors clearable
- GIVEN error message is displayed
- WHEN user starts typing in the field
- AND value becomes valid
- THEN error message disappears immediately

## MODIFIED Requirements

### Requirement: Clear on Type Change

- BEFORE: Parameters remain filled when changing joint type
- AFTER: Parameters are cleared when changing joint type

#### Scenario: Clear on joint type change
- GIVEN user has entered parameters for joint type C1
- WHEN user selects different joint type (e.g., C8)
- THEN all parameter inputs are cleared
- AND any validation errors are cleared
- AND default values are NOT populated (user must enter)

#### Scenario: Clear on method change
- GIVEN user has entered parameters
- WHEN user changes welding method
- THEN all selections are reset to initial state
- AND all inputs are cleared