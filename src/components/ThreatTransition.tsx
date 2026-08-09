'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// MALWARE BUG SVG
// Single-color (#0d0d0d) vector threat icon:
//   • Ant pincers at front of head (inward curving)
//   • Solid visor head (no eyes, no antennae)
//   • Smooth oval armored beetle shield shell with shoulder wings
//   • 6 spider-posture legs (thick roots tapering to sharp jointed tips)
// ─────────────────────────────────────────────────────────────────────────────
const MalwareBug: React.FC = React.memo(() => (
  <svg
    viewBox="0 0 220 260"
    width="136"
    height="160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M 93,24 C 88,14 96,6 104,7 C 98,12 97,20 97,24 Z" fill="#0d0d0d"/>
    <path d="M 127,24 C 132,14 124,6 116,7 C 122,12 123,20 123,24 Z" fill="#0d0d0d"/>

    <path
      fill="#0d0d0d"
      d="M 90,22 C 90,18 130,18 130,22 L 134,36 L 124,54 L 96,54 L 86,36 Z"
    />

    <path d="M 90,52 L 130,52 L 134,64 L 86,64 Z" fill="#0d0d0d"/>

    <path
      d="M 110,60 C 132,60 152,62 166,74 C 176,84 174,106 172,134 C 168,172 144,206 110,214 C 76,206 52,172 48,134 C 46,106 44,84 54,74 C 68,62 88,60 110,60 Z"
      fill="#0d0d0d"
    />

    <path d="M 62,94 C 84,86 136,86 158,94" stroke="rgba(220,215,210,0.08)" strokeWidth="1.5" fill="none"/>
    <path d="M 58,132 C 82,124 138,124 162,132" stroke="rgba(220,215,210,0.07)" strokeWidth="1.5" fill="none"/>
    <path d="M 72,170 C 90,162 130,162 148,170" stroke="rgba(220,215,210,0.06)" strokeWidth="1.5" fill="none"/>
    <line x1="110" y1="60" x2="110" y2="214" stroke="rgba(220,215,210,0.06)" strokeWidth="1"/>

    <circle cx="110" cy="135" r="3.5" fill="rgba(220,215,210,0.09)"/>
    <line x1="110" y1="131.5" x2="110" y2="124" stroke="rgba(220,215,210,0.08)" strokeWidth="1.5"/>
    <line x1="110" y1="124" x2="124" y2="124" stroke="rgba(220,215,210,0.08)" strokeWidth="1.5"/>
    <circle cx="124" cy="124" r="2.5" fill="rgba(220,215,210,0.07)"/>
    <line x1="110" y1="124" x2="96" y2="124" stroke="rgba(220,215,210,0.07)" strokeWidth="1.5"/>
    <circle cx="96" cy="124" r="2.5" fill="rgba(220,215,210,0.06)"/>

    <line x1="60" y1="86" x2="26" y2="52" stroke="#0d0d0d" strokeWidth="11" strokeLinecap="round"/>
    <line x1="26" y1="52" x2="8" y2="76" stroke="#0d0d0d" strokeWidth="6.5" strokeLinecap="round"/>
    <line x1="8" y1="76" x2="2" y2="96" stroke="#0d0d0d" strokeWidth="3.5" strokeLinecap="round"/>

    <line x1="160" y1="86" x2="194" y2="52" stroke="#0d0d0d" strokeWidth="11" strokeLinecap="round"/>
    <line x1="194" y1="52" x2="212" y2="76" stroke="#0d0d0d" strokeWidth="6.5" strokeLinecap="round"/>
    <line x1="212" y1="76" x2="218" y2="96" stroke="#0d0d0d" strokeWidth="3.5" strokeLinecap="round"/>

    <line x1="52" y1="124" x2="18" y2="120" stroke="#0d0d0d" strokeWidth="11.5" strokeLinecap="round"/>
    <line x1="18" y1="120" x2="5" y2="148" stroke="#0d0d0d" strokeWidth="6.5" strokeLinecap="round"/>
    <line x1="5" y1="148" x2="1" y2="170" stroke="#0d0d0d" strokeWidth="3.5" strokeLinecap="round"/>

    <line x1="168" y1="124" x2="202" y2="120" stroke="#0d0d0d" strokeWidth="11.5" strokeLinecap="round"/>
    <line x1="202" y1="120" x2="215" y2="148" stroke="#0d0d0d" strokeWidth="6.5" strokeLinecap="round"/>
    <line x1="215" y1="148" x2="219" y2="170" stroke="#0d0d0d" strokeWidth="3.5" strokeLinecap="round"/>

    <line x1="64" y1="158" x2="28" y2="178" stroke="#0d0d0d" strokeWidth="11" strokeLinecap="round"/>
    <line x1="28" y1="178" x2="16" y2="208" stroke="#0d0d0d" strokeWidth="6.5" strokeLinecap="round"/>
    <line x1="16" y1="208" x2="10" y2="230" stroke="#0d0d0d" strokeWidth="3.5" strokeLinecap="round"/>

    <line x1="156" y1="158" x2="192" y2="178" stroke="#0d0d0d" strokeWidth="11" strokeLinecap="round"/>
    <line x1="192" y1="178" x2="204" y2="208" stroke="#0d0d0d" strokeWidth="6.5" strokeLinecap="round"/>
    <line x1="204" y1="208" x2="210" y2="230" stroke="#0d0d0d" strokeWidth="3.5" strokeLinecap="round"/>
  </svg>
));
MalwareBug.displayName = 'MalwareBug';

