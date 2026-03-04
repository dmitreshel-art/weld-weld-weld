# Implementation Tasks — Missing Thickness Data

## Status: 🟡 IMPLEMENTING — Option E selected

---

## ✅ Completed Tasks

### Task 0.1: Анализ источников данных ✅ Done
- Обнаружен `gost-data.js` с 18 типами соединений
- Сравнение: hardcoded (7) vs JSON (10) vs GOST (18)

### Task 1.1: Подключить GOST_5264_DATA ✅ Done
**File:** `scripts/calculation.js`

Изменения:
- Заменён блок if/else на динамический поиск в `GOST_5264_DATA`
- Добавлен fallback для С28 (нет в GOST_5264_DATA)
- MIG/MAG + ГОСТ 14771 оставлен hardcoded (нет данных)

```javascript
// Было:
if (typeOfConnection.value === "С1" || typeOfConnection.value === "С3") {
  let thicknessListC1 = ["", "1", "2", "3", "4"];
  // ...
}

// Стало:
const jointData = GOST_5264_DATA.find(j => j.connectionType === selectedType);
if (jointData && jointData.data) {
  const thicknesses = [...new Set(jointData.data.map(d => d.thickness))];
  // populate dropdown
}
```

---

## ⏳ Pending Tasks

### Task 1.2: Проверить на сайте ⬜ Ready
- Открыть https://dmitreshel-art.github.io/weld-weld-weld/
- Выбрать MMA + ГОСТ 5264
- Проверить типы: С1, С2, С3, С8, С17, У1, Т1, Н1
- Убедиться что толщины заполняются

### Task 1.3: Добавить С28 в gost-data.js ⬜ Pending
- С28 отсутствует в GOST_5264_DATA
- Сейчас использует hardcoded fallback
- Нужно добавить данные из ГОСТ

### Task 1.4: Расширить для других ГОСТ ⬜ Future
- ГОСТ 14771-76 (MIG/MAG)
- ГОСТ 16037-70 (TIG)
- ГОСТ 8713-79 (SAW)

---

## Coverage Summary

| Source | Before | After |
|--------|--------|-------|
| MMA + ГОСТ 5264 | 7 types | **18 types** |
| MIG/MAG + ГОСТ 14771 | 3 types | 3 types (unchanged) |
| TIG + ГОСТ 16037 | 0 types | 0 types |
| SAW + ГОСТ 8713 | 0 types | 0 types |