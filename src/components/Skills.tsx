'use client';

import React, { useState, useEffect, memo } from 'react';
import { motion, Variants, useAnimationControls } from 'framer-motion';
import {
  siSplunk, siWireshark, siKalilinux, siMetasploit, siElasticstack,
  siBurpsuite, siVirtualbox, siPython, siFastapi, siMongodb, siGithub,
  siHtml5, siCss, siJavascript, siReact, siNextdotjs, siTailwindcss,
  siGooglegemini
} from 'simple-icons';

// Map skill names to Simple Icons SVG path data (24×24 viewBox)
const ICON_MAP: Record<string, string> = {
  'Splunk':              siSplunk.path,
  'Elastic Stack (ELK)': siElasticstack.path,
  'Wireshark':           siWireshark.path,
  'Kali Linux':          siKalilinux.path,
  'Metasploit':          siMetasploit.path,
  'Burp Suite':          siBurpsuite.path,
  'VirtualBox':          siVirtualbox.path,
  'Python':              siPython.path,
  'FastAPI':             siFastapi.path,
  'MongoDB':             siMongodb.path,
  'GitHub':              siGithub.path,
  'Gemini AI':           siGooglegemini.path,
  'HTML':                siHtml5.path,
  'CSS':                 siCss.path,
  'JavaScript':          siJavascript.path,
  'React':               siReact.path,
  'Next.js':             siNextdotjs.path,
  'Tailwind CSS':        siTailwindcss.path,
};

// Memoized Monochrome SVG icon
const SkillIcon = memo(({ name }: { name: string }) => {
  const path = ICON_MAP[name];
  if (path) {
    return (
      <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="currentColor"
        aria-label={name}
        className="shrink-0"
      >
        <path d={path} />
      </svg>
    );
  }
  return (
    <span className="font-display font-bold text-[1.15rem] lg:text-[1.25rem] select-none leading-none">
      {name.charAt(0).toUpperCase()}
    </span>
  );
});
SkillIcon.displayName = 'SkillIcon';

interface SkillProps {
  name: string;
}

interface SkillGroup {
  title: string;
  skills: SkillProps[];
}

// Stagger animation variants
const columnVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
  }
};

// Reusable Skill Card Component
const SkillCard = memo(({ skill, groupHovered }: { skill: SkillProps; groupHovered: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        borderColor: hovered 
          ? "rgba(228, 222, 215, 0.25)" 
          : (groupHovered ? "rgba(228, 222, 215, 0.08)" : "rgba(228, 222, 215, 0.04)"),
        backgroundColor: hovered ? "var(--color-brand-primary)" : "rgba(18, 19, 25, 0.75)",
        boxShadow: hovered 
          ? "0px 14px 32px rgba(0, 0, 0, 0.4)" 
          : "0px 6px 20px rgba(0, 0, 0, 0.18)",
        y: hovered ? -4 : 0,
      }}
      transition={{
        borderColor: { duration: 0.24, ease: [0.25, 1, 0.5, 1] },
        backgroundColor: { duration: 0.24, ease: [0.25, 1, 0.5, 1] },
        boxShadow: { duration: 0.24, ease: [0.25, 1, 0.5, 1] },
        y: { duration: 0.2, ease: "easeOut" }
      }}
      className="relative flex flex-col items-center justify-between p-4 sm:p-5 border border-white/[0.04] rounded-[22px] backdrop-blur-[8px] overflow-hidden select-none cursor-pointer aspect-square w-full gap-2.5"
    >
      {/* Subtle radial glow on hover */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(223,88,56,0.015)_0%,transparent_75%)] opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: hovered ? 1 : 0 }}
      />

      {/* Circular Icon Container */}
      <div 
        className={`flex-shrink-0 border rounded-full w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13 flex justify-center items-center transition-colors duration-250 ${
          hovered ? 'bg-black/5 border-black/10' : 'bg-white/[0.03] border-white/[0.05]'
        }`}
      >
        <span
          className={`flex items-center justify-center w-full h-full transition-colors duration-250 ${
            hovered ? 'text-[#08090c]' : 'text-[#ece8e2]/70'
          }`}
        >
          <SkillIcon name={skill.name} />
        </span>
      </div>

      {/* Technology Name */}
      <h4 
        className={`font-roboto font-medium text-[0.74rem] sm:text-[0.78rem] lg:text-[0.82rem] tracking-tight text-center w-full overflow-hidden text-ellipsis whitespace-nowrap mb-0.5 uppercase transition-colors duration-250 ${
          hovered ? 'text-[#08090c]' : 'text-[var(--color-brand-primary)]'
        }`}
      >
        {skill.name}
      </h4>
    </motion.div>
  );
});
SkillCard.displayName = 'SkillCard';

