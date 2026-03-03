// Данные из ГОСТ 5264-80 для сварных соединений
// Стыковые соединения (С)

const GOST_5264_DATA = [
  // С1 - С отбортовкой кромок (таблица 2)
  {
    connectionType: "С1",
    thickness_range: "1-4",
    data: [
      { thickness: 1, b: { min: 0, max: 0.5 }, e: { min: 1, max: 2 }, R: { min: 1, max: 3 } },
      { thickness: 2, b: { min: 0, max: 1 }, e: { min: 2, max: 4 }, R: { min: 2, max: 6 } },
      { thickness: 3, b: { min: 0, max: 1.5 }, e: { min: 3, max: 6 }, R: { min: 3, max: 9 } },
      { thickness: 4, b: { min: 0, max: 2 }, e: { min: 4, max: 8 }, R: { min: 4, max: 12 } }
    ]
  },
  
  // С2 - С отбортовкой одной кромки (таблица 5)
  {
    connectionType: "С2",
    thickness_range: "1-4",
    data: [
      { thickness: 1, b: 0, e: 6, g: 1 },
      { thickness: 1.5, b: 0.5, e: 6, g: 1 },
      { thickness: 2, b: 1, e: 7, g: 1.5 },
      { thickness: 3, b: 1.5, e: 7, g: 1.5 },
      { thickness: 4, b: 2, e: 8, g: 2 }
    ]
  },
  
  // С3 - С отбортовкой кромок (таблица 4)
  {
    connectionType: "С3",
    thickness_range: "1-4",
    data: [
      { thickness: 1, b: { min: 0, max: 0.5 }, e: { min: 1, max: 3 }, R: { min: 1, max: 4 } },
      { thickness: 2, b: { min: 0, max: 1 }, e: { min: 2, max: 4 }, R: { min: 2, max: 5 } },
      { thickness: 3, b: { min: 0, max: 1.5 }, e: { min: 3, max: 6 }, R: { min: 3, max: 7 } },
      { thickness: 4, b: { min: 0, max: 2 }, e: { min: 4, max: 8 }, R: { min: 4, max: 9 } }
    ]
  },
  
  // С4 - С отбортовкой одной кромки на подкладке (таблица 6)
  {
    connectionType: "С4",
    thickness_range: "1-4",
    data: [
      { thickness: 1, b: 0, e: 6, e1: 4, g: 1 },
      { thickness: 1.5, b: 0.5, e: 6, e1: 4, g: 1 },
      { thickness: 2, b: 1, e: 7, e1: 5, g: 1.5 },
      { thickness: 3, b: 1.5, e: 7, e1: 5, g: 1.5 },
      { thickness: 4, b: 2, e: 8, e1: 6, g: 2 }
    ]
  },
  
  // С5 - С отбортовкой кромок на подкладке (таблица 7)
  {
    connectionType: "С5",
    thickness_range: "1-4",
    data: [
      { thickness: 1, b: 0, e: 6, g: 1 },
      { thickness: 1.5, b: 0.5, e: 6, g: 1 },
      { thickness: 2, b: 1, e: 7, g: 1.5 },
      { thickness: 3, b: 1.5, e: 7, g: 1.5 },
      { thickness: 4, b: 2, e: 8, g: 2 }
    ]
  },
  
  // С6 - С отбортовкой кромок замковое (таблица 8)
  {
    connectionType: "С6",
    thickness_range: "1-4",
    data: [
      { thickness: 1, b: 0, e: 6, g: 1 },
      { thickness: 1.5, b: 0.5, e: 6, g: 1 },
      { thickness: 2, b: 1, e: 7, g: 1.5 },
      { thickness: 3, b: 1.5, e: 7, g: 1.5 },
      { thickness: 4, b: 2, e: 8, g: 2 }
    ]
  },
  
  // С7 - С без скоса кромок двустороннее (таблица 9)
  {
    connectionType: "С7",
    thickness_range: "2-5",
    data: [
      { thickness: 2, b: 1, e: 8, g: 1.5 },
      { thickness: 3, b: 1.5, e: 9, g: 2 },
      { thickness: 4, b: 2, e: 10, g: 2 },
      { thickness: 5, b: 2.5, e: 11, g: 2 }
    ]
  },
  
  // С8 - С со скосом одной кромки (таблица 11)
  {
    connectionType: "С8",
    thickness_range: "3-60",
    data: [
      { thickness: 3, e: 8, g: 0.5 },
      { thickness: 4, e: 8, g: 0.5 },
      { thickness: 5, e: 12, g: 0.5 },
      { thickness: 6, e: 12, g: 0.5 },
      { thickness: 8, e: 16, g: 1.5 },
      { thickness: 10, e: 16, g: 1.5 },
      { thickness: 12, e: 20, g: 1.5 },
      { thickness: 14, e: 24, g: 2 },
      { thickness: 16, e: 28, g: 2 },
      { thickness: 18, e: 28, g: 2 },
      { thickness: 20, e: 32, g: 2 }
    ]
  },
  
  // С17 - С со скосом кромок (таблица 21)
  {
    connectionType: "С17",
    thickness_range: "3-60",
    data: [
      { thickness: 3, e: 8, g: 1.5 },
      { thickness: 5, e: 12, g: 1.5 },
      { thickness: 8, e: 16, g: 2 },
      { thickness: 10, e: 19, g: 2 },
      { thickness: 12, e: 22, g: 2 },
      { thickness: 14, e: 26, g: 2 },
      { thickness: 16, e: 30, g: 3 },
      { thickness: 18, e: 34, g: 3 },
      { thickness: 20, e: 38, g: 3 },
      { thickness: 22, e: 42, g: 2 }
    ]
  },
  
  // У1 - Угловое без скоса кромок (таблица 34)
  {
    connectionType: "У1",
    thickness_range: "1-4",
    data: [
      { thickness: 1, b: { min: 0, max: 0.5 }, k: { min: 1, max: 2 } },
      { thickness: 2, b: { min: 0, max: 1 }, k: { min: 2, max: 4 } },
      { thickness: 3, b: { min: 0, max: 1.5 }, k: { min: 3, max: 6 } },
      { thickness: 4, b: { min: 0, max: 2 }, k: { min: 4, max: 8 } }
    ]
  },
  
  // У2 - Угловое без скоса кромок (таблица 35)
  {
    connectionType: "У2",
    thickness_range: "1-12",
    data: [
      { thickness: 1, R: 5, e: 7 },
      { thickness: 2, R: 5, e: 7 },
      { thickness: 3, R: 5, e: 7 },
      { thickness: 4, R: 5, e: 7 },
      { thickness: 6, R: 5, e: 14 },
      { thickness: 8, R: 5, e: 14 },
      { thickness: 10, R: 5, e: 17 },
      { thickness: 12, R: 5, e: 17 }
    ]
  },
  
  // У4 - Угловое без скоса кромок (таблица 36-37)
  {
    connectionType: "У4",
    thickness_range: "1-30",
    data: [
      { thickness: 1, n: { min: 0.1, max: 1.5 }, b: { min: 0, max: 0.5 }, e: 6 },
      { thickness: 2, n: { min: 0.5, max: 3 }, b: { min: 0, max: 0.5 }, e: 8 },
      { thickness: 3, n: { min: 1, max: 3 }, b: { min: 0, max: 0.5 }, e: 10 },
      { thickness: 5, n: { min: 1, max: 3 }, b: { min: 0, max: 0.5 }, e: 12 },
      { thickness: 6, n: { min: 1, max: 6 }, b: { min: 0.5, max: 0.5 }, e: 14 }
    ]
  },
  
  // У5 - Угловое двустороннее (таблица 38-39)
  {
    connectionType: "У5",
    thickness_range: "2-30",
    data: [
      { thickness: 2, n: 0, b: { min: 0.5, max: 0.5 }, e: 8 },
      { thickness: 3, n: 0, b: { min: 0.5, max: 1 }, e: 10 },
      { thickness: 4, n: 0, b: { min: 0.5, max: 2 }, e: 12 },
      { thickness: 6, n: 0, b: { min: 0.5, max: 3 }, e: 14 },
      { thickness: 8, n: 0, b: { min: 0.5, max: 3 }, e: 16 }
    ]
  },
  
  // У6 - Угловое со скосом одной кромки (таблица 40)
  {
    connectionType: "У6",
    thickness_range: "3-60",
    data: [
      { thickness: 3, e: 8, g: 1.5 },
      { thickness: 5, e: 12, g: 2 },
      { thickness: 8, e: 16, g: 2 },
      { thickness: 10, e: 20, g: 2 },
      { thickness: 12, e: 24, g: 2 },
      { thickness: 14, e: 28, g: 2 },
      { thickness: 16, e: 32, g: 3 },
      { thickness: 18, e: 35, g: 3 },
      { thickness: 20, e: 38, g: 3 }
    ]
  },
  
  // Т1 - Тавровое без скоса кромок (таблица 45)
  {
    connectionType: "Т1",
    thickness_range: "2-40",
    data: [
      { thickness: 2, b: { min: 0, max: 1 }, k: { min: 2, max: 4 } },
      { thickness: 3, b: { min: 0, max: 1 }, k: { min: 3, max: 5 } },
      { thickness: 4, b: { min: 0, max: 2 }, k: { min: 4, max: 8 } },
      { thickness: 5, b: { min: 0, max: 2 }, k: { min: 5, max: 10 } },
      { thickness: 6, b: { min: 0, max: 2 }, k: { min: 6, max: 12 } }
    ]
  },
  
  // Т3 - Тавровое без скоса кромок двустороннее (таблица 46)
  {
    connectionType: "Т3",
    thickness_range: "2-40",
    data: [
      { thickness: 2, b: { min: 0, max: 1 }, k1: { min: 2, max: 4 }, k2: { min: 2, max: 4 } },
      { thickness: 3, b: { min: 0, max: 1 }, k1: { min: 3, max: 5 }, k2: { min: 3, max: 5 } },
      { thickness: 4, b: { min: 0, max: 2 }, k1: { min: 4, max: 8 }, k2: { min: 4, max: 8 } }
    ]
  },
  
  // Н1 - Нахлёсточное одностороннее (таблица 53)
  {
    connectionType: "Н1",
    thickness_range: "2-60",
    data: [
      { thickness: 2, B: { min: 3, max: 20 }, b: { min: 0, max: 1 } },
      { thickness: 3, B: { min: 3, max: 20 }, b: { min: 0, max: 1 } },
      { thickness: 5, B: { min: 8, max: 40 }, b: { min: 0, max: 1.5 } },
      { thickness: 10, B: { min: 8, max: 40 }, b: { min: 0, max: 1.5 } },
      { thickness: 20, B: { min: 12, max: 100 }, b: { min: 0, max: 2 } },
      { thickness: 40, B: { min: 12, max: 100 }, b: { min: 0, max: 2 } }
    ]
  },
  
  // Н2 - Нахлёсточное двустороннее (таблица 54)
  {
    connectionType: "Н2",
    thickness_range: "2-60",
    data: [
      { thickness: 2, B: { min: 3, max: 20 }, b: { min: 0, max: 1 } },
      { thickness: 3, B: { min: 3, max: 20 }, b: { min: 0, max: 1 } },
      { thickness: 5, B: { min: 8, max: 40 }, b: { min: 0, max: 1.5 } },
      { thickness: 10, B: { min: 8, max: 40 }, b: { min: 0, max: 1.5 } }
    ]
  }
];

// Функция для получения данных по типу и толщине
function getJointData(connectionType, thickness) {
  const joint = GOST_5264_DATA.find(j => j.connectionType === connectionType);
  if (!joint) return null;
  
  // Найти ближайшую толщину
  const data = joint.data.find(d => d.thickness === thickness);
  if (data) return data;
  
  // Найти диапазон толщин
  for (const d of joint.data) {
    if (thickness >= d.thickness && thickness < (d.thickness + 1)) {
      return d;
    }
  }
  
  // Вернуть последнее значение если толщина больше диапазона
  return joint.data[joint.data.length - 1];
}

// Экспорт для использования
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GOST_5264_DATA, getJointData };
}