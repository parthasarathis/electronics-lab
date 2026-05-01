# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Electronics Simulation Lab** — 150 interactive 3D electronics device simulations, each a self-contained HTML file. Deployed as a GitHub Pages PWA. Built by Prof. Partha, Mechatronics Engineering Dept.

Live URL pattern: `https://{username}.github.io/electronics-lab/`

## Repository Structure

```
electronics-lab/
├── index.html          ← Landing page (grid + search + PWA install)
├── manifest.json       ← PWA manifest
├── sw.js               ← Service Worker
├── offline.html        ← Offline fallback
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
├── shared/
│   └── nav.js          ← Prev/Next navigation injector (included in every device)
└── devices/
    └── 01-resistor.html … 150-touch-controller.html
```

## Local Development

No build system — open files directly in a browser. To avoid CORS issues with `nav.js`:

```bash
# Serve locally (pick any)
python3 -m http.server 8080
npx serve .
```

Deploy a device after generating it:
```bash
git add devices/NN-device-name.html
git commit -m "Add Device NN: [Device Name] simulation"
git push
```

## Creating a New Device File

Each device is a fully self-contained HTML file. The `CLAUDE_CODE_MASTER_PROMPT.md` contains the canonical Universal Device HTML Template — **always start from that template**.

### Script Execution Order (enforced)
1. CSS variable setup (`--accent-rgb`)
2. Three.js scene, camera, renderer, lights
3. 3D geometry construction
4. Particle systems & animated objects
5. 2D chart drawing functions
6. Physics / calculation functions
7. Slider event listeners + `recalc()`
8. Button event listeners
9. Camera touch/mouse controls
10. Animation loop (`requestAnimationFrame`)
11. `init()` call + first `recalc()` + first `drawAll()`

### Responsive Layout Breakpoints
- **Mobile** `< 640px`: Single column, 3D canvas top 36vh, panels scroll below
- **Tablet** `640–1024px`: Two-column, canvas left 48%, panels right 52%
- **Desktop** `> 1024px`: Three-column — canvas 42%, panels 32%, curve section 26%
- **Large Desktop** `> 1440px`: canvas 44%, panels 30%, curve 26%
- **Landscape phone**: Header hidden, compact header shown instead

### Category Accent Colors

| Category             | `--accent` | `--accent-rgb`  |
|----------------------|------------|-----------------|
| Passive Components   | `#ff8c00`  | `255,140,0`     |
| Semiconductor Diode  | `#ff4488`  | `255,68,136`    |
| Transistor           | `#44aaff`  | `68,170,255`    |
| Thyristor/Power      | `#ff6600`  | `255,102,0`     |
| Optoelectronics      | `#ffdd00`  | `255,221,0`     |
| Sensor/Transducer    | `#44ffaa`  | `68,255,170`    |
| Actuator             | `#ff8844`  | `255,136,68`    |
| Analog IC            | `#aa44ff`  | `170,68,255`    |
| Digital IC           | `#44ddff`  | `68,221,255`    |
| Memory               | `#ffaa44`  | `255,170,68`    |
| Microcontroller      | `#88ff44`  | `136,255,68`    |
| Communication        | `#44aaff`  | `68,170,255`    |
| Power Electronics    | `#ff4444`  | `255,68,68`     |
| Interface/Driver     | `#ff44aa`  | `255,68,170`    |

### Standard Utility Formatters (always include in device scripts)
```js
function fmtV(v){ return v>=1000?`${(v/1000).toFixed(2)}kV`:v>=1?`${v.toFixed(2)}V`:`${(v*1000).toFixed(0)}mV`; }
function fmtI(a){ return a>=1?`${a.toFixed(2)}A`:a>=0.001?`${(a*1e3).toFixed(1)}mA`:`${(a*1e6).toFixed(0)}μA`; }
function fmtR(r){ return r>=1e6?`${(r/1e6).toFixed(2)}MΩ`:r>=1000?`${(r/1000).toFixed(1)}kΩ`:`${r}Ω`; }
function fmtP(w){ return w>=1?`${w.toFixed(2)}W`:w>=0.001?`${(w*1e3).toFixed(0)}mW`:`${(w*1e6).toFixed(0)}μW`; }
function fmtF(f){ return f>=1e6?`${(f/1e6).toFixed(2)}MHz`:f>=1000?`${(f/1e3).toFixed(1)}kHz`:`${f.toFixed(0)}Hz`; }
function slBg(pct, col){ return `linear-gradient(to right,${col} ${pct}%,#182030 ${pct}%)`; }
```

### Three.js
- CDN: `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`
- Use `MeshPhongMaterial` for all solid objects
- Use `InstancedMesh` for repeated objects (particles, ions, segments)
- Add schematic symbol as `THREE.Sprite` below the model (`y = -bodyHeight - 0.5`)
- Animate glow via additive blending + `PointLight` intensity driven by physics state
- Camera: `PerspectiveCamera(42, 1, 0.1, 60)`, spherical coordinates `(camR, camT, camP)`
- Charts redraw every 80ms inside the animation loop

### Curve Panels (characteristic curves)
- On mobile/tablet: curve panels live inside `#panels-section` with class `curve-panel-main`
- On desktop (`>= 1024px`): `#curve-section` becomes visible; `curve-panel-main` panels are hidden via `.curve-panel-main { display: none }` CSS rule
- Draw into both `curve1` (mobile) and `curve1-desk` (desktop) canvases inside `drawAll()`

## Brand — Pagadev Deeptech

- **Company:** PAGADEV DEEPTECH PRIVATE LIMITED
- **Tagline:** Pioneering Advanced Global Automation and DEVelopment
- **Logo URL:** `https://pagadev.in/assets/img/LOGO R-01-2.png` (loaded remotely; `onerror` hides it gracefully)
- **Primary colors:** Deep purple `#570d8a` / `#39085a`, navy `#052767`
- **Accent used in ElecLab:** `#8b34e8` (accent2: `#b06dff`)
- **Font:** 'Arpubes' (custom OTF at pagadev.in) — device pages fall back to `'Courier New'`
- **Header gradient:** `rgba(57,8,90,0.97)` → `rgba(5,39,103,0.97)`

## Access Control — Flutter App Gate

The GitHub Pages site is gated by a JS token stored in `localStorage`. The Flutter app (using `flutter_inappwebview`) injects the token before page load.

**Token:** `PDEL_7x9K_2025`

**Flutter `InAppWebView` setup:**
```dart
initialUserScripts: UnmodifiableListView<UserScript>([
  UserScript(
    source: "localStorage.setItem('pd_elec_access', 'PDEL_7x9K_2025');",
    injectionTime: UserScriptInjectionTime.AT_DOCUMENT_START,
  ),
]),
```

- Without the token, `index.html` shows a branded "Restricted Access" screen and device pages redirect to `index.html`
- `localhost` / `127.0.0.1` always bypasses the gate (dev mode)
- `shared/nav.js` enforces the gate on all device pages and also injects the prev/next navigation bar

## Quality Checklist (verify before every commit)

- Opens without errors in Chrome DevTools console
- 3D model visible and auto-rotating on load
- Drag/pinch controls work on Android Chrome
- All sliders respond and update live values
- Charts draw correctly on first load (no zero-width canvas)
- Operating point dot moves with sliders
- Layout correct on: 375px mobile, 768px tablet, 1280px desktop
- Landscape phone layout works
- PWA meta tags present in `<head>`, `manifest.json` and `nav.js` linked
- No CORS errors, no 404s for Three.js CDN
- Teaching points visible; all 7 formulas match standard textbook values
