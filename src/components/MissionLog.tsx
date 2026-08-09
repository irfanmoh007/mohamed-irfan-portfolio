'use client';

import React, { useEffect, useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Single Cyber Symbols for the line head per user prompt:
// @ # % $ 7 A ▒ ▓ █ | / < > _ X F 0
const SINGLE_CYBER_SYMBOLS = ['@', '#', '%', '$', '7', 'A', '▒', '▓', '█', '|', '/', '<', '>', '_', 'X', 'F', '0'];

// Renders ONLY ONE ASCII character at a time — NO container, NO box, NO border, NO background
const SingleAsciiHead = memo(() => {
  const [char, setChar] = useState('@');

  useEffect(() => {
    const interval = setInterval(() => {
      setChar(SINGLE_CYBER_SYMBOLS[Math.floor(Math.random() * SINGLE_CYBER_SYMBOLS.length)]);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="font-mono text-[20px] font-semibold text-[var(--color-accent-rust)] leading-none select-none pointer-events-none whitespace-nowrap block text-center"
      style={{
        textShadow: '0 0 8px rgba(223, 88, 56, 0.85), 0 0 16px rgba(223, 88, 56, 0.4)',
      }}
    >
      {char}
    </span>
  );
});
SingleAsciiHead.displayName = 'SingleAsciiHead';

// Experience entry data type
interface ExperienceData {
  year: string;
  role: string;
  company: string;
  time: string;
  desc1: string;
  desc2?: string;
  tags: string[];
}

export const MissionLog: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  // Synchronized scroll-driven line growth + endpoint locked ASCII head
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (timelineLineRef.current && trackRef.current && headRef.current && sectionRef.current) {
        ScrollTrigger.create({
          trigger: trackRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 0.3,
          onUpdate: (self) => {
            const p = self.progress;
            // 1. Line scaleY growth
            if (timelineLineRef.current) {
              gsap.set(timelineLineRef.current, { scaleY: p });
            }
            // 2. Head position strictly locked to line endpoint
            if (headRef.current && trackRef.current) {
              const totalH = trackRef.current.offsetHeight;
              gsap.set(headRef.current, { y: p * totalH });
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences: ExperienceData[] = [
    {
      year: '2025 — 26',
      role: 'Self-Directed Cybersecurity Research',
      company: 'Independent',
      time: 'December 2025 — Present',
      desc1: 'Running a self-directed cybersecurity track beyond university coursework. Completed TryHackMe SOC Level 1, progressing through Level 2, achieving a Top 1% global ranking with a 200+ day streak and the LEGEND badge. Passed Microsoft SC-900 with a score of 945/1000 and currently completing CEH.',
      desc2: 'Designed and built two complete SOC environments — SOC Home Lab (Splunk, Sysmon, Kali Linux) and SOC Automation Lab (Wazuh, Shuffle SOAR, TheHive). Used these environments to investigate live Meterpreter attacks, validate detection pipelines, and document investigations publicly through GitHub.',
      tags: ['SOC', 'Splunk', 'Wazuh', 'TheHive', 'Threat Detection', 'Incident Response']
    },
    {
      year: '2025',
      role: 'Joint Secretary',
      company: 'Crescent Blood Donors',
      time: 'August 2025 — March 2026',
      desc1: "Served as Joint Secretary and Media Head for Crescent Blood Donors, leading the club's digital presence, event branding, and outreach campaigns. Coordinated with cross-functional student teams to organize large-scale blood donation drives, awareness initiatives, and volunteer activities while helping strengthen donor engagement across campus.",
      desc2: "Contributed to campaigns that supported one of the institute's most active student social initiatives, combining leadership, communication, design, and execution under real event timelines.",
      tags: ['Leadership', 'Media', 'Event Management', 'Community Impact', 'Team Coordination', 'Branding']
    },
    {
      year: '2025',
      role: 'Web Development Intern',
      company: 'Femtosoft Technologies',
      time: 'June 2025 — July 2025',
      desc1: 'Worked on production-grade web applications during an onsite internship. Developed React UI components and Python backend functionality across multiple live modules while implementing secure API key management using Pydantic to eliminate persistent credential storage.',
      desc2: 'Focused on clean architecture, secure backend practices, and production-ready implementation.',
      tags: ['React', 'Python', 'FastAPI', 'Pydantic', 'API Security']
    }
  ];

  return (
    <section
      id="missions"
      ref={sectionRef}
      className="relative w-full bg-[#08090c] overflow-hidden z-10"
    >
      {/* 1. Global Continuous Vertical Guide Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-y-0 left-[5vw] w-[1px] bg-white/10" />
        <div className="absolute inset-y-0 right-[5vw] w-[1px] bg-white/10" />
      </div>

      {/* Extra top breathing space — seamless from transition */}
      <div className="pt-[12vh]" />

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center font-display font-extrabold text-[#e4ded7] text-[clamp(2rem,4.2vw,3.6rem)] uppercase tracking-[0.15em] mb-6 select-none"
      >
        MISSION LOG
      </motion.h2>

      {/* Subtle accent underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-16 h-[2px] mx-auto bg-[var(--color-accent-rust)] mb-[14vh] origin-center"
        style={{ boxShadow: '0 0 12px rgba(223,88,56,0.3)' }}
      />

      {/* ── THREE-COLUMN INDEPENDENT GRID CONTAINER (COL 1: YEAR | COL 2: TIMELINE | COL 3: CONTENT) ── */}
      <div ref={trackRef} className="max-w-[1280px] mx-auto relative px-[4vw] pb-[16vh]">

        {/* CENTER TIMELINE COLUMN TRACK (Dim Line) */}
        <div className="absolute left-[16px] md:left-[calc(4vw+205px)] lg:left-[calc(4vw+250px)] top-0 bottom-0 w-[2px] bg-white/10 z-0 -translate-x-1/2" />

        {/* CENTER GLOWING ORANGE TIMELINE LINE (Scroll-Driven ScaleY 0% -> 100%) */}
        <div className="absolute left-[16px] md:left-[calc(4vw+205px)] lg:left-[calc(4vw+250px)] top-0 bottom-0 w-[2px] z-10 -translate-x-1/2 pointer-events-none">
          <div
            ref={timelineLineRef}
            className="absolute top-0 left-0 w-full h-full origin-top scale-y-0 will-change-transform rounded-full"
            style={{
              backgroundColor: 'var(--color-accent-rust)',
              boxShadow: '0 0 14px rgba(223,88,56,0.6), 0 0 35px rgba(223,88,56,0.3)',
            }}
          />
        </div>

        {/* INDEPENDENT ASCII HEAD NODE (Locked to line endpoint via GSAP y transform, NOT inside line container) */}
        <div
          ref={headRef}
          className="absolute top-0 left-[16px] md:left-[calc(4vw+205px)] lg:left-[calc(4vw+250px)] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none select-none"
        >
          <SingleAsciiHead />
        </div>

        {/* ── 3-COLUMN EXPERIENCE ENTRIES ── */}
        <div className="w-full flex flex-col gap-24 lg:gap-32">
          {experiences.map((data, index) => (
            <div 
              key={index} 
              className="w-full grid grid-cols-1 md:grid-cols-[180px_50px_1fr] lg:grid-cols-[220px_60px_1fr] items-start"
            >
              {/* COL 1: Year Label */}
              <div className="hidden md:flex justify-end pr-6 pt-0.5 select-none pointer-events-none">
                <span className="font-display font-extrabold text-[clamp(1.3rem,2.2vw,2.2rem)] text-[#e4ded7] opacity-[0.05] leading-none whitespace-nowrap text-right">
                  {data.year}
                </span>
              </div>

              {/* COL 2: Timeline Column Spacer (Line passes through center) */}
              <div className="hidden md:block h-full relative" />

              {/* COL 3: Content Area */}
              <div className="pl-8 md:pl-0 pt-0">
                {/* Mobile Year Badge */}
                <div className="md:hidden mb-2 text-[clamp(1.4rem,6vw,2.2rem)] font-display font-extrabold text-[#e4ded7] opacity-[0.05] leading-none pointer-events-none select-none">
                  {data.year}
                </div>

                {/* Experience Activation on Scroll: 40% -> 100% Opacity Unlocking when in viewport center */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                  variants={{
                    hidden: { opacity: 0.4, y: 16 },
                    visible: { opacity: 1.0, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="relative z-10 w-full transition-opacity duration-300"
                >
                  {/* Role */}
                  <h3 className="font-display font-bold text-[clamp(1.2rem,2.5vw,1.8rem)] text-[#e4ded7] mb-1.5">
                    {data.role}
                  </h3>

                  {/* Company + Time */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 mb-7">
                    <span className="font-roboto text-[var(--color-accent-rust)] font-medium text-[0.95rem]">
                      {data.company}
                    </span>
                    <span className="hidden sm:inline-block text-[#86888f]">•</span>
                    <span className="font-roboto text-sm text-[#86888f]">
                      {data.time}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="space-y-4 mb-7">
                    <p className="font-roboto text-[0.95rem] leading-[1.75] text-[#e4ded7]/80 max-w-[680px]">
                      {data.desc1}
                    </p>
                    {data.desc2 && (
                      <p className="font-roboto text-[0.95rem] leading-[1.75] text-[#e4ded7]/80 max-w-[680px]">
                        {data.desc2}
                      </p>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2.5">
                    {data.tags.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="bg-white/[0.04] border border-white/[0.08] rounded-full px-3.5 py-1.5 text-[0.72rem] uppercase tracking-[0.1em] text-[#e4ded7]/60 font-roboto font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
