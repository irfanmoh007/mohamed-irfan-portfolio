'use client';

import React, { useEffect, useState, memo } from 'react';

interface NavItem {
  id: string;
  label: string;
  shortLabel?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'missions', label: 'Missions' },
  { id: 'certificates', label: 'Certificates', shortLabel: 'Certs' },
];

export const HeroNavDock: React.FC = memo(() => {
  const [activeSection, setActiveSection] = useState<string>('home');

  // IntersectionObserver for active section detection
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sectionIds = ['home', 'about', 'skills', 'projects', 'missions', 'certificates', 'lets-connect'];
    sectionIds.forEach((id) => {
      const target = document.getElementById(id);
      if (target) observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      window.scrollTo({ top: rect.top + scrollTop, behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Hero Navigation Console"
      className="hero-nav-dock fixed bottom-[20px] sm:bottom-[28px] md:bottom-[32px] left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[95vw] select-none"
    >
      {/* Outer container: Seamless borderless Orange mixed with Off-White backdrop (No shadows) */}
      <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-[8px] bg-gradient-to-r from-[rgba(223,88,56,0.22)] via-[rgba(228,222,215,0.15)] to-[rgba(223,88,56,0.22)] backdrop-blur-[16px]">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-[5px] font-display font-bold text-[0.85rem] sm:text-[0.92rem] tracking-tight no-underline transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent-rust)] ${
                isActive
                  ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-dark)]'
                  : 'text-[var(--color-text-primary)] hover:bg-white/[0.12] hover:text-[#fff]'
              }`}
            >
              <span className="hidden sm:inline">{item.label}</span>
              <span className="inline sm:hidden">{item.shortLabel || item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
});
HeroNavDock.displayName = 'HeroNavDock';
