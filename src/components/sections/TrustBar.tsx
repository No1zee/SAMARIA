"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Star, Clock } from "lucide-react";

const stats = [
  { value: "01 //", label: "Genesis Era", icon: <TrendingUp className="w-5 h-5" /> },
  { value: "50+", label: "Vetted Entities", icon: <Users className="w-5 h-5" /> },
  { value: "100%", label: "Architectural Integrity", icon: <Star className="w-5 h-5" /> },
  { value: "2026 //", label: "The New Standard", icon: <Clock className="w-5 h-5" /> },
];

const CLIENTS = [
  "LumiStream", "V-Admin", "CoreFlow", "Delta Dynamics", "Apex Global"
];

export default function TrustBar() {
  return (
    <section className="relative py-16 bg-royal-obsidian border-y border-brand-red/10 overflow-hidden">
      {/* Subtle gradient line */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(218,26,26,0.04)_0%,transparent_70%)]" />

      <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-brand-red/10 overflow-visible relative">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center px-6 py-4 relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              {/* Trick 10: Aku-Tech Holographic Pulse */}
              <div className="absolute inset-0 bg-brand-red/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 rounded-full scale-50" />
              
              {/* Decorative Corner Glyphs (Holographic) */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-red/40 group-hover:border-brand-red transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-red/40 group-hover:border-brand-red transition-colors" />

              {/* Icon */}
              <div className="relative z-10 text-spirit-red/60 mb-3 group-hover:text-spirit-red transition-colors group-hover:scale-110 duration-300">
                {stat.icon}
              </div>
              {/* Value */}
              <div className="relative z-10 text-4xl md:text-5xl font-bold text-spirit-red font-heading mb-2 leading-none tabular-nums tracking-tighter group-hover:animate-pulse">
                {stat.value}
              </div>
              {/* Label */}
              <div className="relative z-10 text-[10px] md:text-xs text-off-white/40 font-ui uppercase tracking-[0.2em] group-hover:text-off-white/80 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Logo Grid */}
        <div className="mt-16 pt-12 border-t border-brand-red/10 overflow-hidden">
          <div className="text-center mb-8">
            <span className="font-ui text-[10px] text-off-white/30 uppercase tracking-[0.4em]">
              The Next Generation of Infrastructure // Built for the African Century
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {CLIENTS.map((client, i) => (
              <span key={i} className="font-heading text-lg md:text-xl text-off-white/60 hover:text-spirit-red transition-colors cursor-default">
                {client}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonial Snippet */}
        <motion.div 
          className="mt-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-off-white/60 italic text-sm md:text-lg leading-relaxed">
            &quot;Samaria isn&apos;t a legacy firm trying to adapt; it was born in the agentic era. 
            They architect digital nervous systems for those who realize the old blueprints no longer work. 
            Our ideology is built on radical transparency and high-fidelity resilience.&quot;
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-6 h-px bg-brand-red/30" />
            <span className="font-ui text-[10px] text-spirit-red uppercase tracking-widest">Digital Strategist, LumiStream</span>
            <div className="w-6 h-px bg-brand-red/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
