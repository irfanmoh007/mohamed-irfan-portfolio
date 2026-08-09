'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CERTIFICATES, CertificateItem } from '@/data/certificates';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CIPHER = '01!#$%&*ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function decryptFrame(value: string, resolution: number) {
  return [...value]
    .map((character) => {
      if (character === ' ' || character === '–' || character === '-' || character === '&') {
        return character;
      }

      return Math.random() < resolution
        ? character
        : CIPHER[Math.floor(Math.random() * CIPHER.length)];
    })
    .join('');
}

function padArchiveNumber(index: number) {
  return String(index + 1).padStart(2, '0');
}

function CertificateFrame({ item, index }: { item: CertificateItem; index: number }) {
  const content = item.image ? (
    <img
      src={item.image}
      alt={`${item.title} certificate`}
      className="h-full w-full object-cover"
      draggable={false}
    />
  ) : (
    <div className="flex h-full w-full flex-col justify-between p-6 sm:p-8">
      <span className="font-mono text-[0.62rem] font-bold tracking-[0.18em] text-[var(--color-accent-rust)]">
        0{index + 1} / 0{CERTIFICATES.length}
      </span>
      <div>
        <p className="mb-3 font-mono text-[0.62rem] tracking-[0.18em] text-[#86888f]">
          ARCHIVE PENDING
        </p>
        <p className="font-display text-xl font-bold text-[#e4ded7] sm:text-2xl">{item.title}</p>
      </div>
      <span className="font-mono text-[0.62rem] tracking-[0.16em] text-[#86888f]">{item.status}</span>
    </div>
  );

  const frame = (
    <article className="overflow-hidden rounded-[10px] border border-white/[0.12] bg-[#0c0d12] aspect-[1.42/1]">
      {content}
    </article>
  );

  return item.credentialUrl ? (
    <a
      href={item.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-rust)]"
      aria-label={`Verify ${item.title}`}
    >
      {frame}
    </a>
  ) : (
    frame
  );
}

function TelemetryPanel({ activeIndex, decipheredTitle }: { activeIndex: number; decipheredTitle: string }) {
  const item = CERTIFICATES[activeIndex];
  const skills = item.badge
    .split('&')
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <aside className="flex h-full flex-col justify-center py-10 lg:py-14" aria-live="polite">
      <p className="mb-5 font-mono text-[0.65rem] font-bold tracking-[0.2em] text-[var(--color-accent-rust)]">
        CREDENTIAL ARCHIVE
      </p>
      <h2 className="mb-7 whitespace-nowrap font-display text-[clamp(1.15rem,2.2vw,3.8rem)] font-extrabold leading-[0.88] tracking-[0.1em] text-[#e4ded7]">
        CERTIFICATION
      </h2>
      <div className="mb-14 h-px w-14 bg-[var(--color-accent-rust)]" />

      <div className="max-w-[34rem]">
        <div className="mb-8 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 font-mono text-[0.66rem] uppercase tracking-[0.13em]">
          <span className="font-bold text-[var(--color-accent-rust)]">
            {padArchiveNumber(activeIndex)} / {String(CERTIFICATES.length).padStart(2, '0')}
          </span>
          <span className="text-[#86888f]">Archive position</span>
          <span className="text-[#e4ded7]">{item.issuer}</span>
          <span className="text-[#86888f]">Platform</span>
          <span className="text-[#e4ded7]">{item.year}</span>
          <span className="text-[#86888f]">Year</span>
          <span className={item.status === 'IN PROGRESS' ? 'text-[var(--color-accent-rust)]' : 'text-[#e4ded7]'}>
            {item.status ?? 'COMPLETED'}
          </span>
          <span className="text-[#86888f]">Status</span>
        </div>

        <h3 className="mb-4 min-h-[3.8rem] font-display text-2xl font-bold leading-tight text-[#e4ded7] lg:text-3xl">
          {decipheredTitle}
        </h3>
        <p className="mb-7 font-roboto text-[0.94rem] leading-[1.7] text-[#e4ded7]/75">
          {item.telemetryDescription}
        </p>

        <div className="mb-8 border-y border-white/[0.08] py-4">
          <p className="mb-3 font-mono text-[0.61rem] tracking-[0.17em] text-[#86888f]">SKILLS</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-[#e4ded7]">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        {item.credentialUrl && (
          <a
            href={item.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--color-accent-rust)] transition-colors hover:text-[#e4ded7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-rust)]"
          >
            Verify credential <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </aside>
  );
}

