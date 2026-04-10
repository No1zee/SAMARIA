"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useBalancedWidth } from "@/hooks/useBalancedWidth";

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
  const headline = "You have the vision. We have the forge to build it.";
  const balancedWidth = useBalancedWidth(
    headline,
    "900 48px Cinzel", // Approximate font for measurement
    maxWidth > 0 ? maxWidth : 1200
  );
  return (
    <section className="relative py-32 flex items-center justify-center overflow-hidden bg-royal-obsidian border-t border-brand-gold/10">
      {/* Background circuit pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-circuit-grid" />
      </div>

      {/* Content */}
      <div className="container max-w-[1200px] mx-auto px-6 relative z-10" ref={containerRef}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Label */}
          <div className="font-ui text-xs md:text-sm text-brand-gold tracking-[0.4em] uppercase mb-8">
            The Philosophy
          </div>

          {/* New Hook Headline */}
          <motion.h2 
            className="font-heading text-4xl md:text-6xl text-off-white mb-10 leading-tight mx-auto transition-[max-width] duration-500 uppercase"
            style={{ maxWidth: maxWidth > 0 ? balancedWidth : "none" }}
          >
            {headline}
          </motion.h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-off-white/70 font-light max-w-3xl mx-auto mb-16 leading-relaxed">
            Most digital infrastructure is built to survive. We build yours to lead. 
            You aren&apos;t looking for a &quot;dev shop&quot;—you&apos;re looking for an architectural partner 
            that understands how software becomes the nervous system of an elite business. 
            We handle the technical complexity so you can focus on the expansion.
          </p>

          {/* Services Grid Small */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
             <div className="p-8 border border-white/5 bg-white/2 rounded-lg backdrop-blur-xs hover:border-brand-gold/30 transition-colors">
                <h3 className="font-heading text-xl text-off-white mb-3">Digital Presence</h3>
                <p className="text-sm text-off-white/60">Pixel-perfect, high-performance web experiences designed to captivate and convert.</p>
             </div>
             <div className="p-8 border border-white/5 bg-white/2 rounded-lg backdrop-blur-xs hover:border-brand-gold/30 transition-colors">
                <h3 className="font-heading text-xl text-off-white mb-3">Operational Systems</h3>
                <p className="text-sm text-off-white/60">Tailor-made software architectures built to streamline complex business operations.</p>
             </div>
             <div className="p-8 border border-white/5 bg-white/2 rounded-lg backdrop-blur-xs hover:border-brand-gold/30 transition-colors">
                <h3 className="font-heading text-xl text-off-white mb-3">Strategic Consulting</h3>
                <p className="text-sm text-off-white/60">End-to-end technology consulting and infrastructure to future-proof your business.</p>
             </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
