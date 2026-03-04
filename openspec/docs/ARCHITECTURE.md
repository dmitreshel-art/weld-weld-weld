# ARCHITECTURE — Weld-Weld-Weld

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │   index.html │───▶│ calculation.js│───▶│  formulas.js │       │
│  │   (UI Layer) │    │  (Controller) │    │   (Logic)    │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│         │                   │                    │               │
│         ▼                   ▼                    ▼               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │    SCSS      │    │  particles.js │    │  exel.json   │       │
│  │   (Styles)   │    │  (Animation)  │    │    (Data)    │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### 1. UI Layer (index.html)

**Responsibility:** Structure and layout

```html
<!DOCTYPE html>
<html>
<head>
  <title>Weld-Weld-Weld</title>
  <!-- Styles, fonts, meta -->
</head>
<body>
  <div id="particles-js"></div>          <!-- Background -->
  <header>Logo, Theme Toggle</header>
  <main>
    <aside>Navigation, Parameters</aside>
    <section>Diagram, Inputs, Results</section>
  </main>
  <footer>Credits, Version</footer>
  <!-- Scripts -->
</body>
</html>
```

### 2. Controller (calculation.js)

**Responsibility:** Event handling, UI updates, data flow

```javascript
// Event Listeners
document.addEventListener('DOMContentLoaded', init);
methodSelect.addEventListener('change', onMethodChange);
gostSelect.addEventListener('change', onGostChange);
jointSelect.addEventListener('change', onJointChange);
// ... more event handlers

// Data Flow
function onCalculate() {
  const params = getInputValues();      // 1. Gather inputs
  const Fn = calculateArea(params);      // 2. Calculate area
  const Mn = calculateMass(Fn);          // 3. Calculate mass
  const Ge = calculateConsumption(Mn);   // 4. Apply coefficient
  const He = calculateTotal(Ge, Lh);     // 5. Total per joint
  displayResults({ Fn, Mn, Ge, He });    // 6. Update UI
}
```

**Current Issues:**
- ❌ `getInputValues()` doesn't load from exel.json
- ❌ No `diameter` input for pipe calculations
- ❌ No error handling

### 3. Logic Layer (formulas.js)

**Responsibility:** Pure calculation functions

```javascript
// Constants
const DENSITY = 0.00785;  // г/мм³
const COEFFICIENTS = {
  MMA: 1.70,
  MIGMAG: 1.15,
  TIG: 1.10,
  SAW: 1.02
};

// Area Formulas by Joint Type
const AREA_FORMULAS = {
  C2: (S, b) => 0.75 * b * S,           // Стыковое без скоса
  C8: (S, b, e, g) => e * g + b * S,    // Стыковое с V-разделкой
  U1: (S, k) => 0.5 * k * k,            // Угловое
  // ... 50+ formulas
};

// Calculation Functions
function calculateFn(jointType, params) {
  return AREA_FORMULAS[jointType](...Object.values(params));
}

function calculateMn(Fn) {
  return DENSITY * Fn;
}

function calculateGe(Mn, method) {
  return Mn * COEFFICIENTS[method];
}

function calculateHe(Ge, Lh) {
  return Ge * Lh;  // Lh = 1m or d * π
}
```

### 4. Data Layer (exel.json)

**Responsibility:** Reference data storage

```json
{
  "С2": {
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

## Data Flow Diagram

```
┌───────────────────────────────────────────────────────────────┐
│                      USER INTERACTION                          │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│  1. SELECT METHOD (MMA/MIG/TIG/SAW)                            │
│     → Filter ГОСТ options                                      │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│  2. SELECT ГОСТ (ГОСТ 5264, etc.)                              │
│     → Filter joint types                                       │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│  3. SELECT JOINT TYPE (C2, U1, T3, etc.)                       │
│     → Load joint parameters from exel.json                     │
│     → Display joint diagram                                    │
│     → Show relevant input fields                               │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│  4. INPUT PARAMETERS (S, b, c, e, g, α, β, R, d)               │
│     → Validate inputs (min/max from exel.json)                 │
│     → Real-time calculation trigger                            │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│  5. CALCULATE RESULTS                                          │
│     Fn = AREA_FORMULAS[jointType](params)                      │
│     Mn = 0.00785 × Fn                                          │
│     Ge = k[method] × Mn                                        │
│     He = Ge × Lh (1m or d × π)                                 │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│  6. DISPLAY RESULTS                                            │
│     Fn: XX.XX мм²                                              │
│     Mn: XX.XX г/м                                              │
│     Ge: XX.XX г/м                                              │
│     He: XX.XX г                                                │
└───────────────────────────────────────────────────────────────┘
```

## Error States

### Current Issues (to fix)

```
┌─────────────────────────────────────────┐
│ BUG-001: Parameters not loading         │
│                                         │
│ User selects joint → Parameters         │
│ should populate from exel.json          │
│                                         │
│ Actual: Input fields empty              │
│ Expected: Default values populated      │
│                                         │
│ Root cause: exel.json not loaded        │
│ or async timing issue                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ BUG-002: Missing diameter input         │
│                                         │
│ Pipe joints (C2-cylindrical, etc.)      │
│ require diameter (d) for Lh = d × π     │
│                                         │
│ Actual: No diameter input field         │
│ Expected: Show diameter for pipes       │
│                                         │
│ Impact: He = undefined for pipes        │
└─────────────────────────────────────────┘
```

## File Dependencies

```
index.html
    │
    ├── styles.css (compiled from SCSS)
    │
    ├── particles.js (animation, independent)
    │
    ├── exel.json (data, fetched async)
    │       │
    │       └──▶ Used by calculation.js
    │
    └── calculation.js
            │
            └── formulas.js (pure functions)
```

## Extension Points

### Future Architecture (Phase 2+)

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │   UI Layer   │    │     App      │    │   Services   │       │
│  │  (Enhanced)  │───▶│   State      │───▶│  (Export,    │       │
│  │              │    │  Management  │    │   History)   │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│         │                   │                    │               │
│         ▼                   ▼                    ▼               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │   Storage    │    │   Workers    │    │     API      │       │
│  │ LocalStorage │    │   (WASM)     │    │  (Optional)  │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### PWA Features
- Service Worker for offline
- IndexedDB for history
- Install prompt

### Export Service
- PDF generation (jsPDF)
- Excel export (SheetJS)
- Print stylesheet

### History Service
- LocalStorage for session
- IndexedDB for persistent
- Export/Import JSON