# AGENTS.md

> Instructions for AI assistants working on Weld-Weld-Weld project

## Project Overview

**Weld-Weld-Weld** — веб-калькулятор норм расхода сварочных материалов по ГОСТ РФ.

## Workflow

This project follows **OpenSpec** spec-driven development:

```
PROPOSE → VALIDATE → APPLY → VERIFY → ARCHIVE
```

### Commands

| Command | Action |
|---------|--------|
| `/opsx:propose` | Start new change proposal |
| `/opsx:validate` | Validate spec deltas |
| `/opsx:apply` | Execute implementation tasks |
| `/opsx:verify` | Run verification checks |
| `/opsx:archive` | Complete and archive change |
| `/opsx:status` | Show current change status |

## Before Starting Work

1. **Read project context:**
   - `openspec/project.md` — tech stack, constraints
   - `openspec/specs/_index.md` — capability catalog
   - Active changes in `openspec/changes/`

2. **Check for active work:**
   ```bash
   ls openspec/changes/
   ```
   If not empty, resume from tasks.md.

3. **Check known issues:**
   - BUG-001: Parameters not loading from exel.json
   - BUG-002: Missing diameter input for pipes

## Coding Standards

### JavaScript
```javascript
// Use const/let, no var
const Fn = 0.75 * b * S;

// Named functions, camelCase
function calculateMass(area) {
  return DENSITY * area;
}

// JSDoc for public functions
/**
 * Calculate cross-sectional area for joint type
 * @param {string} jointType - Joint identifier (e.g., 'C2')
 * @param {Object} params - Geometry parameters
 * @returns {number} Area in mm²
 */
function calculateFn(jointType, params) { ... }
```

### Error Handling
```javascript
// Always validate inputs
if (!jointType || !AREA_FORMULAS[jointType]) {
  throw new Error(`Unknown joint type: ${jointType}`);
}

// Graceful degradation
try {
  const result = calculate(jointType, params);
  displayResult(result);
} catch (error) {
  console.error(error);
  showError('Ошибка расчёта');
}
```

### Async Operations
```javascript
// fetch with error handling
async function loadJointData() {
  try {
    const response = await fetch('exel.json');
    if (!response.ok) throw new Error('Failed to load data');
    return await response.json();
  } catch (error) {
    console.error('Data load error:', error);
    return FALLBACK_DATA;
  }
}
```

## Architecture Notes

### Separation of Concerns
- `calculation.js` — UI logic, events, DOM manipulation
- `formulas.js` — Pure calculation functions, no DOM access
- `exel.json` — Reference data, constants

### Data Flow
```
User Input → calculation.js → formulas.js → calculation.js → DOM Update
                                  ↑
                            exel.json (loaded once)
```

### Critical Fix Needed

**BUG-001: Parameters not loading**
- Location: `calculation.js`, event handler for joint selection
- Issue: `loadJointData()` not awaited or data not passed correctly
- Fix: Ensure async/await pattern, validate data structure

**BUG-002: Missing diameter input**
- Location: `calculation.js`, parameter field generation
- Issue: No `d` parameter in UI for pipe joints
- Fix: Add conditional field when joint type is cylindrical

## Testing Approach

Since no test framework exists, test manually:

1. **Unit tests (manual):**
   - Open browser console
   - Run formulas directly: `calculateFn('C2', {S: 3, b: 2})`
   - Verify expected results

2. **Integration tests (manual):**
   - Select each method
   - Select each ГОСТ
   - Select each joint type
   - Enter parameters
   - Verify calculations

3. **Edge cases:**
   - Zero values
   - Negative values
   - Missing parameters
   - Invalid joint types

## Commit Conventions

```
fix(calculation): load parameters from exel.json on joint selection

- Add async data loading
- Validate data structure
- Handle missing data gracefully

Resolves: BUG-001
```

## Do Not

- ❌ Add backend or API (client-side only)
- ❌ Add authentication
- ❌ Add non-Russian text without i18n plan
- ❌ Break calculation accuracy for performance
- ❌ Remove ГОСТ compliance

## Important Files

| File | Purpose | Edit Carefully |
|------|---------|----------------|
| `exel.json` | Reference data | Yes — affects calculations |
| `formulas.js` | Calculation logic | Yes — accuracy critical |
| `calculation.js` | UI logic | Yes — affects UX |
| `index.html` | Structure | No — simple markup |
| `scss/` | Styles | No — cosmetic only |

## Before Committing

1. Run manual calculations for affected joint types
2. Check browser console for errors
3. Test in Chrome, Firefox, Safari
4. Verify all ГОСТ references still valid
5. Update relevant specs if behavior changed