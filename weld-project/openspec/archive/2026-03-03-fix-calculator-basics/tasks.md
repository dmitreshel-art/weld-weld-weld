# Implementation Tasks — fix-calculator-basics

## Phase 1: HTML — Add Missing Input Fields

### Task 1.1: Create Input Container ✅ Complete
- **Description:** Добавить контейнер для динамических полей параметров в index.html
- **File:** `repo/index.html`
- **Acceptance:** Новый `<div id="parameterInputs">` существует в HTML
- **Dependencies:** None
- **Status:** ✅ Complete

### Task 1.2: Add Input Fields ✅ Complete
- **Description:** Добавить input поля для всех параметров (gap, blunting, weldWidth, gainHeight, angleAlpha, angleBetta, radiusTransition, diameter, refractiveHeight, protrusionEnd, weldWidthSecond, gainHeightSecond, distanceBetweenEdges)
- **File:** `repo/index.html`
- **Acceptance:** Все 12+ полей присутствуют в HTML с уникальными ID
- **Dependencies:** Task 1.1
- **Status:** ✅ Complete

## Phase 2: JavaScript — Connect Variables

### Task 2.1: Get Input References ✅ Complete
- **Description:** В formulas.js добавить получение всех input элементов по ID
- **File:** `repo/scripts/formulas.js`
- **Acceptance:** Все input элементы получены через getElementById
- **Dependencies:** Task 1.2
- **Status:** ✅ Complete

### Task 2.2: Read Values on Calculate ✅ Complete
- **Description:** В обработчике кнопки читать значения из input полей
- **File:** `repo/scripts/formulas.js`
- **Acceptance:** Значения читаются при клике на кнопку
- **Dependencies:** Task 2.1
- **Status:** ✅ Complete

### Task 2.3: Handle Undefined Values ✅ Complete
- **Description:** Добавить fallback для undefined/NaN значений
- **File:** `repo/scripts/formulas.js`
- **Acceptance:** Функция getParamValue() возвращает 0 если input пустой
- **Dependencies:** Task 2.2
- **Status:** ✅ Complete

## Phase 3: Data — Load from JSON

### Task 3.1: Load exel.json on Page Load ⬜ Pending
- **Description:** Загрузить exel.json при инициализации страницы
- **File:** `repo/scripts/calculation.js`
- **Acceptance:** fetch('exel.json') загружает данные
- **Dependencies:** None
- **Status:** ⬜ Pending

### Task 3.2: Populate Inputs on Joint Selection ⬜ Pending
- **Description:** При выборе типа соединения заполнять input поля из JSON данных
- **File:** `repo/scripts/calculation.js`
- **Acceptance:** При выборе соединения поля заполняются данными из JSON
- **Dependencies:** Task 3.1, Task 1.2
- **Status:** ⬜ Pending

## Phase 4: Display Results

### Task 4.1: Update Result Fields ✅ Complete
- **Description:** Отобразить результаты расчёта в HTML
- **File:** `repo/scripts/formulas.js`, `repo/index.html`
- **Acceptance:** Fn, Mn, Ge, He отображаются в result полях
- **Dependencies:** Task 2.2
- **Status:** ✅ Complete

### Task 4.2: Add Result Field IDs ✅ Complete
- **Description:** Добавить ID для result input полей в HTML
- **File:** `repo/index.html`
- **Acceptance:** resultFn, resultMn, resultGe, resultHe присутствуют
- **Dependencies:** None
- **Status:** ✅ Complete

## Phase 5: Testing

### Task 5.1: Manual Test С1 (Simple) ⬜ Pending
- **Description:** Проверить расчёт для С1 (простое соединение)
- **Acceptance:** Расчёт выполняется без NaN
- **Dependencies:** All previous tasks
- **Status:** ⬜ Pending

### Task 5.2: Manual Test С8 (V-prep) ⬜ Pending
- **Description:** Проверить расчёт для С8 (V-образное)
- **Acceptance:** Расчёт выполняется с углами
- **Dependencies:** Task 5.1
- **Status:** ⬜ Pending

### Task 5.3: Manual Test with Diameter (Pipe) ⬜ Pending
- **Description:** Проверить расчёт для труб
- **Acceptance:** He = Ge × d × π
- **Dependencies:** Task 5.1
- **Status:** ⬜ Pending

---

## Progress Tracking

| Task | Description | Status | Time |
|------|-------------|--------|------|
| 1.1 | Create input container | ✅ | 5 min |
| 1.2 | Add 12+ input fields | ✅ | 10 min |
| 2.1 | Get input references | ✅ | 5 min |
| 2.2 | Read values on calculate | ✅ | 10 min |
| 2.3 | Handle undefined | ✅ | 5 min |
| 3.1 | Load exel.json | ⬜ | - |
| 3.2 | Populate inputs from JSON | ⬜ | - |
| 4.1 | Update result fields | ✅ | 5 min |
| 4.2 | Add result field IDs | ✅ | 3 min |
| 5.1 | Test С1 | ⬜ | - |
| 5.2 | Test С8 | ⬜ | - |
| 5.3 | Test pipe | ⬜ | - |

---

**Progress: 8/12 tasks (67%) complete**
**Remaining: Tasks 3.1, 3.2, 5.1, 5.2, 5.3**

## Notes

- Tasks 1-2, 4 are complete
- Next: Task 3.1 (load exel.json)
- Testing can be done after JSON loading is implemented