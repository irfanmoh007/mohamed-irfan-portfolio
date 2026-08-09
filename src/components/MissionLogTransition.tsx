'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { drawEncryptedAsciiGrid } from '@/components/encryptedAscii';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// The encrypted character set and renderer live in encryptedAscii.ts.

export const MissionLogTransition: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanLine1Ref = useRef<HTMLDivElement>(null);
  const scanLine2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animFrame: number;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: true,
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;

        if (animFrame) cancelAnimationFrame(animFrame);
        animFrame = requestAnimationFrame(() => {
          if (ctx) {
            drawEncryptedAsciiGrid(ctx, canvas.width, canvas.height, p);
          }
        });

        if (scanLine1Ref.current) {
          const scanY = p * 120 - 10;
          scanLine1Ref.current.style.transform = `translateY(${scanY}vh)`;
          scanLine1Ref.current.style.opacity = (p > 0.02 && p < 0.95) ? '1' : '0';
        }
        if (scanLine2Ref.current) {
          const scanY2 = p * 100 + 10;
          scanLine2Ref.current.style.transform = `translateY(${scanY2}vh)`;
          scanLine2Ref.current.style.opacity = (p > 0.05 && p < 0.9) ? '0.6' : '0';
        }
      },
    });

    // Immediate continuation: start drawing ASCII animation as Projects leaves 40-50% of viewport
    const preTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      end: 'top top',
      scrub: true,
      onUpdate: (self) => {
        if (!trigger.isActive) {
          if (animFrame) cancelAnimationFrame(animFrame);
          animFrame = requestAnimationFrame(() => {
            if (ctx) {
              drawEncryptedAsciiGrid(ctx, canvas.width, canvas.height, self.progress * 0.15);
            }
          });
        }
      }
    });

    return () => {
      trigger.kill();
      preTrigger.kill();
      window.removeEventListener('resize', resize);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-20 bg-[#08090c]"
    >
      {/* 1. Global Continuous Vertical Guide Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-y-0 left-[5vw] w-[1px] bg-white/10" />
        <div className="absolute inset-y-0 right-[5vw] w-[1px] bg-white/10" />
      </div>



      {/* Full-viewport ASCII canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Primary Orange Scan Line */}
      <div
        ref={scanLine1Ref}
        className="absolute left-0 w-full h-[2px] z-20 pointer-events-none opacity-0 will-change-transform"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(223,88,56,0.5) 15%, rgba(223,88,56,0.95) 50%, rgba(223,88,56,0.5) 85%, transparent 100%)',
          boxShadow: '0 0 28px rgba(223,88,56,0.4), 0 0 90px rgba(223,88,56,0.15)',
        }}
      />

      {/* Secondary Offset Scan Line */}
      <div
        ref={scanLine2Ref}
        className="absolute left-0 w-full h-[1px] z-20 pointer-events-none opacity-0 will-change-transform"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(223,88,56,0.3) 25%, rgba(223,88,56,0.6) 50%, rgba(223,88,56,0.3) 75%, transparent 100%)',
        }}
      />

      {/* Terminal CRT Scanline Overlay */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />
    </div>
  );
};
