'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Header: React.FC = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  // Apply magnetic effect to logo and contact button
  useEffect(() => {
    const applyMagnetic = (el: HTMLElement, strength = 15) => {
      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
          x: x * (strength / 100),
          y: y * (strength / 100),
          duration: 0.6,
          ease: 'power2.out'
        });

        // Pull child elements slightly for depth effect
        const child = el.querySelector('span, svg, a');
        if (child) {
          gsap.to(child, {
            x: x * ((strength * 0.4) / 100),
            y: y * ((strength * 0.4) / 100),
            duration: 0.6,
            ease: 'power2.out'
          });
        }
      };

      const onMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.45)'
        });
        const child = el.querySelector('span, svg, a');
        if (child) {
          gsap.to(child, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.45)'
          });
        }
      };

      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);

      return () => {
        el.removeEventListener('mousemove', onMouseMove);
        el.removeEventListener('mouseleave', onMouseLeave);
      };
    };

    const logo = logoRef.current;
    const btn = btnRef.current;

    let cleanupLogo: (() => void) | undefined;
    let cleanupBtn: (() => void) | undefined;

    if (logo) cleanupLogo = applyMagnetic(logo, 15);
    if (btn) cleanupBtn = applyMagnetic(btn, 20);

    return () => {
      if (cleanupLogo) cleanupLogo();
      if (cleanupBtn) cleanupBtn();
    };
  }, []);

  return (
    <header className="header fixed top-0 left-0 w-full px-[5vw] py-[30px] flex justify-between items-center z-100 pointer-events-none">
      <div 
        ref={logoRef} 
        className="logo pointer-events-auto"
      >
        <a 
          href="#home" 
          className="font-display font-extrabold text-[1.5rem] text-[var(--color-text-primary)] no-underline tracking-[-0.05em] inline-block"
        >
          MI<span className="text-[var(--color-accent-rust)]">.</span>
        </a>
      </div>
      

      <div className="header-action pointer-events-auto">
        <a 
          ref={btnRef}
          href="#lets-connect" 
          onClick={(e) => {
            e.preventDefault();
            const targetEl = document.getElementById('lets-connect');
            if (targetEl) {
              const rect = targetEl.getBoundingClientRect();
              const scrollTop = window.scrollY || document.documentElement.scrollTop;
              window.scrollTo({ top: rect.top + scrollTop, behavior: 'smooth' });
            }
          }}
          className="group/btn btn btn-primary inline-flex items-center gap-[10px] px-[24px] py-[12px] rounded-[8px] text-[0.75rem] font-semibold uppercase tracking-[0.1em] no-underline border border-[var(--color-text-primary)] text-[var(--color-text-primary)] transition-all duration-300 hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-dark)]"
        >
          <span>LET'S TALK</span>
          <svg className="btn-arrow w-[12px] h-[12px] transition-transform duration-300 group-hover/btn:translate-x-[2px] group-hover/btn:translate-y-[-2px]" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </header>
  );
};
