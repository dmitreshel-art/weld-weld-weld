const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  
  const breakpoints = [
    { name: 'iPhone SE', width: 320, height: 568 },
    { name: 'iPhone 12', width: 390, height: 844 },
    { name: 'iPad Mini', width: 768, height: 1024 },
    { name: 'iPad Pro', width: 1024, height: 1366 },
    { name: 'Desktop', width: 1440, height: 900 }
  ];
  
  console.log('=== RESPONSIVE TEST ===\n');
  
  for (const bp of breakpoints) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: bp.width, height: bp.height });
    await page.goto('http://localhost:8080');
    await page.waitForTimeout(500);
    
    // Select MMA
    await page.selectOption('#weldingMethod', 'MMA Ручная дуговая сварка РД');
    await page.waitForTimeout(200);
    await page.selectOption('#technicalDocumentation', 'ГОСТ 5264');
    await page.waitForTimeout(200);
    await page.selectOption('#typeOfConnection', 'С1');
    await page.waitForTimeout(500);
    
    await page.screenshot({ 
      path: `/home/user1/.openclaw/workspace/weld-project/test-${bp.name.replace(' ', '-')}.png`,
      fullPage: false
    });
    
    console.log(`✅ ${bp.name} (${bp.width}x${bp.height})`);
    await page.close();
  }
  
  console.log('\n Screenshots saved!');
  await browser.close();
})();
