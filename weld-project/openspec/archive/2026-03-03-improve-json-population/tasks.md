# Implementation Tasks — improve-json-population

## Phase 1: Data Analysis

### Task 1.1: Analyze exel.json Structure
- **Description:** Проанализировать структуру данных в exel.json
- **File:** `repo/exel.json`
- **Acceptance:**
  - Понять какие параметры есть для каждого типа
  - Определить какие параметры уникальны для каждого соединения
- **Dependencies:** None
- **Status:** ⬜ Pending

### Task 1.2: Map Parameters to Joint Types
- **Description:** Создать карту параметров для каждого типа соединения
- **File:** `repo/scripts/joint-params.js` (new)
- **Acceptance:**
  - Объект с параметрами для каждого типа (С1, С8, У1, etc.)
  - Какие параметры показывать/скрывать
- **Dependencies:** Task 1.1
- **Status:** ⬜ Pending

## Phase 2: Auto-populate Implementation

### Task 2.1: Enhance JSON Data Handler
- **Description:** Улучшить обработчик загрузки JSON данных
- **File:** `repo/scripts/calculation.js`
- **Acceptance:**
  - При выборе типа соединения ищутся данные в jointData
  - При выборе толщины заполняются параметры
- **Dependencies:** Task 1.2
- **Status:** ⬜ Pending

### Task 2.2: Populate Fields on Selection
- **Description:** Заполнять поля при выборе соединения/толщины
- **File:** `repo/scripts/calculation.js`
- **Acceptance:**
  - Автоматическое заполнение gap, weldWidth, gainHeight
  - Заполнение angle для V-образных соединений
- **Dependencies:** Task 2.1
- **Status:** ⬜ Pending

## Phase 3: Dynamic Field Visibility

### Task 3.1: Show/Hide Based on Joint Type
- **Description:** Показывать/скрывать параметры в зависимости от типа
- **File:** `repo/scripts/calculation.js`
- **Acceptance:**
  - С1: только gap
  - С8: gap, weldWidth, gainHeight, angleAlpha
  - Трубные: показывать diameter
- **Dependencies:** Task 2.2
- **Status:** ⬜ Pending

### Task 3.2: Toggle Advanced Params
- **Description:** Управление видимостью расширенных параметров
- **File:** `repo/index.html`, `repo/scripts/calculation.js`
- **Acceptance:**
  - Обычные соединения: базовые параметры видимы
  - Сложные соединения: расширенные параметры видимы
- **Dependencies:** Task 3.1
- **Status:** ⬜ Pending

## Phase 4: Testing

### Task 4.1: Test Auto-population
- **Description:** Проверить автозаполнение для разных типов
- **Acceptance:**
  - С1 заполняется gap
  - С8 заполняются все параметры включая angle
  - Трубные показывают diameter
- **Dependencies:** All previous tasks
- **Status:** ⬜ Pending

---

## Progress Tracking

| Task | Description | Status | Time |
|------|-------------|--------|------|
| 1.1 | Analyze exel.json | ⬜ | - |
| 1.2 | Map parameters | ⬜ | - |
| 2.1 | Enhance JSON handler | ⬜ | - |
| 2.2 | Populate fields | ⬜ | - |
| 3.1 | Show/hide fields | ⬜ | - |
| 3.2 | Toggle advanced | ⬜ | - |
| 4.1 | Test auto-population | ⬜ | - |

---

## Notes
- Использовать существующий jointData из Task 3.1 fix-calculator-basics
- Не переписывать calculation.js полностью, только улучшить