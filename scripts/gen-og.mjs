// Regenerates public/og-image.png (1200x630) by rendering HTML in Chromium,
// so the real Manrope font is used. Needs Playwright: npx -y playwright install chromium
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('..', import.meta.url));
const font = `file://${root}public/fonts/manrope-variable.woff2`;
const html=`<html><head><meta charset=utf-8><style>
@font-face{font-family:M;src:url(${font}) format('woff2');font-weight:200 800}
body{margin:0;width:1200px;height:630px;font-family:M;background:#0b1017;color:#fff;position:relative;overflow:hidden}
.bg{position:absolute;right:0;top:0;width:560px;height:630px;background:url(file://${root}src/assets/images/hero-desktop.jpg) center/cover;}
.bg:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#0b1017 0%,rgba(11,16,23,.35) 45%,rgba(11,16,23,0) 100%)}
.glow{position:absolute;left:-200px;top:-250px;width:900px;height:700px;background:radial-gradient(closest-side,rgba(255,210,63,.22),transparent 70%)}
.c{position:absolute;left:72px;top:64px;width:700px}
.logo{display:flex;align-items:center;gap:16px;font-weight:800;font-size:30px;letter-spacing:-.02em}
.m{width:60px;height:60px;border-radius:17px;background:#ffd23f;display:grid;place-items:center}
h1{font-size:74px;line-height:1.02;letter-spacing:-.035em;margin:70px 0 22px;font-weight:800}
h1 span{color:#ffd23f}
.p{font-size:27px;color:#b7c0cd;font-weight:600}
.chips{display:flex;gap:12px;margin-top:34px}
.chip{background:#ffd23f;color:#0b1017;font-weight:800;font-size:22px;padding:10px 18px;border-radius:999px}
.chip.g{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.18)}
</style></head><body><div class=bg></div><div class=glow></div><div class=c>
<div class=logo><div class=m><svg width=34 height=34 viewBox="0 0 24 24"><path d="M13.2 2.5 5.5 13.6h5.6l-1 7.9 8.4-11.3h-5.9l.6-7.7Z" fill="#0b1017"/></svg></div>Dubai Battery Service</div>
<h1>Car battery dead?<br><span>We come to you.</span></h1>
<div class=p>24/7 mobile car battery replacement across Dubai</div>
<div class=chips><div class=chip>~20–25 min arrival</div><div class="chip g">From AED 120</div><div class="chip g">Free battery test</div></div>
</div></body></html>`;
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1200,height:630}});
const fs=await import('fs'); fs.writeFileSync(root + '.og.html',html); await p.goto('file://' + root + '.og.html',{waitUntil:'networkidle'}); await p.waitForTimeout(300);
await p.screenshot({path:'public/og-image.png'}); await b.close(); fs.unlinkSync(root + '.og.html');
