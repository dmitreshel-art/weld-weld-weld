# PRD — Weld-Weld-Weld

**Product Requirements Document**

| Meta | Value |
|------|-------|
| Product | Weld-Weld-Weld |
| Version | 1.0.0 |
| Status | Active Development |
| Type | Web Application |
| Platform | Browser (Desktop) |
| License | MIT |

---

## 1. Executive Summary

### 1.1 Product Vision
Бесплатный веб-калькулятор для расчёта норм расхода сварочных материалов по российским ГОСТам. Автоматизирует рутинные расчёты технологов-сварщиков, сметчиков и инженеров.

### 1.2 Target Users

| Persona | Role | Primary Need |
|---------|------|--------------|
| **Технолог** | Инженер-сварщик | Расчёт норм для техпроцессов |
| **Сметчик** | Экономист | Расчёт материалов для смет |
| **Студент** | Обучающийся | Учебные расчёты по ГОСТ |
| **Мастер** | Производственник | Оперативный расчёт материалов |

### 1.3 Unique Value Proposition
- 50+ типов сварных соединений
- 4 метода сварки (MMA, MIG/MAG, TIG, SAW)
- 6 ГОСТов РФ
- Бесплатно, без установки
- Точность по ГОСТ

---

## 2. Functional Requirements

### FR-001: Method Selection
**Priority:** P0  
**Status:** ✅ Implemented

Пользователь выбирает метод сварки:
- MMA (РД) — ручная дуговая
- MIG/MAG (МП) — полуавтоматическая
- TIG (РАД) — аргонодуговая
- SAW (АФ) — автоматическая под флюсом

**Acceptance Criteria:**
- GIVEN user opens calculator
- WHEN user selects method
- THEN relevant ГОСТ options are filtered

### FR-002: Standard Selection
**Priority:** P0  
**Status:** ✅ Implemented

Система отображает применимые ГОСТы для выбранного метода.

| Method | ГОСТы |
|--------|-------|
| MMA | ГОСТ 5264, ГОСТ 11534 |
| MIG/MAG | ГОСТ 14771, ГОСТ 23518 |
| TIG | ГОСТ 16037 |
| SAW | ГОСТ 8713 |

### FR-003: Joint Type Selection
**Priority:** P0  
**Status:** ✅ Implemented

Динамический список типов соединений на основе ГОСТа.

**Categories:**
- Стыковые (С): С1-С28, С39-С45
- Угловые (У): У1-У10
- Тавровые (Т): Т1-Т9
- Нахлёсточные (Н): Н1-Н2

### FR-004: Geometry Parameters Input
**Priority:** P0  
**Status:** ❌ Broken (BUG-001, BUG-002)

Ввод геометрических параметров шва:

| Parameter | Symbol | Unit | Description |
|-----------|--------|------|-------------|
| Толщина металла | S | мм | Основная толщина |
| Зазор | b | мм | Между деталями |
| Притупление | c | мм | Глубина притупления |
| Ширина шва | e | мм | Ширина усиления |
| Высота усиления | g | мм | Высота наплавки |
| Угол разделки (верхний) | α | ° | Угол скоса кромки |
| Угол разделки (нижний) | β | ° | Угол скоса кромки |
| Радиус перехода | R | мм | Радиус галтели |
| Диаметр трубы | d | мм | ❌ MISSING |

**Known Issues:**
- BUG-001: Parameters not loading from exel.json
- BUG-002: No diameter input for pipe joints

### FR-005: Calculation Execution
**Priority:** P0  
**Status:** ✅ Implemented

Автоматический расчёт при изменении параметров.

**Formula Flow:**
```
Fn = f(joint_type, geometry) → Mn = ρ × Fn → Ge = k × Mn → He = Ge × Lh
```

### FR-006: Results Display
**Priority:** P0  
**Status:** ✅ Partial

Отображение результатов:

| Result | Unit | Status |
|--------|------|--------|
| Fn — площадь сечения | мм² | ✅ |
| Mn — масса наплавки | г/м | ✅ |
| Ge — норма расхода | г/м | ✅ |
| He — расход на стык | г | ⚠️ Broken for pipes |

### FR-007: Theme Toggle
**Priority:** P2  
**Status:** ✅ Implemented

Переключение тёмной/светлой темы.

---

## 3. Non-Functional Requirements

### NFR-001: Performance
| Metric | Target |
|--------|--------|
| Page Load (3G) | < 3s |
| Calculation Time | < 100ms |
| First Paint | < 1s |
| Time to Interactive | < 2s |

### NFR-002: Browser Compatibility
| Browser | Min Version |
|---------|-------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### NFR-003: Accuracy
| Requirement | Verification |
|-------------|--------------|
| ГОСТ compliance | Manual verification |
| Calculation error | < 1% |
| Coefficient accuracy | Per ГОСТ tables |

### NFR-004: Accessibility
- Semantic HTML
- ARIA labels (partial)
- Keyboard navigation (partial)
- WCAG 2.1 AA target (not achieved)

### NFR-005: Localization
- Primary: Russian (ru-RU)
- Format: Number with decimal comma