export function CertificatesArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<Array<HTMLDivElement | null>>([]);
  const geometry = useRef({ startY: 0, endY: 0, centers: [] as number[], scannerOffset: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [decipheredTitle, setDecipheredTitle] = useState(CERTIFICATES[0].telemetryTitle);

  useEffect(() => {
    const title = CERTIFICATES[activeIndex].telemetryTitle;
    const timeline = gsap.timeline();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timeline.call(() => setDecipheredTitle(title));
      return () => {
        timeline.kill();
      };
    }

    timeline
      .call(() => setDecipheredTitle(decryptFrame(title, 0.12)))
      .to({}, { duration: 0.075 })
      .call(() => setDecipheredTitle(decryptFrame(title, 0.5)))
      .to({}, { duration: 0.075 })
      .call(() => setDecipheredTitle(decryptFrame(title, 0.82)))
      .to({}, { duration: 0.07 })
      .call(() => setDecipheredTitle(title));

    return () => {
      timeline.kill();
    };
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    const strip = stripRef.current;
    if (!section || !strip) return;

    const desktop = window.matchMedia('(min-width: 768px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const refreshGeometry = () => {
      const viewportHeight = window.innerHeight;
      const centers = frameRefs.current.map((frame) => (frame ? frame.offsetTop + frame.offsetHeight / 2 : 0));
      const firstCenter = centers[0] ?? 0;
      const lastCenter = centers[centers.length - 1] ?? firstCenter;

      geometry.current = {
        centers,
        startY: viewportHeight * 1.08 - firstCenter,
        endY: viewportHeight / 2 - lastCenter,
        scannerOffset: strip.offsetWidth * 0.11,
      };
    };

    const findActiveIndex = (currentY: number) => {
      const midpoint = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      geometry.current.centers.forEach((center, index) => {
        const distance = Math.abs(center + currentY - midpoint);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((current) => (current === closestIndex ? current : closestIndex));
    };

    const context = gsap.context(() => {
      if (reducedMotion.matches) return;

      if (desktop.matches) {
        refreshGeometry();
        gsap.set(strip, { y: geometry.current.startY, force3D: true });

        gsap.fromTo(
          strip,
          { y: () => geometry.current.startY },
          {
            y: () => geometry.current.endY,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${window.innerHeight * CERTIFICATES.length}`,
              pin: true,
              pinSpacing: true,
              scrub: true,
              invalidateOnRefresh: true,
              onRefreshInit: refreshGeometry,
              onUpdate: (self) => {
                const y = gsap.utils.interpolate(geometry.current.startY, geometry.current.endY, self.progress);
                const midpoint = window.innerHeight / 2;

                frameRefs.current.forEach((frame, index) => {
                  if (!frame) return;

                  const distanceFromCenter = Math.abs(geometry.current.centers[index] + y - midpoint);
                  const scannerProgress = Math.min(distanceFromCenter / midpoint, 1);

                  gsap.set(frame, {
                    x: -geometry.current.scannerOffset * scannerProgress,
                    force3D: true,
                  });
                });

                findActiveIndex(y);
              },
            },
          }
        );

        return;
      }

      frameRefs.current.forEach((frame, index) => {
        if (!frame) return;
        ScrollTrigger.create({
          trigger: frame,
          start: 'center 55%',
          end: 'center 45%',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section id="certificates" ref={sectionRef} className="relative z-10 w-full overflow-hidden bg-[#08090c]">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30" aria-hidden="true">
        <div className="absolute inset-y-0 left-[5vw] w-px bg-white/[0.1]" />
        <div className="absolute inset-y-0 right-[5vw] w-px bg-white/[0.1]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 md:h-screen md:grid-cols-[minmax(0,1fr)_minmax(23rem,0.82fr)] md:gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(26rem,0.88fr)] lg:gap-20">
        <div className="order-2 flex min-h-[64svh] items-center justify-center overflow-hidden px-[9vw] py-[18vh] md:order-1 md:h-screen md:px-[5vw] md:py-0">
          <div className="relative h-full w-full max-w-[39rem] overflow-visible">
            <div
              ref={stripRef}
              className="flex w-full flex-col gap-[clamp(8rem,20vh,14rem)] will-change-transform md:absolute md:left-0 md:top-0"
            >
              {CERTIFICATES.map((item, index) => (
                <div
                  key={item.id}
                  ref={(element) => {
                    frameRefs.current[index] = element;
                  }}
                  className="w-full"
                >
                  <CertificateFrame item={item} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="order-1 px-[9vw] pt-[15vh] md:order-2 md:px-0 md:pr-[5vw] md:pt-0">
          <TelemetryPanel activeIndex={activeIndex} decipheredTitle={decipheredTitle} />
        </div>
      </div>
    </section>
  );
}
