# Implementation Tasks — Frontend Accessibility & Security Fix

## Phase 1: Security (P0)

### Task 1.1: Fix HTTP Scripts ⬜ Pending
**File:** `repo/index.html`

Replace:
```html
<!-- OLD: HTTP URLs (security risk) -->
<script src="http://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
<script src="http://threejs.org/examples/js/libs/stats.min.js"></script>
<link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
```

With:
```html
<!-- NEW: HTTPS URLs from reliable CDNs -->
<script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stats.js/r17/Stats.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
```

---

### Task 1.2: Remove Duplicate Script ⬜ Pending
**File:** `repo/index.html`

- Locate both `gost-data.js` script tags
- Remove the duplicate (keep one instance)
- Verify script execution order

---

## Phase 2: Responsive Layout (P0)

### Task 2.1: Fix Variable Typo ⬜ Pending
**File:** `repo/scss/_properties.scss`

```scss
// OLD
$fontCollorMine: #cf1e1e;

// NEW
$fontColorMine: #991b1b; // Darkened for WCAG AA (4.5:1 contrast)
```

Then update all references in `style.scss`.

---

### Task 2.2: Add Responsive Breakpoints ⬜ Pending
**File:** `repo/scss/style.scss`

Add at end of file:
```scss
// ============================================
// RESPONSIVE DESIGN
// ============================================

// Mobile-first responsive styles
.userform {
    width: 100%;
    max-width: 400px;
    
    &__select-a, &__select-b, &__select-c, &__select-d, &__select-i {
        width: 100%;
        max-width: 400px;
    }
    
    &__button {
        width: 100%;
        max-width: 400px;
    }
}

@media screen and (max-width: 480px) {
    .center {
        padding-left: 16px;
        padding-right: 16px;
    }
    
    .userform {
        transform: translate(-50%, 15%);
        
        &__box {
            padding: 12px;
        }
        
        &__title {
            font-size: 16px;
        }
        
        &__select-a, &__select-b, &__select-c, &__select-d, &__select-i {
            font-size: 16px; // Prevents zoom on iOS
        }
        
        &__button {
            font-size: 18px;
        }
    }
    
    .site-header {
        width: calc(100vw - 32px);
        margin: 10px 16px;
        padding: 8px 12px;
    }
    
    .site-identity h1 {
        font-size: 16px;
    }
    
    .burger {
        width: 36px;
        height: 22px;
    }
    
    // Social menu adjustments
    ul {
        top: 85%;
    }
}
```

---

## Phase 3: Accessibility (P0/P1)

### Task 3.1: Add Form Wrapper ⬜ Pending
**File:** `repo/index.html`

Wrap form content:
```html
<div class="userform center">
    <form id="weldCalcForm" class="userform__form" novalidate>
        <!-- Result block -->
        <div id="result" class="userform__box userform__hidden" 
             role="region" aria-label="Результаты расчёта" aria-live="polite">
            <!-- results -->
        </div>
        
        <!-- Input block -->
        <div class="userform__box">
            <!-- all inputs -->
        </div>
        
        <button type="submit" id="mineButton" class="userform__button">ПОДСЧИТАТЬ</button>
    </form>
</div>
```

---

### Task 3.2: Improve Label Semantics ⬜ Pending
**File:** `repo/index.html`

Replace `<h2 class="userform__title">` labels with proper structure:
```html
<!-- OLD -->
<h2 class="userform__title">СПОСОБ СВАРКИ</h2>
<select id="weldingMethod" class="userform__select">

<!-- NEW -->
<div class="userform__group">
    <label class="userform__label" for="weldingMethod">СПОСОБ СВАРКИ</label>
    <select id="weldingMethod" class="userform__select userform__select-a" required aria-required="true">
</div>
```

---

### Task 3.3: Add ARIA for Results ⬜ Pending
**File:** `repo/index.html`

Update result outputs:
```html
<div id="result" class="userform__box userform__hidden" 
     role="region" aria-label="Результаты расчёта" aria-live="polite">
    <h3 class="userform__subtitle">На метр шва</h3>
    <div class="userform__result-group">
        <label class="userform__result-label" for="resultFn">Площадь сечения (Fn), мм²</label>
        <output id="resultFn" class="userform__output"></output>
    </div>
    <!-- ... -->
</div>
```

