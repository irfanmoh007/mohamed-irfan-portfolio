'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, useAnimationControls } from 'framer-motion';

interface SectionTransitionProps {
  aboutMeRef: React.RefObject<HTMLElement | null>;
  onTitleRevealComplete?: () => void;
  onReset?: () => void;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({ 
  aboutMeRef,
  onTitleRevealComplete,
  onReset
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textControls = useAnimationControls();
  const [hasStartedReveal, setHasStartedReveal] = useState(false);

  // useScroll binds the target directly to the AboutMe section container
  // "start start" -> top of AboutMe reaches top of viewport
  // "end start"   -> bottom of AboutMe reaches top of viewport (AboutMe fully exits)
  const { scrollYProgress } = useScroll({
    target: aboutMeRef,
    offset: ["start start", "end start"]
  });

  // Spring only drives the VISUAL transforms (smooth glide appearance)
  // The TRIGGER uses raw scrollYProgress so fast scrolling always fires it
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.8,
    restDelta: 0.001
  });

  // 1. Width Morphing — line → pill during travel
  const width = useTransform(
    smoothProgress,
    [0.0, 0.4, 0.6, 0.75, 0.88, 1.0],
    ["2px", "2px", "24px", "100px", "280px", "280px"]
  );

  // 2. Height Morphing — line collapses to capsule height during travel
  const height = useTransform(
    smoothProgress,
    [0.0, 0.4, 0.6, 0.75, 0.88, 1.0],
    ["200px", "120px", "80px", "54px", "56px", "56px"]
  );

  // 3. Border Radius — square edge → rounded pill
  const borderRadius = useTransform(
    smoothProgress,
    [0.0, 0.4, 0.6, 0.75, 0.88, 1.0],
    ["1px", "1.5px", "12px", "16px", "16px", "16px"]
  );

  // 4. Background Color — near-black → transparent off-white
  const backgroundColor = useTransform(
    smoothProgress,
    [0.0, 0.4, 0.6, 0.75, 0.88, 1.0],
    ["#111111", "#111111", "rgba(228,222,215,0.01)", "rgba(228,222,215,0.02)", "rgba(228,222,215,0.02)", "rgba(228,222,215,0.02)"]
  );

  // 5. Border — fades in as capsule forms
  const borderColor = useTransform(
    smoothProgress,
    [0.0, 0.4, 0.6, 0.75, 0.88, 1.0],
    ["rgba(228,222,215,0)", "rgba(228,222,215,0)", "rgba(228,222,215,0.05)", "rgba(228,222,215,0.1)", "rgba(228,222,215,0.1)", "rgba(228,222,215,0.1)"]
  );
  const borderWidth = useTransform(
    smoothProgress,
    [0.0, 0.82, 0.88, 1.0],
    ["0px", "0px", "1px", "1px"]
  );

  // 6. Y Position — emerges early, glides down, lands at final resting spot
  const y = useTransform(
    smoothProgress,
    [0.0, 0.4, 0.6, 0.75, 0.88, 1.0],
    [-50, -10, 40, 85, 110, 110]
  );

  // 7. Shadow — appears only at final settled position
  const boxShadow = useTransform(
    smoothProgress,
    [0.0, 0.75, 0.88, 1.0],
    [
      "0px 0px 0px rgba(0,0,0,0)",
      "0px 0px 0px rgba(0,0,0,0)",
      "0px 8px 24px rgba(0,0,0,0.35)",
      "0px 8px 24px rgba(0,0,0,0.35)"
    ]
  );

  // 9. Micro Rotation — organic settle from -1.5° to 0°
  const rotate = useTransform(
    smoothProgress,
    [0.0, 0.4, 0.6, 0.75, 0.88, 1.0],
    ["0deg", "0deg", "-1.5deg", "-1.2deg", "0deg", "0deg"]
  );

  // Sequence: landing beat → text reveal → skills cascade
  const triggerSequence = async () => {
    await new Promise((resolve) => setTimeout(resolve, 30));

    await textControls.start({
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
    });

    await new Promise((resolve) => setTimeout(resolve, 25));

    if (onTitleRevealComplete) {
      onTitleRevealComplete();
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.65) {
      if (!hasStartedReveal) {
        setHasStartedReveal(true);
        triggerSequence();
      }
    } else if (latest < 0.42) {
      if (hasStartedReveal) {
        setHasStartedReveal(false);
        textControls.set({ opacity: 0, clipPath: "inset(0% 100% 0% 0%)" });
        if (onReset) {
          onReset();
        }
      }
    }
  });

  return (
    <div 
      ref={containerRef}
      className="section-transition relative w-full h-[184px] bg-[#08090c] flex justify-center items-start overflow-visible z-20 pointer-events-none"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-y-0 left-[5vw] w-[1px] bg-white/10" />
        <div className="absolute inset-y-0 right-[5vw] w-[1px] bg-white/10" />
      </div>

      <motion.div
        style={{
          width,
          height,
          borderRadius,
          backgroundColor,
          borderColor,
          borderWidth,
          boxShadow,
          rotate,
          y,
          borderStyle: "solid"
        }}
        className="absolute left-1/2 -translate-x-1/2 flex justify-center items-center backdrop-blur-[12px] z-20 overflow-hidden pointer-events-auto will-change-transform"
      >
        {/* MY SKILLS — revealed left-to-right after landing */}
        <motion.span
          initial={{ opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }}
          animate={textControls}
          className="font-display font-extrabold text-[1.35rem] lg:text-[1.45rem] tracking-[-0.04em] text-[var(--color-brand-primary)] uppercase select-none leading-none pt-[1px] whitespace-nowrap"
        >
          MY SKILLS
        </motion.span>
      </motion.div>
    </div>
  );
};
