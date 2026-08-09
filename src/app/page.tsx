'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { NameHeader } from '@/components/NameHeader';
import { ProfileCard } from '@/components/ProfileCard';
import { DecryptionContainer } from '@/components/DecryptionContainer';
import { AboutMe } from '@/components/AboutMe';
import { SectionTransition } from '@/components/SectionTransition';
import { Skills } from '@/components/Skills';
import { ThreatTransition } from '@/components/ThreatTransition';
import { Projects } from '@/components/Projects';
import { MissionLogTransition } from '@/components/MissionLogTransition';
import { MissionLog } from '@/components/MissionLog';
import { CertificatesDivider } from '@/components/CertificatesDivider';
import { CertificatesArchive } from '@/components/CertificatesArchive';
import { LetsConnect } from '@/components/LetsConnect';
import { HeroNavDock } from '@/components/HeroNavDock';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const WORDS = ['DETECT', 'DEFEND', 'DESIGN'];

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [skillsRevealState, setSkillsRevealState] = useState<'hidden' | 'reveal'>('hidden');
  const lineRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const aboutMeRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  // Recalculate ScrollTrigger offsets once preloader is gone
  useEffect(() => {
    if (!showPreloader) {
      ScrollTrigger.refresh();
    }
  }, [showPreloader]);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const line = lineRef.current;
    const preloader = preloaderRef.current;
    if (!preloader || !line) return;

    // Start hidden below
    // Line is already opacity-0 via CSS; GSAP starts it 90px below so it's fully hidden
    gsap.set(line, { y: 90, autoAlpha: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        // Theater curtain: whole preloader slides UP off screen
        gsap.to(preloader, {
          yPercent: -100,
          duration: 1.1,
          ease: 'power4.inOut',
          onComplete: () => setShowPreloader(false),
        });
      },
    });

    // Rise up and fade in
    tl.to(line, {
      y: 0,
      autoAlpha: 1,
      duration: 0.7,
      ease: 'power3.out',
    });

    // Hold for a moment
    tl.to({}, { duration: 0.9 });

    // Slide out upward
    tl.to(line, {
      y: -60,
      autoAlpha: 0,
      duration: 0.5,
      ease: 'power3.in',
    });

    // Pause before curtain lifts
    tl.to({}, { duration: 0.15 });
  }, []);

  return (
    <main className="flex-grow flex flex-col justify-between relative overflow-x-hidden">

      {/* 1. Custom Preloader */}
      {showPreloader && (
        <div
          ref={preloaderRef}
          className="fixed inset-0 bg-[var(--bg-color)] z-[9999] flex items-center justify-center will-change-transform"
        >
          {/* Single line: DETECT · DEFEND · DESIGN */}
          <div
            ref={lineRef}
            className="opacity-0 flex items-center gap-4 font-display font-extrabold text-[clamp(1.4rem,3.5vw,2.2rem)] tracking-[0.18em] text-[var(--color-text-primary)] select-none whitespace-nowrap"
          >
            <span>DETECT</span>
            <span className="text-[var(--color-accent-rust)]">.</span>
            <span>DEFEND</span>
            <span className="text-[var(--color-accent-rust)]">.</span>
            <span>DESIGN</span>
          </div>
        </div>
      )}

      {/* 2. Hero Section Wrapper */}
      <section id="home" className="hero-section relative w-full min-h-screen flex flex-col justify-between px-[5vw] pt-[140px] pb-[40px] z-5 overflow-hidden">

        {/* Big Name Header & Interactive Spotlight Tilt Card (Structured unified composition) */}
        <div className="hero-content flex-grow flex flex-col justify-center items-center relative w-full">
          <div className="hero-composition-container relative flex flex-col justify-center items-center w-full -translate-y-[9vh]">
            <NameHeader triggerReveal={!showPreloader} />
            <ProfileCard />
          </div>
        </div>

        {/* Dynamic Continuous Decryption Marquee */}
        <DecryptionContainer />

      </section>

      {/* 3. Pinned Scroll-Driven About Me Section */}
      <AboutMe ref={aboutMeRef} />

      {/* 4. Standalone Scroll-Driven Shared Element Transition */}
      <SectionTransition 
        aboutMeRef={aboutMeRef} 
        onTitleRevealComplete={() => setSkillsRevealState('reveal')}
        onReset={() => setSkillsRevealState('hidden')}
      />

      {/* 5. Skills Grid Section */}
      <Skills state={skillsRevealState} />

      {/* 6. Cinematic Threat Detection Transition */}
      <ThreatTransition />

      {/* 7. Ultra-Premium Interactive Projects Showcase */}
      <Projects />

      {/* 8. Encrypted ASCII Transition into Mission Log */}
      <MissionLogTransition />

      {/* 9. Mission Log (Experience Timeline) */}
      <MissionLog />

      {/* 10. Living Cyber Text Path Divider */}
      <CertificatesDivider />

      {/* 11. Certification Archive (4-Column Parallax Gallery) */}
      <CertificatesArchive />

      {/* 12. Final Cinematic "Let's Connect" Section */}
      <LetsConnect />

      {/* 13. Persistent Viewport Floating Navigation Dock */}
      <HeroNavDock />
    </main>
  );
}
