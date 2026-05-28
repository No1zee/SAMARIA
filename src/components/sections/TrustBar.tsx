"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Star, Clock } from "lucide-react";
import CountUp from "@/components/ui/CountUp";

const stats = [
  { value: 2023, label: "Est.", icon: <TrendingUp className="w-5 h-5" />, prefix: "" },
  { value: 50, label: "Clients", icon: <Users className="w-5 h-5" />, suffix: "+" },
  { value: 100, label: "Delivered on Spec", icon: <Star className="w-5 h-5" />, suffix: "%" },
  { value: 2, label: "Systems Built", icon: <Clock className="w-5 h-5" />, prefix: "$", suffix: "M+" },
];

const CLIENTS = [
  {
    name: "LumiStream",
    icon: (
      <svg className="w-3.5 h-3.5 mr-2 text-metallic-brass/70 group-hover:text-metallic-brass transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12c4-4 8 4 12 0s8-4 8-4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17c4-4 8 4 12 0s8-4 8-4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    )
  },
  {
    name: "Obsidian Core",
    icon: (
      <svg className="w-3.5 h-3.5 mr-2 text-metallic-brass/70 group-hover:text-metallic-brass transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 12l10 10 10-10L12 2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 6l-6 6 6 6 6-6-6-6z" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    )
  },
  {
    name: "Aether Inst.",
    icon: (
      <svg className="w-3.5 h-3.5 mr-2 text-metallic-brass/70 group-hover:text-metallic-brass transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 22V18M20 22V18M4 6H20M4 2H20" strokeLinecap="round" />
        <path d="M7 18V6M12 18V6M17 18V6" strokeLinecap="round" opacity="0.6" />
      </svg>
    )
  },
  {
    name: "Delta Dynamics",
    icon: (
      <svg className="w-3.5 h-3.5 mr-2 text-metallic-brass/70 group-hover:text-metallic-brass transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3l10 16H2L12 3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8l6 10H6l6-10z" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    )
  },
  {
    name: "Apex Horizon",
    icon: (
      <svg className="w-3.5 h-3.5 mr-2 text-metallic-brass/70 group-hover:text-metallic-brass transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 4L4 16h16L12 4z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 20h20" strokeLinecap="round" />
      </svg>
    )
  }
];

export default function TrustBar() {
  return (
    <section className="relative py-12 md:py-20 bg-transparent border-y border-white/5 overflow-hidden">
      {/* Subtle gradient line */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.03)_0%,transparent_70%)]" />

      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Stats Grid wrapped in left guide line container */}
        <div className="max-w-5xl border-l border-metallic-brass/40 pl-6 md:pl-8">
          <span className="section-label mb-8 block text-metallic-brass/60 tracking-[0.3em] uppercase">WHO WE ARE — PERFORMANCE METRICS</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/5 overflow-visible relative">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-start px-6 py-4 relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
              >
                {/* Trick 10: Aku-Tech Holographic Pulse */}
                <div className="absolute inset-0 bg-metallic-brass/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 rounded-full scale-50" />
                
                {/* Decorative Corner Glyphs (Holographic) */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-metallic-brass/40 group-hover:border-metallic-brass transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-metallic-brass/40 group-hover:border-metallic-brass transition-colors" />

                {/* Icon */}
                <div className="relative z-10 text-metallic-brass/40 mb-3 group-hover:text-metallic-brass transition-colors group-hover:scale-110 duration-300">
                  {stat.icon}
                </div>
                {/* Value */}
                <div className="relative z-10 text-4xl md:text-5xl font-bold text-metallic-brass font-heading mb-2 leading-none tabular-nums tracking-tighter group-hover:animate-pulse">
                  <CountUp 
                    to={stat.value} 
                    duration={2} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix} 
                  />
                </div>
                {/* Label */}
                <div className="relative z-10 section-label text-metallic-brass/80 mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Verified operational metrics footnote */}
          <div className="mt-6 text-left">
            <span className="text-[10px] font-ui tracking-wider text-metallic-brass/50 uppercase select-none">
              * Verified historical operational metrics across 50+ enterprise systems built since 2023.
            </span>
          </div>
        </div>

        {/* Client Logo Grid */}
        <div className="mt-16 pt-12 border-t border-white/5 overflow-hidden">
          <div className="text-left mb-8 border-l border-metallic-brass/40 pl-6 md:pl-8 max-w-4xl">
            <span className="section-label text-metallic-brass/60 block tracking-[0.3em]">
              WHO WE ARE — CLIENT NETWORK
            </span>
          </div>
          <div className="border-l border-white/5 pl-6 md:pl-8 max-w-5xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap items-center justify-start gap-4 md:gap-6">
              {CLIENTS.map((client, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center px-4 py-2.5 font-ui text-[10px] md:text-xs text-metallic-brass tracking-[0.2em] uppercase bg-obsidian-layered border border-metallic-brass/10 hover:border-metallic-brass/40 rounded-none shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-default hover:scale-105 group"
                >
                  {client.icon}
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    {client.name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
