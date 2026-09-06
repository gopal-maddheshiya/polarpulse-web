const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function main() {
  const edgePaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  ];
  const exe = edgePaths.find(p => fs.existsSync(p));
  if (!exe) throw new Error('No browser found');

  const browser = await puppeteer.launch({ executablePath: exe, headless: true });
  const page = await browser.newPage();

  const inputImagePath = 'C:/Users/hp/.gemini/antigravity-ide/brain/98c144eb-657a-4ee8-8543-093c10930070/.user_uploaded/media_1788723754945.png';
  const imgBase64 = fs.readFileSync(inputImagePath).toString('base64');
  const dataUri = `data:image/png;base64,${imgBase64}`;

  // Set viewport to exact Open Graph 1200 x 630 dimensions
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body {
            width: 1200px;
            height: 630px;
            overflow: hidden;
            background: #06182a;
          }
          .container {
            width: 1200px;
            height: 630px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background-color: #f8fafc;
          }
          .og-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 25%;
            display: block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img class="og-image" src="${dataUri}" />
        </div>
      </body>
    </html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Ensure public directory exists
  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outJpg = path.join(publicDir, 'og-image.jpg');
  const outPng = path.join(publicDir, 'og-image.png');

  // Screenshot as JPEG (quality 86 to keep it crisp yet well under 300KB)
  await page.screenshot({
    path: outJpg,
    type: 'jpeg',
    quality: 86,
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });

  // Also as PNG
  await page.screenshot({
    path: outPng,
    type: 'png',
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });

  const statJpg = fs.statSync(outJpg);
  const statPng = fs.statSync(outPng);

  console.log('Generated og-image.jpg:', outJpg, (statJpg.size / 1024).toFixed(2), 'KB');
  console.log('Generated og-image.png:', outPng, (statPng.size / 1024).toFixed(2), 'KB');

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
