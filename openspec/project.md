# Project: Weld-Weld-Weld

> Калькулятор норм расхода сварочных материалов по ГОСТ РФ

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3 (SCSS), JavaScript (Vanilla) |
| **Runtime** | Browser (static, no build) |
| **Animation** | particles.js 2.0.0 |
| **Package Manager** | npm (dev dependencies only) |
| **Testing** | Not implemented yet |

## Architecture

```
weld/
├── index.html              # Single-page application entry
├── scripts/
│   ├── calculation.js      # UI logic + event handlers
│   ├── formulas.js         # Mathematical calculations
│   └── particles.js        # Background animation
├── scss/                   # Styles (compiled to CSS)
├── assets/                 # Demo images
├── fonts/                  # Custom fonts
├── img/                    # Static images
├── exel.json              # Reference data (joint parameters)
└── exel.md                # Variable documentation
```

**Pattern:** Static Single-Page Application (SPA)
**Key Principle:** Calculation logic separated from UI (formulas.js)

## Supported Standards (GOST)

| Метод сварки | Code | ГОСТ |
|-------------|------|------|
| Ручная дуговая | MMA (РД) | ГОСТ 5264, ГОСТ 11534 |
| Полуавтоматическая | MIG/MAG (МП) | ГОСТ 14771, ГОСТ 23518 |
| Аргонодуговая | TIG (РАД) | ГОСТ 16037 |
| Автоматическая под флюсом | SAW (АФ) | ГОСТ 8713 |

## Joint Types

| Category | Types | Count |
|----------|-------|-------|
| Стыковые (С) | С1-С28, С39-С45 | 35 |
| Угловые (У) | У1-У10 | 10 |
| Тавровые (Т) | Т1-Т9 | 9 |
| Нахлёсточные (Н) | Н1-Н2 | 2 |
| **Total** | | **56** |

## Code Standards

- **Naming:** camelCase for variables/functions, PascalCase for classes
- **Files:** lowercase with dashes for multi-word
- **Comments:** JSDoc for public functions
- **Indentation:** 2 spaces (SCSS), 4 spaces (JS)

## Constraints

### Performance
- Page load: < 3 seconds on 3G
- Calculation time: < 100ms
- No external API calls (fully client-side)

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Localization
- Primary: Russian
- No i18n infrastructure (hardcoded strings)

### Security
- Client-side only (no sensitive data)
- No authentication required
- Input validation required (prevent XSS)

## Known Issues

| ID | Issue | Priority | Status |
|----|-------|----------|--------|
| BUG-001 | Geometry parameters not loading from JSON | 🔴 Critical | Open |
| BUG-002 | Diameter field missing (He = undefined for pipes) | 🔴 Critical | Open |
| BUG-003 | No input validation | 🟡 Medium | Open |
| BUG-004 | No error handling | 🟡 Medium | Open |
| BUG-005 | Duplicate code in calculation.js | 🟢 Low | Open |

## Non-Goals (Phase 1)

- ❌ User authentication
- ❌ Database persistence
- ❌ Export to PDF/Excel
- ❌ PWA (offline support)
- ❌ Mobile-first responsive
- ❌ Multi-language support
- ❌ Backend API

## Key Files Reference

| Purpose | File |
|---------|------|
| Entry point | `index.html` |
| UI Logic | `scripts/calculation.js` |
| Calculation formulas | `scripts/formulas.js` |
| Reference data | `exel.json` |
| Variable docs | `exel.md` |
| Styles | `scss/` |

## Coefficient Reference

| Method | k (loss coefficient) |
|--------|---------------------|
| MMA (РД) | 1.70 |
| MIG/MAG (МП) | 1.15 |
| TIG (РАД) | 1.10 |
| SAW (АФ) | 1.02 |

## Formula Reference

```
Fn = f(joint_type, parameters)  — Cross-section area (mm²)
Mn = ρ × Fn                      — Deposited metal mass (g/m), ρ = 0.00785 g/mm³
Ge = k × Mn                      — Material consumption rate (g/m)
He = Ge × Lh                     — Total consumption per joint (g), Lh = 1m or d×π
```

## Project Roadmap

### Phase 1: Critical Fixes (Required)
- [ ] Fix geometry parameter loading
- [ ] Add diameter input field
- [ ] Implement input validation
- [ ] Add error handling

### Phase 2: Enhancements
- [ ] Mobile responsive design
- [ ] Export to PDF
- [ ] Save history (LocalStorage)
- [ ] PWA support

### Phase 3: Scale
- [ ] Material database (electrodes, wire, gas)
- [ ] Spatial position coefficients
- [ ] Multi-language support
- [ ] Backend API option