const OrganicInkBlob: React.FC<{ pathD: string; opacity?: number }> = React.memo(({ pathD, opacity = 1 }) => (
  <svg
    viewBox="0 0 400 400"
    width="100%"
    height="100%"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
    <path d={pathD} fill="#090909" />
  </svg>
));
OrganicInkBlob.displayName = 'OrganicInkBlob';

const BLOB_PATHS = [
  'M 200,18 C 315,25 385,95 375,200 C 365,312 292,382 200,372 C 88,362 18,292 28,200 C 38,88 98,12 200,18 Z',
  'M 200,22 C 300,12 378,88 382,195 C 386,302 308,384 200,378 C 92,372 14,295 18,198 C 22,101 100,32 200,22 Z',
  'M 200,14 C 322,30 380,110 368,205 C 356,300 285,386 200,368 C 115,350 25,280 32,190 C 39,100 78,0 200,14 Z',
  'M 200,25 C 290,18 375,78 385,185 C 395,292 315,375 200,385 C 85,395 12,315 15,200 C 18,85 110,32 200,25 Z',
  'M 200,16 C 308,32 388,102 372,208 C 356,314 298,372 200,378 C 102,384 22,308 28,198 C 34,88 92,0 200,16 Z',
  'M 200,20 C 318,18 372,98 380,202 C 388,306 295,380 200,370 C 105,360 20,288 24,192 C 28,96 82,22 200,20 Z',
  'M 200,12 C 295,28 382,92 376,196 C 370,300 302,388 200,380 C 98,372 18,298 22,192 C 26,86 105,0 200,12 Z',
  'M 200,24 C 310,14 384,104 374,204 C 364,304 288,376 200,382 C 112,388 16,304 26,196 C 36,88 90,34 200,24 Z',
];

// ─────────────────────────────────────────────────────────────────────────────
// WEDGE SWARM CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────
interface SwarmUnit {
  id: number;
  x: number;
  startY: number;
  targetY: number;
  scale: number;
  blur: number;
  opacity: number;
  delay: number;
  xDrift: number[];
  sliceDir: number;
}

const SWARM_UNITS: SwarmUnit[] = [
  { id: 1, x: -580, startY: 660, targetY: 280, scale: 0.42, blur: 4.2, opacity: 0.55, delay: 0.35, xDrift: [-12, 10, -6, 0], sliceDir:  1 },
  { id: 2, x: -360, startY: 600, targetY: 190, scale: 0.54, blur: 2.5, opacity: 0.70, delay: 0.15, xDrift: [14, -10, 8, 0],  sliceDir: -1 },
  { id: 3, x: -180, startY: 720, targetY: 360, scale: 0.44, blur: 3.8, opacity: 0.62, delay: 0.50, xDrift: [-8, 12, -5, 0],  sliceDir:  1 },
  { id: 4, x:  180, startY: 700, targetY: 340, scale: 0.48, blur: 3.2, opacity: 0.65, delay: 0.40, xDrift: [10, -14, 6, 0],  sliceDir: -1 },
  { id: 5, x:  360, startY: 580, targetY: 180, scale: 0.56, blur: 2.0, opacity: 0.74, delay: 0.10, xDrift: [-16, 8, -10, 0], sliceDir:  1 },
  { id: 6, x:  580, startY: 670, targetY: 290, scale: 0.40, blur: 4.8, opacity: 0.52, delay: 0.45, xDrift: [12, -8, 5, 0],   sliceDir: -1 },
  { id: 7, x:    0, startY: 780, targetY: 440, scale: 0.46, blur: 3.6, opacity: 0.58, delay: 0.60, xDrift: [-7, 9, -4, 0],   sliceDir:  1 },
];