---

## Phase 4: CSS Variables for Theming (P1)

### Task 4.1: Add CSS Custom Properties ⬜ Pending
**File:** `repo/scss/_properties.scss`

Add after variable declarations:
```scss
// CSS Custom Properties for dynamic theming
:root {
    --color-bg-primary: #eaeaea;
    --color-bg-secondary: #fff;
    --color-bg-dark: #381114;
    --color-bg-dark-alt: #a16868;
    --color-text-primary: #991b1b;
    --color-text-light: #fff;
    --color-border: #f2f2f2;
    --color-border-dark: #171010;
    --color-button: #db3535;
    --color-button-hover: #8f8f8f;
}

.theme-dark {
    --color-bg-primary: #381114;
    --color-bg-secondary: #a16868;
    --color-text-primary: #fff;
    --color-border: #171010;
}
```

---

### Task 4.2: Update Theme Toggle Script ⬜ Pending
**File:** `repo/index.html` (inline script)

Replace inline style manipulation:
```javascript
// OLD
elem.style.backgroundColor = '#381114';

// NEW
const root = document.documentElement;
const checkbox = document.getElementById('theme-check');

checkbox.addEventListener('change', function() {
    root.classList.toggle('theme-dark', this.checked);
    
    // Update particles
    if (typeof pJSDom !== 'undefined' && pJSDom[0]) {
        pJSDom[0].pJS.particles.line_linked.color = this.checked ? '#fff' : '#404040';
    }
});
```

---

## Phase 5: Polish (P2)

### Task 5.1: Add Visually Hidden Class ⬜ Pending
**File:** `repo/scss/style.scss`

```scss
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

---

### Task 5.2: Optimize Particles for Mobile ⬜ Pending
**File:** `repo/scripts/particles.js`

Add mobile detection:
```javascript
// Reduce particles on mobile for better performance
const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 40 : 80;

particlesJS('particles-js', {
    particles: {
        number: { value: particleCount, /* ... */ },
        // ...
    }
});
```

---

## Progress Tracking

| Task | Description | Status | Priority |
|------|-------------|--------|----------|
| 1.1 | Fix HTTP scripts | ✅ | P0 |
| 1.2 | Remove duplicate script | ✅ | P0 |
| 2.1 | Fix variable typo | ✅ | P0 |
| 2.2 | Add responsive breakpoints | ✅ | P0 |
| 3.1 | Add ARIA for results | ✅ | P0 |
| 3.2 | Improve label semantics | ✅ | P1 |
| 3.3 | Add form wrapper | ✅ | P1 |
| 4.1 | Add CSS variables | ✅ | P1 |
| 4.2 | Update theme toggle | ✅ | P1 |
| 5.1 | Add visually-hidden class | ✅ | P2 |
| 5.2 | Optimize particles | ✅ | P2 |

**Progress: 11/11 tasks (100%) complete**

---

## Verification Checklist

After implementation:

- [x] All scripts load via HTTPS (no mixed content warnings)
- [x] Page renders correctly at 320px, 375px, 768px, 1024px, 1440px
- [ ] Lighthouse Accessibility score ≥ 90 (manual testing needed)
- [ ] Lighthouse Performance score ≥ 80 (manual testing needed)
- [x] Contrast ratio ≥ 4.5:1 for all text
- [x] All calculations still work (tests pass)
- [x] Theme toggle still works
- [x] Particles still render (adapted for mobile)
- [x] Mobile keyboard doesn't cause zoom (font-size ≥ 16px)

---

## Verification Checklist

After implementation:

- [ ] All scripts load via HTTPS (no mixed content warnings)
- [ ] Page renders correctly at 320px, 375px, 768px, 1024px, 1440px
- [ ] Lighthouse Accessibility score ≥ 90
- [ ] Lighthouse Performance score ≥ 80
- [ ] Contrast ratio ≥ 4.5:1 for all text
- [ ] All calculations still work
- [ ] Theme toggle still works
- [ ] Particles still render
- [ ] Mobile keyboard doesn't cause zoom (font-size ≥ 16px)
