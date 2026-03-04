const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1400 });
  
  console.log('1. Открываю страницу...');
  await page.goto('http://localhost:8080');
  await page.waitForTimeout(2000);
  
  console.log('2. Выбираю метод сварки: MMA');
  await page.selectOption('#weldingMethod', { label: 'MMA Ручная дуговая сварка РД' });
  await page.waitForTimeout(500);
  
  console.log('3. Выбираю ГОСТ: ГОСТ 5264');
  await page.selectOption('#technicalDocumentation', { label: 'ГОСТ 5264' });
  await page.waitForTimeout(500);
  
  console.log('4. Выбираю тип соединения: С2');
  await page.selectOption('#typeOfConnection', { label: 'С2' });
  await page.waitForTimeout(500);
  
  console.log('5. Выбираю толщину: 2');
  await page.selectOption('#thicknessList', { label: '2' });
  await page.waitForTimeout(1000);
  
  console.log('6. Заполняю параметры...');
  await page.fill('#gap', '1');
  await page.fill('#weldWidth', '7');
  await page.fill('#gainHeight', '1');
  await page.waitForTimeout(500);
  
  console.log('7. Нажимаю ПОДСЧИТАТЬ');
  await page.click('#mineButton');
  await page.waitForTimeout(2000);
  
  console.log('8. Получаю результаты...');
  const fn = await page.inputValue('#resultFn');
  const mn = await page.inputValue('#resultMn');
  const ge = await page.inputValue('#resultGe');
  const he = await page.inputValue('#resultHe');
  
  console.log(' ');
  console.log('=== РЕЗУЛЬТАТЫ ===');
  console.log('Fn (площадь сечения):', fn || '(пусто)');
  console.log('Mn (масса наплавки):', mn || '(пусто)');
  console.log('Ge (норма расхода):', ge || '(пусто)');
  console.log('He (расход на стык):', he || '(пусто)');
  console.log(' ');
  
  console.log('9. Делаю скриншот...');
  await page.screenshot({ path: '/home/user1/.openclaw/workspace/weld-project/screenshot-result.png', fullPage: true });
  
  console.log('10. Готово!');
  await browser.close();
})();
