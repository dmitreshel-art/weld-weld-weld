# Implementation Tasks — add-input-validation

## Phase 1: Define Validation Rules

### Task 1.1: Create Validation Config
- **Description:** Создать объект с правилами валидации для каждого типа соединения
- **File:** `repo/scripts/validation.js` (new file)
- **Acceptance:**
  - Объект `VALIDATION_RULES` содержит min/max для каждого параметра
  - Правила основаны на данных из exel.json
- **Dependencies:** None
- **Status:** ⬜ Pending

### Task 1.2: Import Rules to calculations
- **Description:** Импортировать правила в calculation.js
- **File:** `repo/scripts/calculation.js`
- **Acceptance:** VALIDATION_RULES доступен в calculation.js
- **Dependencies:** Task 1.1
- **Status:** ⬜ Pending

## Phase 2: Implement Validation Functions

### Task 2.1: Create validateInput Function
- **Description:** Функция для валидации одного input поля
- **File:** `repo/scripts/validation.js`
- **Acceptance:**
  ```javascript
  function validateInput(inputId, value, rules) {
    // Returns { valid: boolean, error: string | null }
  }
  ```
- **Dependencies:** Task 1.1
- **Status:** ⬜ Pending

### Task 2.2: Create validateAllInputs Function
- **Description:** Валидация всех параметров перед расчётом
- **File:** `repo/scripts/validation.js`
- **Acceptance:**
  - Проверяет все видимые input поля
  - Возвращает список ошибок
  - Блокирует расчёт при ошибках
- **Dependencies:** Task 2.1
- **Status:** ⬜ Pending

## Phase 3: UI Integration

### Task 3.1: Add Error Display
- **Description:** Добавить элементы для отображения ошибок под каждым input
- **File:** `repo/index.html`
- **Acceptance:**
  - Каждый input имеет связанный элемент для ошибки
  - Ошибки отображаются красным цветом
- **Dependencies:** None
- **Status:** ⬜ Pending

### Task 3.2: Add Error Styling
- **Description:** Добавить CSS для ошибок (красная рамка, текст)
- **File:** `repo/scss/style.scss`
- **Acceptance:**
  - .input-error класс для input с ошибкой
  - .error-message класс для текста ошибки
- **Dependencies:** Task 3.1
- **Status:** ⬜ Pending

### Task 3.3: Integrate Validation on Calculate
- **Description:** Вызвать валидацию при нажатии кнопки
- **File:** `repo/scripts/formulas.js`
- **Acceptance:**
  - При клике вызывается validateAllInputs()
  - При ошибках расчёт не выполняется
  - Ошибки отображаются под полями
- **Dependencies:** Task 2.2, Task 3.1
- **Status:** ⬜ Pending

## Phase 4: Clear on Type Change

### Task 4.1: Clear Inputs on Joint Change
- **Description:** Очищать input поля при смене типа соединения
- **File:** `repo/scripts/calculation.js`
- **Acceptance:**
  - При выборе нового соединения поля сбрасываются
  - Ошибки очищаются
- **Dependencies:** Task 3.3
- **Status:** ⬜ Pending

## Phase 5: Testing

### Task 5.1: Test Negative Values
- **Description:** Проверить валидацию отрицательных значений
- **Acceptance:**
  - Ввести -5 в любое поле
  - Показывается ошибка "Значение должно быть положительным"
- **Dependencies:** All previous tasks
- **Status:** ⬜ Pending

### Task 5.2: Test Max Values
- **Description:** Проверить валидацию превышения max
- **Acceptance:**
  - Ввести 1000 в поле с max=10
  - Показывается ошибка "Значение должно быть не более 10"
- **Dependencies:** Task 5.1
- **Status:** ⬜ Pending

### Task 5.3: Test Valid Values
- **Description:** Проверить нормальную работу с валидными значениями
- **Acceptance:**
  - Ввести корректные значения
  - Расчёт выполняется без ошибок
- **Dependencies:** Task 5.1
- **Status:** ⬜ Pending

---

## Progress Tracking

| Task | Description | Status | Time |
|------|-------------|--------|------|
| 1.1 | Create validation config | ⬜ | - |
| 1.2 | Import rules | ⬜ | - |
| 2.1 | validateInput function | ⬜ | - |
| 2.2 | validateAllInputs function | ⬜ | - |
| 3.1 | Add error display | ⬜ | - |
| 3.2 | Add error styling | ⬜ | - |
| 3.3 | Integrate validation | ⬜ | - |
| 4.1 | Clear on type change | ⬜ | - |
| 5.1 | Test negative values | ⬜ | - |
| 5.2 | Test max values | ⬜ | - |
| 5.3 | Test valid values | ⬜ | - |

---

## Notes

- Использовать существующие min/max из exel.json если есть
- Для полей без явных ограничений использовать разумные defaults
- Не блокировать возможность ввода — только показывать ошибки