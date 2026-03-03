# Proposal: Frontend Accessibility & Security Fix

**ID:** `2026-03-03-frontend-accessibility-fix`  
**Status:** Complete ✅  
**Priority:** P0 (Critical)  
**Author:** AI Assistant  
**Date:** 2026-03-03  
**Progress:** 11/11 tasks (100%) complete

---

## Problem Statement

### Security Issues
1. **HTTP instead of HTTPS** — External scripts loaded over HTTP expose to MITM attacks
2. **Outdated dependencies** — Font Awesome 4.1.0 has known vulnerabilities

### Accessibility Issues  
1. **WCAG AA violations** — Color contrast ratio ~3.2:1 (needs 4.5:1)
2. **No form semantics** — Inputs not in `<form>`, labels without `for` attribute
3. **No ARIA live regions** — Results not announced to screen readers
4. **Non-semantic headings** — `<h2>` used as labels instead of proper elements

### Responsive Issues
1. **Fixed pixel widths** — `width: 400px` breaks on mobile (< 480px)
2. **No media queries** — Layout not optimized for small screens
3. **Absolute positioning** — Form positioning breaks at different viewport sizes

### Code Quality Issues
1. **Duplicate script loading** — `gost-data.js` loaded twice
2. **Typo in variable** — `$fontCollorMine` should be `$fontColorMine`
3. **Hard-coded colors in JS** — Theme switching uses inline styles instead of CSS variables
4. **Global JavaScript scope** — No module pattern, variables in global namespace

---

## Proposed Solution

### P0: Critical (Must Fix)

| Issue | Solution | Files |
|-------|----------|-------|
| HTTP scripts | Replace with HTTPS URLs from reliable CDNs | `index.html` |
| Fixed widths | Add `max-width: 100%`, responsive breakpoints | `scss/style.scss` |
| No form wrapper | Wrap inputs in `<form>`, add proper labels | `index.html` |

### P1: Important (Should Fix)

| Issue | Solution | Files |
|-------|----------|-------|
| Typo | Rename `$fontCollorMine` → `$fontColorMine` | `scss/_properties.scss`, `scss/style.scss` |
| Duplicate script | Remove duplicate `gost-data.js` | `index.html` |
| CSS variables | Add `:root` custom properties for theming | `scss/_properties.scss` |
| JS modules | Refactor to ES modules pattern | `scripts/*.js` |

### P2: Enhancement (Nice to Have)

| Issue | Solution | Files |
|-------|----------|-------|
| Low contrast | Darken `$fontColorMine` to `#991b1b` | `scss/_properties.scss` |
| Particles perf | Reduce particle count on mobile | `scripts/particles.js` |

---

## Impact Analysis

### Scope
- **Files changed:** 5 files
- **Lines added:** ~200
- **Lines removed:** ~50
- **Breaking changes:** No (backward compatible)

### Risk Assessment
| Risk | Probability | Mitigation |
|------|-------------|------------|
| Style regression | Low | Test all viewports |
| Script load failure | Low | Use reliable CDNs |
| Form submit break | Low | Preserve existing handlers |

### Testing Requirements
1. Desktop browsers: Chrome, Firefox, Safari, Edge
2. Mobile devices: iPhone SE (375px), iPad (768px), Desktop (1440px)
3. Accessibility: Lighthouse audit, screen reader test
4. Functional: All calculations still work

---

## Success Criteria

| Criterion | Measure | Target |
|-----------|---------|--------|
| Security | All scripts loaded via HTTPS | 100% |
| Accessibility | Lighthouse score | ≥ 90 |
| Responsiveness | Lighthouse mobile score | ≥ 85 |
| Contrast ratio | WCAG AA compliance | ≥ 4.5:1 |
| Functionality | All tests pass | 100% |

---

## Approval Checklist

- [ ] Security review approved
- [ ] Accessibility review approved  
- [ ] Mobile testing approved
- [ ] No breaking changes confirmed
- [ ] Ready for implementation

---

## References

- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Form Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/forms)
- [CSS Tricks: Responsive Design](https://css-tricks.com/responsive-design/)