# add-testing

## Intent
Добавить автоматические тесты (юнит и E2E) для защиты от регрессий и повышения качества кода.

Сейчас нет никаких тестов. При изменении кода нужно вручную проверять, что ничего не сломалось. Это замедляет разработку и повышает риск багов.

## Scope

### In Scope
- [ ] Unit тесты для calculation.js (формулы, Fn, Mn, Ge, He)
- [ ] Unit тесты для validation.js (валидация ввода)
- [ ] E2E тест калькулятора (Playwright)
- [ ] CI/CD GitHub Actions для запуска тестов

### Out of Scope
- ❌ Тесты для UI компонентов (Jest + React Testing Library)
- ❌ Snapshot тесты
- ❌ Интеграционные тесты с реальным API

## Success Criteria

1. **Given** разработчик меняет formulas.js
   **When** запускает `npm test`
   **Then** тесты проверяют корректность расчётов
   
2. **Given** разработчик меняет валидацию
   **When** вводит невалидные данные
   **Then** тесты проверяют реакцию на ошибки

3. **Given** новый коммит в master
   **When** GitHub Actions запускается
   **Then** все тесты проходят автоматически

## Affected Capabilities

| Capability | Change Type | Description |
|------------|-------------|-------------|
| `calculation` | ENHANCED | Тесты формул |
| `validation` | ENHANCED | Тесты валидации |
| `quality` | NEW | CI/CD pipeline |

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Тесты падают после изменений | Medium | Medium | Изолированные тесты |
| Долго писать тесты | Medium | Low | Начать с критических функций |
| CI/CD сложно настроить | Low | Medium | Простой workflow |

## Estimated Effort
- Tasks: 6
- Time: 2-3 hours
- Complexity: Medium