# TEST-CASES

> Manual test cases for Weld-Weld-Weld

## Test Environment

| Item | Requirement |
|------|-------------|
| Browser | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| Screen | Desktop 1920×1080 minimum |
| Network | Local files (no server required) |
| Data | exel.json loaded correctly |

---

## TC-001: Method Selection

### TC-001.01: Select MMA Method

| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Preconditions** | Application loaded |

**Steps:**
1. Open index.html
2. Click method dropdown
3. Select "РД (MMA)"

**Expected Result:**
- Method dropdown shows "РД (MMA)"
- ГОСТ dropdown filters to: ГОСТ 5264, ГОСТ 11534
- Joint type dropdown filters to MMA-compatible joints

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-001.02: Select MIG/MAG Method

| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Preconditions** | Application loaded |

**Steps:**
1. Click method dropdown
2. Select "МП (MIG/MAG)"

**Expected Result:**
- ГОСТ dropdown shows: ГОСТ 14771, ГОСТ 23518
- Joint types filtered correctly

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-001.03: Select TIG Method

| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Preconditions** | Application loaded |

**Steps:**
1. Click method dropdown
2. Select "РАД (TIG)"

**Expected Result:**
- ГОСТ dropdown shows: ГОСТ 16037
- Joint types filtered correctly

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-001.04: Select SAW Method

| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Preconditions** | Application loaded |

**Steps:**
1. Click method dropdown
2. Select "АФ (SAW)"

**Expected Result:**
- ГОСТ dropdown shows: ГОСТ 8713
- Joint types filtered correctly

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

## TC-002: ГОСТ Selection

### TC-002.01: Select ГОСТ 5264

| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Preconditions** | MMA method selected |

**Steps:**
1. Click ГОСТ dropdown
2. Select "ГОСТ 5264"

**Expected Result:**
- Joint type dropdown shows: С1-С28, У1-У10, Т1-Т9, Н1-Н2
- Only joints from ГОСТ 5264 listed

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

## TC-003: Joint Type Selection

### TC-003.01: Select Butt Joint C2

| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Preconditions** | MMA method, ГОСТ 5264 selected |

**Steps:**
1. Click joint type dropdown
2. Select "С2 - Стыковое без скоса кромок"

**Expected Result:**
- Diagram shows C2 joint cross-section
- Parameter fields appear:
  - S (толщина): visible
  - b (зазор): visible
- Default values populated:
  - S = 2 мм
  - b = 1 мм

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail

**Bug Reference:** BUG-001 (parameters not loading)

---

### TC-003.02: Select V-Prep Joint C8

| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Preconditions** | MMA method, ГОСТ 5264 selected |

**Steps:**
1. Select "С8 - Стыковое с V-образным скосом"

**Expected Result:**
- Diagram shows C8 joint cross-section
- Parameter fields appear: S, b, e, g, α
- Default values populated from exel.json

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-003.03: Select Fillet Joint У1

| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Preconditions** | MMA method, ГОСТ 5264 selected |

**Steps:**
1. Select "У1 - Угловое тавровое"

**Expected Result:**
- Diagram shows У1 joint
- Parameter field: k (катет шва)
- Default value: k = 4 мм (example)

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

## TC-004: Calculation

### TC-004.01: Calculate Fn, Mn, Ge, He for C2

| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Preconditions** | C2 selected, S=3mm, b=2mm, MMA |

**Steps:**
1. Enter S = 3
2. Enter b = 2
3. Observe results

**Expected Results:**
| Field | Formula | Value |
|-------|---------|-------|
| Fn | 0.75 × b × S | 4.5 мм² |
| Mn | 0.00785 × Fn | 0.0353 г/м |
| Ge | 1.70 × Mn | 0.060 г/м |
| He | Ge × 1 | 0.060 г |

**Actual Results:**
| Field | Value |
|-------|-------|
| Fn | ________________ |
| Mn | ________________ |
| Ge | ________________ |
| He | ________________ |

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-004.02: Calculate for У1 Fillet

| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Preconditions** | У1 selected, k=5mm, MMA |

**Steps:**
1. Enter k = 5
2. Observe results

**Expected Results:**
| Field | Formula | Value |
|-------|---------|-------|
| Fn | 0.5 × k² | 12.5 мм² |
| Mn | 0.00785 × Fn | 0.098 г/м |
| Ge | 1.70 × Mn | 0.167 г/м |
| He | Ge × 1 | 0.167 г |

**Actual Results:**
| Field | Value |
|-------|-------|
| Fn | ________________ |
| Mn | ________________ |
| Ge | ________________ |
| He | ________________ |

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-004.03: Calculate for Pipe Joint

| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Type** | Functional |
| **Preconditions** | Pipe joint selected (cylindrical) |

**Steps:**
1. Select cylindrical joint (if available)
2. Enter diameter d = 100 mm
3. Enter other parameters

**Expected Results:**
- Diameter field is visible
- Lh = d × π
- He calculated correctly

**Actual Results:** ________________

**Status:** ⬜ Pass / ⬜ Fail

**Bug Reference:** BUG-002 (missing diameter input)

---

## TC-005: Input Validation

### TC-005.01: Below Minimum Value

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Validation |
| **Preconditions** | C2 selected (S: min=1, max=4) |

**Steps:**
1. Enter S = 0.5
2. Try to calculate

**Expected Result:**
- Input field shows error
- Message: "Значение должно быть не менее 1 мм"
- Calculation does not proceed

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail / ⬜ Not Implemented

