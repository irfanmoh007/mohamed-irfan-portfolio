'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ProjectItem {
  id: number;
  number: string;
  title: string;
  category: string;
  type: string;
  description: string;
  duration: string;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
  accentColor: string;
}

/* ── Project order per user spec ── */
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 1,
    number: '01',
    title: 'SOC Automation Lab',
    category: 'SOC LAB',
    type: 'SIEM & SOAR Automation • 2024',
    description:
      'End-to-end cloud security automation pipeline integrating AWS EC2 Wazuh SIEM, Shuffle SOAR workflows, VirusTotal v3 threat intelligence enrichment, and TheHive incident response case management.',
    duration: '3 Months',
    image: '/projects/soc_automation.png',
    githubUrl:
      'https://github.com/irfanmoh007/Cyber-Security-Learning-Journey/tree/main/05-Projects/SOC-Automation-Lab',
    technologies: ['Wazuh', 'Shuffle SOAR', 'TheHive', 'VirusTotal', 'Sysmon', 'AWS EC2'],
    accentColor: '#df5838',
  },
  {
    id: 2,
    number: '02',
    title: 'Smart CSPM',
    category: 'CSPM',
    type: 'AI Cloud Security • 2024',
    description:
      'Zero-cost AI-powered Cloud Security Posture Management platform. Scans AWS multi-cloud infrastructure for misconfigurations, compliance drift, IAM risk scoring, and automated Gemini remediation playbooks.',
    duration: '4 Months',
    image: '/projects/smart_cspm.png',
    githubUrl: 'https://github.com/irfanmoh007/Smart-CSPM',
    technologies: ['React', 'Python', 'AWS', 'FastAPI', 'Gemini AI', 'Tailwind'],
    accentColor: '#df5838',
  },
  {
    id: 3,
    number: '03',
    title: 'SOC Basic HomeLab',
    category: 'HOME LAB',
    type: 'Attack Simulation & Detection • 2024',
    description:
      'Isolated VirtualBox attack-victim lab environment simulating Kali Linux Metasploit reverse shell payload delivery against Windows 10 Pro, capturing 3,700+ telemetry events in Splunk via Sysmon.',
    duration: '2 Months',
    image: '/projects/soc_homelab.jpg',
    githubUrl:
      'https://github.com/irfanmoh007/Cyber-Security-Learning-Journey/tree/main/05-Projects/SOC-Basic-HomeLab',
    technologies: ['Splunk', 'Sysmon', 'Kali Linux', 'Metasploit', 'VirtualBox', 'Windows 10'],
    accentColor: '#df5838',
  },
  {
    id: 4,
    number: '04',
    title: 'Animated Landing Page',
    category: 'WEB DEV',
    type: 'Creative Frontend • 2024',
    description:
      'High-performance creative frontend web experience featuring smooth 60 FPS motion graphics, interactive 3D floating viewport cards, and modern layout transitions built for brands that move.',
    duration: '1 Month',
    image: '/projects/animated_site.png',
    githubUrl: 'https://first-animated-site.vercel.app/',
    liveUrl: 'https://first-animated-site.vercel.app/',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Vercel'],
    accentColor: '#df5838',
  },
  {
    id: 5,
    number: '05',
    title: 'Personal Portfolio',
    category: 'PORTFOLIO',
    type: 'Interactive Experience • 2024',
    description:
      'State-of-the-art interactive cybersecurity portfolio featuring 60 FPS GPU-composited Threat Neutralization transitions, GSAP scroll scrub kinetics, interactive decryption marquee, and physical card carousel.',
    duration: '2 Months',
    image: '/projects/portfolio.png',
    githubUrl: 'https://github.com/irfanmoh007',
    liveUrl: '#',
    technologies: ['Next.js', 'GSAP', 'Tailwind CSS', 'TypeScript', 'Three.js'],
    accentColor: '#df5838',
  },
];

const TOTAL = PROJECTS_DATA.length;

/*  Heading area height + gap = panel top offset.
    108px heading area + 12px gap = 120px panel top.
    Panel bottom inset = 20px → panel doesn't touch viewport bottom. */
const HEADING_AREA = 108;
const PANEL_TOP = 120;
const PANEL_BOTTOM = 20;

/* ────────────────────────────────────────────────────────────────
   Projects Section — Discrete Stacked Scroll Experience
   ──────────────────────────────────────────────────────────────── */
