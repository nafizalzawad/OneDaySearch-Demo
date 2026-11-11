import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('docs/screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const baseUrl = 'http://localhost:4173';

const viewports = [
  { name: 'desktop-1280', width: 1280, height: 800 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-375', width: 375, height: 812 },
];

async function capture() {
  console.log('Launching Edge browser...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();

  // Test matrix of key screens
  const screens = [
    { name: 's1-home', url: '/' },
    { name: 's3-details', url: '/details' },
    { name: 's4-speed', url: '/speed' },
    { name: 's5-payment', url: '/pay' },
    { name: 's6-order-status', url: '/order/d9f82a17c4b03e89' },
    { name: 's8-track-order', url: '/track' },
    { name: 'brand-specs', url: '/brand' },
    { name: 'not-title-insurance', url: '/not-title-insurance' },
    { name: 'provider-dashboard', url: '/provider' },
    { name: 'provider-workbench', url: '/provider/orders/OD-48213' },
    { name: 'admin-orders', url: '/admin' },
    { name: 'admin-alerts', url: '/admin/alerts' },
    { name: 'admin-providers', url: '/admin/providers' },
  ];

  for (const screen of screens) {
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      const fullUrl = `${baseUrl}${screen.url}`;
      await page.goto(fullUrl, { waitUntil: 'networkidle0' });
      await new Promise((r) => setTimeout(r, 300));

      const filename = `${screen.name}-${vp.name}.png`;
      const filePath = path.join(outDir, filename);
      let attempts = 0;
      while (attempts < 3) {
        try {
          await page.screenshot({ path: filePath, fullPage: false });
          break;
        } catch (err) {
          attempts++;
          await new Promise((r) => setTimeout(r, 200));
          if (attempts >= 3) throw err;
        }
      }
      console.log(`Captured: ${filename}`);
    }
  }

  // Interactive capture 1: S2 Coverage result (in-coverage) on Home
  console.log('Capturing S2 In-Coverage result...');
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle0' });
  await page.type('input[placeholder*="Enter property address"]', '10400 Fernwood Rd, Bethesda, MD');
  await page.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 's2-address-in-coverage-1280.png') });

  // Interactive capture 2: S2 Out-of-coverage (Richmond waitlist) on Home
  console.log('Capturing S2 Out-of-Coverage waitlist...');
  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle0' });
  await page.type('input[placeholder*="Enter property address"]', 'Richmond, VA');
  await page.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 's2-address-out-of-coverage-1280.png') });

  // Interactive capture 3: Theme 2 "Navy Brand" Shell
  console.log('Capturing Navy Brand Theme on Home...');
  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'navy-brand');
  });
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: path.join(outDir, 'theme-navy-brand-home-1280.png') });

  // Interactive capture 4: Provider New Offer Modal
  console.log('Capturing Provider New Offer Modal...');
  await page.goto(`${baseUrl}/provider`, { waitUntil: 'networkidle0' });
  // Click "Simulate New Order Offer"
  const offerBtn = await page.$('button ::-p-text(Simulate New Order Offer)');
  if (offerBtn) {
    await offerBtn.click();
  } else {
    // evaluate click
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b = btns.find((x) => x.textContent.includes('Simulate New Order Offer'));
      if (b) b.click();
    });
  }
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outDir, 'provider-offer-modal-1280.png') });

  console.log('All screenshots successfully captured in docs/screenshots/');
  await browser.close();
}

capture().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
