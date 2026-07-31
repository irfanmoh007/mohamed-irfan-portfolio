'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { NameHeader } from '@/components/NameHeader';
import { ProfileCard } from '@/components/ProfileCard';
import { DecryptionContainer } from '@/components/DecryptionContainer';

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [showPreloader, setShowPreloader] = useState(true);

  // Preloader progress loop and GSAP slide-up reveal trigger
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Fast progress ticks completing in ~300ms
      currentProgress += Math.floor(Math.random() * 8) + 4;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);

        const tl = gsap.timeline();

        // 1. Fade and slide out preloader upward
        tl.to('.preloader', {
          opacity: 0,
          y: '-100%',
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            setShowPreloader(false);
          }
        });

        // 2. Staggered reveal slide-up for title characters
        tl.to('.char-child', {
          y: '0%',
          duration: 0.8,
          stagger: 0.04,
          ease: 'power4.out',
          clearProps: 'transform' // clean properties after transform
        }, '-=0.4'); // slight overlap

        // 3. Staggered decryption scramble on letters
        tl.fromTo('.char-child', 
          { textShadow: 'none' },
          {
            textShadow: '0 0 8px rgba(228, 222, 215, 0.3)',
            duration: 0.4,
            stagger: 0.04
          },
          '-=0.6'
        );
      }
      setProgress(currentProgress);
    }, 22);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex-grow flex flex-col justify-between relative overflow-hidden">
      {/* 1. Custom Preloader */}
      {showPreloader && (
        <div className="preloader fixed top-0 left-0 w-full h-full bg-[var(--bg-color)] z-[9999] flex justify-center items-center">
          <div className="preloader-wrap w-[90%] max-w-[400px] text-center">
            <div className="preloader-text font-display font-bold text-[0.85rem] tracking-[0.2em] text-[var(--text-primary)] flex justify-between items-center mb-5">
              <span className="word">DESIGNER</span>
              <span className="separator animate-pulse-sep text-[var(--color-accent-rust)]">•</span>
              <span className="word">DEVELOPER</span>
              <span className="separator animate-pulse-sep text-[var(--color-accent-rust)]">•</span>
              <span className="word">CREATIVE</span>
            </div>
            <div className="preloader-bar w-full h-[2px] bg-[var(--color-border-subtle)] overflow-hidden rounded-[2px]">
              <div 
                className="preloader-progress h-full bg-[var(--text-primary)] transition-[width] duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. Hero Section Wrapper */}
      <section className="hero-section relative w-full min-h-screen flex flex-col justify-between px-[5vw] pt-[140px] pb-[40px] z-5 overflow-hidden">
        
        {/* Big Name Header & Interactive Spotlight Tilt Card */}
        <div className="hero-content flex-grow flex flex-col justify-center items-center relative w-full">
          <NameHeader />
          <ProfileCard />
        </div>

        {/* Dynamic Continuous Decryption Marquee (Wisprflow circular loop) */}
        <DecryptionContainer />

        {/* Bottom Callout Info Footer */}
        <div className="hero-footer grid grid-cols-2 gap-20 border-t border-[var(--color-border-subtle)] pt-[30px] z-10 md:grid-cols-2 grid-cols-1">
          <div className="footer-col flex flex-col gap-2">
            <div className="label-muted font-display text-[0.6rem] font-bold tracking-[0.2em] text-[var(--color-text-muted)]">
              SERVICES
            </div>
            <p className="footer-text font-accent text-[0.85rem] leading-[1.5] text-[var(--color-text-primary)] font-light tracking-[0.02em] max-w-[420px]">
              Full Stack Web Engineering • Highly Interactive UI Design • Creative Web Experiences
            </p>
          </div>
          <div className="footer-col flex flex-col gap-2">
            <div className="label-muted font-display text-[0.6rem] font-bold tracking-[0.2em] text-[var(--color-text-muted)]">
              FOCUS
            </div>
            <p className="footer-text font-accent text-[0.85rem] leading-[1.5] text-[var(--color-text-primary)] font-light tracking-[0.02em] max-w-[420px]">
              Designing visually premium and high-performance digital products that tell a story.
            </p>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="scroll-indicator absolute bottom-[30px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[10px] opacity-40 hover:opacity-80 transition-opacity duration-300 pointer-events-auto select-none z-10">
          <span className="scroll-text font-display text-[0.55rem] font-semibold tracking-[0.25em] text-[var(--color-text-primary)] whitespace-nowrap">
            SCROLL TO DISCOVER
          </span>
          <div className="scroll-line w-[1px] h-[40px] bg-white/10 overflow-hidden relative">
            <div className="scroll-line-progress w-full h-[30%] bg-[var(--color-text-primary)] absolute top-0 animate-scroll-bar" />
          </div>
        </div>

      </section>
    </main>
  );
}
