"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatsCounterProps {
  stats: Array<{
    value: number;
    label: string;
    suffix?: string;
  }>;
}

export default function StatsCounter({ stats }: StatsCounterProps) {
  const statsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Show final values immediately
      statsRef.current.forEach((stat, i) => {
        if (stat) {
          stat.textContent = stats[i].value.toString() + (stats[i].suffix || '');
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          statsRef.current.forEach((stat, i) => {
            if (!stat) return;

            const statData = stats[i];
            const isInfinity = statData.value === Infinity;

            if (!isInfinity) {
              // Count up animation
              gsap.to(stat, {
                textContent: statData.value,
                duration: 2,
                snap: { textContent: 1 },
                ease: 'power1.out',
                onUpdate: function() {
                  const current = Math.ceil(parseFloat(this.targets()[0].textContent));
                  stat.textContent = current + (statData.suffix || '');
                }
              });
            }

            // Pulse circuit node simultaneously
            if (nodesRef.current[i]) {
              gsap.timeline()
                .to(nodesRef.current[i], {
                  scale: 1.5,
                  opacity: 1,
                  duration: 0.3,
                  ease: 'power2.out'
                })
                .to(nodesRef.current[i], {
                  scale: 1,
                  opacity: 0.4,
                  duration: 0.5,
                  ease: 'power2.in'
                })
                .to(nodesRef.current[i], {
                  scale: 1.3,
                  opacity: 0.8,
                  duration: 0.4,
                  ease: 'power2.out'
                })
                .to(nodesRef.current[i], {
                  scale: 1,
                  opacity: 0.4,
                  duration: 0.6,
                  ease: 'power2.in'
                });
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <div ref={sectionRef} className="mt-10 space-y-6">
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center gap-4 border-l-2 border-brand-gold/30 pl-4">
          {/* Circuit Node */}
          <div
            ref={(el) => { nodesRef.current[i] = el; }}
            className="w-3 h-3 rounded-full bg-brand-gold opacity-40 transition-[colors,opacity] duration-300 glow-gold"
          />
          
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span
                ref={(el) => { statsRef.current[i] = el; }}
                className="font-heading text-2xl text-brand-gold"
              >
                {stat.value === Infinity ? '∞' : '0'}
              </span>
              <span className="font-heading text-2xl text-brand-gold">
                {stat.value !== Infinity && stat.suffix}
              </span>
            </div>
            <span className="font-ui text-xs text-off-white/60 leading-relaxed">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
