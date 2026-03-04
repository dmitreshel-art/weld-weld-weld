const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1400 });
  
  console.log('=== ТЕСТ: С1, толщина 2 ===\n');
  
  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);
  
  // Выбираем MMA
  await page.selectOption('#weldingMethod', 'MMA Ручная дуговая сварка РД');
  await page.waitForTimeout(300);
  
  // Выбираем ГОСТ 5264
  await page.selectOption('#technicalDocumentation', 'ГОСТ 5264');
  await page.waitForTimeout(300);
  
  // Выбираем С1
  await page.selectOption('#typeOfConnection', 'С1');
  await page.waitForTimeout(500);
  
  // Проверяем толщины
  const thicknessOptions = await page.$$eval('#thicknessList option', opts => opts.map(o => o.value));
  console.log('Доступные толщины:', thicknessOptions);
  
  // Выбираем толщину 2 (если есть)
  if (thicknessOptions.includes('2')) {
    await page.selectOption('#thicknessList', '2');
    await page.waitForTimeout(1000);
    console.log('Толщина 2 выбрана\n');
  }
  
  // Проверяем параметры из JSON
  const gap = await page.inputValue('#gap');
  const weldWidth = await page.inputValue('#weldWidth');
  const gainHeight = await page.inputValue('#gainHeight');
  console.log('Параметры из JSON:');
  console.log('  gap:', gap || '(пусто)');
  console.log('  weldWidth:', weldWidth || '(пусто)');
  console.log('  gainHeight:', gainHeight || '(пусто)');
  
  // Вводим недостающие параметры вручную
  console.log('\nВвожу параметры вручную...');
  if (!gap) await page.fill('#gap', '1');
  if (!weldWidth) await page.fill('#weldWidth', '7');
  if (!gainHeight) await page.fill('#gainHeight', '1');
  
  // Вводим диаметр
  await page.fill('#diameter', '100');
  console.log('diameter: 100');
  
  // Скриншот до расчёта
  await page.screenshot({ path: '/home/user1/.openclaw/workspace/weld-project/screenshot-before.png' });
  
  // Нажимаем ПОДСЧИТАТЬ
  console.log('\nНажимаю ПОДСЧИТАТЬ...');
  await page.click('#mineButton');
  await page.waitForTimeout(2000);
  
  // Скриншот после расчёта
  await page.screenshot({ path: '/home/user1/.openclaw/workspace/weld-project/screenshot-after.png' });
  
  // Читаем результаты
  const fn = await page.inputValue('#resultFn');
  const mn = await page.inputValue('#resultMn');
  const ge = await page.inputValue('#resultGe');
  const he = await page.inputValue('#resultHe');
  
  console.log('\n========== РЕЗУЛЬТАТЫ ==========');
  console.log('Fn (площадь сечения):', fn);
  console.log('Mn (масса наплавки):', mn);
  console.log('Ge (норма расхода):', ge);
  console.log('He (расход на стык):', he);
  console.log('=================================\n');
  
  // Проверяем, что результаты не NaN
  const fnVal = parseFloat(fn);
  const mnVal = parseFloat(mn);
  const geVal = parseFloat(ge);
  const heVal = parseFloat(he);
  
  if (isNaN(fnVal) || isNaN(mnVal) || isNaN(geVal) || isNaN(heVal)) {
    console.log('❌ ОШИБКА: Результаты содержат NaN!');
  } else if (fnVal === 0 && mnVal === 0 && geVal === 0 && heVal === 0) {
    console.log('⚠️  ПРЕДУПРЕЖДЕНИЕ: Все результаты равны 0');
  } else {
    console.log('✅ УСПЕХ: Результаты не NaN и не все нули!');
  }
  
  await browser.close();
})();
