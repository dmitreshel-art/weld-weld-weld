# Implementation Tasks — Desktop Form Layout Optimization (Variant B)

## Status: ✅ ARCHIVED — Verify passed 2026-03-04

---

## Phase 1: CSS Layout

### Task 1.1: Создать CSS Grid для desktop ✅ Done
**File:** `scss/style.scss`

Добавить после существующих стилей:

```scss
// ============================================
// DESKTOP LAYOUT (Variant B: Results on right)
// ============================================
@media screen and (min-width: 769px) {
    // Основной контейнер формы
    .userform__desktop-layout {
        display: grid;
        grid-template-columns: 1fr 280px;
        gap: 20px;
        align-items: start;
    }
    
    // Левая колонка - форма ввода
    .userform__input-column {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    // Правая колонка - результаты
    .userform__results-column {
        position: sticky;
        top: 100px;
    }
    
    // Основные селекты в 2 колонки
    .userform__main-selects {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }
    
    // Параметры шва в 3 колонки
    .userform__fieldset {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
    }
    
    // Компактные поля ввода
    .userform__select-i {
        max-width: 100%;
        width: 100%;
    }
    
    // Результаты видны всегда на desktop
    #result {
        visibility: visible !important;
    }
    
    // Результаты компактнее
    .userform__result-group {
        margin-bottom: 8px;
    }
    
    .userform__output {
        font-size: 16px;
        padding: 6px 10px;
    }
}
```

---

### Task 1.2: Обновить HTML структуру ✅ Done
**File:** `index.html`

Изменить структуру формы:

```html
<main class="userform center" role="main">
    <form id="weldCalcForm" class="userform__form" novalidate>
        
        <!-- Результаты - справа на desktop -->
        <aside id="result" class="userform__box userform__results-column">
            <h3 class="userform__subtitle">РЕЗУЛЬТАТЫ</h3>
            <!-- ... results ... -->
        </aside>
        
        <!-- Форма ввода -->
        <div class="userform__input-column">
            
            <!-- Основные селекты в grid -->
            <section class="userform__main-selects">
                <div class="userform__group">
                    <label for="weldingMethod">СПОСОБ СВАРКИ</label>
                    <select id="weldingMethod">...</select>
                </div>
                <div class="userform__group">
                    <label for="technicalDocumentation">НТД ПО СВАРКЕ</label>
                    <select id="technicalDocumentation">...</select>
                </div>
                <div class="userform__group">
                    <label for="typeOfConnection">ВИД СОЕДИНЕНИЯ</label>
                    <select id="typeOfConnection">...</select>
                </div>
                <div class="userform__group">
                    <label for="thicknessList">ТОЛЩИНА, мм</label>
                    <select id="thicknessList">...</select>
                </div>
            </section>
            
            <!-- Угол разделки -->
            <div class="userform__group">
                <label for="cuttingAngle">УГОЛ РАЗДЕЛКИ</label>
                <input id="cuttingAngle" readonly>
            </div>
            
            <!-- Параметры шва в grid -->
            <fieldset class="userform__fieldset">
                <legend>ПАРАМЕТРЫ ШВА</legend>
                <!-- ... 9 inputs in grid ... -->
            </fieldset>
            
            <button type="submit" class="userform__button">ПОДСЧИТАТЬ</button>
            
            <!-- Theme toggle -->
        </div>
        
    </form>
</main>
```

---

## Phase 2: Styling

### Task 2.1: Стили для блока результатов ✅ Done
**File:** `scss/style.scss`

```scss
// Результаты справа
.userform__results-column {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    
    .userform__subtitle {
        margin-top: 0;
        border-bottom: 1px solid #f2f2f2;
        padding-bottom: 8px;
        margin-bottom: 12px;
    }
    
    .userform__subtitle:nth-of-type(2) {
        margin-top: 16px;
        border-top: 1px solid #f2f2f2;
        padding-top: 12px;
    }
}
```

### Task 2.2: Компактные labels ✅ Done
**File:** `scss/style.scss`

```scss
@media screen and (min-width: 769px) {
    .userform__label {
        font-size: 12px;
        margin-bottom: 2px;
    }
}
```

---

## Phase 3: Testing

### Task 3.1: Desktop 1920x1080 ✅ Passed
### Task 3.2: Desktop 1366x768 ✅ Passed
### Task 3.3: Functional test ✅ Passed
### Task 3.4: Layout verified ✅ Passed

---

## Implementation Order

```
1. Task 1.1 — CSS Grid styles
2. Task 1.2 — HTML restructure
3. Task 2.1 — Results panel styles
4. Task 2.2 — Compact labels
5. Phase 3 — Testing
```

---

## Критерий успеха

**До:**
- Форма: ~1500px высота
- Скрол: обязательный
- Поля: не видно при загрузке

**После:**
- Форма: ~600px высота
- Скрол: не нужен на desktop
- Поля: видны сразу