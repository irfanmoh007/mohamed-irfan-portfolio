'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const ProfileCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const cardInner = cardInnerRef.current;
    if (!card || !cardInner) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      // 1. Spotlight Glow coordinates in CSS custom variables
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

      // 2. Parallax 3D Tilt calculation
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -((y - centerY) / centerY) * 12; // Max 12deg tilt
      const rotateY = ((x - centerX) / centerX) * 12;

      gsap.to(cardInner, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000
      });

      // 3. Magnetic pull calculation (pull card toward cursor by max 10 strength)
      const strength = 10;
      const pullX = (clientX - rect.left - rect.width / 2) * (strength / 100);
      const pullY = (clientY - rect.top - rect.height / 2) * (strength / 100);

      gsap.to(card, {
        x: pullX,
        y: pullY,
        duration: 0.6,
        ease: 'power2.out'
      });
    };

    const onMouseLeave = () => {
      // Smooth reset back to initial positions
      gsap.to(cardInner, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      });

      gsap.to(card, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      });
    };

    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="profile-card-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 [perspective:1000px]">
      <div
        ref={cardRef}
        className="profile-card w-[240px] h-[300px] rounded-[16px] border border-[var(--color-border-subtle)] relative cursor-pointer overflow-hidden bg-gradient-to-b from-white/[0.03] to-white/[0.005] backdrop-blur-[20px] shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-300 pointer-events-auto [transform-style:preserve-3d]"
      >
        <div
          ref={cardInnerRef}
          className="profile-card-inner w-full h-full p-6 flex flex-col justify-between items-center relative [transform-style:preserve-3d]"
        >
          {/* Spotlight mouse glow radial gradient overlay */}
          <div 
            className="card-glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-2"
            style={{
              background: 'radial-gradient(120px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(223, 88, 56, 0.12), transparent 80%)'
            }}
          />
          
          <div className="card-border absolute inset-0 rounded-[16px] pointer-events-none z-1 border border-white/5" />

          {/* Avatar graphic wireframe layout */}
          <div className="card-placeholder-graphic flex-grow flex justify-center items-center opacity-40 text-[var(--color-text-primary)] [transform:translateZ(40px)] select-none">
            <svg viewBox="0 0 100 100" fill="none" className="avatar-svg w-[110px] h-[110px]" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
              <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" />
              <path d="M25,82 C30,62 40,55 50,55 C60,55 70,62 75,82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="50" cy="35" r="12" stroke="currentColor" strokeWidth="1.5" />
              <path d="M50,2 L50,98 M2,50 L98,50" stroke="currentColor" strokeWidth="0.25" strokeDasharray="4 8" />
            </svg>
          </div>

          <div className="card-label font-display font-bold text-[0.62rem] tracking-[0.25em] text-[var(--color-text-primary)] select-none opacity-80 mt-4 [transform:translateZ(30px)]">
            MOHAMED IRFAN
          </div>
          <div className="card-tech-tag font-mono font-medium text-[0.55rem] tracking-[0.1em] text-[var(--color-accent-rust)] select-none mt-1 [transform:translateZ(20px)]">
            MI-2026
          </div>
        </div>
      </div>
    </div>
  );
};