export const Skills: React.FC<{ state?: 'hidden' | 'reveal' }> = memo(({ state = 'hidden' }) => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const gridControls = useAnimationControls();

  useEffect(() => {
    if (state === 'reveal') {
      gridControls.start('visible');
    } else {
      gridControls.start('hidden');
    }
  }, [state, gridControls]);

  // FIVE Equal Categories per user spec
  const skillGroups: SkillGroup[] = [
    {
      title: "DETECTION & SIEM",
      skills: [
        { name: "Splunk" },
        { name: "Wazuh" },
        { name: "Sysmon" },
        { name: "Sigma Rules" },
        { name: "Zeek" },
        { name: "Elastic Stack (ELK)" },
        { name: "Microsoft Sentinel" }
      ]
    },
    {
      title: "OFFENSIVE & RECON",
      skills: [
        { name: "Kali Linux" },
        { name: "Metasploit" },
        { name: "Nmap" },
        { name: "Burp Suite" },
        { name: "Gobuster" },
        { name: "Hydra" },
        { name: "John the Ripper" },
        { name: "VirtualBox" }
      ]
    },
    {
      title: "DFIR & FORENSICS",
      skills: [
        { name: "Volatility" },
        { name: "Wireshark" },
        { name: "TheHive" },
        { name: "Shuffle SOAR" },
        { name: "CyberChef" }
      ]
    },
    {
      title: "CLOUD & SECURITY TOOLING",
      skills: [
        { name: "AWS" },
        { name: "boto3" },
        { name: "Python" },
        { name: "FastAPI" },
        { name: "MongoDB" },
        { name: "CIS Benchmark" },
        { name: "Gemini AI" },
        { name: "GitHub" }
      ]
    },
    {
      title: "FRONTEND DESIGN",
      skills: [
        { name: "React" },
        { name: "Next.js" },
        { name: "Tailwind CSS" },
        { name: "HTML" },
        { name: "CSS" },
        { name: "JavaScript" }
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section relative w-full min-h-screen pt-[2vh] pb-[12vh] px-[5vw] flex flex-col justify-start items-center bg-[#08090c] text-[var(--color-brand-primary)] overflow-hidden z-10 select-none">
      {/* Background Grids */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-y-0 left-[5vw] w-[1px] bg-white/10" />
        <div className="absolute inset-y-0 right-[5vw] w-[1px] bg-white/10" />
      </div>

      <div className="w-full max-w-[1440px] z-10 flex flex-col items-center">

        {/* ── System Architecture Diagram Connector Lines (Perfect 5-Column Math Alignment) ── */}
        <div className="relative w-full mx-auto flex flex-col items-center mb-8 select-none pointer-events-none">
          {/* Top Vertical Connector (Sits close beneath top MY SKILLS pill) */}
          <div className="w-[1px] h-4 bg-gradient-to-b from-[var(--color-accent-rust)] to-white/20" />

          {/* Main Horizontal Line & 5 Centered Nodes */}
          <div className="relative w-full h-[1px]">
            {/* Horizontal Line spanning from 10% (center of Col 1) to 90% (center of Col 5) */}
            <div className="absolute left-[10%] right-[10%] top-0 h-[1px] bg-white/20" />

            {/* 5 Orange Connection Nodes mathematically centered above each column */}
            <div className="hidden lg:grid grid-cols-5 w-full h-full absolute inset-0">
              <div className="flex justify-center"><div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-rust)] border-2 border-[#08090c] shadow-[0_0_8px_var(--color-accent-rust)] -translate-y-[4.5px]" /></div>
              <div className="flex justify-center"><div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-rust)] border-2 border-[#08090c] shadow-[0_0_8px_var(--color-accent-rust)] -translate-y-[4.5px]" /></div>
              <div className="flex justify-center"><div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-rust)] border-2 border-[#08090c] shadow-[0_0_8px_var(--color-accent-rust)] -translate-y-[4.5px]" /></div>
              <div className="flex justify-center"><div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-rust)] border-2 border-[#08090c] shadow-[0_0_8px_var(--color-accent-rust)] -translate-y-[4.5px]" /></div>
              <div className="flex justify-center"><div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-rust)] border-2 border-[#08090c] shadow-[0_0_8px_var(--color-accent-rust)] -translate-y-[4.5px]" /></div>
            </div>
          </div>

          {/* 5 Vertical Line Drops directly into each category pill */}
          <div className="hidden lg:grid grid-cols-5 w-full h-5 pt-0.5">
            <div className="flex justify-center"><div className="w-[1px] h-full bg-white/15" /></div>
            <div className="flex justify-center"><div className="w-[1px] h-full bg-white/15" /></div>
            <div className="flex justify-center"><div className="w-[1px] h-full bg-white/15" /></div>
            <div className="flex justify-center"><div className="w-[1px] h-full bg-white/15" /></div>
            <div className="flex justify-center"><div className="w-[1px] h-full bg-white/15" /></div>
          </div>
        </div>

        {/* ── FIVE EQUAL COLUMNS ── */}
        <motion.div 
          initial="hidden"
          animate={gridControls}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-7 items-start w-full"
        >
          {skillGroups.map((group, groupIdx) => {
            const isGroupHovered = hoveredCategory === groupIdx;

            return (
              <motion.div
                key={group.title}
                variants={columnVariants}
                onMouseEnter={() => setHoveredCategory(groupIdx)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="flex flex-col items-center w-full"
              >
                {/* Centered Category Pill Baseline */}
                <div className="w-full flex justify-center mb-5">
                  <div className="bg-white/[0.04] border border-white/[0.08] px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm text-center">
                    <span className="font-roboto font-bold text-[0.72rem] lg:text-[0.76rem] tracking-[0.14em] uppercase text-[#ece8e2]/80">
                      {group.title}
                    </span>
                  </div>
                </div>

                {/* 2-Column Responsive Card Grid Inside Column */}
                <motion.div 
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.035 } }
                  }}
                  className="grid grid-cols-2 gap-3.5 sm:gap-4 w-full"
                >
                  {group.skills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} groupHovered={isGroupHovered} />
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
});
Skills.displayName = 'Skills';
