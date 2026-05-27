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
  "LumiStream", "Obsidian Core", "Aether Institutional", "Delta Dynamics", "Apex Horizon"
];

export default function TrustBar() {
  return (
    <section className="relative py-20 bg-transparent border-y border-white/5 overflow-hidden">
      {/* Subtle gradient line */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.03)_0%,transparent_70%)]" />

      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Stats Grid wrapped in left guide line container */}
        <div className="max-w-5xl border-l border-metallic-brass/40 pl-6 md:pl-8">
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
        </div>

        {/* Client Logo Grid */}
        <div className="mt-16 pt-12 border-t border-white/5 overflow-hidden">
          <div className="text-left mb-8 border-l border-metallic-brass/40 pl-6 md:pl-8 max-w-4xl">
            <span className="section-label text-metallic-brass/60 block tracking-[0.3em]">
              Trusted by builders across the continent
            </span>
          </div>
          <div className="border-l border-white/5 pl-6 md:pl-8 max-w-4xl">
            <div className="flex flex-wrap items-center justify-start gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              {CLIENTS.map((client, i) => (
                <span key={i} className="font-heading text-lg md:text-2xl text-off-white/40 hover:text-metallic-brass transition-all duration-500 cursor-default hover:scale-110">
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Snippet */}
        <motion.div 
          className="mt-16 text-left max-w-3xl border-l border-white/5 pl-6 md:pl-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-white/85 italic text-lg md:text-2xl leading-relaxed no-prose">
            &quot;We&apos;d worked with three agencies before Samaria. Each time, we were handed a black box we couldn&apos;t maintain. Samaria didn&apos;t just build our system; they handed us the keys, the blueprint, and the confidence to run it ourselves.&quot;
          </p>
          <div className="mt-4 flex items-center justify-start gap-2">
            <div className="w-12 h-px bg-metallic-brass/20" />
            <span className="font-ui text-[10px] text-metallic-brass uppercase tracking-[0.5em]">Head of Product, LumiStream</span>
            <div className="w-12 h-px bg-metallic-brass/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
