const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1400 });
  
  console.log('=== ТЕСТ ВАЛИДАЦИИ ===\n');
  
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
  
  console.log('1. Тест отрицательного значения...');
  await page.fill('#gap', '-5');
  await page.click('#mineButton');
  await page.waitForTimeout(500);
  
  // Проверяем, есть ли ошибка
  const gapError = await page.$('.error-message');
  if (gapError) {
    const errorText = await gapError.textContent();
    console.log('   ✅ Ошибка показана:', errorText);
  } else {
    console.log('   ❌ Ошибка НЕ показана');
  }
  
  console.log('\n2. Тест превышения максимума...');
  await page.fill('#gap', '1000');
  await page.click('#mineButton');
  await page.waitForTimeout(500);
  
  const gapError2 = await page.$('.error-message');
  if (gapError2) {
    const errorText2 = await gapError2.textContent();
    console.log('   ✅ Ошибка показана:', errorText2);
  } else {
    console.log('   ❌ Ошибка НЕ показана');
  }
  
  console.log('\n3. Тест корректного значения...');
  await page.fill('#gap', '2');
  await page.fill('#weldWidth', '7');
  await page.fill('#gainHeight', '1');
  await page.fill('#diameter', '100');
  await page.click('#mineButton');
  await page.waitForTimeout(1000);
  
  const fn = await page.inputValue('#resultFn');
  console.log('   Результат Fn:', fn);
  
  if (fn && fn !== '0.00 мм²' && !fn.includes('NaN')) {
    console.log('   ✅ Расчёт выполнен корректно');
  } else {
    console.log('   ⚠️ Результат:', fn);
  }
  
  console.log('\n4. Тест очистки при смене типа...');
  await page.selectOption('#typeOfConnection', 'С8');
  await page.waitForTimeout(500);
  
  const gapValue = await page.inputValue('#gap');
  if (gapValue === '') {
    console.log('   ✅ Поле очищено при смене типа');
  } else {
    console.log('   ⚠️ Поле не очищено:', gapValue);
  }
  
  await page.screenshot({ path: '/home/user1/.openclaw/workspace/weld-project/test-validation.png' });
  console.log('\nСкриншот: test-validation.png');
  
  await browser.close();
})();
