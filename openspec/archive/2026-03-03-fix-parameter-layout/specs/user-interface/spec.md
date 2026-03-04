# user-interface Spec Delta

## MODIFIED Requirements

### Requirement: Parameter Input Fields Layout

- BEFORE: Input fields with fixed 400px width, labels 20px, no container styles
- AFTER: Compact layout with 300px input width, 16px labels, container margins

#### Scenario: Compact parameter layout
- GIVEN calculator is loaded
- WHEN user views parameter section
- THEN input fields have width 300px
- AND labels have font-size 16px
- AND parameter container has margin-top 20px

#### Scenario: No horizontal overflow
- GIVEN all parameter inputs are visible
- WHEN user scrolls page
- THEN no horizontal scrollbar appears
- AND all inputs fit within viewport

### Requirement: Advanced Parameters Hidden

- BEFORE: All parameters visible at once
- AFTER: Advanced parameters hidden in collapsible section

#### Scenario: Advanced params hidden by default
- GIVEN user selects basic joint type (С1, С2, etc.)
- WHEN page displays parameters
- THEN only basic parameters are visible
- AND advanced parameters are hidden

#### Scenario: Advanced params visible for complex joints
- GIVEN user selects complex joint type (С8, С17, etc.)
- WHEN page displays parameters
- THEN angle fields are visible
- AND advanced section may be shown

### Requirement: Error Display Styling

- BEFORE: No error styling defined
- AFTER: Red border, red text for validation errors

#### Scenario: Input with error
- GIVEN input field fails validation
- WHEN error is displayed
- THEN input has red border (#e94560)
- AND error message appears below input in red
- AND error message font-size is 12px