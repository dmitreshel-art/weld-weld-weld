# DATA-MODEL

> Структура данных Weld-Weld-Weld

## Overview

Проект использует статические JSON-данные для хранения справочной информации о типах сварных соединений. Данные загружаются асинхронно при инициализации приложения.

---

## Data Sources

### Primary Data File: exel.json

**Location:** `/exel.json`
**Format:** JSON
**Encoding:** UTF-8
**Size:** ~50KB (estimated)

**Purpose:**
- Reference data for 56 joint types
- Parameter limits (min, max, default)
- Formula identifiers
- Diagram references
- Method/ГОСТ mappings

---

## Data Structures

### Joint Definition

```typescript
interface JointDefinition {
  // Welding methods applicable to this joint
  method: Method[];
  
  // ГОСТ standards applicable to this joint
  gost: Gost[];
  
  // Joint category (стыковое, угловое, тавровое, нахлёсточное)
  type: JointType;
  
  // Human-readable description in Russian
  description: string;
  
  // Geometry parameters with limits
  params: ParameterDefinitions;
  
  // Formula identifier for Fn calculation
  formula: string;
  
  // Path to diagram image
  diagram?: string;
}

type Method = "MMA" | "MIG/MAG" | "TIG" | "SAW";

type Gost = 
  | "ГОСТ 5264" 
  | "ГОСТ 11534" 
  | "ГОСТ 14771" 
  | "ГОСТ 23518" 
  | "ГОСТ 16037" 
  | "ГОСТ 8713";

type JointType = "стыковое" | "угловое" | "тавровое" | "нахлёсточное";

interface ParameterDefinitions {
  [paramName: string]: ParameterLimits;
}

interface ParameterLimits {
  min: number | null;      // Minimum value, null = not applicable
  max: number | null;      // Maximum value, null = not applicable
  default: number | null;  // Default value, null = not applicable
}
```

### Complete Joint Example: C2

```json
{
  "C2": {
    "method": ["MMA", "MIG/MAG", "TIG"],
    "gost": ["ГОСТ 5264", "ГОСТ 14771"],
    "type": "стыковое",
    "description": "Стыковое соединение без скоса кромок",
    "params": {
      "S": {
        "min": 1,
        "max": 4,
        "default": 2
      },
      "b": {
        "min": 0,
        "max": 3,
        "default": 1
      }
    },
    "formula": "Fn = 0.75 * b * S",
    "diagram": "assets/diagrams/C2.svg"
  }
}
```

### Complete Joint Example: C8

```json
{
  "C8": {
    "method": ["MMA", "MIG/MAG", "TIG", "SAW"],
    "gost": ["ГОСТ 5264", "ГОСТ 14771", "ГОСТ 8713"],
    "type": "стыковое",
    "description": "Стыковое соединение с V-образным скосом одной кромки",
    "params": {
      "S": {
        "min": 3,
        "max": 20,
        "default": 10
      },
      "b": {
        "min": 0,
        "max": 3,
        "default": 2
      },
      "e": {
        "min": 10,
        "max": 30,
        "default": 20
      },
      "g": {
        "min": 1,
        "max": 5,
        "default": 3
      },
      "alpha": {
        "min": 30,
        "max": 60,
        "default": 45
      }
    },
    "formula": "Fn = e * g + b * S",
    "diagram": "assets/diagrams/C8.svg"
  }
}
```

### Complete Joint Example: У1

```json
{
  "У1": {
    "method": ["MMA", "MIG/MAG", "TIG"],
    "gost": ["ГОСТ 5264", "ГОСТ 14771"],
    "type": "угловое",
    "description": "Угловое тавровое соединение без скоса кромок",
    "params": {
      "k": {
        "min": 3,
        "max": 12,
        "default": 5
      }
    },
    "formula": "Fn = 0.5 * k * k",
    "diagram": "assets/diagrams/U1.svg"
  }
}
```

---

## Parameter Definitions

### Parameter Types

| Symbol | Name | Unit | UI Label | Used In |
|--------|------|------|----------|---------|
| `S` | Толщина металла | мм | Толщина металла (S), мм | All butt joints |
| `b` | Зазор | мм | Зазор (b), мм | Most joints |
| `c` | Притупление | мм | Притупление (c), мм | V-prep, X-prep joints |
| `e` | Ширина шва | мм | Ширина шва (e), мм | With reinforcement |
| `g` | Высота усиления | мм | Высота усиления (g), мм | With reinforcement |
| `alpha` | Угол разделки (верх) | ° | Угол разделки α, ° | V-prep, K-prep |
| `beta` | Угол разделки (низ) | ° | Угол разделки β, ° | X-prep, K-prep |
| `R` | Радиус перехода | мм | Радиус перехода (R), мм | U-prep joints |
| `k` | Катет шва | мм | Катет шва (k), мм | Fillet joints |
| `d` | Диаметр трубы | мм | Диаметр трубы (d), мм | Pipe joints |

