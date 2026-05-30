"use client";

import { motion } from "framer-motion";
import { Hammer, Database, Cpu, ShieldCheck } from "lucide-react";

export default function ProjectsTeaser() {
  return (
    <section id="selected-work" className="py-16 md:py-32 relative overflow-hidden bg-black/30 border-y border-white/5">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-metallic-brass/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-metallic-brass/30 bg-metallic-brass/5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-metallic-brass animate-pulse" />
            <span className="text-[10px] font-ui tracking-[0.25em] text-metallic-brass uppercase font-bold">
              System Archive
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-ivory-glow mb-4">
            Selected Works
          </h2>
          <p className="text-xs md:text-sm font-ui tracking-widest text-white/40 uppercase">
            Archive undergoing live reconstruction
          </p>
        </div>

        {/* Central Notice Board */}
        <div className="max-w-3xl mx-auto border border-white/10 bg-black/60 backdrop-blur-md rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-metallic-brass/40 to-transparent" />
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full border border-metallic-brass/30 bg-metallic-brass/5 flex items-center justify-center text-metallic-brass mb-6">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            
            <p className="font-body text-base md:text-lg text-off-white/80 leading-relaxed max-w-xl mb-8">
              We are currently migrating our project system archive to render native live previews and verified architectural case studies. Detailed records of custom operational builds will resume shortly.
            </p>

            {/* Micro details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-8 border-t border-white/5 text-left">
              <div className="flex gap-3">
                <Database className="w-4 h-4 text-metallic-brass shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-ui uppercase tracking-wider text-white/50 mb-1">Queue Size</span>
                  <span className="text-xs text-off-white/70 font-body">15+ Systems</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Hammer className="w-4 h-4 text-metallic-brass shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-ui uppercase tracking-wider text-white/50 mb-1">Current Task</span>
                  <span className="text-xs text-off-white/70 font-body">Preview Sandboxing</span>
                </div>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="w-4 h-4 text-metallic-brass shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-ui uppercase tracking-wider text-white/50 mb-1">Fidelity Check</span>
                  <span className="text-xs text-off-white/70 font-body">Security Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
