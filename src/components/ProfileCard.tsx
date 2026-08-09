'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const ProfileCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = cardWrapperRef.current;
    const card = cardRef.current;
    if (!wrapper || !card) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      // 1. Spotlight Glow coordinates relative to stationary wrapper
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

      // 2. Smooth 2D Magnetic Pull
      const strength = 32;
      const pullX = (clientX - rect.left - rect.width / 2) * (strength / 100);
      const pullY = (clientY - rect.top - rect.height / 2) * (strength / 100);

      gsap.to(card, {
        x: pullX,
        y: pullY,
        duration: 0.35,
        ease: 'power2.out'
      });
    };

    const onMouseLeave = () => {
      if (!cardRef.current) return;
      gsap.to(cardRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
      });
    };

    wrapper.addEventListener('mousemove', onMouseMove);
    wrapper.addEventListener('mouseleave', onMouseLeave);

    return () => {
      wrapper.removeEventListener('mousemove', onMouseMove);
      wrapper.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardWrapperRef}
      className="profile-card-container absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[35%] z-20 pointer-events-auto w-[clamp(105px,13.7vw,196px)] h-[clamp(105px,13.7vw,196px)]"
    >
      <div
        ref={cardRef}
        className="profile-card w-full h-full rounded-[32px] relative cursor-pointer overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] transition-all duration-300 pointer-events-auto"
      >
        {/* Full Cover Portrait Image (Original Color, Rounded Apple Style) */}
        <img 
          src="/profile.jpg" 
          alt="Mohamed Irfan" 
          className="absolute inset-0 w-full h-full object-cover rounded-[32px] pointer-events-none select-none"
        />

        {/* Spotlight mouse glow radial gradient overlay */}
        <div 
          className="card-glow absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-2"
          style={{
            background: 'radial-gradient(140px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(223, 88, 56, 0.15), transparent 80%)'
          }}
        />
      </div>
    </div>
  );
};
