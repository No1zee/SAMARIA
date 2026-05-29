"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useBalancedWidth } from "@/hooks/useBalancedWidth";
import CelestialHeading from "@/components/ui/CelestialHeading";

export default function IntroHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      setMaxWidth(containerRef.current?.offsetWidth || 0);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Use Case 2: Balanced Typography
  // We want to find the tightest width for the headline to avoid orphans.
  const headline = "You have the vision. We have the systems to build it.";
  const balancedWidth = useBalancedWidth(
    headline,
    "900 48px Cinzel", // Approximate font for measurement
    maxWidth > 0 ? maxWidth : 1200
  );
  return (
    <section className="relative py-32 flex items-center justify-center overflow-hidden border-t border-brand-gold/10">
      <div className="container max-w-[1200px] mx-auto px-6 relative z-10" ref={containerRef}>
        {/* Ambient backing — scoped to container, fades right like hero */}
        <div className="absolute inset-0 bg-gradient-to-r from-royal-obsidian via-royal-obsidian/80 to-transparent blur-md opacity-90 pointer-events-none -z-10" />
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Label */}
          <div className="section-label mb-8">
            00 // THE PHILOSOPHY
          </div>

          {/* New Hook Headline */}
          <CelestialHeading 
            as="h2"
            text={headline}
            fontSize={56}
            className="mb-10 no-prose"
          />

          {/* Description */}
          <p className="text-xl md:text-3xl text-white/85 font-light max-w-4xl mx-auto mb-16 leading-relaxed italic no-prose">
            Most digital infrastructure is built to survive. We build yours to lead. 
            You aren&apos;t looking for a &quot;dev shop&quot;—you&apos;re looking for an architectural partner 
            that understands how software becomes the nervous system of an elite business. 
            We handle the technical complexity so you can focus on the expansion.
          </p>

          {/* Services Grid Small */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
             <div className="p-8 border border-white/5 bg-white/2 rounded-lg backdrop-blur-md hover:border-brand-gold/30 transition-colors">
                <h3 className="font-heading text-xl text-white/95 mb-3 no-prose">Digital Presence</h3>
                <p className="card-description">Pixel-perfect, high-performance web experiences designed to captivate and convert.</p>
             </div>
             <div className="p-8 border border-white/5 bg-white/2 rounded-lg backdrop-blur-md hover:border-brand-gold/30 transition-colors">
                <h3 className="font-heading text-xl text-white/95 mb-3 no-prose">Operational Systems</h3>
                <p className="card-description">Tailor-made software architectures built to streamline complex business operations.</p>
             </div>
             <div className="p-8 border border-white/5 bg-white/2 rounded-lg backdrop-blur-md hover:border-brand-gold/30 transition-colors">
                <h3 className="font-heading text-xl text-white/95 mb-3 no-prose">Strategic Consulting</h3>
                <p className="card-description">End-to-end technology consulting and infrastructure to future-proof your business.</p>
             </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
