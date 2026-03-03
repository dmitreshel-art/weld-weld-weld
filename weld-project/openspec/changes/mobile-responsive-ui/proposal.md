# mobile-responsive-ui

## Intent
Сделать калькулятор адаптивным для мобильных устройств и улучшить визуальный дизайн (красивый UI).

Сейчас калькулятор работает только на desktop. На мобильных устройствах поля съезжают, кнопки слишком мелкие, layout ломается.

## Scope

### In Scope
- [ ] Адаптивный layout для экранов 320px - 1920px
- [ ] Мобильное меню (бургер)
- [ ] Крупные touch-friendly элементы
- [ ] Красивый UI: тени, скругления, анимации
- [ ] Улучшенная цветовая схема
- [ ] CSS Grid/Flexbox для параметров

### Out of Scope
- ❌ PWA (оффлайн режим)
- ❌ Native mobile app
- ❌ Touch gestures (swipe)
- ❌ Dark mode toggle (уже есть)

## Success Criteria

1. **Given** ширина экрана 375px (iPhone SE)
   **When** открываю калькулятор
   **Then** все элементы видимы без горизонтального скролла

2. **Given** ширина экрана 768px (iPad)
   **When** переворачиваю планшет
   **Then** layout перестраивается под новую ориентацию

3. **Given** тач-устройство
   **When** нажимаю на кнопку/поле
   **Then** область касания минимум 44×44px

4. **Given** любое устройство
   **When** смотрю на интерфейс
   **Then** вижу современные тени, скругления, плавные переходы

## Affected Capabilities

| Capability | Change Type | Description |
|------------|-------------|-------------|
| `user-interface` | MODIFIED | Responsive layout, modern design |

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Сломать desktop версию | Medium | High | Тестировать на всех breakpoint |
| Производительность анимаций | Low | Medium | CSS transforms instead of JS |
| Несовместимость старых браузеров | Low | Low | Graceful degradation |

## Estimated Effort
- Tasks: 8
- Time: 2-3 hours
- Complexity: Medium