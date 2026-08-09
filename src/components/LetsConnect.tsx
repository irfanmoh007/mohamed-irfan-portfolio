'use client';

import React, { memo, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { drawEncryptedAsciiGrid } from '@/components/encryptedAscii';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SOCIALS = [
  {
    name: 'LINKEDIN',
    label: 'Professional Network',
    url: 'https://www.linkedin.com/in/mohamedirfans/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'GITHUB',
    label: 'Repositories',
    url: 'https://github.com/irfanmoh007',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    name: 'TRYHACKME',
    label: 'Cyber Labs',
    url: 'https://tryhackme.com/p/MohamedIrfan',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
  },
  {
    name: 'INSTAGRAM',
    label: 'Creative Work',
    url: 'https://www.instagram.com/07.irfaaaaann/?hl=en',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'EMAIL',
    label: 'Direct Message',
    url: 'mailto:irfan.cyber07@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

function LeftAccentureChevron() {
  return (
    <svg viewBox="0 0 180 120" fill="none" className="h-[50px] w-[75px] sm:h-[73px] sm:w-[110px] md:h-[93px] md:w-[140px]">
      <path d="M72 18 L20 60 L72 102" stroke="#e4ded7" strokeWidth="18" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" />
      <path d="M152 18 L100 60 L152 102" stroke="#e4ded7" strokeWidth="18" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" />
    </svg>
  );
}

function RightAccentureChevron() {
  return (
    <svg viewBox="0 0 180 120" fill="none" className="h-[50px] w-[75px] sm:h-[73px] sm:w-[110px] md:h-[93px] md:w-[140px]">
      <path d="M28 18 L80 60 L28 102" stroke="#e4ded7" strokeWidth="18" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" />
      <path d="M108 18 L160 60 L108 102" stroke="#e4ded7" strokeWidth="18" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" />
    </svg>
  );
}
const EncryptedSystemCanvas = memo(({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let frame = 0;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    const render = () => {
      drawEncryptedAsciiGrid(context, canvas.width, canvas.height, 0.58);
      if (active) frame = requestAnimationFrame(render);
      };

    resize();
    window.addEventListener('resize', resize);
    if (active) {
      render();
    } else {
      context.fillStyle = '#08090c';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10 h-full w-full" />;
});
EncryptedSystemCanvas.displayName = 'EncryptedSystemCanvas';

type VaultPhase = 'idle' | 'opening' | 'visible' | 'closing';

export function LetsConnect() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const blackBackgroundRef = useRef<HTMLDivElement>(null);
  const leftChevronRef = useRef<HTMLDivElement>(null);
  const rightChevronRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const socialRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const vaultDrawerRef = useRef<HTMLDivElement>(null);
  const vaultTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const vaultHoldRef = useRef<gsap.core.Tween | null>(null);
  const vaultPhaseRef = useRef<VaultPhase>('idle');
  const overscrollDistanceRef = useRef(0);
  const [isEncryptedActive, setIsEncryptedActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const blackBackground = blackBackgroundRef.current;
    const leftChevron = leftChevronRef.current;
    const rightChevron = rightChevronRef.current;
    const heading = headingRef.current;
    const accentLine = accentLineRef.current;
    const subtitle = subtitleRef.current;
    const vaultDrawer = vaultDrawerRef.current;

    if (!section || !wrapper || !blackBackground || !leftChevron || !rightChevron || !heading || !accentLine || !subtitle || !vaultDrawer) {
      return;
    }

    const socialLinks = Array.from(wrapper.querySelectorAll<HTMLAnchorElement>('.social-link-item'));
    const primarySocialLinks = socialLinks.slice(0, 4);
    const emailLink = socialLinks[4] ?? null;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const edgeInset = isMobile ? 16 : window.innerWidth < 1280 ? 42 : 72;
    const arrowWidth = isMobile ? 75 : window.innerWidth < 768 ? 110 : 140;
    const verticalTravel = Math.min(window.innerHeight * (isMobile ? 0.18 : 0.24), isMobile ? 130 : 190);
    const horizontalTravel = Math.max(0, window.innerWidth / 2 - edgeInset - arrowWidth);

    const setRestingState = () => {
      gsap.set(blackBackground, { autoAlpha: 1 });
      gsap.set(leftChevron, { x: -horizontalTravel, y: -verticalTravel, force3D: true });
      gsap.set(rightChevron, { x: horizontalTravel, y: verticalTravel, force3D: true });
      gsap.set(heading, { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' });
      gsap.set(accentLine, { autoAlpha: 1, scaleX: 1 });
      gsap.set(subtitle, { autoAlpha: 1, y: 0 });
      gsap.set(socialLinks, { autoAlpha: 1, y: 0 });
    };

    if (reducedMotion) {
      setRestingState();
      return;
    }

    const context = gsap.context(() => {
      gsap.set(blackBackground, { autoAlpha: 0 });
      gsap.set([leftChevron, rightChevron], { x: 0, y: 0, force3D: true });
      gsap.set(heading, { autoAlpha: 0, y: 24, clipPath: 'inset(50% 0% 50% 0%)' });
      gsap.set(accentLine, { autoAlpha: 0, scaleX: 0 });
      gsap.set(subtitle, { autoAlpha: 0, y: 18 });
      gsap.set(socialLinks, { autoAlpha: 0, y: 16 });
      gsap.set(vaultDrawer, { yPercent: 100, force3D: true });

      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => '+=' + window.innerHeight * 2,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Stage 1: vertical-only motion. Stage 2: horizontal-only motion.
      revealTimeline
        .to(leftChevron, { y: -verticalTravel, duration: 0.3, ease: 'power2.out', force3D: true }, 0)
        .to(rightChevron, { y: verticalTravel, duration: 0.3, ease: 'power2.out', force3D: true }, 0)
        .to(leftChevron, { x: -horizontalTravel, duration: 0.42, ease: 'power3.out', force3D: true }, 0.3)
        .to(rightChevron, { x: horizontalTravel, duration: 0.42, ease: 'power3.out', force3D: true }, 0.3)
        .to(blackBackground, { autoAlpha: 1, duration: 0.2, ease: 'power2.out' }, 0.36)
        .to(heading, { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.22, ease: 'power3.out' }, 0.4)
        .to(accentLine, { autoAlpha: 1, scaleX: 1, duration: 0.12, ease: 'power2.out' }, 0.52)
        .to(subtitle, { autoAlpha: 1, y: 0, duration: 0.16, ease: 'power3.out' }, 0.58);

      if (primarySocialLinks.length > 0) {
        revealTimeline.to(primarySocialLinks, {
          autoAlpha: 1,
          y: 0,
          duration: 0.16,
          stagger: 0.05,
          ease: 'power3.out',
        }, 0.68);
      }

      if (emailLink) {
        revealTimeline.to(emailLink, {
          autoAlpha: 1,
          y: 0,
          duration: 0.16,
          ease: 'power3.out',
        }, 1.04);
      }

      const vaultTimeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          if (vaultPhaseRef.current !== 'opening') return;
          vaultPhaseRef.current = 'visible';
          vaultHoldRef.current = gsap.delayedCall(1, () => {
            if (vaultPhaseRef.current !== 'visible') return;
            vaultPhaseRef.current = 'closing';
            vaultTimeline.reverse();
          });
        },
        onReverseComplete: () => {
          vaultPhaseRef.current = 'idle';
          overscrollDistanceRef.current = 0;
          setIsEncryptedActive(false);
        },
      });

      vaultTimeline.to(vaultDrawer, {
        yPercent: 0,
        duration: 0.38,
        ease: 'power3.inOut',
        force3D: true,
        });
      vaultTimelineRef.current = vaultTimeline;
    }, section);

    const isAtDocumentBottom = () => (
      Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 1
    );

    const openVault = () => {
      const vaultTimeline = vaultTimelineRef.current;
      if (!vaultTimeline || vaultPhaseRef.current !== 'idle') return;

      vaultPhaseRef.current = 'opening';
      overscrollDistanceRef.current = 0;
      setIsEncryptedActive(true);
      vaultTimeline.play(0);
    };

    const handleWheel = (event: WheelEvent) => {
      if (vaultPhaseRef.current !== 'idle') {
        event.preventDefault();
        return;
      }

      if (event.deltaY > 0 && isAtDocumentBottom()) {
        event.preventDefault();
        overscrollDistanceRef.current += event.deltaY;
        if (overscrollDistanceRef.current >= 32) openVault();
      } else if (event.deltaY < 0) {
        overscrollDistanceRef.current = 0;
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };
    const handleTouchMove = (event: TouchEvent) => {
      if (vaultPhaseRef.current !== 'idle') {
        event.preventDefault();
        return;
      }

      const currentY = event.touches[0]?.clientY ?? touchStartY;
      if (touchStartY - currentY >= 32 && isAtDocumentBottom()) {
        event.preventDefault();
        openVault();
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      context.revert();
      vaultHoldRef.current?.kill();
      vaultTimelineRef.current?.kill();
      vaultHoldRef.current = null;
      vaultTimelineRef.current = null;
      vaultPhaseRef.current = 'idle';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <section id="lets-connect" ref={sectionRef} className="lets-connect relative z-10 w-full bg-[#df5838]">
      <div ref={wrapperRef} className="relative flex h-screen w-full select-none items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#df5838]" />
        <div ref={blackBackgroundRef} className="absolute inset-0 z-[1] bg-[#08090c] will-change-[opacity]" />

        <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 -ml-3 -translate-x-full -translate-y-1/2">
            <div ref={leftChevronRef} className="will-change-transform">
              <LeftAccentureChevron />
            </div>
            </div>
          <div className="absolute left-1/2 top-1/2 ml-3 -translate-y-1/2">
            <div ref={rightChevronRef} className="will-change-transform">
              <RightAccentureChevron />
            </div>
          </div>
        </div>

        <div className="pointer-events-auto relative z-30 mx-auto flex max-w-[840px] flex-col items-center justify-center px-6 text-center sm:px-10">
          <h2 ref={headingRef} className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[0.14em] text-[#e4ded7] will-change-[clip-path,transform,opacity]">
            LET&apos;S CONNECT
          </h2>
          <div ref={accentLineRef} className="mt-5 mb-7 h-[2px] w-16 origin-center bg-[var(--color-accent-rust)] will-change-transform" />
          <p ref={subtitleRef} className="mb-12 max-w-[480px] font-roboto text-sm leading-relaxed text-[#e4ded7]/80 will-change-transform sm:text-base">
            Interested in cybersecurity, collaboration, or building something meaningful? Let&apos;s build together.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {SOCIALS.map((social, index) => (
              <a
                key={social.name}
                ref={(element) => {
                  socialRefs.current[index] = element;
                }}
                href={social.url}
                target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="social-link-item group flex cursor-pointer flex-col items-center gap-2.5 will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-rust)]"
                aria-label={social.name + ' — ' + social.label}
              >
                <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[16px] border border-white/[0.08] bg-white/[0.03] text-[#ece8e2]/75 transition-all duration-200 ease-out group-hover:-translate-y-1.5 group-hover:border-[#e4ded7] group-hover:bg-[#e4ded7] group-hover:text-[#08090c] group-hover:shadow-[0px_14px_32px_rgba(0,0,0,0.45)] sm:h-[64px] sm:w-[64px]">
                  {social.icon}
                </div>
                <span className="flex select-none flex-col items-center gap-0.5">
                  <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#e4ded7] transition-colors duration-200 group-hover:text-[var(--color-accent-rust)]">
                    {social.name}
                  </span>
                  <span className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-[#86888f]">
                    {social.label}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute right-0 bottom-6 left-0 z-30 flex justify-center">
          <p className="select-none font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[#86888f]/40">
            © {new Date().getFullYear()} MOHAMED IRFAN • ALL RIGHTS RESERVED
          </p>
        </div>
      </div>

      <div
        ref={vaultDrawerRef}
        className="pointer-events-none fixed right-0 bottom-0 left-0 z-[9999] h-[38svh] overflow-hidden bg-[#08090c] will-change-transform"
        aria-hidden="true"
      >
        <EncryptedSystemCanvas active={isEncryptedActive} />
        <div className="absolute top-4 left-6 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#e4ded7] backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#df5838]" />
          <span>PORTFOLIO_FIRMWARE_CORE // CLASSIFIED_RAM_DUMP</span>
        </div>
        <div className="absolute right-6 bottom-4 z-20 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-[#86888f] backdrop-blur-md">
          © {new Date().getFullYear()} MOHAMED IRFAN • ENCRYPTED LAYER
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-30 opacity-40"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
          }}
        />
      </div>
    </section>
  );
}
