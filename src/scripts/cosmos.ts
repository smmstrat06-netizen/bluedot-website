/**
 * Cosmos — lightweight 2D-canvas scenes built around the BlueDot mark.
 *
 *   system   → the connected universe: one dot, three orbits (home)
 *   think    → instrument rings and a focused orbit (Consulting)
 *   create   → scattered dots that form a structure, then release (Agency)
 *   amplify  → a signal radiating outward from the dot (Media)
 *
 * Strokes are batched by opacity and glows come from cached sprites, so a
 * frame costs a few dozen draw calls. Pauses when off-screen or in a hidden
 * tab, and renders a single still frame when the visitor prefers reduced motion.
 */

type Scene = "system" | "think" | "create" | "amplify";
type RGB = readonly [number, number, number];

const C = {
  blue: [59, 123, 255],
  think: [255, 122, 89],
  create: [63, 214, 230],
  amplify: [255, 194, 71],
  white: [242, 244, 248],
} as const satisfies Record<string, RGB>;

const TAU = Math.PI * 2;
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a))})`;

// Soft radial glow, rendered once per colour and reused as an image
const sprites = new Map<RGB, HTMLCanvasElement>();
const glowSprite = (c: RGB) => {
  let sprite = sprites.get(c);
  if (!sprite) {
    sprite = document.createElement("canvas");
    sprite.width = sprite.height = 256;
    const g = sprite.getContext("2d")!;
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, rgba(c, 1));
    grad.addColorStop(0.35, rgba(c, 0.35));
    grad.addColorStop(1, rgba(c, 0));
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    sprites.set(c, sprite);
  }
  return sprite;
};

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number;
  ph: number;
  depth: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: RGB;
  slot: number;
}

export function mountCosmos(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const scene = (canvas.dataset.scene as Scene) || "system";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  let w = 0;
  let h = 0;
  let dpr = 1;
  let visible = true;
  let raf = 0;
  let stars: Star[] = [];
  let particles: Particle[] = [];
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const start = performance.now();

  // Where the dot sits, and how big the system is
  const layout = () => {
    const narrow = w < 760;
    const cx = w * (narrow ? 0.62 : parseFloat(canvas.dataset.cx || "0.7"));
    const cy = h * (narrow ? 0.3 : parseFloat(canvas.dataset.cy || "0.48"));
    const R = Math.min(w, h) * (narrow ? 0.46 : parseFloat(canvas.dataset.scale || "0.44"));
    return { cx, cy, R };
  };

  const seedStars = () => {
    const count = Math.min(520, Math.round((w * h) / 2800));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() < 0.92 ? Math.random() * 0.8 + 0.2 : Math.random() * 1.2 + 0.8,
      a: Math.random() * 0.55 + 0.1,
      tw: Math.random() * 1.2 + 0.2,
      ph: Math.random() * TAU,
      depth: Math.random() * 0.8 + 0.2,
    }));
  };

  const seedParticles = () => {
    const count = w < 760 ? 46 : 78;
    const hues: RGB[] = [C.white, C.white, C.create, C.blue];
    particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.3 + 0.7,
      hue: hues[i % hues.length],
      slot: i / count,
    }));
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    w = Math.max(1, rect.width);
    h = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, w < 760 ? 1.5 : 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    seedStars();
    if (scene === "create") seedParticles();
    if (reduceMotion) draw(14000);
  };

  /* ---------- Shared painters ---------- */

  const STAR_BUCKETS = 6;
  const drawStars = (t: number) => {
    const px = pointer.x * 10;
    const py = pointer.y * 10;
    const paths = Array.from({ length: STAR_BUCKETS }, () => new Path2D());
    for (const s of stars) {
      const alpha = s.a * (0.65 + 0.35 * Math.sin(t * 0.001 * s.tw + s.ph));
      const bucket = Math.min(STAR_BUCKETS - 1, Math.floor((alpha / 0.65) * STAR_BUCKETS));
      const x = s.x + px * s.depth;
      const y = s.y + py * s.depth;
      paths[bucket].moveTo(x + s.r, y);
      paths[bucket].arc(x, y, s.r, 0, TAU);
    }
    paths.forEach((path, i) => {
      ctx.fillStyle = rgba(C.white, ((i + 0.5) / STAR_BUCKETS) * 0.65);
      ctx.fill(path);
    });
  };

  const glow = (x: number, y: number, r: number, c: RGB, a: number) => {
    ctx.globalAlpha = Math.min(1, a);
    ctx.drawImage(glowSprite(c), x - r, y - r, r * 2, r * 2);
    ctx.globalAlpha = 1;
  };

  const dot = (x: number, y: number, r: number, color: string | CanvasGradient) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
  };

  const drawCore = (cx: number, cy: number, R: number, t: number) => {
    const pulse = 1 + Math.sin(t * 0.0012) * 0.04;
    glow(cx, cy, R * 0.95 * pulse, C.blue, 0.28);
    glow(cx, cy, R * 0.28, C.blue, 0.55);
    const core = R * 0.055;
    const g = ctx.createRadialGradient(cx - core * 0.3, cy - core * 0.3, 0, cx, cy, core);
    g.addColorStop(0, "rgba(230,238,255,1)");
    g.addColorStop(0.45, rgba(C.blue, 1));
    g.addColorStop(1, "rgba(30,80,210,1)");
    dot(cx, cy, core, g);
  };

  // 3D orbit projection: circle in XY, tilted around X, then rotated around Z
  const project = (cx: number, cy: number, r: number, theta: number, tilt: number, rot: number, focal: number) => {
    const x = r * Math.cos(theta);
    let y = r * Math.sin(theta);
    const z0 = y * Math.sin(tilt);
    y = y * Math.cos(tilt);
    const xr = x * Math.cos(rot) - y * Math.sin(rot);
    const yr = x * Math.sin(rot) + y * Math.cos(rot);
    // gentle pointer parallax (rotation around Y)
    const yaw = pointer.x * 0.12;
    const xp = xr * Math.cos(yaw) + z0 * Math.sin(yaw);
    const z = -xr * Math.sin(yaw) + z0 * Math.cos(yaw);
    const s = focal / (focal + z);
    return { x: cx + xp * s, y: cy + (yr + pointer.y * 8) * s, z, s };
  };

  // Orbit outline, brighter where it passes in front of the dot
  const DEPTH_BUCKETS = 4;
  const strokeOrbit = (cx: number, cy: number, r: number, tilt: number, rot: number, focal: number, base: number, range: number) => {
    const paths = Array.from({ length: DEPTH_BUCKETS }, () => new Path2D());
    const steps = 120;
    let prev = project(cx, cy, r, 0, tilt, rot, focal);
    for (let i = 1; i <= steps; i++) {
      const next = project(cx, cy, r, (i / steps) * TAU, tilt, rot, focal);
      const depth = (-prev.z / r + 1) / 2;
      const bucket = Math.min(DEPTH_BUCKETS - 1, Math.max(0, Math.floor(depth * DEPTH_BUCKETS)));
      paths[bucket].moveTo(prev.x, prev.y);
      paths[bucket].lineTo(next.x, next.y);
      prev = next;
    }
    ctx.lineWidth = 1;
    paths.forEach((path, i) => {
      ctx.strokeStyle = rgba(C.white, base + (i / (DEPTH_BUCKETS - 1)) * range);
      ctx.stroke(path);
    });
  };

  // Fading comet tail behind a planet
  const strokeTrail = (
    cx: number,
    cy: number,
    r: number,
    theta: number,
    tilt: number,
    rot: number,
    focal: number,
    color: RGB,
    length: number,
    width: number,
  ) => {
    const segments = 24;
    const step = length / segments;
    let prev = project(cx, cy, r, theta, tilt, rot, focal);
    for (let k = 1; k <= segments; k++) {
      const next = project(cx, cy, r, theta - k * step, tilt, rot, focal);
      ctx.strokeStyle = rgba(color, 0.6 * (1 - (k - 1) / segments));
      ctx.lineWidth = width * prev.s;
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(next.x, next.y);
      ctx.stroke();
      prev = next;
    }
  };

  /* ---------- Scenes ---------- */

  const orbitsSystem = [
    { r: 0.42, tilt: 1.18, rot: -0.32, speed: 0.00016, phase: 0.6, c: C.think },
    { r: 0.7, tilt: 1.26, rot: 0.1, speed: 0.0001, phase: 2.5, c: C.create },
    { r: 0.98, tilt: 1.12, rot: 0.42, speed: 0.000068, phase: 4.4, c: C.amplify },
  ];

  const drawSystem = (t: number) => {
    const { cx, cy, R } = layout();
    const focal = R * 3.2;
    const planets: { x: number; y: number; z: number; s: number; c: RGB }[] = [];

    for (const o of orbitsSystem) {
      const r = o.r * R;
      strokeOrbit(cx, cy, r, o.tilt, o.rot, focal, 0.05, 0.13);
      const theta = o.phase + t * o.speed * TAU;
      strokeTrail(cx, cy, r, theta, o.tilt, o.rot, focal, o.c, 0.5, 1.6);
      planets.push({ ...project(cx, cy, r, theta, o.tilt, o.rot, focal), c: o.c });
    }

    // connections: every dot links back to the centre
    ctx.lineWidth = 1;
    for (const p of planets) {
      const g = ctx.createLinearGradient(cx, cy, p.x, p.y);
      g.addColorStop(0, rgba(C.blue, 0.22));
      g.addColorStop(1, rgba(p.c, 0.1));
      ctx.strokeStyle = g;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }

    const drawPlanet = (p: (typeof planets)[number]) => {
      glow(p.x, p.y, R * 0.12 * p.s, p.c, 0.45);
      dot(p.x, p.y, Math.max(2.2, R * 0.013 * p.s), rgba(p.c, 1));
    };

    planets.filter((p) => p.z > 0).forEach(drawPlanet);
    drawCore(cx, cy, R, t);
    planets.filter((p) => p.z <= 0).forEach(drawPlanet);
  };

  const drawThink = (t: number) => {
    const { cx, cy, R } = layout();

    // instrument rings with dial ticks, counter-rotating
    [0.3, 0.52, 0.78, 1.02].forEach((k, i) => {
      const r = R * k;
      const ticks = 60 + i * 24;
      const minor = new Path2D();
      const major = new Path2D();
      for (let j = 0; j < ticks; j++) {
        const a = (j / ticks) * TAU;
        const isMajor = j % 5 === 0;
        const len = isMajor ? 7 : 3;
        const path = isMajor ? major : minor;
        path.moveTo(Math.cos(a) * r, Math.sin(a) * r);
        path.lineTo(Math.cos(a) * (r - len), Math.sin(a) * (r - len));
      }
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.92);
      ctx.rotate(t * 0.00004 * (i % 2 ? -1 : 1) * (i + 1));
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(C.white, i === 2 ? 0.16 : 0.09);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, TAU);
      ctx.stroke();
      ctx.strokeStyle = rgba(C.white, 0.08);
      ctx.stroke(minor);
      ctx.strokeStyle = rgba(C.white, 0.2);
      ctx.stroke(major);
      ctx.restore();
    });

    // focus sweep
    if ("createConicGradient" in ctx) {
      const grad = ctx.createConicGradient(t * 0.00025, cx, cy);
      grad.addColorStop(0, rgba(C.think, 0.16));
      grad.addColorStop(0.08, rgba(C.think, 0));
      grad.addColorStop(1, rgba(C.think, 0));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.02, 0, TAU);
      ctx.fill();
    }

    // crosshair
    ctx.strokeStyle = rgba(C.white, 0.07);
    ctx.beginPath();
    ctx.moveTo(cx - R * 1.25, cy);
    ctx.lineTo(cx + R * 1.25, cy);
    ctx.moveTo(cx, cy - R * 1.15);
    ctx.lineTo(cx, cy + R * 1.15);
    ctx.stroke();

    // one focused orbit
    const focal = R * 3;
    const r = R * 0.78;
    const theta = 1.2 + t * 0.00009 * TAU;
    strokeTrail(cx, cy, r, theta, 1.05, -0.5, focal, C.think, 0.72, 1.6);
    const p = project(cx, cy, r, theta, 1.05, -0.5, focal);
    if (p.z > 0) {
      glow(p.x, p.y, R * 0.14, C.think, 0.5);
      drawCore(cx, cy, R, t);
    } else {
      drawCore(cx, cy, R, t);
      glow(p.x, p.y, R * 0.14, C.think, 0.5);
    }
    dot(p.x, p.y, Math.max(2.4, R * 0.014), rgba(C.think, 1));
  };

  const LINK_BUCKETS = 5;
  const drawCreate = (t: number) => {
    const { cx, cy, R } = layout();
    // breathe between free drift and a formed structure
    const cycle = (Math.sin(t * 0.00022 - Math.PI / 2) + 1) / 2;
    const form = cycle * cycle * (3 - 2 * cycle);
    const linkDist = Math.min(w, h) * 0.16;

    const pos = particles.map((p) => {
      if (!reduceMotion) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }
      // formation: two interlocking rings around the dot
      const ring = p.slot < 0.5 ? 0 : 1;
      const a = p.slot * Math.PI * 4 + t * 0.00006 * (ring ? -1 : 1);
      const rr = R * (ring ? 0.92 : 0.56);
      const fx = cx + Math.cos(a) * rr;
      const fy = cy + Math.sin(a) * rr * (ring ? 0.62 : 1);
      return {
        x: p.x + (fx - p.x) * form + pointer.x * 12,
        y: p.y + (fy - p.y) * form + pointer.y * 12,
        p,
      };
    });

    const links = Array.from({ length: LINK_BUCKETS }, () => new Path2D());
    for (let i = 0; i < pos.length; i++) {
      for (let j = i + 1; j < pos.length; j++) {
        const d = Math.hypot(pos[i].x - pos[j].x, pos[i].y - pos[j].y);
        if (d >= linkDist) continue;
        const bucket = Math.min(LINK_BUCKETS - 1, Math.floor((1 - d / linkDist) * LINK_BUCKETS));
        links[bucket].moveTo(pos[i].x, pos[i].y);
        links[bucket].lineTo(pos[j].x, pos[j].y);
      }
    }
    ctx.lineWidth = 1;
    links.forEach((path, i) => {
      ctx.strokeStyle = rgba(C.create, ((i + 0.5) / LINK_BUCKETS) * (0.1 + form * 0.18));
      ctx.stroke(path);
    });

    drawCore(cx, cy, R * 0.9, t);

    for (const { x, y, p } of pos) {
      if (p.hue === C.create) glow(x, y, 14, C.create, 0.35);
      dot(x, y, p.r, rgba(p.hue, p.hue === C.white ? 0.75 : 1));
    }
  };

  const drawAmplify = (t: number) => {
    const { cx, cy, R } = layout();
    const period = 2600;
    const waves = 6;

    // lensing halo behind the dot
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1, 0.34);
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = rgba(C.amplify, 0.09 - i * 0.025);
      ctx.lineWidth = 1.5 + i * 2;
      ctx.beginPath();
      ctx.arc(0, 0, R * (0.34 + i * 0.03), Math.PI * 1.08, Math.PI * 1.92);
      ctx.stroke();
    }
    ctx.restore();

    // expanding signal rings
    ctx.lineWidth = 1.2;
    for (let i = 0; i < waves; i++) {
      const k = (((t / period + i / waves) % 1) + 1) % 1;
      ctx.save();
      ctx.translate(cx + pointer.x * 10 * k, cy + pointer.y * 6 * k);
      ctx.scale(1, 0.9);
      ctx.strokeStyle = rgba(k < 0.2 ? C.white : C.amplify, (1 - k) * (1 - k) * 0.55);
      ctx.beginPath();
      ctx.arc(0, 0, R * (0.12 + k * 1.25), 0, TAU);
      ctx.stroke();
      ctx.restore();
    }

    // faint rays
    const rays = new Path2D();
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * TAU + t * 0.00002;
      const inner = R * 0.2;
      const outer = R * (0.9 + 0.25 * Math.sin(i * 1.7 + t * 0.0006));
      rays.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
      rays.lineTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = rgba(C.amplify, 0.045);
    ctx.stroke(rays);

    glow(cx, cy, R * 0.7, C.amplify, 0.12);
    drawCore(cx, cy, R, t);

    // front half of the lensing ring passes in front of the dot
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1, 0.34);
    ctx.strokeStyle = rgba(C.amplify, 0.5);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, R * 0.34, Math.PI * 0.05, Math.PI * 0.95);
    ctx.stroke();
    ctx.restore();
  };

  const painters: Record<Scene, (t: number) => void> = {
    system: drawSystem,
    think: drawThink,
    create: drawCreate,
    amplify: drawAmplify,
  };

  function draw(t: number) {
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.clearRect(0, 0, w, h);
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;
    drawStars(t);
    painters[scene](t);
  }

  // Slow ambient motion reads fine at 30fps: halve the work on phones and low-core devices
  const lowPower = window.innerWidth < 760 || (navigator.hardwareConcurrency || 8) <= 4;
  const frameInterval = lowPower ? 1000 / 30 : 0;
  let lastFrame = 0;

  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    if (now - lastFrame < frameInterval - 2) return;
    lastFrame = now;
    draw(now - start + 14000);
  };

  const play = () => {
    if (reduceMotion || raf || !visible || document.hidden) return;
    raf = requestAnimationFrame(loop);
  };

  const pause = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  resize();
  new ResizeObserver(() => {
    const rect = canvas.getBoundingClientRect();
    if (Math.round(rect.width) !== Math.round(w) || Math.round(rect.height) !== Math.round(h)) resize();
  }).observe(canvas);

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) play();
    else pause();
  }).observe(canvas);

  document.addEventListener("visibilitychange", () => (document.hidden ? pause() : play()));

  if (finePointer && !reduceMotion) {
    window.addEventListener(
      "pointermove",
      (e) => {
        pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
      },
      { passive: true },
    );
  }

  canvas.classList.add("is-live");
  play();
}