### Parameter Visibility Matrix

| Joint Type | S | b | c | e | g | α | β | R | k | d |
|------------|---|---|---|---|---|---|---|---|---|---|
| С1-С7 | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| С8-С15 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| С16-С28 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| С39-С45 (U-prep) | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| У1-У10 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Т1-Т9 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Н1-Н2 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Pipe variants | ✅ | ✅ | varies | varies | varies | varies | varies | varies | varies | ✅ |

---

## Formula Definitions

### Formula Registry

```typescript
interface FormulaRegistry {
  [formulaId: string]: FormulaFunction;
}

type FormulaFunction = (params: Record<string, number>) => number;
```

### Common Formulas

```javascript
// Butt joint without edge preparation (С1-С7)
formula_C2: (S, b) => 0.75 * b * S

// Butt joint with V-preparation (С8-С15)
formula_C8: (b, S, e, g) => e * g + b * S

// Butt joint with X-preparation (С16-С28)
formula_C17: (b, S, e, g) => e * g + b * S

// Butt joint with U-preparation (С39-С45)
formula_C39: (S, b, e, g, R) => e * g + b * S + Math.PI * R * R / 2

// Fillet joint (У1-У10, Т1-Т9, Н1-Н2)
formula_U1: (k) => 0.5 * k * k

// Fillet with groove (У4-У6, Т3-Т6)
formula_U4: (k, S) => 0.5 * k * k + k * S
```

### Formula-to-Joint Mapping

| Joint | Formula |
|-------|---------|
| С1 | `Fn = b * S` |
| С2 | `Fn = 0.75 * b * S` |
| С3 | `Fn = b * S` |
| С4 | `Fn = 0.75 * b * S` |
| С5 | `Fn = b * S` |
| С6 | `Fn = 0.75 * b * S` |
| С7 | `Fn = b * S` |
| С8 | `Fn = e * g + b * S` |
| У1 | `Fn = 0.5 * k²` |
| У2 | `Fn = k²` |
| У3 | `Fn = 0.5 * k²` |
| У4 | `Fn = 0.5 * k²` |
| У5 | `Fn = 0.5 * k²` |
| У6 | `Fn = 0.5 * k²` |
| У7 | `Fn = 0.5 * k²` |
| У8 | `Fn = 0.35 * k²` |
| У9 | `Fn = 0.35 * k²` |
| У10 | `Fn = 0.5 * k²` |
| Т1 | `Fn = 0.5 * k²` |
| Н1 | `Fn = 0.5 * k²` |
| Н2 | `Fn = 0.5 * k²` |

---

## Constants

### Physical Constants

```javascript
const CONSTANTS = {
  // Steel density (г/мм³)
  DENSITY: 0.00785,
  
  // Pi constant
  PI: Math.PI,
  
  // Weld length for flat joints (м)
  DEFAULT_LENGTH: 1.0
};
```

### Coefficients

```javascript
const COEFFICIENTS = {
  MMA: {
    k: 1.70,
    name: "РД (ручная дуговая)",
    material: "электроды покрытые"
  },
  "MIG/MAG": {
    k: 1.15,
    name: "МП (механизированная в защитном газе)",
    material: "проволока + газ"
  },
  TIG: {
    k: 1.10,
    name: "РАД (ручная аргонодуговая)",
    material: "присадочная проволока + аргон"
  },
  SAW: {
    k: 1.02,
    name: "АФ (автоматическая под флюсом)",
    material: "проволока + флюс"
  }
};
```

### ГОСТ-to-Method Mapping

```javascript
const GOST_METHODS = {
  "ГОСТ 5264": ["MMA"],
  "ГОСТ 11534": ["MMA"],
  "ГОСТ 14771": ["MIG/MAG", "TIG"],
  "ГОСТ 23518": ["MIG/MAG", "TIG"],
  "ГОСТ 16037": ["TIG"],
  "ГОСТ 8713": ["SAW"]
};
```

### Method-to-ГОСТ Mapping

