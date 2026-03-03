# Implementation Tasks — add-testing

## Phase 1: Unit Tests Setup

### Task 1.1: Initialize Jest
- **Description:** Настроить Jest для юнит-тестов
- **Files:** `repo/package.json`, `repo/jest.config.js`
- **Acceptance:**
  ```bash
  npm install --save-dev jest
  npm test
  ```
- **Status:** ⬜ Pending
- **Dependencies:** None

### Task 1.2: Create Test Structure
- **Description:** Создать папку и файлы для тестов
- **Files:** `repo/__tests__/`
- **Acceptance:**
  - `__tests__/formulas.test.js`
  - `__tests__/validation.test.js`
- **Status:** ⬜ Pending
- **Dependencies:** Task 1.1

## Phase 2: Formula Tests

### Task 2.1: Test Fn Calculation
- **Description:** Тесты для расчёта площади сечения шва (Fn)
- **File:** `repo/__tests__/formulas.test.js`
- **Acceptance:**
  - Тест для С1: Fn = k² (при k=1 → Fn=1)
  - Тест для Н1: Fn = 0.5 × k²
  - Тест для Н2: Fn = k²
  - Boundary: отрицательные значения → NaN
- **Status:** ⬜ Pending
- **Dependencies:** Task 1.2

### Task 2.2: Test Mn Calculation
- **Description:** Тесты для расчёта массы металла шва (Mn)
- **File:** `repo/__tests__/formulas.test.js`
- **Acceptance:**
  - Mn = Fn × density × length
  - Проверка формулы Mn = Fn × 7.85 × 1
- **Status:** ⬜ Pending
- **Dependencies:** Task 2.1

### Task 2.3: Test Ge, He Calculations
- **Description:** Тесты для Ge и He
- **File:** `repo/__tests__/formulas.test.js`
- **Acceptance:**
  - Ge = (Fn × density) / 1000
  - He = Mn + Ge
- **Status:** ⬜ Pending
- **Dependencies:** Task 2.2

## Phase 3: Validation Tests

### Task 3.1: Test Input Validation
- **Description:** Тесты для функции валидации
- **File:** `repo/__tests__/validation.test.js`
- **Acceptance:**
  - Пустой ввод → ошибка
  - Отрицательные значения → ошибка
  - Корректные значения → успех
- **Status:** ⬜ Pending
- **Dependencies:** Task 1.2

## Phase 4: CI/CD Setup

### Task 4.1: Create GitHub Actions Workflow
- **Description:** Настроить автоматический запуск тестов
- **File:** `repo/.github/workflows/test.yml`
- **Acceptance:**
  - При пуше в master запускаются тесты
  - При PR запускаются тесты
  - Результат виден в GitHub
- **Status:** ⬜ Pending
- **Dependencies:** Task 3.1

---

## Progress Tracking

| Task | Description | Status | Time |
|------|-------------|--------|------|
| 1.1 | Initialize Jest | ⬜ | - |
| 1.2 | Create test structure | ⬜ | - |
| 2.1 | Test Fn calculation | ⬜ | - |
| 2.2 | Test Mn calculation | ⬜ | - |
| 2.3 | Test Ge, He | ⬜ | - |
| 3.1 | Test validation | ⬜ | - |
| 4.1 | GitHub Actions | ⬜ | - |

---

## Notes

- Focus on critical calculations first
- Use descriptive test names
- Keep tests isolated and fast
- Aim for 80% coverage on formulas