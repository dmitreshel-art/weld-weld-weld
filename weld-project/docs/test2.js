const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1400 });
  
  console.log('1. Открываю страницу...');
  await page.goto('http://localhost:8080');
  await page.waitForTimeout(2000);
  
  console.log('2. Скриншот начальной страницы...');
  await page.screenshot({ path: '/home/user1/.openclaw/workspace/weld-project/screenshot-01-initial.png' });
  
  console.log('3. Проверяю опции weldingMethod...');
  const methodOptions = await page.$$eval('#weldingMethod option', opts => opts.map(o => o.value + ': ' + o.text));
  console.log('Методы:', methodOptions);
  
  console.log('4. Выбираю метод сварки...');
  await page.selectOption('#weldingMethod', 'MMA Ручная дуговая сварка РД');
  await page.waitForTimeout(500);
  
  console.log('5. Скриншот после выбора метода...');
  await page.screenshot({ path: '/home/user1/.openclaw/workspace/weld-project/screenshot-02-method.png' });
  
  console.log('6. Проверяю опции ГОСТ...');
  const gostOptions = await page.$$eval('#technicalDocumentation option', opts => opts.map(o => o.value + ': ' + o.text));
  console.log('ГОСТы:', gostOptions);
  
  console.log('7. Выбираю ГОСТ 5264...');
  await page.selectOption('#technicalDocumentation', 'ГОСТ 5264');
  await page.waitForTimeout(500);
  
  console.log('8. Скриншот после выбора ГОСТ...');
  await page.screenshot({ path: '/home/user1/.openclaw/workspace/weld-project/screenshot-03-gost.png' });
  
  console.log('9. Проверяю опции типа соединения...');
  const jointOptions = await page.$$eval('#typeOfConnection option', opts => opts.map(o => o.value));
  console.log('Типы:', jointOptions.slice(0, 10));
  
  console.log('10. Выбираю тип соединения С2...');
  await page.selectOption('#typeOfConnection', 'С2');
  await page.waitForTimeout(1000);
  
  console.log('11. Скриншот после выбора соединения...');
  await page.screenshot({ path: '/home/user1/.openclaw/workspace/weld-project/screenshot-04-joint.png' });
  
  console.log('12. Проверяю опции толщины...');
  const thicknessOptions = await page.$$eval('#thicknessList option', opts => opts.map(o => o.value + ': ' + o.text));
  console.log('Толщины:', thicknessOptions);
  
  if (thicknessOptions.length > 1) {
    console.log('13. Выбираю толщину', thicknessOptions[1].split(':')[0]);
    await page.selectOption('#thicknessList', thicknessOptions[1].split(':')[0]);
    await page.waitForTimeout(1000);
  }
  
  console.log('14. Скриншот после выбора толщины...');
  await page.screenshot({ path: '/home/user1/.openclaw/workspace/weld-project/screenshot-05-thickness.png' });
  
  console.log('15. Проверяю заполненные параметры...');
  const gap = await page.inputValue('#gap');
  const weldWidth = await page.inputValue('#weldWidth');
  const gainHeight = await page.inputValue('#gainHeight');
  console.log('gap:', gap);
  console.log('weldWidth:', weldWidth);
  console.log('gainHeight:', gainHeight);
  
  console.log('16. Ввожу диаметр 100...');
  await page.fill('#diameter', '100');
  
  console.log('17. Нажимаю ПОДСЧИТАТЬ...');
  await page.click('#mineButton');
  await page.waitForTimeout(2000);
  
  console.log('18. Скриншот с результатами...');
  await page.screenshot({ path: '/home/user1/.openclaw/workspace/weld-project/screenshot-06-result.png' });
  
  console.log('19. Читаю результаты...');
  const fn = await page.inputValue('#resultFn');
  const mn = await page.inputValue('#resultMn');
  const ge = await page.inputValue('#resultGe');
  const he = await page.inputValue('#resultHe');
  
  console.log(' ');
  console.log('========== РЕЗУЛЬТАТЫ ==========');
  console.log('Fn (площадь сечения):', fn || '(пусто)');
  console.log('Mn (масса наплавки):', mn || '(пусто)');
  console.log('Ge (норма расхода):', ge || '(пусто)');
  console.log('He (расход на стык):', he || '(пусто)');
  console.log('=================================');
  
  await browser.close();
})();
