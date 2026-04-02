"use client";

import { motion } from "framer-motion";
import { Server, Clock, Database, TrendingDown, Shield, Zap } from "lucide-react";
import { useHaptics } from "@/hooks/useHaptics";

const IMPACT_TILES = [
  {
    icon: Server,
    title: "DOWNTIME",
    description: "Systems fail when you need them most",
    color: "text-red-400"
  },
  {
    icon: Clock,
    title: "MANUAL CHAOS",
    description: "Hours lost to repetitive tasks",
    color: "text-orange-400"
  },
  {
    icon: Database,
    title: "DATA SILOS",
    description: "Information trapped in disconnected tools",
    color: "text-yellow-400"
  },
  {
    icon: TrendingDown,
    title: "SLOW DECISIONS",
    description: "Waiting for reports that should be instant",
    color: "text-blue-400"
  },
  {
    icon: Shield,
    title: "SECURITY GAPS",
    description: "Vulnerabilities you don't know exist",
    color: "text-purple-400"
  },
  {
    icon: Zap,
    title: "SCALING PAIN",
    description: "Growth limited by outdated infrastructure",
    color: "text-green-400"
  }
];

export default function ImpactTiles() {
  const { clink } = useHaptics();
  return (
    <section id="threat" className="py-fb8 bg-royal-obsidian relative overflow-hidden">
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Movement Header */}
        <div className="mb-fb7 border-l border-brand-red/40 pl-fb3">
          <div className="flex items-center gap-fb2 mb-fb3">
              <span className="text-silence text-brand-red">Movement 02A — The Threat</span>
          </div>
          <h2 className="text-5xl md:text-[8rem] text-off-white font-heading uppercase tracking-tighter leading-[0.85]">
            Identify <br/>
            The Inefficiency.
          </h2>
          <p className="text-off-white/40 text-xl md:text-2xl font-body mt-fb4 italic">
            Common architectural failures that hold African businesses back.
          </p>
        </div>

        {/* Tiles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fb5">
          {IMPACT_TILES.map((tile, index) => {
            const Icon = tile.icon;
            return (
              <motion.div
                key={tile.title}
                onMouseEnter={clink}
                className="group relative bg-obsidian-layered/40 border border-brand-red/10 p-fb5 hover:border-brand-red/40 transition-all duration-700 blade-motif overflow-hidden blade-reveal"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {/* Visual Depth Overlay */}
                <div className="absolute inset-0 bg-parchment-grain opacity-5 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon with Glowing Core */}
                  <div className="mb-fb4 text-brand-red relative w-fit">
                    <Icon className="w-12 h-12 relative z-10" strokeWidth={1.5} />
                    <div className="absolute inset-0 bg-brand-red/20 blur-xl rounded-full z-0" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-3xl md:text-4xl text-off-white mb-fb2 uppercase tracking-tighter leading-none">
                    {tile.title}
                  </h3>

                  {/* Description */}
                  <p className="text-off-white/40 text-lg font-body leading-[1.618] border-l border-brand-red/20 pl-fb2 italic">
                    {tile.description}
                  </p>
                  
                  {/* Status Indicator */}
                  <div className="mt-auto pt-fb4 flex justify-between items-center opacity-20 group-hover:opacity-60 transition-opacity">
                    <span className="text-[10px] tracking-[0.4em] font-ui uppercase">Status: Volatile</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
