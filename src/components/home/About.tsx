"use client";

import { motion } from "framer-motion";
import { ArrowRight, Box, Shield, Zap } from "lucide-react";
import Link from "next/link";
import CelestialHeading from "@/components/ui/CelestialHeading";

export default function About() {
  const blocks = [
    {
      icon: Box,
      title: "What we build",
      desc: "Custom websites, internal tools, client portals, and operational systems designed around the real needs of the business, not generic templates."
    },
    {
      icon: Zap,
      title: "How we build",
      desc: "We begin with structure, not decoration. That means better performance, easier maintenance, and systems that can keep working as the business grows."
    },
    {
      icon: Shield,
      title: "What you keep",
      desc: "You keep the code, the documentation, and the clarity to manage what has been built. No black boxes, no dependency by design."
    }
  ];

  return (
    <section id="about" className="py-16 md:py-36 relative overflow-hidden bg-zinc-950/70 border-y border-white/5 backdrop-blur-sm">
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Section Header */}
        <div className="mb-fb6 border-l border-metallic-brass/40 pl-6 md:pl-8 max-w-3xl">
          <span className="section-label mb-3 block">POSITIONING</span>
          <CelestialHeading 
            as="h2" 
            text="Infrastructure, not improvisation." 
            fontSize={56} 
            className="mb-fb3 uppercase tracking-tighter no-prose" 
            intensity={0.6} 
          />
          <p className="text-white/70 text-sm md:text-base font-body leading-relaxed max-w-2xl no-prose">
            Samaria builds digital systems for businesses that intend to last. We focus on clear architecture, practical execution, and handover that leaves clients in control of what they paid for.
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
            Start a Project <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
