# joint-geometry Spec Delta

## ADDED Requirements

### Requirement: Data Loading from JSON

System shall load joint geometry data from exel.json file.

#### Scenario: Load data on page initialization
- GIVEN calculator page is loading
- WHEN DOMContentLoaded event fires
- THEN system fetches exel.json
- AND parses JSON data
- AND stores data in memory for later use

#### Scenario: Handle data load failure
- GIVEN exel.json fetch fails
- WHEN network error or file not found
- THEN system logs error to console
- AND shows user-friendly message
- AND calculator continues with limited functionality

#### Scenario: Data structure after load
- GIVEN exel.json is loaded
- WHEN data is parsed
- THEN data is array of objects with:
  - connectionType (e.g., "С1")
  - thickness (e.g., "1")
  - gap (e.g., "0.5")
  - weldWidth (e.g., "4")
  - gainHeight (e.g., "1")

## MODIFIED Requirements

### Requirement: Parameter Population

- BEFORE: Parameters hardcoded in JS arrays
- AFTER: Parameters loaded from JSON based on selection

#### Scenario: Populate inputs on joint selection
- GIVEN exel.json is loaded
- AND user selects joint type "С1" and thickness "1"
- WHEN system finds matching data entry
- THEN gap input is set to "0.5"
- AND weldWidth input is set to "4"
- AND gainHeight input is set to "1"

#### Scenario: Populate inputs on thickness change
- GIVEN joint type "С1" is selected
- AND user changes thickness from "1" to "2"
- WHEN system finds matching data entry
- THEN gap input is updated to "1"
- AND weldWidth input is updated to "7"
- AND gainHeight input is updated to "1"

#### Scenario: No matching data found
- GIVEN user selects combination not in JSON
- WHEN system searches for match
- THEN inputs are cleared (empty)
- OR inputs show default values
- AND no error is thrown