```javascript
const METHOD_GOSTS = {
  MMA: ["ГОСТ 5264", "ГОСТ 11534"],
  "MIG/MAG": ["ГОСТ 14771", "ГОСТ 23518"],
  TIG: ["ГОСТ 14771", "ГОСТ 23518", "ГОСТ 16037"],
  SAW: ["ГОСТ 8713"]
};
```

---

## Data Flow

### Loading Sequence

```
┌────────────────────────────────────────────────────────────┐
│                    Application Start                        │
└────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────────┐
│  1. DOMContentLoaded event                                  │
│     - Initialize UI                                         │
│     - Attach event listeners                                │
└────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────────┐
│  2. fetch('exel.json')                                      │
│     - Async request                                         │
│     - Handle loading state                                  │
└────────────────────────────────────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
┌────────────────────────┐    ┌────────────────────────┐
│  3a. Success            │    │  3b. Failure            │
│  - Parse JSON           │    │  - Log error            │
│  - Store in memory      │    │  - Show error message   │
│  - Populate dropdowns   │    │  - Disable calculator   │
└────────────────────────┘    └────────────────────────┘
              │
              ▼
┌────────────────────────────────────────────────────────────┐
│  4. Ready for user input                                   │
│     - Method dropdown populated                            │
│     - Wait for user selection                              │
└────────────────────────────────────────────────────────────┘
```

### Selection Cascade

```
User selects Method
        │
        ▼
Filter ГОСТ by Method
        │
        ▼
User selects ГОСТ
        │
        ▼
Filter Joint Types by ГОСТ
        │
        ▼
User selects Joint Type
        │
        ▼
Load Joint Definition from exel.json
        │
        ▼
Display Diagram + Generate Input Fields
        │
        ▼
User enters Parameters
        │
        ▼
Real-time Calculation
        │
        ▼
Display Results
```

---

## Validation Rules

### Parameter Validation

```javascript
function validateParameter(param, value, definition) {
  const { min, max } = definition;
  
  // Type check
  if (typeof value !== 'number' || isNaN(value)) {
    return { valid: false, error: 'Введите числовое значение' };
  }
  
  // Positive check
  if (value < 0) {
    return { valid: false, error: 'Значение должно быть положительным' };
  }
  
  // Min check
  if (min !== null && value < min) {
    return { valid: false, error: `Значение должно быть не менее ${min}` };
  }
  
  // Max check
  if (max !== null && value > max) {
    return { valid: false, error: `Значение должно быть не более ${max}` };
  }
  
  return { valid: true };
}
```

---

## Data Migration Considerations

### Future Schema Changes

If exel.json structure changes:

1. **Version field:**
```json
{
  "version": "1.0.0",
  "joints": { ... }
}
```

2. **Backward compatibility:**
```javascript
function loadData(json) {
  const version = json.version || "0.9.0";
  const joints = json.joints || json; // Support old format
  
  return migrate(joints, version);
}
```

### Potential Extensions

```typescript
interface ExtendedJointDefinition extends JointDefinition {
  // Additional metadata
  category?: string;           // "butt", "corner", "tee", "lap"
  difficulty?: "easy" | "medium" | "hard";
  thicknessRange?: string;     // "1-4 мм"
  position?: string[];         // ["lower", "vertical", "overhead"]
  
  // Additional calculations
  gasConsumption?: number;     // л/м for MIG/MAG, TIG
  fluxConsumption?: number;    // г/м for SAW
  
  // Media
  diagram3d?: string;          // 3D model path
  video?: string;              // Instruction video URL
}
```

---

## Error Responses

### Data Loading Errors

```javascript
const ERROR_RESPONSES = {
  'FETCH_FAILED': {
    title: 'Ошибка загрузки данных',
    message: 'Не удалось загрузить справочник соединений. Проверьте подключение.',
    action: 'reload'
  },
  'PARSE_FAILED': {
    title: 'Ошибка формата данных',
    message: 'Справочник соединений содержит ошибки. Обратитесь к разработчику.',
    action: 'contact'
  },
  'INVALID_SCHEMA': {
    title: 'Неподдерживаемая версия',
    message: 'Версия справочника не поддерживается. Обновите приложение.',
    action: 'update'
  }
};
```

---

## Related Files

| File | Purpose |
|------|---------|
| `exel.json` | Primary data source |
| `exel.md` | Variable documentation |
| `scripts/formulas.js` | Formula implementations |
| `scripts/calculation.js` | Data loading & UI logic |