const DEBRIS_PARTICLES = [
  { x: -28, y: -18, dx: -45, dy: -35, rot: -24 },
  { x: -14, y: -8,  dx: -28, dy: -22, rot:  18 },
  { x:  12, y: -15, dx:  32, dy: -38, rot: -30 },
  { x:  24, y: -5,  dx:  48, dy: -20, rot:  25 },
  { x: -22, y:  8,  dx: -38, dy:  26, rot:  15 },
  { x:  -8, y:  14, dx: -18, dy:  34, rot: -20 },
  { x:  16, y:  10, dx:  30, dy:  28, rot:  32 },
  { x:  30, y:  18, dx:  42, dy:  36, rot: -16 },
];

// ─────────────────────────────────────────────────────────────────────────────
// THREAT TRANSITION
// 9-Step Enterprise Cybersecurity Security Pipeline → Liquid Ink Transformation
// ─────────────────────────────────────────────────────────────────────────────
export const ThreatTransition: React.FC = () => {
  const outerRef  = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  // Background gradient steps
  const bgGrayRef  = useRef<HTMLDivElement>(null);
  const bgCharRef  = useRef<HTMLDivElement>(null);
  const bgBlackRef = useRef<HTMLDivElement>(null);

  // Camera container
  const cameraRef = useRef<HTMLDivElement>(null);

  // Main Lead Alpha Bug
  const mainBugWrapRef = useRef<HTMLDivElement>(null);
  const mainBugTopRef  = useRef<HTMLDivElement>(null);
  const mainBugBotRef  = useRef<HTMLDivElement>(null);

  // Swarm Bugs refs
  const swarmWrapRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const swarmTopRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const swarmBotRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const swarmBracketsRefs = useRef<(SVGSVGElement | null)[]>([]);

  // Detection UI Refs (9 Precise Enterprise Steps)
  const prePulseRef     = useRef<HTMLDivElement>(null);     // Step 1: Pre-detection pulse
  const bracketsTLRef   = useRef<SVGPolylineElement>(null); // Step 2: Mechanical assembling brackets
  const bracketsTRRef   = useRef<SVGPolylineElement>(null);
  const bracketsBLRef   = useRef<SVGPolylineElement>(null);
  const bracketsBRRef   = useRef<SVGPolylineElement>(null);
  const bracketsWrapRef = useRef<SVGSVGElement>(null);
  const targetGridRef   = useRef<HTMLDivElement>(null);     // Step 3: Subtle targeting grid
  const scanRef         = useRef<HTMLDivElement>(null);     // Step 4: Optical scan sweep
  const impactFlashRef  = useRef<HTMLDivElement>(null);     // Step 5: Threat confirmation flash
  const slashLineRef    = useRef<SVGLineElement>(null);     // Step 6: Razor-sharp laser slash line
  const slashWrapRef    = useRef<SVGSVGElement>(null);
  const debrisRefs      = useRef<(HTMLDivElement | null)[]>([]); // Step 8: Micro black debris particles
  const socTextRef      = useRef<HTMLDivElement>(null);

  // Bug-Originated Ink Infection Sources (8 Threat Origin Points)
  const inkAlphaRef = useRef<HTMLDivElement>(null);
  const inkSwarmRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Initial setup (GPU transform-only) ──────────────────────────────
      gsap.set(mainBugWrapRef.current, { y: 420, x: 0, rotation: 0, opacity: 0, force3D: true });
      gsap.set(mainBugTopRef.current,  { y: 0, rotation: 0, force3D: true });
      gsap.set(mainBugBotRef.current,  { y: 0, rotation: 0, force3D: true });

      // Swarm Bugs initial setup
      SWARM_UNITS.forEach((unit, i) => {
        const wrap     = swarmWrapRefs.current[i];
        const top      = swarmTopRefs.current[i];
        const bot      = swarmBotRefs.current[i];
        const brackets = swarmBracketsRefs.current[i];
        if (wrap)     gsap.set(wrap,     { y: unit.startY, x: 0, rotation: 0, opacity: 0, force3D: true });
        if (top)      gsap.set(top,      { y: 0, rotation: 0, force3D: true });
        if (bot)      gsap.set(bot,      { y: 0, rotation: 0, force3D: true });
        if (brackets) gsap.set(brackets, { opacity: 0 });
      });

      // Initialize 8 Bug Ink Infection Sources to scale 0
      gsap.set([inkAlphaRef.current, ...inkSwarmRefs.current], { scale: 0, force3D: true });

      // Detection UI initial states
      gsap.set(prePulseRef.current,     { scale: 0.5, opacity: 0, force3D: true });
      gsap.set(bracketsWrapRef.current, { opacity: 0 });
      gsap.set(bracketsTLRef.current,   { x: -18, y: -18 });
      gsap.set(bracketsTRRef.current,   { x:  18, y: -18 });
      gsap.set(bracketsBLRef.current,   { x: -18, y:  18 });
      gsap.set(bracketsBRRef.current,   { x:  18, y:  18 });
      gsap.set(targetGridRef.current,   { opacity: 0 });
      gsap.set(scanRef.current,         { x: -1600, opacity: 0, force3D: true });
      gsap.set(impactFlashRef.current,  { scale: 0.8, opacity: 0, force3D: true });
      gsap.set(slashWrapRef.current,    { opacity: 0 });
      gsap.set(socTextRef.current,      { opacity: 0 });
      debrisRefs.current.forEach((d) => d && gsap.set(d, { opacity: 0, x: 0, y: 0, rotation: 0, force3D: true }));

      gsap.set([bgGrayRef.current, bgCharRef.current, bgBlackRef.current], { opacity: 0 });

      // ── Master timeline (scroll-scrubbed) ────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          pin:     pinnedRef.current,
          start:   'top top',
          end:     '+=1250',
          scrub:   0.4,
        }
      });

      // ══════════════════════════════════════════════════════════════════════
      // STAGE 1 — Swarm Infestation (0 → 5.1)
      // Alpha bug leads; 7 wide-spread swarm bugs crawl upward in loose formation.
      // ══════════════════════════════════════════════════════════════════════

      // 1A. Alpha Lead Bug Crawl — continuous, relentless, authoritative march
      tl.to(mainBugWrapRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out', force3D: true }, 0);
      tl.to(mainBugWrapRef.current, { y: 0, duration: 5.1, ease: 'power1.out', force3D: true }, 0);

      tl.to(mainBugWrapRef.current, { x:  12, duration: 1.4, ease: 'power1.inOut', force3D: true }, 0.4);
      tl.to(mainBugWrapRef.current, { x:  -9, duration: 1.6, ease: 'power1.inOut', force3D: true }, 1.6);
      tl.to(mainBugWrapRef.current, { x:   6, duration: 1.2, ease: 'power1.inOut', force3D: true }, 3.1);
      tl.to(mainBugWrapRef.current, { x:   0, duration: 0.9, ease: 'power2.inOut', force3D: true }, 4.3);

      // 1B. Swarm Bugs Crawl (slow, heavy, deliberate crawl behind Alpha)
      SWARM_UNITS.forEach((unit, i) => {
        const wrap = swarmWrapRefs.current[i];
        if (!wrap) return;

        const startTime = unit.delay;
        const totalDuration = 4.8 - startTime;

        tl.to(wrap, { opacity: unit.opacity, duration: 0.6, ease: 'power2.out', force3D: true }, startTime);
        tl.to(wrap, { y: unit.targetY, duration: totalDuration, ease: 'power1.out', force3D: true }, startTime);

        const step = totalDuration / unit.xDrift.length;
        unit.xDrift.forEach((dx, sIndex) => {
          tl.to(wrap, {
            x: dx,
            rotation: dx * 0.25,
            duration: step,
            ease: 'power1.inOut',
            force3D: true
          }, startTime + sIndex * step);
        });
      });

      // ══════════════════════════════════════════════════════════════════════
      // STAGE 2 — 9-Step Enterprise Detection & Neutralization Pipeline (5.1 → 8.8)
      // ══════════════════════════════════════════════════════════════════════

      // ── STEP 1: Pre-Detection Pulse (5.1s → 5.3s) ──
      tl.fromTo(prePulseRef.current,
        { scale: 0.4, opacity: 0 },
        { scale: 1.4, opacity: 0.75, duration: 0.25, ease: 'power2.out', force3D: true },
        5.1
      );
      tl.to(prePulseRef.current, { scale: 1.8, opacity: 0, duration: 0.2, ease: 'power2.in', force3D: true }, 5.35);

      // ── STEP 2: Brackets Rapid Mechanical Assembly (5.35s → 5.85s) ──
      tl.to(bracketsWrapRef.current, { opacity: 1, duration: 0.2, ease: 'power2.out' }, 5.35);
      tl.to(bracketsTLRef.current, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' }, 5.35);
      tl.to(bracketsTRRef.current, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' }, 5.35);
      tl.to(bracketsBLRef.current, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' }, 5.35);
      tl.to(bracketsBRRef.current, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' }, 5.35);

      SWARM_UNITS.forEach((_, i) => {
        const brackets = swarmBracketsRefs.current[i];
        if (brackets) {
          tl.to(brackets, { opacity: 0.85, duration: 0.35, ease: 'power2.out' }, 5.4);
          tl.fromTo(`.swarmbracket-${i}`,
            { strokeDashoffset: 46, strokeDasharray: 46 },
            { strokeDashoffset: 0, duration: 0.7, ease: 'power3.out' },
            5.4
          );
        }
      });

      tl.to(cameraRef.current, { scale: 1.03, duration: 0.8, ease: 'power2.inOut', force3D: true }, 5.6);

      // ── STEP 3: Targeting Grid Fade-In (5.5s → 7.6s) ──
      tl.to(targetGridRef.current, { opacity: 0.09, duration: 0.4, ease: 'power2.out' }, 5.5);

      tl.to(socTextRef.current, { opacity: 1, duration: 0.22, ease: 'power2.out' }, 5.9);
      tl.to(socTextRef.current, { opacity: 0, duration: 0.28, ease: 'power2.in' }, 6.5);

      // ── STEP 4: Optical Scan Line Sweep (6.4s → 7.1s) ──
      tl.to(scanRef.current, { x: 0,    opacity: 1, duration: 0.0, force3D: true }, 6.4);
      tl.to(scanRef.current, { x: 1600, opacity: 1, duration: 0.75, ease: 'power4.out', force3D: true }, 6.4);
      tl.to(scanRef.current, { opacity: 0, duration: 0.15, force3D: true }, 7.15);

      tl.to({}, { duration: 0.45 }, 7.15);
      tl.to(cameraRef.current, { scale: 1, duration: 0.25, ease: 'power4.out', force3D: true }, 7.4);

      // ── STEP 5: Threat Confirmation Impact Flash (7.6s → 7.8s) ──
      tl.to(impactFlashRef.current, { scale: 1.15, opacity: 0.75, duration: 0.15, ease: 'power3.out', force3D: true }, 7.6);
      tl.to(impactFlashRef.current, { scale: 1.35, opacity: 0,    duration: 0.15, ease: 'power2.in',  force3D: true }, 7.75);

      // ── STEP 6: Razor-Sharp Laser Slash Line (7.85s → 8.1s) ──
      tl.to(slashWrapRef.current, { opacity: 1, duration: 0.05 }, 7.85);
      tl.fromTo(slashLineRef.current,
        { strokeDashoffset: 320, strokeDasharray: 320 },
        { strokeDashoffset: 0, duration: 0.2, ease: 'power4.out' },
        7.85
      );
      tl.to(slashWrapRef.current, { opacity: 0, duration: 0.1, ease: 'power2.in' }, 8.05);

      tl.to(targetGridRef.current, { opacity: 0, duration: 0.2 }, 8.05);

      // ── STEP 7 & 8: Inertial Split & Micro Debris Particles (8.1s → 8.8s) ──
      tl.to(mainBugTopRef.current, {
        y: -68, rotation: 2, opacity: 0,
        duration: 0.65, ease: 'power4.out', force3D: true,
        transformOrigin: 'center bottom',
      }, 8.1);
      tl.to(mainBugBotRef.current, {
        y: 68, rotation: -2, opacity: 0,
        duration: 0.65, ease: 'power4.out', force3D: true,
        transformOrigin: 'center top',
      }, 8.1);
      tl.to(bracketsWrapRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' }, 8.1);

      DEBRIS_PARTICLES.forEach((p, index) => {
        const particleEl = debrisRefs.current[index];
        if (particleEl) {
          tl.fromTo(particleEl,
            { x: p.x, y: p.y, opacity: 0.8, rotation: 0 },
            { x: p.x + p.dx, y: p.y + p.dy, opacity: 0, rotation: p.rot, duration: 0.5, ease: 'power3.out', force3D: true },
            8.12
          );
        }
      });

      SWARM_UNITS.forEach((unit, i) => {
        const top      = swarmTopRefs.current[i];
        const bot      = swarmBotRefs.current[i];
        const brackets = swarmBracketsRefs.current[i];
        if (!top || !bot) return;

        const elimOffset = 8.1 + (i % 4) * 0.035;

        if (brackets) {
          tl.to(brackets, { opacity: 0, duration: 0.2, ease: 'power2.in' }, elimOffset);
        }

        tl.to(top, {
          y: -42 * unit.scale * 1.8,
          rotation: 4 * unit.sliceDir,
          opacity: 0,
          duration: 0.55,
          ease: 'power4.out',
          force3D: true,
          transformOrigin: 'center bottom',
        }, elimOffset);

        tl.to(bot, {
          y: 42 * unit.scale * 1.8,
          rotation: -4 * unit.sliceDir,
          opacity: 0,
          duration: 0.55,
          ease: 'power4.out',
          force3D: true,
          transformOrigin: 'center top',
        }, elimOffset);
      });

      // ══════════════════════════════════════════════════════════════════════
      // STAGE 5 — STEP 9: Vector Ink Takeover & Seamless Release (8.8 → 12.5)
      // Smooth vector expansion completing at 12.3s + 200ms beat hold
      // ══════════════════════════════════════════════════════════════════════

      tl.to(bgGrayRef.current,  { opacity: 1, duration: 1.2, ease: 'power1.out' }, 8.8);
      tl.to(bgCharRef.current,  { opacity: 1, duration: 1.5, ease: 'power1.out' }, 9.6);
      tl.to(bgBlackRef.current, { opacity: 1, duration: 1.8, ease: 'power1.out' }, 10.5);

      // Alpha Primary Vector Ink Source
      tl.to(inkAlphaRef.current, {
        scale: 1, rotation: 3, duration: 3.5, ease: 'power1.out', force3D: true
      }, 8.8);

      // Swarm Secondary Vector Ink Sources
      SWARM_UNITS.forEach((unit, i) => {
        const inkEl = inkSwarmRefs.current[i];
        if (!inkEl) return;
        const chainDelay = 8.82 + (i * 0.04);
        tl.to(inkEl, {
          scale: 1,
          rotation: (i % 2 === 0 ? 3 : -3),
          duration: 3.2 + (i % 3) * 0.2,
          ease: 'power1.out',
          force3D: true
        }, chainDelay);
      });

      // 200ms visual beat hold on black before unpinning
      tl.to({}, { duration: 0.25 }, 12.3);

    }, outerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={outerRef} className="relative">
      <div
        ref={pinnedRef}
        className="w-full h-screen relative overflow-hidden"
        style={{ backgroundColor: '#ECE8E2' }}
      >

        {/* ── BACKGROUND LAYERS ── */}
        <div className="absolute inset-0" style={{ backgroundColor: '#ECE8E2', zIndex: 0 }}/>
        <div ref={bgGrayRef}  className="absolute inset-0" style={{ backgroundColor: '#C4BDB6', zIndex: 1, opacity: 0 }}/>
        <div ref={bgCharRef}  className="absolute inset-0" style={{ backgroundColor: '#252220', zIndex: 2, opacity: 0 }}/>
        <div ref={bgBlackRef} className="absolute inset-0" style={{ backgroundColor: '#090909', zIndex: 3, opacity: 0 }}/>

        {/* ── CRISP HIGH-DEFINITION VECTOR INK SOURCES (8 Threat Origin Points) ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 20 }}>
          {/* Alpha Bug Primary Vector Ink Source (Originates at Center 0,0) */}
          <div
            ref={inkAlphaRef}
            className="absolute pointer-events-none"
            style={{
              width: '240vw',
              height: '240vw',
              left: 'calc(50% - 120vw)',
              top: 'calc(50% - 120vw)',
              willChange: 'transform',
              transformOrigin: 'center center',
            }}
          >
            <OrganicInkBlob pathD={BLOB_PATHS[0]} />
          </div>

          {/* 7 Swarm Bug Secondary Vector Ink Sources (Originate exactly at each bug's x & targetY) */}
          {SWARM_UNITS.map((unit, index) => (
            <div
              key={`ink-${unit.id}`}
              ref={(el) => { if (el) inkSwarmRefs.current[index] = el; }}
              className="absolute pointer-events-none"
              style={{
                width: '180vw',
                height: '180vw',
                left: `calc(50% + ${unit.x}px - 90vw)`,
                top: `calc(50% + ${unit.targetY}px - 90vw)`,
                willChange: 'transform',
                transformOrigin: 'center center',
              }}
            >
              <OrganicInkBlob pathD={BLOB_PATHS[(index + 1) % BLOB_PATHS.length]} />
            </div>
          ))}
        </div>

        {/* ── CAMERA CONTAINER ── */}
        <div
          ref={cameraRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 10, willChange: 'transform' }}
        >

          {/* ── WIDE-SPREAD BACKGROUND SWARM BUGS (7 units) ── */}
          {SWARM_UNITS.map((unit, index) => (
            <div
              key={unit.id}
              ref={(el) => { if (el) swarmWrapRefs.current[index] = el; }}
              className="absolute pointer-events-none flex items-center justify-center"
              style={{
                width: 136,
                height: 160,
                left: `calc(50% + ${unit.x}px - 68px)`,
                top: `calc(50% - 80px)`,
                filter: `blur(${unit.blur}px)`,
                opacity: unit.opacity,
                willChange: 'transform, opacity',
                zIndex: 4,
              }}
            >
              {/* Swarm Bug Individual Targeting Brackets */}
              <svg
                ref={(el) => { if (el) swarmBracketsRefs.current[index] = el; }}
                className="absolute pointer-events-none"
                width="100%" height="100%"
                viewBox="0 0 260 260"
                fill="none"
                style={{
                  inset: '-30px',
                  transform: `scale(${unit.scale * 1.1})`,
                  opacity: 0,
                  zIndex: 8,
                }}
              >
                <polyline className={`swarmbracket-${index}`} points="20,60 20,20 60,20"
                  stroke="#df5838" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline className={`swarmbracket-${index}`} points="200,20 240,20 240,60"
                  stroke="#df5838" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline className={`swarmbracket-${index}`} points="20,200 20,240 60,240"
                  stroke="#df5838" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline className={`swarmbracket-${index}`} points="200,240 240,240 240,200"
                  stroke="#df5838" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {/* Top half */}
              <div
                ref={(el) => { if (el) swarmTopRefs.current[index] = el; }}
                className="absolute top-0 left-0"
                style={{
                  clipPath: 'inset(0 0 54% 0)',
                  width: 136, height: 160,
                  transform: `scale(${unit.scale})`,
                  transformOrigin: 'center center',
                  willChange: 'transform, opacity',
                }}
              >
                <MalwareBug />
              </div>

              {/* Bottom half */}
              <div
                ref={(el) => { if (el) swarmBotRefs.current[index] = el; }}
                className="absolute top-0 left-0"
                style={{
                  clipPath: 'inset(46% 0 0 0)',
                  width: 136, height: 160,
                  transform: `scale(${unit.scale})`,
                  transformOrigin: 'center center',
                  willChange: 'transform, opacity',
                }}
              >
                <MalwareBug />
              </div>
            </div>
          ))}

          {/* ── ALPHA LEAD BUG WRAPPER ── */}
          <div
            ref={mainBugWrapRef}
            className="relative flex items-center justify-center"
            style={{ width: 136, height: 160, zIndex: 10, willChange: 'transform' }}
          >

            {/* STEP 1: Pre-Detection Pulse Ring */}
            <div
              ref={prePulseRef}
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: '-20px',
                border: '1.5px solid rgba(223,88,56,0.7)',
                willChange: 'transform, opacity',
                zIndex: 11,
              }}
            />

            {/* STEP 3: Thin Targeting Grid (5-10% opacity) */}
            <div
              ref={targetGridRef}
              className="absolute pointer-events-none border border-[#df5838]"
              style={{
                inset: '-80px',
                opacity: 0,
                zIndex: 12,
                backgroundImage: [
                  'linear-gradient(to right, rgba(223,88,56,0.3) 1px, transparent 1px)',
                  'linear-gradient(to bottom, rgba(223,88,56,0.3) 1px, transparent 1px)',
                ].join(','),
                backgroundSize: '24px 24px',
              }}
            />

            {/* STEP 2: Mechanical Assembling Brackets Overlay */}
            <svg
              ref={bracketsWrapRef}
              className="absolute pointer-events-none"
              width="100%" height="100%"
              viewBox="0 0 260 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ inset: '-60px', zIndex: 15 }}
            >
              <polyline ref={bracketsTLRef} points="14,58 14,14 58,14"
                stroke="#df5838" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline ref={bracketsTRRef} points="202,14 246,14 246,58"
                stroke="#df5838" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline ref={bracketsBLRef} points="14,202 14,244 58,244"
                stroke="#df5838" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline ref={bracketsBRRef} points="202,244 246,244 246,202"
                stroke="#df5838" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>

              <line x1="130" y1="6"   x2="130" y2="20"  stroke="#df5838" strokeWidth="1" opacity="0.32"/>
              <line x1="130" y1="240" x2="130" y2="254" stroke="#df5838" strokeWidth="1" opacity="0.32"/>
              <line x1="6"   y1="130" x2="20"  y2="130" stroke="#df5838" strokeWidth="1" opacity="0.32"/>
              <line x1="240" y1="130" x2="254" y2="130" stroke="#df5838" strokeWidth="1" opacity="0.32"/>
            </svg>

            {/* STEP 5: Threat Confirmation Impact Flash */}
            <div
              ref={impactFlashRef}
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: '-10px',
                backgroundColor: 'rgba(223,88,56,0.35)',
                boxShadow: '0 0 25px rgba(223,88,56,0.6)',
                willChange: 'transform, opacity',
                zIndex: 16,
              }}
            />

            {/* STEP 6: Razor-Sharp Laser Slash Line */}
            <svg
              ref={slashWrapRef}
              className="absolute pointer-events-none"
              width="320" height="320"
              viewBox="0 0 320 320"
              fill="none"
              style={{ inset: '-80px', zIndex: 18, opacity: 0 }}
            >
              <line
                ref={slashLineRef}
                x1="10" y1="290" x2="310" y2="30"
                stroke="#df5838"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            {/* STEP 8: Micro Black Debris Fragments */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 17 }}>
              {DEBRIS_PARTICLES.map((_, index) => (
                <div
                  key={`debris-${index}`}
                  ref={(el) => { if (el) debrisRefs.current[index] = el; }}
                  className="absolute bg-[#0d0d0d] rounded-sm"
                  style={{
                    width: index % 2 === 0 ? '4px' : '3px',
                    height: index % 2 === 0 ? '4px' : '3px',
                    top: '50%',
                    left: '50%',
                    willChange: 'transform, opacity',
                  }}
                />
              ))}
            </div>

            {/* SOC UI Text */}
            <div
              ref={socTextRef}
              className="absolute pointer-events-none select-none"
              style={{
                right: '-165px',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: 0,
                zIndex: 19,
              }}
            >
              <div
                className="font-mono uppercase leading-[1.9]"
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.16em',
                  color: 'rgba(223,88,56,0.6)',
                }}
              >
                <div>GLOBAL THREAT LOCK</div>
                <div>INFESTATION: <span style={{ color: 'rgba(223,88,56,0.9)' }}>DETECTED</span></div>
                <div>CONTAINING SWARM</div>
              </div>
            </div>

            {/* STEP 7: Alpha Lead Bug Top & Bottom Halves (Inertial Split) */}
            <div
              ref={mainBugTopRef}
              className="absolute top-0 left-0"
              style={{
                clipPath: 'inset(0 0 54% 0)',
                width: 136, height: 160,
                willChange: 'transform',
                zIndex: 10,
              }}
            >
              <MalwareBug />
            </div>

            <div
              ref={mainBugBotRef}
              className="absolute top-0 left-0"
              style={{
                clipPath: 'inset(46% 0 0 0)',
                width: 136, height: 160,
                willChange: 'transform',
                zIndex: 10,
              }}
            >
              <MalwareBug />
            </div>
          </div>
        </div>

        {/* STEP 4: Optical Scan Sweep */}
        <div
          ref={scanRef}
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            width: '120px',
            left: 'calc(50% - 60px)',
            zIndex: 15,
            willChange: 'transform, opacity',
            background: [
              'repeating-linear-gradient(',
              '43deg,',
              'rgba(223,88,56,0.14) 0px,',
              'rgba(223,88,56,0.14) 3px,',
              'transparent 3px,',
              'transparent 10px)',
            ].join(''),
          }}
        />

      </div>
    </div>
  );
};
