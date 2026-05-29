"use client";

import { motion } from "framer-motion";
import { ArrowRight, Box, Shield, Zap } from "lucide-react";
import Link from "next/link";
import CelestialHeading from "@/components/ui/CelestialHeading";

export default function About() {
  const blocks = [
    {
      icon: Box,
      title: "Custom websites and systems",
      desc: "We design and build bespoke web portals, platforms, and dashboards. Every system is built to scale naturally, run fast, and integrate seamlessly with your operational tools."
    },
    {
      icon: Zap,
      title: "Architecture over shortcuts",
      desc: "We avoid fragile page builders and shortcut frameworks. By prioritizing stable coding standards and clean structure, your digital infrastructure remains useful long after launch."
    },
    {
      icon: Shield,
      title: "Full ownership, clear handover",
      desc: "Every asset, code repository, and configuration is handed over completely. You retain full control of your systems, supported by clear documentation and plain language."
    }
  ];

  return (
    <section id="positioning" className="py-16 md:py-fb8 relative overflow-hidden bg-black/10">
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Section Header */}
        <div className="mb-fb6 border-l border-metallic-brass/40 pl-6 md:pl-8 max-w-3xl">
          <span className="section-label mb-3 block">CREDIBILITY</span>
          <CelestialHeading 
            as="h2" 
            text="Built for the long run." 
            fontSize={56} 
            className="mb-fb3 uppercase tracking-tighter no-prose" 
            intensity={0.6} 
          />
          <p className="text-white/70 text-sm md:text-base font-body leading-relaxed max-w-2xl no-prose">
            We build digital infrastructure with full ownership and clear communication, designed to support your operations without technical debt or platform dependency.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-fb6">
          {blocks.map((block, idx) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="p-8 border border-white/5 bg-white/5 hover:border-metallic-brass/25 transition-colors duration-500 clip-blade-sm flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 w-fit rounded-lg bg-white/5 border border-white/10 text-metallic-brass mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg md:text-xl font-heading text-off-white uppercase tracking-tighter mb-4">
                    {block.title}
                  </h3>
                  <p className="text-xs md:text-sm font-body text-white/50 leading-relaxed">
                    {block.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section CTA */}
        <div className="flex justify-end pr-4">
          <Link 
            href="/start-project"
            className="inline-flex items-center gap-4 text-metallic-brass hover:text-white transition-colors uppercase tracking-[0.2em] font-ui text-xs group border-b border-metallic-brass/20 hover:border-white pb-1"
          >
            Start Your Build <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
