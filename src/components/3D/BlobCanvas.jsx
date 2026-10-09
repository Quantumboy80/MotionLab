import React, { useEffect, useRef } from 'react';

// Perlin noise
function createNoise() {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(a, b, t) { return a + t * (b - a); }
  function grad(hash, x, y) {
    const h = hash & 3;
    return ((h & 1) ? -(h < 2 ? x : y) : (h < 2 ? x : y)) + ((h & 2) ? -(h < 2 ? y : x) : (h < 2 ? y : x));
  }
  return function(x, y) {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    x -= Math.floor(x); y -= Math.floor(y);
    const u = fade(x), v = fade(y);
    const A = perm[X] + Y, B = perm[X + 1] + Y;
    return lerp(
      lerp(grad(perm[A], x, y), grad(perm[B], x - 1, y), u),
      lerp(grad(perm[A + 1], x, y - 1), grad(perm[B + 1], x - 1, y - 1), u), v
    );
  };
}

// Cosine palette for glossy metallic foil / chrome balloon colors
function metallicPalette(t) {
  const cos = Math.cos;
  const PI2 = 6.28318;
  const r = 0.55 + 0.45 * cos(PI2 * (1.0 * t + 0.05));
  const g = 0.25 + 0.35 * cos(PI2 * (0.8 * t + 0.33));
  const b = 0.50 + 0.45 * cos(PI2 * (1.0 * t + 0.67));
  return [(r * 255) | 0, (g * 255) | 0, (b * 255) | 0];
}

function smoothArray(arr, passes) {
  let r = [...arr];
  for (let p = 0; p < passes; p++) {
    const t = [...r]; const len = t.length;
    for (let i = 0; i < len; i++) {
      r[i] = t[(i-2+len)%len]*0.1 + t[(i-1+len)%len]*0.2 + t[i]*0.4 + t[(i+1)%len]*0.2 + t[(i+2)%len]*0.1;
    }
  }
  return r;
}

