// ══════════════════════════════════════════════════════════════════
// ElecLab — shared/device.js
// Common utilities for all 150 device pages.
// Requires Three.js (r128) already loaded on the page.
// ══════════════════════════════════════════════════════════════════

/* ── FORMATTERS ─────────────────────────────────────────────────── */
const EL = {
  fmtR(v) {
    if (v >= 1e9)  return (v/1e9).toPrecision(3)  + ' GΩ';
    if (v >= 1e6)  return (v/1e6).toPrecision(3)  + ' MΩ';
    if (v >= 1e3)  return (v/1e3).toPrecision(3)  + ' kΩ';
    return v.toPrecision(3) + ' Ω';
  },
  fmtV(v) {
    const a = Math.abs(v);
    if (a >= 1)    return v.toPrecision(3) + ' V';
    if (a >= 1e-3) return (v*1e3).toPrecision(3) + ' mV';
    return (v*1e6).toPrecision(3) + ' µV';
  },
  fmtI(v) {
    const a = Math.abs(v);
    if (a >= 1)    return v.toPrecision(3) + ' A';
    if (a >= 1e-3) return (v*1e3).toPrecision(3) + ' mA';
    if (a >= 1e-6) return (v*1e6).toPrecision(3) + ' µA';
    return (v*1e9).toPrecision(3) + ' nA';
  },
  fmtP(v) {
    const a = Math.abs(v);
    if (a >= 1)    return v.toPrecision(3) + ' W';
    if (a >= 1e-3) return (v*1e3).toPrecision(3) + ' mW';
    return (v*1e6).toPrecision(3) + ' µW';
  },
  fmtC(v) {
    if (v >= 1e-3) return (v*1e3).toPrecision(3) + ' mF';
    if (v >= 1e-6) return (v*1e6).toPrecision(3) + ' µF';
    if (v >= 1e-9) return (v*1e9).toPrecision(3) + ' nF';
    return (v*1e12).toPrecision(3) + ' pF';
  },
  fmtL(v) {
    if (v >= 1)    return v.toPrecision(3) + ' H';
    if (v >= 1e-3) return (v*1e3).toPrecision(3) + ' mH';
    return (v*1e6).toPrecision(3) + ' µH';
  },
  fmtF(v) {
    if (v >= 1e9)  return (v/1e9).toPrecision(3)  + ' GHz';
    if (v >= 1e6)  return (v/1e6).toPrecision(3)  + ' MHz';
    if (v >= 1e3)  return (v/1e3).toPrecision(3)  + ' kHz';
    return v.toPrecision(3) + ' Hz';
  },
  fmtT(v) { return v.toFixed(1) + ' °C'; },
  fmtPct(v) { return (v*100).toFixed(1) + '%'; },

  /* ── THREE.JS SCENE INIT ──────────────────────────────────────── */
  initScene(canvasId) {
    const canvas = document.getElementById(canvasId);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    const W = canvas.clientWidth, H = canvas.clientHeight;
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.01, 200);
    camera.position.set(0, 0, 5);

    // Resize observer
    new ResizeObserver(() => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }).observe(canvas);

    return { renderer, scene, camera };
  },

  /* ── STANDARD LIGHTS ─────────────────────────────────────────── */
  initLights(scene, accentHex) {
    const col = accentHex ? parseInt(accentHex.replace('#',''), 16) : 0xaa77ff;
    scene.add(new THREE.AmbientLight(0x221133, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.0);
    key.position.set(5, 8, 6);
    key.castShadow = true;
    scene.add(key);
    const fill = new THREE.DirectionalLight(col, 0.4);
    fill.position.set(-4, 2, -3);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 0.25);
    rim.position.set(0, -5, -4);
    scene.add(rim);
    return { key, fill, rim };
  },

  /* ── ORBIT CONTROLS (mouse + touch) ─────────────────────────── */
  initOrbit(camera, canvas) {
    let drag = false, lastX = 0, lastY = 0;
    let rotX = 0, rotY = 0;
    const pivot = new THREE.Object3D();

    function applyRot() {
      pivot.rotation.x = rotX;
      pivot.rotation.y = rotY;
    }

    canvas.addEventListener('mousedown',  e => { drag = true;  lastX = e.clientX; lastY = e.clientY; });
    canvas.addEventListener('mousemove',  e => {
      if (!drag) return;
      rotY += (e.clientX - lastX) * 0.008;
      rotX += (e.clientY - lastY) * 0.008;
      rotX = Math.max(-Math.PI/2, Math.min(Math.PI/2, rotX));
      lastX = e.clientX; lastY = e.clientY;
      applyRot();
    });
    canvas.addEventListener('mouseup',   () => drag = false);
    canvas.addEventListener('mouseleave',() => drag = false);

    // Touch
    let t0x = 0, t0y = 0;
    canvas.addEventListener('touchstart', e => { e.preventDefault(); t0x = e.touches[0].clientX; t0y = e.touches[0].clientY; }, { passive: false });
    canvas.addEventListener('touchmove',  e => {
      e.preventDefault();
      rotY += (e.touches[0].clientX - t0x) * 0.008;
      rotX += (e.touches[0].clientY - t0y) * 0.008;
      rotX = Math.max(-Math.PI/2, Math.min(Math.PI/2, rotX));
      t0x = e.touches[0].clientX; t0y = e.touches[0].clientY;
      applyRot();
    }, { passive: false });

    return pivot;
  },

  /* ── 2D CHART HELPERS ────────────────────────────────────────── */
  setupChart(canvasEl, accentHex) {
    const ctx = canvasEl.getContext('2d');
    const W = canvasEl.width  = canvasEl.offsetWidth  * (devicePixelRatio || 1);
    const H = canvasEl.height = canvasEl.offsetHeight * (devicePixelRatio || 1);
    ctx.scale(devicePixelRatio || 1, devicePixelRatio || 1);
    const w = canvasEl.offsetWidth, h = canvasEl.offsetHeight;
    return { ctx, w, h, W, H, accent: accentHex || '#aa77ff' };
  },

  drawGrid(ctx, w, h, pad) {
    const p = pad || { l:36, r:8, t:8, b:28 };
    ctx.strokeStyle = 'rgba(80,50,120,0.3)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = p.t + (h - p.t - p.b) * i / 4;
      ctx.beginPath(); ctx.moveTo(p.l, y); ctx.lineTo(w - p.r, y); ctx.stroke();
    }
    for (let i = 0; i <= 4; i++) {
      const x = p.l + (w - p.l - p.r) * i / 4;
      ctx.beginPath(); ctx.moveTo(x, p.t); ctx.lineTo(x, h - p.b); ctx.stroke();
    }
  },

  drawAxes(ctx, w, h, pad, xLabel, yLabel) {
    const p = pad || { l:36, r:8, t:8, b:28 };
    ctx.strokeStyle = 'rgba(120,80,180,0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(p.l, p.t); ctx.lineTo(p.l, h - p.b);
    ctx.lineTo(w - p.r, h - p.b);
    ctx.stroke();
    ctx.fillStyle = 'rgba(160,130,200,0.7)';
    ctx.font = '9px Courier New';
    if (xLabel) { ctx.textAlign = 'center'; ctx.fillText(xLabel, p.l + (w - p.l - p.r)/2, h - 4); }
    if (yLabel) { ctx.save(); ctx.translate(10, p.t + (h - p.t - p.b)/2); ctx.rotate(-Math.PI/2); ctx.textAlign = 'center'; ctx.fillText(yLabel, 0, 0); ctx.restore(); }
  },

  /* Draw an operating point dot on a curve chart */
  drawOpPoint(ctx, x, y, accent) {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI*2);
    ctx.fillStyle = accent || '#ff66aa';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.stroke();
  },

  /* ── SLIDER HELPER ───────────────────────────────────────────── */
  bindSlider(id, cb) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => cb(parseFloat(el.value), el));
    return el;
  },

  /* ── CLAMP ───────────────────────────────────────────────────── */
  clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; },
  lerp(a, b, t) { return a + (b - a) * t; },
  mapRange(v, a, b, c, d) { return c + (v - a) / (b - a) * (d - c); },
};

window.EL = EL;
