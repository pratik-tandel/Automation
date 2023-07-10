// npm install playwright
// may take a while for downloading binaries

// minimum node version 8 for async / await feature

// API Docs: https://github.com/microsoft/playwright/blob/master/docs/api.md
const playwright = require('playwright');

const browserType = 'chromium'; // chrome
//const browserType = 'firefox'; // firefox
//const browserType = 'webkit'; // safari

async function main() {
  // disable headless to see the browser
  const browser = await playwright[browserType].launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://developer.mozilla.org/en-US/');
  await page.waitForLoadState('load');

  const searchTerm = 'css';
  const input = await page.$('[name="q"]');

  await input.type(searchTerm);
  await page.waitForTimeout(2000);
  await input.press('Enter');

  await page.waitForLoadState('load');
  // Adjust the viewport to match the page's full height
  await page.setViewportSize({ width: 1280, height: await page.evaluate(() => document.body.scrollHeight) });

  await page.screenshot({ path: 'result.png', fullPages: true });
  await page.waitForTimeout(3000);
  await browser.close();
}

main();
