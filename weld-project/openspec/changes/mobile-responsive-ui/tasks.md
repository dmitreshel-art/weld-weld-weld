# Implementation Tasks — mobile-responsive-ui

## Phase 1: Responsive Foundation

### Task 1.1: Add Viewport Meta Tag
- **Description:** Добавить meta viewport для правильного масштабирования
- **File:** `repo/index.html`
- **Acceptance:**
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```
- **Dependencies:** None
- **Status:** ⬜ Pending

### Task 1.2: Create CSS Media Queries
- **Description:** Добавить брейкпойнты для разных размеров экрана
- **File:** `repo/scss/style.css`
- **Acceptance:**
  ```css
  @media (max-width: 768px) { ... }  /* Tablet */
  @media (max-width: 480px) { ... }  /* Mobile */
  ```
- **Dependencies:** Task 1.1
- **Status:** ⬜ Pending

### Task 1.3: Convert to Flexbox/Grid Layout
- **Description:** Перевести layout на CSS Grid/Flexbox
- **File:** `repo/scss/style.css`
- **Acceptance:**
  - Sidebar и main content в Grid
  - Параметры в Flexbox
  - Адаптивность без float
- **Dependencies:** Task 1.2
- **Status:** ⬜ Pending

## Phase 2: Mobile Optimizations

### Task 2.1: Reduce Font Sizes
- **Description:** Уменьшить шрифты для мобильных
- **File:** `repo/scss/style.css`
- **Acceptance:**
  - Desktop: 16-20px
  - Mobile: 14-16px
  - Titles: 18-24px
- **Dependencies:** Task 1.2
- **Status:** ⬜ Pending

### Task 2.2: Increase Touch Targets
- **Description:** Увеличить область касания для кнопок и полей
- **File:** `repo/scss/style.css`
- **Acceptance:**
  - Min 44px height for buttons
  - Min 44px height for inputs
  - Adequate spacing between elements
- **Dependencies:** Task 2.1
- **Status:** ⬜ Pending

### Task 2.3: Stack Parameters on Mobile
- **Description:** Расположить параметры в колонку на мобильных
- **File:** `repo/scss/style.css`
- **Acceptance:**
  - Desktop: параметры в ряд или 2 колонки
  - Mobile: параметры в колонку
  - Full width inputs on mobile
- **Dependencies:** Task 1.3
- **Status:** ⬜ Pending

## Phase 3: Beautiful UI

### Task 3.1: Add Shadows and Rounded Corners
- **Description:** Добавить тени и скругления для современного вида
- **File:** `repo/scss/style.css`
- **Acceptance:**
  - Card-like containers with shadow
  - Rounded corners (8-12px)
  - Subtle hover effects
- **Dependencies:** Task 1.3
- **Status:** ⬜ Pending

### Task 3.2: Improve Color Scheme
- **Description:** Улучшить цветовую схему
- **File:** `repo/scss/style.css`
- **Acceptance:**
  - Consistent color palette
  - Good contrast
  - Better dark theme
- **Dependencies:** Task 3.1
- **Status:** ⬜ Pending

## Phase 4: Testing

### Task 4.1: Test on Multiple Breakpoints
- **Description:** Протестировать на разных размерах экрана
- **Acceptance:**
  - 320px (iPhone SE) ✅
  - 375px (iPhone 12) ✅
  - 768px (iPad) ✅
  - 1024px (iPad Pro) ✅
  - 1440px (Desktop) ✅
  - 1920px (Large Desktop) ✅
- **Dependencies:** All previous tasks
- **Status:** ⬜ Pending

---

## Progress Tracking

| Task | Description | Status | Time |
|------|-------------|--------|------|
| 1.1 | Viewport meta | ⬜ | - |
| 1.2 | Media queries | ⬜ | - |
| 1.3 | Flexbox/Grid | ⬜ | - |
| 2.1 | Font sizes | ⬜ | - |
| 2.2 | Touch targets | ⬜ | - |
| 2.3 | Stack params | ⬜ | - |
| 3.1 | Shadows/rounded | ⬜ | - |
| 3.2 | Color scheme | ⬜ | - |
| 4.1 | Test breakpoints | ⬜ | - |

---

## Notes

- Focus on mobile-first approach
- Use CSS custom properties for easy theming
- Test on real devices if possible
- Keep desktop experience intact