export default function BlobCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const noise = createNoise();
    let W = window.innerWidth;
    let H = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Offscreen Canvas for 3D Metallic Foil Texture
    const TEX_SIZE = 384;
    const texCanvas = document.createElement('canvas');
    texCanvas.width = TEX_SIZE;
    texCanvas.height = TEX_SIZE;
    const texCtx = texCanvas.getContext('2d');
    const texImgData = texCtx.createImageData(TEX_SIZE, TEX_SIZE);
    const texPixels = texImgData.data;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking & spring physics
    let mouseX = W * 0.45;
    let mouseY = H * 0.5;
    let blobX = mouseX;
    let blobY = mouseY;
    let velX = 0;
    let velY = 0;

    // Trailing fluid nodes for liquid tail
    const NUM_TRAIL = 8;
    const trail = [];
    for (let i = 0; i < NUM_TRAIL; i++) {
      trail.push({ x: mouseX, y: mouseY, vx: 0, vy: 0 });
    }

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    let time = 0;
    let animId;
    const N = 90; // Number of points around liquid splash head

    // Render 3D Metallic Foil Texture
    function updateFoilTexture() {
      const scale = 3.2;
      const warpAmt = 1.6;

      for (let py = 0; py < TEX_SIZE; py++) {
        for (let px = 0; px < TEX_SIZE; px++) {
          const x = (px / TEX_SIZE) * scale;
          const y = (py / TEX_SIZE) * scale;

          const qx = noise(x + time * 0.2, y + time * 0.15);
          const qy = noise(x + 4.1 + time * 0.18, y + 2.3 + time * 0.22);

          const rx = noise(x + qx * warpAmt + time * 0.08, y + qy * warpAmt + time * 0.1);
          const ry = noise(x + qx * warpAmt + 3.2, y + qy * warpAmt + 1.8);

          const finalVal = noise(x + rx * warpAmt, y + ry * warpAmt);
          const val = finalVal * 0.5 + 0.5;

          const [r, g, b] = metallicPalette(val + time * 0.03);
          const highlight = Math.pow(val, 4.0) * 120;

          const idx = (py * TEX_SIZE + px) * 4;
          texPixels[idx]     = Math.min(255, r + highlight);
          texPixels[idx + 1] = Math.min(255, g + highlight * 0.6);
          texPixels[idx + 2] = Math.min(255, b + highlight * 0.8);
          texPixels[idx + 3] = 255;
        }
      }
      texCtx.putImageData(texImgData, 0, 0);
    }

    function render() {
      time += 0.006;

      // Viscous follower: Head slides smoothly to mouse with NO spring bounce
      const easeHead = 0.05; // Slow, viscous drag
      const dx = mouseX - blobX;
      const dy = mouseY - blobY;
      
      blobX += dx * easeHead;
      blobY += dy * easeHead;

      // Calculate velocity based on instant delta for stretching
      const velX = dx * easeHead;
      const velY = dy * easeHead;

      // Trailing nodes follow previous node with pure viscous delay (no spring bounce)
      let prevX = blobX;
      let prevY = blobY;
      const easeTrail = 0.12; // Flowing lag
      for (let i = 0; i < NUM_TRAIL; i++) {
        const node = trail[i];
        node.x += (prevX - node.x) * easeTrail;
        node.y += (prevY - node.y) * easeTrail;
        prevX = node.x;
        prevY = node.y;
      }

      const speed = Math.sqrt(velX * velX + velY * velY);
      const angle = Math.atan2(velY, velX);
      const stretch = 1 + Math.min(speed * 0.008, 0.45);
      const squash = 1 / Math.sqrt(stretch);
      const baseRadius = Math.min(W, H) * 0.18;

      // --- Build Cursor-Following Liquid Splash Path ---
      // Head splash blob
      const radii = [];
      for (let i = 0; i < N; i++) {
        const th = (i / N) * Math.PI * 2;
        const nx = Math.cos(th) * 1.2 + time * 0.8;
        const ny = Math.sin(th) * 1.2 + time * 0.8;
        const nVal = noise(nx, ny) * 0.22 + noise(nx * 2.2 + 30, ny * 2.2 + 30) * 0.1;
        radii.push(baseRadius * (1 + nVal));
      }
      const sr = smoothArray(radii, 5);

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const pts = [];

      for (let i = 0; i < N; i++) {
        const th = (i / N) * Math.PI * 2;
        let x = Math.cos(th) * sr[i];
        let y = Math.sin(th) * sr[i];

        // Velocity stretch along motion direction
        let rx = x * cosA + y * sinA;
        let ry = -x * sinA + y * cosA;
        rx *= stretch;
        ry *= squash;

        pts.push({
          x: blobX + (rx * cosA - ry * sinA),
          y: blobY + (rx * sinA + ry * cosA)
        });
      }

      const splashPath = new Path2D();
      const last = pts[N - 1];
      const first = pts[0];
      splashPath.moveTo((last.x + first.x) / 2, (last.y + first.y) / 2);
      for (let i = 0; i < N; i++) {
        const c = pts[i];
        const n = pts[(i + 1) % N];
        splashPath.quadraticCurveTo(c.x, c.y, (c.x + n.x) / 2, (c.y + n.y) / 2);
      }
      splashPath.closePath();

      // Add trailing liquid droplets to the splash path
      for (let i = 0; i < NUM_TRAIL; i++) {
        const trNode = trail[i];
        const trR = baseRadius * Math.pow(0.72, i + 1);
        splashPath.moveTo(trNode.x + trR, trNode.y);
        splashPath.arc(trNode.x, trNode.y, trR, 0, Math.PI * 2);
      }

      // Update 3D foil texture
      updateFoilTexture();

      ctx.clearRect(0, 0, W, H);

      // --- Calculate Font Size & Alignment for MOTION LAB ---
      const fontSize = Math.min(Math.max(W * 0.145, 64), 250);
      ctx.font = `900 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // --- 1. Draw Base Solid Black Text (everywhere on page) ---
      ctx.fillStyle = '#000000';
      ctx.fillText('MOTION LAB', W / 2, H / 2);

      // --- 2. Draw Interactive Black Liquid Splash Cloud (under/around cursor) ---
      ctx.fillStyle = '#000000';
      ctx.fill(splashPath);

      // --- 3. Reveal 3D Glossy Metallic Foil Text inside the Cursor Liquid Splash ---
      ctx.save();
      // Clip rendering exclusively inside the cursor liquid splash boundary
      ctx.clip(splashPath);

      // Render text filled with 3D metallic foil pattern inside splash
      const pattern = ctx.createPattern(texCanvas, 'repeat');
      ctx.fillStyle = pattern;
      ctx.fillText('MOTION LAB', W / 2, H / 2);

      ctx.restore();

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none'
      }}
    />
  );
}
