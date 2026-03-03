# joint-geometry Specification

> Joint geometry parameters and diagram display

## Purpose

Manage geometry parameters for different joint types and display visual diagrams of joint cross-sections.

## Requirements

### Requirement: Parameter Loading

System shall load joint parameters from reference data when joint type is selected.

#### Scenario: Load default parameters
- GIVEN user selects joint type C2
- WHEN system loads joint configuration
- THEN parameter S is set to default value 2
- AND parameter b is set to default value 1
- AND other parameters are hidden (not applicable for C2)

#### Scenario: Load parameter limits
- GIVEN user selects joint type C8
- WHEN system loads joint configuration
- THEN parameter S has min=3, max=20
- AND parameter b has min=0, max=3
- AND parameter e has min=10, max=30
- AND parameter g has min=1, max=5

### Requirement: Dynamic Parameter Fields

System shall show/hide parameter input fields based on joint type.

#### Scenario: Simple joint (C2)
- GIVEN joint type C2 (butt, no edge prep)
- WHEN system displays parameter inputs
- THEN S (thickness) input is visible
- AND b (gap) input is visible
- AND e (width) input is hidden
- AND g (height) input is hidden
- AND α (angle) input is hidden
- AND β (angle) input is hidden
- AND R (radius) input is hidden
- AND d (diameter) input is hidden

#### Scenario: Complex joint (C8)
- GIVEN joint type C8 (butt, V-prep)
- WHEN system displays parameter inputs
- THEN S (thickness) input is visible
- AND b (gap) input is visible
- AND e (width) input is visible
- AND g (height) input is visible
- AND α (upper angle) input is visible
- AND β (lower angle) input is hidden

#### Scenario: Pipe joint (C2-pipe)
- GIVEN joint type requires pipe geometry
- WHEN system displays parameter inputs
- THEN d (diameter) input is visible
- AND label shows "Диаметр трубы (d), мм"

### Requirement: Diagram Display

System shall display visual diagram of selected joint type.

#### Scenario: Show joint diagram
- GIVEN user selects joint type C8
- WHEN system loads joint configuration
- THEN diagram image is loaded from assets/C8.svg (or .png)
- AND diagram shows cross-section view
- AND all applicable parameters are labeled on diagram

#### Scenario: Diagram not available
- GIVEN joint type has no diagram file
- WHEN system attempts to load diagram
- THEN placeholder image is shown
- OR diagram area is hidden

### Requirement: Parameter Labels

System shall display parameter labels with units.

#### Scenario: Thickness parameter
- GIVEN S parameter is visible
- THEN label shows "Толщина металла (S), мм"
- AND placeholder shows default or min value

#### Scenario: Gap parameter
- GIVEN b parameter is visible
- THEN label shows "Зазор (b), мм"
- AND placeholder shows default or min value

#### Scenario: Diameter parameter
- GIVEN d parameter is visible
- THEN label shows "Диаметр трубы (d), мм"
- AND placeholder shows "100"

### Requirement: Joint Type Categorization

System shall categorize joints by type and method.

#### Scenario: Filter by method
- GIVEN user selects MMA method
- WHEN system filters joint types
- THEN joints from ГОСТ 5264 and ГОСТ 11534 are shown
- AND joints with MIG/MAG only are hidden

#### Scenario: Filter by ГОСТ
- GIVEN user selects ГОСТ 14771
- WHEN system filters joint types
- THEN joints applicable to ГОСТ 14771 are shown
- AND other joints are hidden

### Requirement: Joint Metadata

System shall display metadata for selected joint.

#### Scenario: Show joint description
- GIVEN user selects joint type C2
- THEN description shows "Стыковое соединение без скоса кромок"
- AND applicable methods are listed: MMA, MIG/MAG
- AND applicable ГОСТы are listed: ГОСТ 5264, ГОСТ 14771

### Requirement: Reference Data Source

System shall load reference data from exel.json.

#### Scenario: Data file present
- GIVEN exel.json exists in project root
- WHEN application initializes
- THEN data is loaded successfully
- AND all 56 joint types are available

#### Scenario: Data file missing
- GIVEN exel.json is not found
- WHEN application attempts to load data
- THEN error is logged to console
- AND user sees message "Ошибка загрузки данных"
- AND dropdown is empty

#### Scenario: Data file invalid JSON
- GIVEN exel.json has syntax error
- WHEN application attempts to parse
- THEN error is logged to console
- AND fallback to default dataset OR error message

## Edge Cases

### Unknown Joint Type
- IF selected joint type not in reference data
- THEN show error "Неизвестный тип соединения"
- AND disable calculation

### Missing Parameter Metadata
- IF parameter limits not defined for joint type
- THEN allow any positive input
- AND warn in console

### Diagram Load Failure
- IF diagram image fails to load
- THEN show placeholder
- AND log error
- AND continue with calculation

## Data Structure

### Joint Configuration (exel.json)

```json
{
  "C2": {
    "method": ["MMA", "MIG/MAG"],
    "gost": ["ГОСТ 5264", "ГОСТ 14771"],
    "type": "стыковое",
    "description": "Стыковое соединение без скоса кромок",
    "params": {
      "S": { "min": 1, "max": 4, "default": 2 },
      "b": { "min": 0, "max": 3, "default": 1 }
    },
    "formula": "Fn = 0.75 * b * S",
    "diagram": "assets/C2.svg"
  }
}
```

### Parameter Definitions

| Symbol | Name (RU) | Name (EN) | Unit | UI Label |
|--------|-----------|-----------|------|----------|
| S | Толщина металла | Thickness | мм | Толщина металла (S), мм |
| b | Зазор | Gap | мм | Зазор (b), мм |
| c | Притупление | Blunting | мм | Притупление (c), мм |
| e | Ширина шва | Weld width | мм | Ширина шва (e), мм |
| g | Высота усиления | Reinforcement height | мм | Высота усиления (g), мм |
| α | Угол разделки (верхний) | Groove angle (upper) | ° | Угол разделки α, ° |
| β | Угол разделки (нижний) | Groove angle (lower) | ° | Угол разделки β, ° |
| R | Радиус перехода | Transition radius | мм | Радиус перехода (R), мм |
| d | Диаметр трубы | Pipe diameter | мм | Диаметр трубы (d), мм |
| k | Катет шва | Weld leg | мм | Катет шва (k), мм |

### Joint Type Categories

| Prefix | Category (RU) | Category (EN) |
|--------|---------------|---------------|
| С | Стыковые | Butt joints |
| У | Угловые | Corner joints |
| Т | Тавровые | T-joints |
| Н | Нахлёсточные | Lap joints |

## Requirements (ADDED 2026-03-03)

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

### Requirement: Parameter Population (MODIFIED 2026-03-03)

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

## Status (Updated 2026-03-03)

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Parameter Loading | ⚠️ Partial | calculation.js - JSON loaded, but population limited |
| Dynamic Parameter Fields | ⚠️ Partial | index.html - fields added, but visibility static |
| Diagram Display | ⬜ Not Implemented | Not in scope |
| Parameter Labels | ✅ Implemented | index.html |
| Joint Type Categorization | ✅ Working | calculation.js |
| Joint Metadata | ⬜ Not Implemented | Not in scope |
| Reference Data Source | ✅ Implemented | calculation.js |

## Change History

| Date | Change | Impact |
|------|--------|--------|
| 2026-03-03 | Added JSON loading | ADDED: Data Loading from JSON |
| 2026-03-03 | Added population logic | MODIFIED: Parameter Population |