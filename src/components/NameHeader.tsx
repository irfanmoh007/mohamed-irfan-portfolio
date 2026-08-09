'use client';
import React, { useEffect, useState, useRef, memo } from 'react';
const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\",./<>?";
interface AsciiLetterProps {
  char: string;
  index: number;
  triggerReveal?: boolean;
}
const AsciiLetter: React.FC<AsciiLetterProps> = memo(({ char, index, triggerReveal = true }) => {
  const [matrix, setMatrix] = useState<{ r: number; c: number; alpha: number }[]>([]);
  const [gridChars, setGridChars] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const revealTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cols = 20;
  const rows = 20;
  // 1. Initial stagger decryption reveal on mount / preloader finish
  useEffect(() => {
    if (!triggerReveal) {
      setDisplayText(CHARS[Math.floor(Math.random() * CHARS.length)]);
      return;
    }
    const delay = index * 50;
    revealTimeoutRef.current = setTimeout(() => {
      let ticks = 0;
      const flashInterval = setInterval(() => {
        setDisplayText(CHARS[Math.floor(Math.random() * CHARS.length)]);
        ticks++;
        if (ticks > 4) {
          clearInterval(flashInterval);
          setDisplayText(char);
          setIsRevealed(true);
        }
      }, 35);
    }, delay);
    return () => {
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    };
  }, [char, index, triggerReveal]);
  // 2. High-precision canvas font pixel sampling
  useEffect(() => {
    const sampleCanvas = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const canvasSize = 256;
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.font = `${canvasSize * 0.9}px sans-serif`;
      ctx.fillText(char, canvas.width / 2, canvas.height / 2);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      const sampledCells: { r: number; c: number; alpha: number }[] = [];
      const initialChars: string[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = Math.floor((c + 0.5) * (canvas.width / cols));
          const py = Math.floor((r + 0.5) * (canvas.height / rows));
          const idx = (py * canvas.width + px) * 4;
          const alpha = data[idx + 3];
          const cellIdx = r * cols + c;
          const isNoise = (cellIdx * 13) % 100 < 3;
          if (alpha > 20 || isNoise) {
            sampledCells.push({ r, c, alpha: alpha > 20 ? alpha : 0 });
            initialChars.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
          }
        }
      }
      setMatrix(sampledCells);
      setGridChars(initialChars);
    };

    let fontTimeout: ReturnType<typeof setTimeout> | null = null;
    if (typeof window !== 'undefined') {
      if (document.fonts) {
        document.fonts.ready.then(sampleCanvas).catch(sampleCanvas);
      } else {
        fontTimeout = setTimeout(sampleCanvas, 150);
      }
    }
    return () => {
      if (fontTimeout) clearTimeout(fontTimeout);
    };
  }, [char]);
  // 3. Precise terminal decryption hover shuffle on isolated letter
  useEffect(() => {
    if (isHovered && matrix.length > 0) {
      const activeIndices: number[] = [];
      matrix.forEach((cell, idx) => {
        if (cell.alpha > 20) activeIndices.push(idx);
      });
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setGridChars(prev => {
          const next = [...prev];
          const scrambleCount = Math.floor(activeIndices.length * 0.35);
          for (let i = 0; i < scrambleCount; i++) {
            const randIdx = activeIndices[Math.floor(Math.random() * activeIndices.length)];
            next[randIdx] = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          return next;
        });
      }, 70);
      } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (matrix.length > 0) {
        setGridChars(prev => prev.map(() => CHARS[Math.floor(Math.random() * CHARS.length)]));
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, matrix]);
  return (
    <div
      className="char-parent group/char relative inline-block cursor-pointer select-none text-center align-middle"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ pointerEvents: 'auto' }}
    >
      {/* Solid text display (smooth opacity switch on hover) */}
      <span 
        className={`char-child block transition-opacity duration-200 ease-out group-hover/char:opacity-0 h-full ${
          triggerReveal ? 'translate-y-0 opacity-100' : 'translate-y-[100%] opacity-0'
          }`}
      >
        {isRevealed ? char : displayText}
      </span>
      {/* Localized encrypted character matrix overlay */}
      {isRevealed && matrix.length > 0 && (
        <div 
          className="ascii-overlay absolute inset-0 w-full h-full pointer-events-none select-none opacity-0 scale-95 group-hover/char:opacity-100 group-hover/char:scale-108 font-mono transition-all duration-200 ease-out"
        >
          {matrix.map((cell, idx) => {
            const topPercent = (cell.r / rows) * 100;
            const leftPercent = (cell.c / cols) * 100;
            const cellWidth = 100 / cols;
            const cellHeight = 100 / rows;
            const currentChar = gridChars[idx] ?? CHARS[Math.floor(Math.random() * CHARS.length)];

            if (cell.alpha > 140) {
              return (
                <span
                  key={idx}
                  className="absolute text-[var(--color-accent-rust)] font-bold opacity-100 text-[0.068em] leading-none text-center"
                  style={{
                    top: `${topPercent}%`,
                    left: `${leftPercent}%`,
                    width: `${cellWidth}%`,
                    height: `${cellHeight}%`,
                    textShadow: '0 0 6px var(--color-accent-rust), 0 0 12px rgba(223, 88, 56, 0.7)',
                  }}
                >
                  {currentChar}
                </span>
              );
            } else if (cell.alpha > 20) {
              return (
                <span
                  key={idx}
                  className="absolute text-[var(--color-text-primary)] font-semibold opacity-65 text-[0.068em] leading-none text-center"
                  style={{
                    top: `${topPercent}%`,
                    left: `${leftPercent}%`,
                    width: `${cellWidth}%`,
                    height: `${cellHeight}%`,
                  }}
                >
                  {currentChar}
                </span>
              );
            } else {
              return (
                <span
                  key={idx}
                  className="absolute text-[#ece8e2]/25 font-medium opacity-25 text-[0.068em] leading-none text-center"
                  style={{
                    top: `${topPercent}%`,
                    left: `${leftPercent}%`,
                    width: `${cellWidth}%`,
                    height: `${cellHeight}%`,
                  }}
                >
                  {currentChar}
                </span>
              );
            }
          })}
        </div>
      )}
    </div>
  );
});
AsciiLetter.displayName = 'AsciiLetter';
interface NameHeaderProps {
  triggerReveal?: boolean;
}
export const NameHeader: React.FC<NameHeaderProps> = memo(({ triggerReveal = true }) => {
  const name1 = "MOHAMED";
  const name2 = "IRFAN";
  return (
    <div className="hero-title-wrap text-center relative z-10 pointer-events-none -translate-y-[calc(3.5vh+65px)]">
      <h1 className="hero-title flex justify-center overflow-visible font-display font-extrabold text-[clamp(2.4rem,7.6vw,6.8rem)] leading-[0.85] uppercase tracking-[-0.02em] text-[var(--color-text-primary)]">
        {name1.split('').map((char, index) => (
          <AsciiLetter key={index} char={char} index={index} triggerReveal={triggerReveal} />
        ))}
      </h1>
      <h1 className="hero-title flex justify-center overflow-visible font-display font-extrabold text-[clamp(2.4rem,7.6vw,6.8rem)] leading-[0.85] uppercase tracking-[-0.02em] text-[var(--color-text-primary)] mt-2">
        {name2.split('').map((char, index) => (
          <AsciiLetter key={index} char={char} index={index + name1.length + 1} triggerReveal={triggerReveal} />
        ))}
      </h1>
    </div>
  );
});
NameHeader.displayName = 'NameHeader';
