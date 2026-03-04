const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1600, height: 1200 });
  
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
  
  // Выбираем толщину 2
  await page.selectOption('#thicknessList', '2');
  await page.waitForTimeout(500);
  
  // Заполняем параметры
  await page.fill('#gap', '1');
  await page.fill('#weldWidth', '7');
  await page.fill('#gainHeight', '1');
  await page.fill('#diameter', '100');
  
  // Скриншот
  await page.screenshot({ path: '/home/user1/.openclaw/workspace/weld-project/test-layout.png', fullPage: true });
  console.log('Скриншот сохранён: test-layout.png');
  
  await browser.close();
})();
