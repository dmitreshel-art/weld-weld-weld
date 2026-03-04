<h1 align="center">🔥 Weld-Weld-Weld</h1>
<h3 align="center">Калькулятор расхода сварочных материалов</h3>

<p align="center">
  <img src="assets/demoTitle.gif" width="600"/>
</p>

<p align="center">
  <a href="https://dmitreshel-art.github.io/weld-weld-weld/">🔗 Live Demo</a>
</p>

---

## 📋 Описание

Веб-приложение для расчёта расхода сварочных материалов по ГОСТ 5264-80, ГОСТ 14771-76 и другим стандартам. Поддерживает 76 типов сварных соединений.

### Возможности:
- 📐 Расчёт расхода электродов, сварочной проволоки и защитного газа
- 📊 Данные из официальных ГОСТов
- 🎨 Современный адаптивный интерфейс
- 📱 Поддержка мобильных устройств

---

## 🚀 GitHub Pages

### Автоматический деплой

Приложение разворачивается автоматически через GitHub Pages из ветки `master`.

**Настройка (Settings → Pages):**
- Source: `Deploy from a branch`
- Branch: `master`
- Folder: `/(root)`

**URL:** https://dmitreshel-art.github.io/weld-weld-weld/

---

## 🛠 Разработка

### Локальный запуск

```bash
# Клонировать репозиторий
git clone https://github.com/dmitreshel-art/weld-weld-weld.git
cd weld-weld-weld

# Установить зависимости (для тестов)
npm install

# Открыть в браузере
open index.html
```

### Компиляция SCSS

```bash
# Требуется sass
sass scss/style.scss scss/style.css --watch
```

### Тесты

```bash
# Запуск тестов
npm test

# С отчётом покрытия
npm test -- --coverage
```

---

## 🧪 Тестирование

| Метрика | Значение |
|---------|----------|
| Тестов | 39 |
| Покрытие | ~29% |

---

## 📁 Структура проекта

```
weld-weld-weld/
├── index.html          # Главная страница
├── scss/               # Стили (SCSS → CSS)
│   ├── style.scss
│   ├── style.css       # Скомпилированный CSS
│   └── _properties.scss
├── scripts/            # JavaScript модули
│   ├── index.js        # Точка входа
│   ├── formulas.js     # Формулы расчёта
│   ├── validation.js   # Валидация ввода
│   ├── gost-data.js    # Данные ГОСТ
│   └── particles.js    # Анимация фона
├── data/               # JSON данные
├── __tests__/          # Unit-тесты (Jest)
├── img/                # Изображения
├── fonts/              # Шрифты
└── assets/             # Статические файлы
```

---

## 🔧 Технологии

| Категория | Инструменты |
|-----------|-------------|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Стили | SCSS, CSS Custom Properties |
| Тестирование | Jest |
| CI/CD | GitHub Actions |
| Анимация | Particles.js |

---

## 📚 Источники данных

- ГОСТ 5264-80 — Ручная дуговая сварка
- ГОСТ 14771-76 — Дуговая сварка в защитном газе
- ГОСТ 8713-79 — Автоматическая сварка под флюсом

См. [GOST-SOURCES.md](openspec/specs/GOST-SOURCES.md) для подробностей.

---

## 📄 Лицензия

MIT License

---

<p align="center">
  <sub>Сделано с ❤️ для сварщиков</sub>
</p>