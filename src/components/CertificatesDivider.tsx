'use client';

import React, { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BASE_WORDS = [
  'DETECT',
  'DEFEND',
  'INVESTIGATE',
  'AUTOMATE',
  'THREAT HUNTING',
  'SOC ANALYST',
  'INCIDENT RESPONSE',
  'DFIR',
  'BLUE TEAM',
  'CLOUD SECURITY',
  'PYTHON AUTOMATION',
  'SIEM',
];

const CIPHER_CHARS = ['3', '7', '#', 'C', '7', '$', '0', 'X', '1', '!', '%', '&'];

function scrambleWord(word: string): string {
  const chars = word.split('');
  const numToScramble = Math.min(chars.length, Math.floor(Math.random() * 2) + 1);
  for (let i = 0; i < numToScramble; i++) {
    const idx = Math.floor(Math.random() * chars.length);
    if (chars[idx] !== ' ' && chars[idx] !== '/') {
      chars[idx] = CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
    }
  }
  return chars.join('');
}

export const CertificatesDivider: React.FC = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  
  const [words, setWords] = useState<string[]>(BASE_WORDS);
  const offsetRef = useRef(0);

  // Periodic subtle single-word decrypt effect
  useEffect(() => {
    const interval = setInterval(() => {
      const targetIdx = Math.floor(Math.random() * BASE_WORDS.length);
      const originalWord = BASE_WORDS[targetIdx];
      const scrambled = scrambleWord(originalWord);

      setWords(prev => {
        const next = [...prev];
        next[targetIdx] = scrambled;
        return next;
      });

      setTimeout(() => {
        setWords(prev => {
          const next = [...prev];
          next[targetIdx] = originalWord;
          return next;
        });
      }, 200);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const fullText = Array(3)
    .fill(null)
    .map(() => words.map(w => `${w}  //`).join('  '))
    .join('  ');

  // GSAP Ticker for smooth 60 FPS right-to-left textPath movement
  useEffect(() => {
    let animFrame: number;

    const tick = () => {
      offsetRef.current -= 0.045;
      if (offsetRef.current <= -100) {
        offsetRef.current = 0;
      }
      if (textPathRef.current) {
        textPathRef.current.setAttribute('startOffset', `${offsetRef.current}%`);
      }
      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, []);

  // Subtle vertical scroll parallax shift
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      if (svgPathRef.current) {
        gsap.to(svgPathRef.current, {
          y: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#08090c] overflow-hidden z-10 select-none pointer-events-none"
    >
      {/* Global Vertical Guide Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-y-0 left-[5vw] w-[1px] bg-white/10" />
        <div className="absolute inset-y-0 right-[5vw] w-[1px] bg-white/10" />
      </div>

      {/* Gentle Wave SVG Container — Height 130px */}
      <div className="relative w-full h-[130px] flex items-center justify-center z-10">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 1600 130"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="divider-wave-path"
              ref={svgPathRef}
              d="M -300,65 Q 100,30 500,65 T 1300,65 T 2100,65"
              fill="none"
            />
          </defs>

          <text
            className="fill-[#e4ded7] font-display font-bold uppercase text-[42px] sm:text-[48px] tracking-[0.14em] opacity-80"
            style={{
              letterSpacing: '0.14em',
              textShadow: '0 0 12px rgba(228,222,215,0.15)',
            }}
          >
            <textPath
              ref={textPathRef}
              href="#divider-wave-path"
              startOffset="0%"
            >
              {fullText}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Exact 40px padding below wave to create ~100px total gap before Certification section */}
      <div className="pb-10" />
    </div>
  );
});

CertificatesDivider.displayName = 'CertificatesDivider';
