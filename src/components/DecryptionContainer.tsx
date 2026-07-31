'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

// Helper function to scramble text while preserving spaces and punctuation
const NOISE_CHARS = "01!@#$|%&()[]{}<>?^*-+";
const scrambleString = (str: string, mixRatio = 1.0) => {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === ' ' || char === '•' || char === '/' || char === '.' || char === ',' || char === '-') {
      result += char;
    } else {
      if (Math.random() < mixRatio) {
        result += Math.random() < 0.6 
          ? (Math.random() < 0.5 ? "0" : "1") 
          : NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)];
      } else {
        result += char;
      }
    }
  }
  return result;
};

export const DecryptionContainer: React.FC = () => {
  const [leftMixRatio, setLeftMixRatio] = useState(1.0);
  const [rightMixRatio, setRightMixRatio] = useState(0.0);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [statusText, setStatusText] = useState("DECRYPT ACCESS");
  const [bubbleText, setBubbleText] = useState("SOC ANALYST");

  const leftPathRef = useRef<SVGTextPathElement>(null);
  const rightPathRef = useRef<SVGTextPathElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const bioString = "HI, I AM MOHAMED IRFAN. SOC-FOCUSED SECURITY ENGINEER WHO BUILDS DETECTION TOOLING AS FAST AS HE BREAKS IN. TRYHACKME TOP 1% • SC-900 • CEH IN PROGRESS. • ";
  const repeatedBio = bioString.repeat(5);

  // 1. GSAP Marquee scrolling synchronization
  useEffect(() => {
    const leftTextPath = leftPathRef.current;
    const rightTextPath = rightPathRef.current;
    if (!leftTextPath || !rightTextPath) return;

    // Synchronized scroll timeline (moves right-to-left)
    const anim = gsap.fromTo([leftTextPath, rightTextPath],
      { attr: { startOffset: '0%' } },
      { attr: { startOffset: '-100%' }, duration: 32, ease: 'none', repeat: -1 }
    );

    return () => {
      anim.kill();
    };
  }, []);

  // 2. Continuous scramble tick interval (80ms)
  useEffect(() => {
    const tick = () => {
      if (leftPathRef.current) {
        leftPathRef.current.textContent = scrambleString(repeatedBio, leftMixRatio);
      }
      if (rightPathRef.current) {
        rightPathRef.current.textContent = scrambleString(repeatedBio, rightMixRatio);
      }
    };

    tick();
    tickIntervalRef.current = setInterval(tick, 80);

    return () => {
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
    };
  }, [leftMixRatio, rightMixRatio]);

  // 3. Decryption blast cycle
  const triggerDecryption = () => {
    if (isDecrypting) return;
    setIsDecrypting(true);
    setStatusText("DECRYPTING...");

    setRightMixRatio(1.0); // Scramble right side
    setLeftMixRatio(0.0);  // Decrypt left loop-de-loop

    const decryptDuration = 1200; // 1.2s to resolve right side
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

        // Keep decrypted loop readable for 3 seconds, then relock it
        setTimeout(() => {
          setStatusText("LOCKING PORT...");

          const lockDuration = 1200; // 1.2s to scramble back
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
    const pill = pillRef.current;
    if (!pill) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = pill.getBoundingClientRect();
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

    pill.addEventListener('mousemove', onMouseMove);
    pill.addEventListener('mouseleave', onMouseLeave);

    return () => {
      pill.removeEventListener('mousemove', onMouseMove);
      pill.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="decryption-path-container absolute bottom-[80px] left-0 w-full h-[220px] z-10 pointer-events-none md:block hidden">
      <svg viewBox="0 0 1440 220" className="decryption-svg w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Continuous path starting left (-150,200), looping clockwise, dipping center (720,150), exiting right (1640,80) */}
          <path id="full-path" d="M -150,200 C -50,180 50,160 100,140 C 130,130 180,110 180,80 C 180,40 130,30 90,50 C 50,70 50,130 100,160 C 130,175 220,150 350,130 C 480,110 580,150 720,150 C 950,150 1300,100 1640,80" fill="none" />
          
          <clipPath id="clip-left">
            <rect x="-200" y="0" width="920" height="220" />
          </clipPath>
          
          <clipPath id="clip-right">
            <rect x="720" y="0" width="920" height="220" />
          </clipPath>
        </defs>
        
        {/* Dark background contrast path under plain text */}
        <path d="M 710,150 C 950,150 1300,100 1640,80" fill="none" stroke="#06070a" strokeWidth="28" strokeLinecap="round" opacity="0.85" />
        
        {/* Left Scrambled Marquee */}
        <text className="marquee-text cipher-text font-display font-bold text-[14px] tracking-[0.05em] uppercase font-mono fill-none stroke-[rgba(228,222,215,0.16)] stroke-[1.2px] [stroke-dasharray:4_4]">
          <textPath ref={leftPathRef} href="#full-path" startOffset="0%" clipPath="url(#clip-left)" />
        </text>
        
        {/* Right Decrypted Marquee */}
        <text className="marquee-text plain-text font-display font-bold text-[14px] tracking-[0.05em] uppercase fill-[var(--color-text-primary)] [text-shadow:0_0_8px_rgba(228,222,215,0.4)]">
          <textPath ref={rightPathRef} href="#full-path" startOffset="0%" clipPath="url(#clip-right)" />
        </text>
      </svg>
      
      {/* Central Decryptor Capsule Pill */}
      <div 
        ref={pillRef}
        onClick={triggerDecryption}
        onMouseEnter={() => { if (!isDecrypting) triggerDecryption(); }}
        className="group decryptor-pill absolute left-1/2 top-[68%] -translate-x-1/2 -translate-y-1/2 w-[220px] h-[52px] bg-[rgba(8,9,12,0.7)] border border-[var(--color-accent-rust)] rounded-[26px] shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(223,88,56,0.15)] flex justify-between items-center px-[18px] pointer-events-auto cursor-pointer backdrop-blur-[16px] overflow-hidden transition-all duration-400 hover:border-[var(--color-text-primary)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.7),0_0_30px_rgba(228,222,215,0.2)]"
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
  );
};
