const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport for a desktop layout
  await page.setViewport({ width: 1280, height: 800 });
  
  console.log('Navigating to http://localhost:5173/admin/categories...');
  await page.goto('http://localhost:5173/admin/categories', { waitUntil: 'networkidle0' });

  // Take screenshot
  const screenshotPath = 'C:\\Users\\Afeef\\.gemini\\antigravity-ide\\brain\\aaf5eded-7790-4eb8-a297-141ce714a94b\\admin_preview.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log(`Screenshot saved to ${screenshotPath}`);
  await browser.close();
})();
