// Renders the Facebook/Instagram ad creatives (PNG) and the 15s vertical video (MP4).
// Usage: node ads/build.js   (edit ads/config.json first, then re-run)
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
const OUT = path.join(__dirname, 'output');
const FRAMES = path.join(OUT, 'video-frames');
fs.mkdirSync(FRAMES, { recursive: true });

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const contact = [cfg.website, cfg.phone].filter(Boolean).join('  ·  ');

// ---------- shared look ----------
const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', 'Liberation Sans', sans-serif; color: #F6F1E7; background: #0B1626; }
  .ad { position: relative; overflow: hidden; width: 100%; height: 100%;
        background: radial-gradient(120% 90% at 85% 0%, #1D3557 0%, #0B1626 55%, #070E19 100%); }
  .grain { position: absolute; inset: 0; opacity: .07;
        background-image: repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 4px); }
  .arc { position: absolute; border-radius: 50%; border: 3px solid rgba(214,177,94,.35); }
  .pad { position: absolute; inset: 0; padding: 80px; display: flex; flex-direction: column; }
  .brand { display: flex; align-items: center; gap: 18px; font-weight: 700; font-size: 30px; letter-spacing: .5px; }
  .brand .mark { width: 58px; height: 58px; border-radius: 14px; background: linear-gradient(135deg,#E9C77B,#B8892F);
        display: grid; place-items: center; color: #0B1626; font-weight: 900; font-size: 26px; }
  .brand small { display: block; font-weight: 500; font-size: 20px; color: #D6B15E; letter-spacing: 3px; text-transform: uppercase; }
  .kicker { font-size: 26px; font-weight: 700; letter-spacing: 6px; text-transform: uppercase; color: #D6B15E; }
  h1 { font-family: 'Inter Display', 'Inter', sans-serif; font-weight: 900; line-height: .98; letter-spacing: -2px; }
  .gold { color: #E9C77B; }
  .cta { display: inline-flex; align-items: center; gap: 16px; align-self: flex-start;
        background: linear-gradient(135deg,#F0D08A,#C99A3B); color: #0B1626; font-weight: 800;
        border-radius: 999px; padding: 26px 46px; font-size: 32px; box-shadow: 0 18px 40px rgba(201,154,59,.35); }
  .pin { display: inline-flex; align-items: center; gap: 12px; font-size: 26px; font-weight: 600; color: #F6F1E7; opacity: .9; }
  .pin svg { width: 26px; height: 26px; }
  .chip { display: inline-block; border: 2px solid rgba(233,199,123,.6); color: #E9C77B; border-radius: 999px;
        padding: 12px 26px; font-size: 24px; font-weight: 700; letter-spacing: 1px; }
  .fine { font-size: 18px; color: rgba(246,241,231,.55); line-height: 1.4; }
  .row { display: flex; gap: 18px; flex-wrap: wrap; }
`;
const pin = `<svg viewBox="0 0 24 24" fill="#E9C77B"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>`;
const brand = `<div class="brand"><div class="mark">OB</div><div>${esc(cfg.shortName)}<small>${esc(cfg.location)}</small></div></div>`;
const bg = (arcs) => `<div class="grain"></div>${arcs.map(([s, x, y]) => `<div class="arc" style="width:${s}px;height:${s}px;left:${x}px;top:${y}px"></div>`).join('')}`;
const page = (w, h, body) => `<!doctype html><html><head><meta charset="utf-8"><style>${css} html,body{width:${w}px;height:${h}px}</style></head><body><div class="ad">${body}</div></body></html>`;

// ---------- static creatives ----------
const creatives = [];

// 1. Feed square — the price hook
creatives.push({ file: '01-feed-square-best-price.png', w: 1080, h: 1080, html: page(1080, 1080, `
  ${bg([[900, 520, -380], [620, 660, -240]])}
  <div class="pad">
    ${brand}
    <div style="margin-top:auto">
      <div class="kicker">Hair Transplant · ${esc(cfg.technique)}</div>
      <h1 style="font-size:118px;margin:22px 0 26px">${esc(cfg.priceClaim)}<span class="gold">.</span><br><span class="gold">Zero</span> compromise.</h1>
      <div style="font-size:34px;line-height:1.35;max-width:840px;opacity:.92">Natural-looking results by ${esc(cfg.doctor)} — without the Chicago price tag or a flight overseas.</div>
      <div class="row" style="margin-top:44px;align-items:center;justify-content:space-between">
        <div class="cta">${esc(cfg.cta)} →</div>
        <div class="pin">${pin}${esc(cfg.location)}</div>
      </div>
    </div>
  </div>`) });

// 2. Feed portrait 4:5 — the comparison (competitive angle)
creatives.push({ file: '02-feed-portrait-comparison.png', w: 1080, h: 1350, html: page(1080, 1350, `
  ${bg([[1000, 420, -520]])}
  <div class="pad">
    ${brand}
    <h1 style="font-size:96px;margin-top:70px">Why pay more<br>for the <span class="gold">same hair?</span></h1>
    <div style="margin-top:56px;display:grid;grid-template-columns:1fr 1fr;gap:24px">
      ${[
        ['Typical Chicago clinic', '$8k–$14k*', ['Downtown overhead', 'Parking & travel', 'Long wait lists'], false],
        ['Flying overseas', '+ Flights & hotel', ['Language barriers', 'No local follow-up', 'Days off work'], false],
      ].map(([t, p, l]) => `
        <div style="border:2px solid rgba(246,241,231,.15);border-radius:28px;padding:34px;background:rgba(255,255,255,.03)">
          <div style="font-size:24px;opacity:.7;font-weight:600">${t}</div>
          <div style="font-size:46px;font-weight:800;margin:10px 0 18px;opacity:.85">${p}</div>
          ${l.map((x) => `<div style="font-size:24px;opacity:.65;margin-top:10px">✕ &nbsp;${x}</div>`).join('')}
        </div>`).join('')}
    </div>
    <div style="margin-top:24px;border-radius:32px;padding:40px;background:linear-gradient(135deg,rgba(233,199,123,.2),rgba(233,199,123,.06));border:2px solid #D6B15E">
      <div class="kicker" style="font-size:22px">${esc(cfg.clinicName)}</div>
      <div style="font-size:60px;font-weight:900;margin:12px 0 16px">${esc(cfg.priceClaim)}${cfg.priceDetail ? ` · ${esc(cfg.priceDetail)}` : ''}</div>
      <div class="row">${['✓ Close to home', `✓ ${esc(cfg.technique)} technique`, '✓ Local follow-up care'].map((x) => `<span class="chip">${x}</span>`).join('')}</div>
    </div>
    <div class="row" style="margin-top:auto;align-items:center;justify-content:space-between">
      <div class="cta">${esc(cfg.cta)} →</div>
    </div>
    <div class="fine" style="margin-top:22px">*Typical 2,000–3,000 graft FUE range reported for Chicago (withcherry.com, 2026). Individual quotes vary.</div>
  </div>`) });

// 3. Story / Reel cover 9:16 — growth timeline (sets honest expectations)
const steps = [['Day 1', 'Procedure — same-day, go home'], ['Week 1–2', 'Most patients back to work'], ['Month 3–4', 'New growth begins'], ['Month 6–8', 'Visible fullness'], ['Month 12+', 'Final, natural result']];
creatives.push({ file: '03-story-growth-timeline.png', w: 1080, h: 1920, html: page(1080, 1920, `
  ${bg([[1200, 300, -700], [800, -520, 1560]])}
  <div class="pad" style="padding:110px 80px 300px">
    ${brand}
    <div class="kicker" style="margin-top:110px">The honest timeline</div>
    <h1 style="font-size:120px;margin-top:20px">One day<br>in the chair.<br><span class="gold">A lifetime</span><br>of hair.</h1>
    <div style="margin-top:80px;position:relative;padding-left:60px">
      <div style="position:absolute;left:14px;top:12px;bottom:12px;width:4px;background:linear-gradient(#E9C77B,rgba(233,199,123,.15))"></div>
      ${steps.map(([a, b], i) => `
        <div style="position:relative;margin-bottom:44px">
          <div style="position:absolute;left:-60px;top:6px;width:32px;height:32px;border-radius:50%;background:${i === 4 ? '#E9C77B' : '#0B1626'};border:4px solid #E9C77B"></div>
          <div style="font-size:36px;font-weight:800" class="${i === 4 ? 'gold' : ''}">${a}</div>
          <div style="font-size:30px;opacity:.8;margin-top:4px">${b}</div>
        </div>`).join('')}
    </div>
    <div style="margin-top:auto" class="row"><span class="chip">${esc(cfg.priceClaim)}</span><span class="chip">${esc(cfg.offer)}</span></div>
    <div class="fine" style="margin-top:22px">Typical timeline; individual results vary.</div>
  </div>`) });

// 4. Carousel (5 cards, 1:1)
const card = (n, inner) => ({ file: `04-carousel-${n}.png`, w: 1080, h: 1080, html: page(1080, 1080, `
  ${bg([[800, 600, -360]])}<div class="pad">${brand}${inner}
  <div style="position:absolute;right:80px;top:96px;font-size:24px;font-weight:700;opacity:.6">${n} / 5</div></div>`) });
creatives.push(card(1, `
  <div style="margin-top:auto">
    <div class="kicker">Swipe →</div>
    <h1 style="font-size:104px;margin-top:20px">Thinking about a<br>hair transplant?<br><span class="gold">Read this first.</span></h1>
    <div style="font-size:34px;opacity:.85;margin-top:30px">The 3 questions Oak Brook patients ask before booking.</div>
  </div>`));
const qa = (n, q, a, foot = '') => card(n, `
  <div style="margin-top:auto">
    <div class="kicker">${q}</div>
    <h1 style="font-size:92px;margin:24px 0 30px">${a}</h1>
    ${foot}
  </div>`);
creatives.push(qa(2, '01 · What does it cost?', `${esc(cfg.priceClaim)}<span class="gold">.</span><br>Period.`,
  `<div style="font-size:34px;opacity:.85;max-width:860px;line-height:1.35">Transparent per-graft pricing, quoted in writing at your consultation. No surprise fees.</div>`));
creatives.push(qa(3, '02 · Will it look natural?', `Designed hairline.<br><span class="gold">Not old-school plugs.</span>`,
  `<div style="font-size:34px;opacity:.85;max-width:860px;line-height:1.35">${esc(cfg.technique)} grafts placed one by one at natural angles — no linear scar, short-hair friendly.</div>`));
creatives.push(qa(4, '03 · Who does the work?', `${esc(cfg.doctor)}<span class="gold">.</span><br>Start to finish.`,
  `<div style="font-size:34px;opacity:.85;max-width:860px;line-height:1.35">Your consultation, your plan and your follow-ups — all here in ${esc(cfg.location)}.</div>`));
creatives.push(card(5, `
  <div style="margin-top:110px;display:grid;grid-template-columns:1fr 1fr;gap:26px;height:470px">
    ${['BEFORE', '12 MONTHS'].map((t) => `<div style="border:3px dashed rgba(233,199,123,.55);border-radius:28px;display:flex;flex-direction:column;justify-content:space-between;padding:28px;background:rgba(255,255,255,.03)">
      <span class="chip" style="align-self:flex-start">${t}</span>
      <div style="font-size:22px;opacity:.5;text-align:center">Replace with real patient photo<br>(signed consent)</div><div></div></div>`).join('')}
  </div>
  <div style="margin-top:auto">
    <h1 style="font-size:72px">Real patients. <span class="gold">Real results.</span></h1>
    <div class="row" style="margin-top:28px;align-items:center;justify-content:space-between">
      <div class="cta">${esc(cfg.cta)} →</div>
    </div>
  </div>`));

// ---------- video scenes (9:16, 15s) ----------
const scene = (inner, arcs = [[1100, 400, -600]]) => page(1080, 1920, `${bg(arcs)}<div class="pad" style="padding:140px 80px 320px;justify-content:center">${inner}</div>`);
const videoScenes = [
  scene(`<div class="kicker">Hair transplant in Chicagoland?</div>
    <h1 style="font-size:128px;margin-top:30px">Quotes of<br><span class="gold">$8,000–<br>$14,000*</span></h1>
    <div class="fine" style="margin-top:40px;font-size:24px">*Typical 2,000–3,000 graft FUE range, Chicago (2026)</div>`),
  scene(`<div class="kicker">Or…</div>
    <h1 style="font-size:124px;margin-top:30px">Fly 10 hours.<br>Hotel.<br><span class="gold">No follow-up.</span></h1>`, [[900, -300, 1200]]),
  scene(`<div style="transform:scale(1.5);transform-origin:left center">${brand}</div>
    <h1 style="font-size:132px;margin-top:90px">There's a<br><span class="gold">better way.</span></h1>`),
  scene(`<h1 style="font-size:124px">${esc(cfg.priceClaim)}<span class="gold">.</span></h1>
    <div style="margin-top:60px;display:flex;flex-direction:column;gap:26px;font-size:44px;font-weight:700">
      <div>✓ &nbsp;${esc(cfg.technique)} by ${esc(cfg.doctor)}</div><div>✓ &nbsp;Natural hairline design</div><div>✓ &nbsp;Follow-up care close to home</div></div>`, [[1000, 500, 1300]]),
  scene(`${brand}
    <h1 style="font-size:116px;margin-top:80px">Your <span class="gold">${esc(cfg.offer)}</span><br>is waiting.</h1>
    <div class="cta" style="margin-top:70px;font-size:40px;padding:32px 56px">${esc(cfg.cta)} →</div>
    <div class="pin" style="margin-top:50px;font-size:32px">${pin}${esc(cfg.location)}</div>
    ${contact ? `<div style="margin-top:20px;font-size:30px;opacity:.8">${esc(contact)}</div>` : ''}`),
];

(async () => {
  const browser = await chromium.launch();
  const shoot = async (w, h, html, file) => {
    const p = await browser.newPage({ viewport: { width: w, height: h } });
    await p.setContent(html, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: file });
    await p.close();
  };
  for (const c of creatives) await shoot(c.w, c.h, c.html, path.join(OUT, c.file));
  for (const [i, html] of videoScenes.entries()) await shoot(1080, 1920, html, path.join(FRAMES, `scene-${i + 1}.png`));
  await browser.close();

  // 5 scenes x 3.5s (zoompan turns each still into D seconds) with a slow push-in and 0.5s crossfades -> ~15s MP4 (H.264, Reels/Stories ready)
  const D = 3.5, X = 0.5, n = videoScenes.length;
  const args = ['-y'];
  for (let i = 1; i <= n; i++) args.push('-i', path.join(FRAMES, `scene-${i}.png`));
  const f = [];
  for (let i = 0; i < n; i++) {
    f.push(`[${i}:v]scale=1188:2112,zoompan=z='min(zoom+0.0009,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${Math.round(D * 30)}:s=1080x1920:fps=30,setsar=1,format=yuv420p[v${i}]`);
  }
  let last = 'v0';
  for (let i = 1; i < n; i++) {
    const off = (D - X) * i;
    f.push(`[${last}][v${i}]xfade=transition=${i % 2 ? 'slideleft' : 'fade'}:duration=${X}:offset=${off.toFixed(2)}[x${i}]`);
    last = `x${i}`;
  }
  args.push('-filter_complex', f.join(';'), '-map', `[${last}]`, '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(OUT, '05-reel-15s-vertical.mp4'));
  execFileSync('ffmpeg', args, { stdio: 'ignore' });
  console.log('Built:', fs.readdirSync(OUT).filter((x) => x !== 'video-frames').join(', '));
})();
