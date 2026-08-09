'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface RevealWordProps {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

const RevealWord: React.FC<RevealWordProps> = React.memo(({ word, index, total, scrollYProgress }) => {
  // Map scroll range: distribute starting unblur points across 0.10 to 0.65 of scroll progress
  const start = 0.10 + (index / total) * 0.55;
  const end = start + 0.12; // Overlapping smooth visual focus window

  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1.0]);
  const blurVal = useTransform(scrollYProgress, [start, end], [8, 0]);
  const y = useTransform(scrollYProgress, [start, end], [6, 0]); // Subtle visual lift
  const filter = useTransform(blurVal, (b) => `blur(${b}px)`);

  return (
    <motion.span
      style={{ opacity, filter, y }}
      className="word inline will-change-[filter,opacity,transform] font-display font-bold text-[clamp(1.1rem,2.2vw,1.55rem)] leading-relaxed text-[#08090c] tracking-tight"
    >
      {word}
    </motion.span>
  );
});
RevealWord.displayName = 'RevealWord';

export const AboutMe = React.forwardRef<HTMLElement, {}>((props, ref) => {
  const containerRef = useRef<HTMLElement>(null);

  // useScroll tracks scroll progress over the entire section container block
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const paragraphs = [
    "I'm Mohamed Irfan — a Computer Science graduate out of Chennai.",
    
    "I started in front-end design & development — and that instinct to design and build never left; it's why this portfolio doesn't look like a template. Somewhere along the way, how systems actually work, where they break, and how to catch it when they do, and I followed that curiosity hard: a top 1% global rank on TryHackMe with a 200+ day streak and the LEGEND badge, Microsoft's SC-900 passed at 945/1000, TryHackMe SOC L1 certified and CEH in progress.",
    
    "I don't just complete rooms and move on — I build. My SOC Automation Lab pipes Wazuh detections through a Shuffle SOAR pipeline into TheHive, with a cloud deployment on AWS underway to capture detected attacks and automate the whole process. SmartCSPM, my capstone, is an agentless tool — built with AI-assisted development rather than deep hand-rolled engineering — that scans AWS environments for misconfigurations and maps findings to CIS Benchmark controls. And in my SOC Basic home lab, I've captured and investigated a live Meterpreter session across 3,700+ Splunk events."
  ];

  // Pre-calculate global word indices across all paragraphs to ensure unified scroll mapping
  let globalWordCount = 0;
  const structuredParagraphs = paragraphs.map((pText) => {
    const words = pText.split(' ');
    const mappedWords = words.map((word) => {
      const index = globalWordCount;
      globalWordCount++;
      return { word, index };
    });
    return mappedWords;
  });

  return (
    <section 
      id="about"
      ref={(node) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }
        (containerRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }} 
      className="about-me-section relative w-full min-h-[105vh] py-[16vh] px-[5vw] flex flex-col justify-center items-center bg-[var(--color-accent-rust)] z-10 overflow-hidden rounded-[32px] md:rounded-[60px]"
    >
      {/* Background Grids (Black grid lines for high contrast on orange) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-y-0 left-[5vw] w-[1px] bg-black/30" />
        <div className="absolute inset-y-0 right-[5vw] w-[1px] bg-black/30" />
      </div>

      {/* Header Label / About Me Title */}
      <div className="z-10 flex flex-col items-center gap-2 mb-[6vh] select-none">
        <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] text-[#08090c] tracking-tight">
          About Me
        </h2>
      </div>

      {/* Centered card panel with left-aligned, naturally wrapped paragraphs */}
      <div className="w-full max-w-[850px] z-10 flex flex-col gap-6 md:gap-8 select-text text-left">
        {structuredParagraphs.map((wordsArray, pIdx) => (
          <p 
            key={pIdx}
            className="font-display font-bold text-[clamp(1.1rem,2.2vw,1.55rem)] leading-relaxed text-[#08090c] tracking-tight"
          >
            {wordsArray.map(({ word, index }) => (
              <React.Fragment key={index}>
                <RevealWord 
                  word={word}
                  index={index}
                  total={globalWordCount}
                  scrollYProgress={scrollYProgress}
                />
                {' '}
              </React.Fragment>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
});
AboutMe.displayName = "AboutMe";
