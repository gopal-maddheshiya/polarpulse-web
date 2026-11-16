const puppeteer = require('puppeteer-core')
const fs = require('fs')
const path = require('path')

async function main() {
  const edgePaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  ]
  const exe = edgePaths.find(p => fs.existsSync(p))
  if (!exe) throw new Error('No browser executable found')

  const browser = await puppeteer.launch({
    executablePath: exe,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 })

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 1200px;
            height: 630px;
            overflow: hidden;
            background: #061524;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #ffffff;
            position: relative;
          }

          /* Ambient Glacial Aurora Glows */
          .glow-1 {
            position: absolute;
            top: -120px;
            right: -80px;
            width: 650px;
            height: 650px;
            background: radial-gradient(circle, rgba(14, 165, 233, 0.28) 0%, rgba(2, 132, 199, 0.12) 50%, transparent 75%);
            border-radius: 50%;
            filter: blur(50px);
            pointer-events: none;
          }
          .glow-2 {
            position: absolute;
            bottom: -150px;
            left: 200px;
            width: 550px;
            height: 550px;
            background: radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(3, 105, 161, 0.08) 50%, transparent 75%);
            border-radius: 50%;
            filter: blur(60px);
            pointer-events: none;
          }

          /* Subtle Polar Grid Texture */
          .grid-overlay {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(to right, rgba(56, 189, 248, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56, 189, 248, 0.04) 1px, transparent 1px);
            background-size: 40px 40px;
            mask-image: radial-gradient(circle at 60% 40%, black 40%, transparent 90%);
          }

          /* Ambient Polar Coordinate Astrolabe */
          .astrolabe {
            position: absolute;
            top: -60px;
            right: -40px;
            width: 720px;
            height: 720px;
            pointer-events: none;
            opacity: 0.38;
          }

          /* Main Content Layout */
          .canvas {
            position: relative;
            z-index: 10;
            width: 1200px;
            height: 630px;
            padding: 56px 64px 44px 64px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          /* Top Badges Bar */
          .top-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .badge-moes {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 8px 16px;
            border-radius: 9999px;
            background: rgba(15, 23, 42, 0.75);
            border: 1px solid rgba(56, 189, 248, 0.35);
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #7dd3fc;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          }
          .pulse-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #38bdf8;
            box-shadow: 0 0 10px #38bdf8;
          }
          .badge-sih {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            border-radius: 9999px;
            background: rgba(14, 165, 233, 0.12);
            border: 1px solid rgba(56, 189, 248, 0.4);
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
            color: #e0f2fe;
          }

          /* Middle Hero Content */
          .hero-split {
            display: grid;
            grid-template-columns: 1.25fr 0.85fr;
            gap: 40px;
            align-items: center;
            margin-top: 10px;
          }

          .title-area {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .brand-row {
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .brand-crest {
            width: 58px;
            height: 58px;
            border-radius: 18px;
            background: linear-gradient(135deg, #0f243a, #07131e);
            border: 1.5px solid #38bdf8;
            display: grid;
            place-items: center;
            box-shadow: 0 0 24px rgba(56, 189, 248, 0.4);
          }

          .brand-title {
            font-size: 64px;
            font-weight: 800;
            letter-spacing: 0.14em;
            color: #ffffff;
            text-shadow: 0 2px 20px rgba(0,0,0,0.5);
            line-height: 1;
          }

          .brand-flag {
            display: inline-flex;
            align-items: center;
            padding: 4px 10px;
            border-radius: 6px;
            background: rgba(56, 189, 248, 0.18);
            border: 1px solid #38bdf8;
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            font-weight: 700;
            color: #7dd3fc;
            letter-spacing: 0.15em;
          }

          .headline {
            font-size: 30px;
            font-weight: 700;
            line-height: 1.2;
            letter-spacing: -0.01em;
            background: linear-gradient(90deg, #ffffff 0%, #bae6fd 60%, #38bdf8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .desc {
            font-size: 15px;
            line-height: 1.55;
            color: #94a3b8;
            max-width: 620px;
          }

          /* Right Radar Card */
          .radar-card {
            background: rgba(11, 29, 46, 0.75);
            border: 1px solid rgba(56, 189, 248, 0.35);
            backdrop-filter: blur(16px);
            border-radius: 24px;
            padding: 24px;
            box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .radar-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(56, 189, 248, 0.18);
            padding-bottom: 12px;
          }

          .radar-title {
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #38bdf8;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .radar-status {
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            font-weight: 700;
            color: #34d399;
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid rgba(52, 211, 153, 0.3);
            padding: 3px 8px;
            border-radius: 9999px;
          }

          .telemetry-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .telemetry-item {
            background: rgba(6, 21, 36, 0.6);
            border: 1px solid rgba(56, 189, 248, 0.2);
            border-radius: 12px;
            padding: 10px 12px;
          }
          .telemetry-label {
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }
          .telemetry-val {
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            font-weight: 700;
            color: #ffffff;
            margin-top: 2px;
          }
          .telemetry-val.highlight {
            color: #38bdf8;
          }

          .radar-station-name {
            font-size: 15px;
            font-weight: 700;
            color: #f8fafc;
          }
          .radar-coords {
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            color: #7dd3fc;
          }

          /* Bottom Stat Pills Bar */
          .bottom-bar {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 14px;
            border-top: 1px solid rgba(56, 189, 248, 0.2);
            padding-top: 20px;
          }

          .stat-pill {
            background: rgba(15, 30, 48, 0.65);
            border: 1px solid rgba(56, 189, 248, 0.22);
            border-radius: 14px;
            padding: 12px 14px;
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .stat-icon {
            width: 32px;
            height: 32px;
            border-radius: 10px;
            background: rgba(56, 189, 248, 0.12);
            border: 1px solid rgba(56, 189, 248, 0.3);
            display: grid;
            place-items: center;
            flex-shrink: 0;
          }

          .stat-text {
            display: flex;
            flex-direction: column;
          }
          .stat-num {
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 0.05em;
          }
          .stat-desc {
            font-size: 11px;
            color: #64748b;
            font-weight: 500;
          }
        </style>
      </head>
      <body>
        <div class="glow-1"></div>
        <div class="glow-2"></div>
        <div class="grid-overlay"></div>

        <!-- Ambient Compass Astrolabe SVG -->
        <svg class="astrolabe" viewBox="0 0 500 500" fill="none">
          <circle cx="250" cy="250" r="240" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="4 8" opacity="0.45" />
          <circle cx="250" cy="250" r="200" stroke="#38bdf8" stroke-width="1" opacity="0.3" />
          <circle cx="250" cy="250" r="160" stroke="#0ea5e9" stroke-width="0.8" stroke-dasharray="8 8" opacity="0.25" />
          <line x1="250" y1="10" x2="250" y2="490" stroke="#0284c7" stroke-width="0.8" stroke-dasharray="4 4" opacity="0.3" />
          <line x1="10" y1="250" x2="490" y2="250" stroke="#0284c7" stroke-width="0.8" stroke-dasharray="4 4" opacity="0.3" />
        </svg>

        <div class="canvas">
          <!-- Top Bar -->
          <div class="top-bar">
            <div class="badge-moes">
              <span class="pulse-dot"></span>
              <span>Ministry of Earth Sciences · NCPOR</span>
            </div>
            <div class="badge-sih">
              <span>SIH 2026 · Problem ID: 26063</span>
            </div>
          </div>

          <!-- Hero Content Split -->
          <div class="hero-split">
            <div class="title-area">
              <div class="brand-row">
                <div class="brand-crest">
                  <svg viewBox="0 0 24 24" width="34" height="34" fill="none">
                    <circle cx="12" cy="12" r="9.5" stroke="#0ea5e9" stroke-width="0.8" stroke-dasharray="1.5 2" opacity="0.6" />
                    <polygon points="12,12 17,7 13.5,11" fill="#38bdf8" opacity="0.85" />
                    <polygon points="12,12 7,7 11,13.5" fill="#0284c7" opacity="0.85" />
                    <polygon points="12,12 17,17 11,13.5" fill="#0284c7" opacity="0.85" />
                    <polygon points="12,12 7,17 13.5,11" fill="#38bdf8" opacity="0.85" />
                    <polygon points="12,2 13.5,10.5 12,12" fill="#ffffff" />
                    <polygon points="12,2 10.5,10.5 12,12" fill="#38bdf8" />
                    <polygon points="12,22 13.5,13.5 12,12" fill="#38bdf8" />
                    <polygon points="12,22 10.5,13.5 12,12" fill="#0284c7" />
                    <polygon points="22,12 13.5,13.5 12,12" fill="#ffffff" />
                    <polygon points="22,12 13.5,10.5 12,12" fill="#38bdf8" />
                    <polygon points="2,12 10.5,13.5 12,12" fill="#38bdf8" />
                    <polygon points="2,12 10.5,10.5 12,12" fill="#0284c7" />
                    <circle cx="12" cy="12" r="1.8" fill="#ffffff" />
                  </svg>
                </div>
                <h1 class="brand-title">POLARIS</h1>
                <span class="brand-flag">INDIA</span>
              </div>

              <h2 class="headline">Deciphering Earth's Frozen Frontiers</h2>
              <p class="desc">
                India's sovereign polar archive unifying 44 years of Antarctic, Arctic &amp; Southern Ocean expeditions, live station telemetry, open cryospheric data, and AI-assisted scientific dissemination.
              </p>
            </div>

            <!-- Right Telemetry Radar Card -->
            <div class="radar-card">
              <div class="radar-header">
                <span class="radar-title">
                  <span class="pulse-dot"></span>
                  Live Station Telemetry
                </span>
                <span class="radar-status">Operational</span>
              </div>

              <div>
                <div class="radar-station-name">Bharati Polar Station</div>
                <div class="radar-coords">69°24′28″S, 76°11′14″E · Larsemann Hills</div>
              </div>

              <div class="telemetry-grid">
                <div class="telemetry-item">
                  <div class="telemetry-label">Temperature</div>
                  <div class="telemetry-val highlight">-11.2 °C</div>
                </div>
                <div class="telemetry-item">
                  <div class="telemetry-label">Wind Velocity</div>
                  <div class="telemetry-val">18 kts SSE</div>
                </div>
                <div class="telemetry-item">
                  <div class="telemetry-label">ISRO Downlink</div>
                  <div class="telemetry-val highlight">Active Lock</div>
                </div>
                <div class="telemetry-item">
                  <div class="telemetry-label">Expeditions</div>
                  <div class="telemetry-val">44th IAE</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Stat Badges Bar -->
          <div class="bottom-bar">
            <div class="stat-pill">
              <div class="stat-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2 6.4-6.4 2 2-6.4z"/></svg>
              </div>
              <div class="stat-text">
                <span class="stat-num">44 EXPEDITIONS</span>
                <span class="stat-desc">Antarctica (1981–2025)</span>
              </div>
            </div>

            <div class="stat-pill">
              <div class="stat-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div class="stat-text">
                <span class="stat-num">3 BASES</span>
                <span class="stat-desc">Bharati · Maitri · Himadri</span>
              </div>
            </div>

            <div class="stat-pill">
              <div class="stat-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>
              </div>
              <div class="stat-text">
                <span class="stat-num">OPEN DATA</span>
                <span class="stat-desc">Black Carbon, CTD, Ice</span>
              </div>
            </div>

            <div class="stat-pill">
              <div class="stat-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div class="stat-text">
                <span class="stat-num">AI SCIENCE</span>
                <span class="stat-desc">Grounded Assistant</span>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' })

  // Small delay to ensure all inline CSS styles and SVG rendering pass complete
  await new Promise((resolve) => setTimeout(resolve, 300))

  const publicDir = path.resolve(__dirname, '../public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  const outJpg = path.join(publicDir, 'og-image.jpg')
  const outPng = path.join(publicDir, 'og-image.png')

  await page.screenshot({
    path: outJpg,
    type: 'jpeg',
    quality: 90,
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  })

  await page.screenshot({
    path: outPng,
    type: 'png',
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  })

  const statJpg = fs.statSync(outJpg)
  const statPng = fs.statSync(outPng)

  console.log(`[OG-Image] Generated og-image.jpg: ${(statJpg.size / 1024).toFixed(1)} KB`)
  console.log(`[OG-Image] Generated og-image.png: ${(statPng.size / 1024).toFixed(1)} KB`)

  await browser.close()
}

main().catch(err => {
  console.error('[OG-Image] Error:', err)
  process.exit(1)
})
