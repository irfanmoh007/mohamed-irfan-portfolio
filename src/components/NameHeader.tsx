'use client';

import React, { useEffect, useState, useRef } from 'react';

const CHARS = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\",./<>?";

interface AsciiLetterProps {
  char: string;
}

const AsciiLetter: React.FC<AsciiLetterProps> = ({ char }) => {
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [gridChars, setGridChars] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const cols = 12;
  const rows = 12;

  // 1. Pixel sampling on mount (runs after browser font load is complete)
  useEffect(() => {
    const sampleCanvas = () => {
      const canvas = document.createElement('canvas');
      canvas.width = cols * 4;
      canvas.height = rows * 4;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = 'white';
      // Use the Syne display font var
      ctx.font = `bold ${rows * 3.1}px var(--font-syne), Syne, Arial, sans-serif`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(char, canvas.width / 2, canvas.height / 2);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      const sampledMatrix: number[][] = [];
      const initialChars: string[] = [];

      for (let r = 0; r < rows; r++) {
        const row: number[] = [];
        for (let c = 0; c < cols; c++) {
          const px = Math.floor((c + 0.5) * (canvas.width / cols));
          const py = Math.floor((r + 0.5) * (canvas.height / rows));
          const idx = (py * canvas.width + px) * 4;
          const alpha = data[idx + 3];
          row.push(alpha);

          // Add a random starting character
          initialChars.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
        }
        sampledMatrix.push(row);
      }

      setMatrix(sampledMatrix);
      setGridChars(initialChars);
    };

    if (typeof window !== 'undefined') {
      if (document.fonts) {
        document.fonts.ready.then(sampleCanvas);
      } else {
        setTimeout(sampleCanvas, 200);
      }
    }
  }, [char]);

  // 2. Dynamic code rain scramble on hover (runs on client animation frames / intervals)
  useEffect(() => {
    if (isHovered && matrix.length > 0) {
      const activeIndices: number[] = [];
      matrix.forEach((row, r) => {
        row.forEach((alpha, c) => {
          const idx = r * cols + c;
          if (alpha > 30) {
            activeIndices.push(idx);
          }
        });
      });

      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setGridChars(prev => {
          const next = [...prev];
          const scrambleCount = Math.floor(activeIndices.length * 0.3);
          for (let i = 0; i < scrambleCount; i++) {
            const randIdx = activeIndices[Math.floor(Math.random() * activeIndices.length)];
            next[randIdx] = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          return next;
        });
      }, 85);
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
      {/* Solid text display */}
      <span className="char-child block transition-opacity duration-250 ease-out group-hover/char:opacity-0 will-change-[opacity,transform] h-full">
        {char}
      </span>

      {/* Monospace ASCII Grid Overlay */}
      {matrix.length > 0 && (
        <div 
          className="ascii-overlay absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-90 font-mono font-normal text-left opacity-0 pointer-events-none select-none whitespace-pre transition-all duration-250 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/char:opacity-100 group-hover/char:scale-118 will-change-[opacity,transform] text-[0.118em] leading-[0.88] tracking-[0.08em]"
        >
          {matrix.map((row, r) => {
            const rowSpans = row.map((alpha, c) => {
              const idx = r * cols + c;
              const currentChar = gridChars[idx] || ' ';
              
              if (alpha > 120) {
                return (
                  <span
                    key={c}
                    className="text-[var(--color-accent-rust)] font-bold opacity-100 transition-shadow duration-300"
                    style={{ textShadow: '0 0 5px var(--color-accent-rust), 0 0 10px rgba(223, 88, 56, 0.6)' }}
                  >
                    {currentChar}
                  </span>
                );
              } else if (alpha > 30) {
                return (
                  <span key={c} className="text-[var(--color-text-primary)] font-medium opacity-50">
                    {currentChar}
                  </span>
                );
              } else {
                // Stable pseudo-random noise mapping (12% density)
                const isNoise = (idx * 17) % 100 < 12;
                if (isNoise) {
                  return (
                    <span key={c} className="text-[var(--color-text-muted)] font-light opacity-15">
                      {currentChar}
                    </span>
                  );
                }
                return <span key={c} className="opacity-0"> </span>;
              }
            });
            return (
              <React.Fragment key={r}>
                {rowSpans}
                {'\n'}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const NameHeader: React.FC = () => {
  const name1 = "MOHAMED";
  const name2 = "IRFAN";

  return (
    <div className="hero-title-wrap text-center relative z-10 pointer-events-none -translate-y-[5vh] transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <h1 className="hero-title flex justify-center overflow-visible font-display font-extrabold text-[clamp(3rem,9.5vw,8.5rem)] leading-[0.85] uppercase tracking-[-0.02em] text-[var(--color-text-primary)]">
        {name1.split('').map((char, index) => (
          <AsciiLetter key={index} char={char} />
        ))}
      </h1>
      <h1 className="hero-title flex justify-center overflow-visible font-display font-extrabold text-[clamp(3rem,9.5vw,8.5rem)] leading-[0.85] uppercase tracking-[-0.02em] text-[var(--color-text-primary)] mt-2">
        {name2.split('').map((char, index) => (
          <AsciiLetter key={index} char={char} />
        ))}
      </h1>
    </div>
  );
};