---

### TC-005.02: Above Maximum Value

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Validation |
| **Preconditions** | C2 selected (S: min=1, max=4) |

**Steps:**
1. Enter S = 10
2. Try to calculate

**Expected Result:**
- Input field shows error
- Message: "Значение должно быть не более 4 мм"
- Calculation does not proceed

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail / ⬜ Not Implemented

---

### TC-005.03: Negative Value

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Validation |
| **Preconditions** | Any joint selected |

**Steps:**
1. Enter S = -5

**Expected Result:**
- Input rejected or error shown
- Message: "Значение должно быть положительным"

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail / ⬜ Not Implemented

---

### TC-005.04: Empty Value

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Validation |
| **Preconditions** | Any joint selected |

**Steps:**
1. Clear S field

**Expected Result:**
- Results show "—" or placeholder
- No calculation errors

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail / ⬜ Not Implemented

---

## TC-006: Theme Toggle

### TC-006.01: Switch to Dark Theme

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Type** | UI |
| **Preconditions** | Application loaded |

**Steps:**
1. Click theme toggle button
2. Observe UI changes

**Expected Result:**
- Background changes to dark
- Text changes to light
- Toggle icon changes
- All text readable

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-006.02: Switch to Light Theme

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Type** | UI |
| **Preconditions** | Dark theme active |

**Steps:**
1. Click theme toggle button
2. Observe UI changes

**Expected Result:**
- Background changes to light
- Text changes to dark
- Toggle icon changes

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

## TC-007: Edge Cases

### TC-007.01: Zero Values

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Edge Case |
| **Preconditions** | Any joint selected |

**Steps:**
1. Enter S = 0
2. Enter b = 0

**Expected Result:**
- Results show 0 or appropriate message
- No JavaScript errors in console

**Actual Result:** ________________

**Console Errors:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-007.02: Very Large Values

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Type** | Edge Case |
| **Preconditions** | Any joint selected |

**Steps:**
1. Enter S = 999999
2. Observe results

**Expected Result:**
- Calculation proceeds or validation error
- No overflow/NaN errors
- No UI breakage

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-007.03: Decimal Values

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Edge Case |
| **Preconditions** | Any joint selected |

**Steps:**
1. Enter S = 2.5
2. Enter b = 1.75

**Expected Result:**
- Calculation proceeds normally
- Results show appropriate decimal precision (2-4 digits)

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-007.04: Non-Numeric Input

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Validation |
| **Preconditions** | Any joint selected |

**Steps:**
1. Enter S = "abc"
2. Try to calculate

**Expected Result:**
- Input rejected (type="number" should prevent)
- OR validation error shown

**Actual Result:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

## TC-008: Browser Compatibility

### TC-008.01: Chrome

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Compatibility |
| **Browser** | Chrome 90+ |

**Test All:** TC-001 through TC-007

**Issues Found:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-008.02: Firefox

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Compatibility |
| **Browser** | Firefox 88+ |

**Test All:** TC-001 through TC-007

**Issues Found:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-008.03: Safari

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Compatibility |
| **Browser** | Safari 14+ |

**Test All:** TC-001 through TC-007

**Issues Found:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

### TC-008.04: Edge

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Type** | Compatibility |
| **Browser** | Edge 90+ |

**Test All:** TC-001 through TC-007

**Issues Found:** ________________

**Status:** ⬜ Pass / ⬜ Fail

---

## Test Summary Template

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| TC-001.01 | Select MMA | ⬜ | |
| TC-001.02 | Select MIG/MAG | ⬜ | |
| TC-001.03 | Select TIG | ⬜ | |
| TC-001.04 | Select SAW | ⬜ | |
| TC-002.01 | Select ГОСТ 5264 | ⬜ | |
| TC-003.01 | Select C2 | ⬜ | |
| TC-003.02 | Select C8 | ⬜ | |
| TC-003.03 | Select У1 | ⬜ | |
| TC-004.01 | Calculate C2 | ⬜ | |
| TC-004.02 | Calculate У1 | ⬜ | |
| TC-004.03 | Calculate Pipe | ⬜ | |
| TC-005.01 | Below Min | ⬜ | |
| TC-005.02 | Above Max | ⬜ | |
| TC-005.03 | Negative | ⬜ | |
| TC-005.04 | Empty | ⬜ | |
| TC-006.01 | Dark Theme | ⬜ | |
| TC-006.02 | Light Theme | ⬜ | |
| TC-007.01 | Zero Values | ⬜ | |
| TC-007.02 | Large Values | ⬜ | |
| TC-007.03 | Decimals | ⬜ | |
| TC-007.04 | Non-Numeric | ⬜ | |
| TC-008.01 | Chrome | ⬜ | |
| TC-008.02 | Firefox | ⬜ | |
| TC-008.03 | Safari | ⬜ | |
| TC-008.04 | Edge | ⬜ | |

---

## Known Bugs to Verify

| Bug ID | Description | Test Case |
|--------|-------------|-----------|
| BUG-001 | Parameters not loading from exel.json | TC-003.01, TC-003.02 |
| BUG-002 | Missing diameter input for pipes | TC-004.03 |
| BUG-003 | No input validation | TC-005.01-04 |
| BUG-004 | No error handling | TC-007.01-04 |
| BUG-005 | Duplicate code in calculation.js | N/A (code review) |