---

## 4. Data Requirements

### DR-001: Reference Data (exel.json)
Структура данных для типовых соединений:

```json
{
  "С2": {
    "method": ["MMA", "MIG/MAG"],
    "gost": ["ГОСТ 5264", "ГОСТ 14771"],
    "type": "стыковое",
    "params": {
      "S": { "min": 1, "max": 4, "default": 2 },
      "b": { "min": 0, "max": 3, "default": 1 },
      "e": { "min": null, "max": null, "default": null },
      "g": { "min": null, "max": null, "default": null }
    },
    "formula": "Fn = 0.75 * e * g + b * S",
    "image": "assets/C2.png"
  }
}
```

### DR-002: Material Coefficients
| Method | k | Material |
|--------|---|----------|
| MMA | 1.70 | Электроды |
| MIG/MAG | 1.15 | Проволока + газ |
| TIG | 1.10 | Присадка + аргон |
| SAW | 1.02 | Проволока + флюс |

### DR-003: Physical Constants
| Constant | Value | Unit |
|----------|-------|------|
| ρ (density) | 0.00785 | г/мм³ |
| π (pi) | 3.14159 | - |

---

## 5. UI/UX Requirements

### UI-001: Layout Structure
```
┌─────────────────────────────────────────────┐
│                  HEADER                      │
│  Logo | Method Selector | Theme Toggle      │
├─────────────────────────────────────────────┤
│  SIDEBAR          │      MAIN CONTENT       │
│  ┌─────────────┐  │  ┌─────────────────────┐│
│  │ ГОСТ        │  │  │   Joint Diagram     ││
│  │ Joint Type  │  │  │   (SVG/PNG)         ││
│  │ Parameters  │  │  └─────────────────────┘│
│  │ (dynamic)   │  │  ┌─────────────────────┐│
│  └─────────────┘  │  │   Input Fields      ││
│                   │  │   (S, b, c, etc.)   ││
│                   │  └─────────────────────┘│
│                   │  ┌─────────────────────┐│
│                   │  │   RESULTS           ││
│                   │  │   Fn, Mn, Ge, He    ││
│                   │  └─────────────────────┘│
└─────────────────────────────────────────────┘
```

### UI-002: Color Scheme
| Element | Light Theme | Dark Theme |
|---------|-------------|------------|
| Background | #FFFFFF | #1A1A2E |
| Surface | #F5F5F5 | #16213E |
| Primary | #0F3460 | #E94560 |
| Text | #333333 | #E0E0E0 |
| Accent | #E94560 | #0F3460 |

### UI-003: Interactive Elements
- Dropdowns: Custom styled select
- Inputs: Number with validation
- Buttons: Hover/focus states
- Results: Animated reveal

---

## 6. Constraints & Assumptions

### Constraints
1. **No Backend:** Fully client-side, no server logic
2. **No Persistence:** Session only, LocalStorage optional
3. **No Auth:** Public tool, no user accounts
4. **No Export:** Results displayed only (no PDF/Excel)

### Assumptions
1. User knows welding terminology
2. User has ГОСТ reference for joint selection
3. Modern browser available
4. Desktop usage primarily

---

## 7. Out of Scope (v1.0)

| Feature | Reason | Future |
|---------|--------|--------|
| User Auth | No backend | Phase 2 |
| PDF Export | Complex | Phase 2 |
| History | No persistence | Phase 2 |
| Mobile Responsive | Layout fixed | Phase 2 |
| PWA | No offline need | Phase 3 |
| API | Monolith first | Phase 3 |
| Multi-language | Hardcoded RU | Phase 3 |
| Material Database | Scope | Phase 3 |

---

## 8. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Calculation Accuracy | 99% ГОСТ compliance | Manual audit |
| Load Time | < 3s | Lighthouse |
| User Error Rate | < 5% | Input validation |
| Feature Coverage | 50+ joint types | Manual count |
| Browser Coverage | 4 browsers | Compatibility test |

---

## 9. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| ГОСТ obsolescence | Medium | High | Version tracking |
| User input errors | High | Medium | Validation |
| Mobile unusability | High | Low | Phase 2 responsive |
| Calculation bugs | Medium | High | Unit tests |
| Data entry errors | Medium | High | Validation + tests |

---

## 10. Glossary

| Term | Definition |
|------|------------|
| **Fn** | Площадь поперечного сечения наплавленного металла (мм²) |
| **Mn** | Масса наплавленного металла на 1м шва (г/м) |
| **Ge** | Удельная норма расхода (г/м) |
| **He** | Норма расхода на стык (г) |
| **k** | Коэффициент потерь материала |
| **ρ** | Плотность наплавленного металла (г/мм³) |
| **Lh** | Длина шва (м) или периметр трубы (d×π) |
| **MMA** | Manual Metal Arc (РДС) |
| **MIG/MAG** | Metal Inert/Active Gas |
| **TIG** | Tungsten Inert Gas |
| **SAW** | Submerged Arc Welding |

---

## 11. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-03 | AI Analyst | Initial PRD from code analysis |