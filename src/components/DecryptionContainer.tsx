'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

// Helper function to scramble text using Base64 character sets
const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const scrambleString = (str: string, mixRatio = 1.0) => {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === ' ' || char === '•') {
      result += char;
    } else {
      if (Math.random() < mixRatio) {
        if (Math.random() < 0.06 && i > 0 && result[result.length - 1] !== '=') {
          result += '=';
        } else {
          result += BASE64_CHARS[Math.floor(Math.random() * BASE64_CHARS.length)];
        }
      } else {
        result += char;
      }
    }
  }
  return result;
};

// Helper to render the bio string with "HI, I AM MOHAMED IRFAN" wrapped in a styled JSX tspan
const renderBioWithHighlight = (text: string) => {
  if (!text) return null;
  const target = "HI, I AM MOHAMED IRFAN";
  const parts = text.split(target);
  if (parts.length === 1) return <>{text}</>;
  
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <tspan className="fill-[var(--color-accent-rust)] [text-shadow:0_0_8px_rgba(223,88,56,0.5)] font-bold">
              {target}
            </tspan>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export const DecryptionContainer: React.FC = () => {
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [statusText, setStatusText] = useState("DECRYPT ACCESS");
  const [bubbleText, setBubbleText] = useState("SOC ANALYST");

  const [leftMixRatio, setLeftMixRatio] = useState(1.0);  // Scrambled left side
  const [rightMixRatio, setRightMixRatio] = useState(0.0); // Decrypted right side

  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');

  const leftPathRef = useRef<SVGTextPathElement>(null);
  const rightPathRef = useRef<SVGTextPathElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const pillWrapperRef = useRef<HTMLDivElement>(null);
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const bioString = "HI, I AM MOHAMED IRFAN. SOC-FOCUSED SECURITY ENGINEER WHO BUILDS DETECTION TOOLING AS FAST AS HE BREAKS IN. TRYHACKME TOP 1% • SC-900 • CEH IN PROGRESS. • ";
  const repeatedBio = bioString.repeat(5);

  // 1. GSAP Marquee scrolling synchronization (slower 48s for elegant legibility)
  useEffect(() => {
    const leftTextPath = leftPathRef.current;
    const rightTextPath = rightPathRef.current;
    if (!leftTextPath || !rightTextPath) return;

    const anim = gsap.fromTo([leftTextPath, rightTextPath],
      { attr: { startOffset: '0%' } },
      { attr: { startOffset: '-100%' }, duration: 48, ease: 'none', repeat: -1 }
    );

    return () => {
      anim.kill();
    };
  }, []);

  // 2. Continuous scramble tick interval (80ms)
  useEffect(() => {
    const tick = () => {
      setLeftText(scrambleString(repeatedBio, leftMixRatio));
      setRightText(scrambleString(repeatedBio, rightMixRatio));
    };

    tick();
    tickIntervalRef.current = setInterval(tick, 80);

    return () => {
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
    };
  }, [leftMixRatio, rightMixRatio, repeatedBio]);

  // 3. Decryption blast cycle
  const triggerDecryption = () => {
    if (isDecrypting) return;
    setIsDecrypting(true);
    setStatusText("DECRYPTING...");

    setRightMixRatio(1.0);
    setLeftMixRatio(0.0);

    const decryptDuration = 1200;
    const start = Date.now();

    const decryptInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / decryptDuration, 1);

      setRightMixRatio(1.0 - progress);

      if (progress >= 1) {
        clearInterval(decryptInterval);
        setRightMixRatio(0.0);
        setStatusText("ACCESS GRANTED");
        setBubbleText("UNLOCKED");

        setTimeout(() => {
          setStatusText("LOCKING PORT...");

          const lockDuration = 1200;
          const lockStart = Date.now();

          const lockInterval = setInterval(() => {
            const lockElapsed = Date.now() - lockStart;
            const lockProgress = Math.min(lockElapsed / lockDuration, 1);

            setLeftMixRatio(lockProgress);

            if (lockProgress >= 1) {
              clearInterval(lockInterval);
              setLeftMixRatio(1.0);
              setIsDecrypting(false);
              setStatusText("DECRYPT ACCESS");
              setBubbleText("SOC ANALYST");
            }
          }, 50);
        }, 3000);
      }
    }, 50);
  };

  // Magnetic capsule effect
  useEffect(() => {
    const wrapper = pillWrapperRef.current;
    const pill = pillRef.current;
    if (!wrapper || !pill) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const strength = 12;
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(pill, {
        x: x * (strength / 100),
        y: y * (strength / 100),
        duration: 0.6,
        ease: 'power2.out'
      });
    };

    const onMouseLeave = () => {
      gsap.to(pill, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.45)'
      });
    };

    wrapper.addEventListener('mousemove', onMouseMove);
    wrapper.addEventListener('mouseleave', onMouseLeave);

    return () => {
      wrapper.removeEventListener('mousemove', onMouseMove);
      wrapper.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="decryption-path-container absolute bottom-[80px] left-0 w-full h-[220px] z-10 pointer-events-none md:block hidden">
      <svg viewBox="0 0 1440 220" className="decryption-svg w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Meandering River Path (Subtle double-dip horizontal flow) */}
          <path id="full-path" d="M -150,130 C -50,130 150,145 250,145 C 350,145 400,120 480,120 C 560,120 640,143 720,143 C 800,143 880,120 960,120 C 1040,120 1120,145 1220,145 C 1320,145 1540,130 1640,130" fill="none" />
          
          <clipPath id="clip-left">
            <rect x="-200" y="0" width="920" height="220" />
          </clipPath>
          
          <clipPath id="clip-right">
            <rect x="720" y="0" width="920" height="220" />
          </clipPath>
        </defs>
        
        {/* Dark background contrast path */}
        <path d="M 710,143 C 800,143 880,120 960,120 C 1040,120 1120,145 1220,145 C 1320,145 1540,130 1640,130" fill="none" stroke="#06070a" strokeWidth="32" strokeLinecap="round" opacity="0.85" />
        
        {/* Left Scrambled Marquee */}
        <text className="marquee-text cipher-text font-display font-normal text-[15px] tracking-[0.08em] uppercase fill-[rgba(228,222,215,0.22)]">
          <textPath ref={leftPathRef} href="#full-path" startOffset="0%" clipPath="url(#clip-left)">
            {renderBioWithHighlight(leftText)}
          </textPath>
        </text>
        
        {/* Right Decrypted Marquee */}
        <text className="marquee-text plain-text font-display font-normal text-[15px] tracking-[0.08em] uppercase fill-[var(--color-text-primary)] [text-shadow:0_0_8px_rgba(228,222,215,0.4)]">
          <textPath ref={rightPathRef} href="#full-path" startOffset="0%" clipPath="url(#clip-right)">
            {renderBioWithHighlight(rightText)}
          </textPath>
        </text>
      </svg>
      
      {/* Central Decryptor Capsule Wrapper */}
      <div 
        ref={pillWrapperRef}
        className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-30"
      >
        <div 
          ref={pillRef}
          onClick={triggerDecryption}
          onMouseEnter={() => { if (!isDecrypting) triggerDecryption(); }}
          className="group decryptor-pill w-[220px] h-[52px] bg-[rgba(8,9,12,0.7)] border border-[var(--color-accent-rust)] rounded-[26px] shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(223,88,56,0.15)] flex justify-between items-center px-[18px] cursor-pointer backdrop-blur-[16px] overflow-hidden transition-all duration-400 hover:border-[var(--color-text-primary)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.7),0_0_30px_rgba(228,222,215,0.2)]"
        >
          <div className="pill-scanline absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[rgba(223,88,56,0.12)] to-transparent pointer-events-none animate-scanline" />
          
          {/* Animated Soundwave Equalizer */}
          <div className="pill-wave flex items-center gap-[3px] h-[20px]">
            <span className="bar w-[2px] h-full bg-[var(--color-accent-rust)] rounded-[1px] origin-bottom animate-bounce-bar-1"></span>
            <span className="bar w-[2px] h-full bg-[var(--color-accent-rust)] rounded-[1px] origin-bottom animate-bounce-bar-2"></span>
            <span className="bar w-[2px] h-full bg-[var(--color-accent-rust)] rounded-[1px] origin-bottom animate-bounce-bar-3"></span>
            <span className="bar w-[2px] h-full bg-[var(--color-accent-rust)] rounded-[1px] origin-bottom animate-bounce-bar-4"></span>
            <span className="bar w-[2px] h-full bg-[var(--color-accent-rust)] rounded-[1px] origin-bottom animate-bounce-bar-5"></span>
          </div>
          
          <div className="pill-label font-display font-bold text-[0.65rem] tracking-[0.12em] text-[var(--color-text-primary)] select-none">
            {statusText}
          </div>
          
          <div className="pill-lock-icon">
            <svg className="lock-svg w-[14px] h-[14px] text-[var(--color-accent-rust)] transition-all duration-400 group-hover:text-[var(--color-text-primary)] group-hover:rotate-[-12deg] group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          
          {/* Floating Bubble Tag */}
          <div className="pill-bubble absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 translate-y-[5px] bg-[var(--color-text-primary)] text-[var(--color-bg-dark)] px-[14px] py-[6px] rounded-[8px] font-display font-extrabold text-[0.55rem] tracking-[0.1em] whitespace-nowrap opacity-0 pointer-events-none transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.4)] group-hover:opacity-100 group-hover:translate-y-0 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-solid after:border-t-[var(--color-text-primary)] after:border-r-transparent after:border-b-transparent after:border-l-transparent">
            {bubbleText}
          </div>
        </div>
      </div>
    </div>
  );
};