export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);

  /* ── GSAP ScrollTrigger: Discrete Snap & One-Scroll-Per-Project ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const panels = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll('.project-panel'),
    );
    const numPanels = panels.length;
    if (numPanels <= 1) return;

    const ctx = gsap.context(() => {
      /*  Initial Setup:
          - Panel 0 (first project): starts at yPercent: 0 (fully visible)
          - Panels 1..N-1: start at yPercent: 100 (below viewport)
          - Higher z-index on later panels so each rising panel covers the previous one.
      */
      panels.forEach((panel, idx) => {
        if (idx === 0) {
          gsap.set(panel, { yPercent: 0, opacity: 1, filter: 'blur(0px)', force3D: true });
        } else {
          gsap.set(panel, { yPercent: 100, opacity: 1, filter: 'blur(0px)', force3D: true });
        }
      });

      // Construct Timeline for discrete steps
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${(numPanels - 1) * 120}vh`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          pinSpacing: true,
          onUpdate: (self) => {
            const stepIndex = Math.round(self.progress * (numPanels - 1));
            activeIndexRef.current = Math.min(Math.max(stepIndex, 0), numPanels - 1);
          },
        },
      });

      /*  Animation Sequence:
          For each next panel (1 to N-1):
          1. Next panel rises from yPercent: 100 -> 0, sliding UPWARD to cover previous panel.
          2. Previous panel gets a subtle blur (4px) and slight opacity reduction (0.7) underneath.
      */
      for (let i = 1; i < numPanels; i++) {
        const currentNextPanel = panels[i];
        const previousPanel = panels[i - 1];

        tl.to(
          currentNextPanel,
          {
            yPercent: 0,
            ease: 'none',
            duration: 1,
            force3D: true,
          },
          `step-${i}`
        ).to(
          previousPanel,
          {
            filter: 'blur(4px)',
            opacity: 0.7,
            ease: 'none',
            duration: 1,
            force3D: true,
          },
          `step-${i}`
        );
      }

      /* ── Intercept Wheel to Prevent Fast Skipping & Ensure Clean Boundaries ── */
      const handleWheel = (e: WheelEvent) => {
        const st = tl.scrollTrigger;
        if (!st || !st.isActive) return;

        const isScrollDown = e.deltaY > 0;
        const currentStep = activeIndexRef.current;

        // On last project (index 4) and scrolling down: let natural scroll exit section
        if (isScrollDown && currentStep >= numPanels - 1) {
          return;
        }

        // On first project (index 0) and scrolling up: let natural scroll exit up
        if (!isScrollDown && currentStep <= 0) {
          return;
        }

        if (isAnimatingRef.current) {
          e.preventDefault();
          return;
        }

        isAnimatingRef.current = true;
        const targetStep = isScrollDown ? currentStep + 1 : currentStep - 1;
        const targetProgress = targetStep / (numPanels - 1);

        const startScroll = st.start;
        const totalDist = st.end - st.start;
        const targetScrollY = startScroll + targetProgress * totalDist;

        gsap.to(st, {
          scroll: targetScrollY,
          duration: 0.75,
          ease: 'power3.inOut',
          overwrite: 'auto',
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });

        e.preventDefault();
      };

      window.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        window.removeEventListener('wheel', handleWheel);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  /* ── Render ── */
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#090909] overflow-hidden"
    >
      {/* ── Section Heading  ──
          Generous top padding (pt-10) separates heading from viewport edge.
          Solid bg covers panels that slide underneath.  */}
      <div
        className="absolute top-0 left-0 right-0 z-50 bg-[#090909] flex items-end justify-center"
        style={{ height: `${HEADING_AREA}px`, paddingBottom: '12px' }}
      >
        <h2 className="font-display font-extrabold text-[clamp(1.8rem,3.5vw,2.8rem)] text-[#ece8e2] tracking-[-0.03em] uppercase leading-none">
          Projects
        </h2>
      </div>

      {/* ── Stacked Panels ──
          Every panel is absolutely positioned in the same spot.
          z-index stacking: first panel at z-index 10, next panel at z-index 20, etc.
          Each next panel rises from below and covers the previous panel! */}
      {PROJECTS_DATA.map((project, i) => (
        <div
          key={project.id}
          className="project-panel absolute left-[7%] right-[7%]"
          style={{
            top: `${PANEL_TOP}px`,
            bottom: `${PANEL_BOTTOM}px`,
            zIndex: (i + 1) * 10,
            willChange: 'transform, filter, opacity',
          }}
        >
          {/* Panel Surface — subtle shadow communicates depth between sheets */}
          <div
            className="relative w-full h-full bg-[#111111] rounded-t-[28px] overflow-hidden"
            style={{
              boxShadow: '0 -6px 35px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
              {/* ──────── LEFT SIDE: Project Information ──────── */}
              <div className="lg:col-span-4 xl:col-span-4 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center gap-3 lg:gap-4">
                {/* Counter */}
                <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">
                  {project.number} / 0{TOTAL}
                </span>

                {/* Icon Links — filled white circles (matching reference) */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-[#ece8e2] flex items-center justify-center text-[#090909] hover:bg-[#df5838] hover:text-white transition-colors duration-300"
                    aria-label={`${project.title} GitHub`}
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-[#ece8e2] flex items-center justify-center text-[#090909] hover:bg-[#df5838] hover:text-white transition-colors duration-300"
                      aria-label={`${project.title} Live Demo`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </a>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="font-display text-2xl sm:text-3xl lg:text-[2rem] xl:text-[2.2rem] font-extrabold text-[#ece8e2] tracking-tight leading-[1.1]">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] sm:text-sm text-white/45 leading-relaxed max-w-md">
                  {project.description}
                </p>

                {/* Technology Stack — bold uppercase plain text (matching reference) */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-display font-bold text-[11px] tracking-[0.12em] uppercase text-[#ece8e2]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* GitHub Button (existing portfolio style) */}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 bg-[#df5838] text-[#090909] font-display font-bold text-xs rounded-full px-5 py-2.5 w-fit hover:bg-[#e86343] transition-colors duration-300 shadow-[0_0_15px_rgba(223,88,56,0.2)]"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View on GitHub
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>

              {/* ──────── RIGHT SIDE: Project Screenshot ────────
                  Screenshot occupies ~68% of panel height.
                  Breathing room on all four sides.
                  Anchored toward bottom-right. */}
              <div className="lg:col-span-8 relative h-[200px] sm:h-[260px] lg:h-auto">
                <div className="absolute top-4 left-4 right-2 bottom-2 sm:top-5 sm:left-5 sm:right-3 sm:bottom-3 lg:top-[28%] lg:left-6 lg:right-4 lg:bottom-4 rounded-tl-[16px] sm:rounded-tl-[20px] overflow-hidden bg-[#0a0a0a]">
                  <img
                    src={project.image}
                    alt={project.title}
                    decoding="async"
                    className="w-full h-full object-cover object-left-top"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
