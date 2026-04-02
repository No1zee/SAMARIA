"use client";

import { motion } from "framer-motion";
import { Rocket, BookOpen } from "lucide-react";
import { useHaptics } from "@/hooks/useHaptics";

export default function StayReady() {
  const { clink, slash } = useHaptics();
  return (
    <section id="ready" className="relative py-fb8 bg-royal-obsidian overflow-hidden border-t border-white/5">
      {/* Visual Depth Overlay */}
      <div className="absolute inset-0 bg-parchment-grain opacity-5 pointer-events-none mix-blend-overlay" />

      <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Movement Header */}
          <div className="mb-fb6 flex flex-col items-center">
              <span className="text-silence text-metallic-brass mb-fb2">Movement 06 — The Readiness</span>
              <h2 className="text-6xl md:text-[8rem] text-off-white font-heading uppercase tracking-tighter leading-none">
                STAY <span className="text-brand-red">READY.</span>
              </h2>
          </div>

          {/* Statement */}
          <p className="text-xl md:text-[2.5rem] font-body text-off-white/40 mb-fb7 max-w-4xl mx-auto leading-[1.618] italic border-y border-white/5 py-fb4">
            The digital future waits for no one. <br className="hidden md:block" />
            Will you <span className="text-off-white italic">forge</span> or will you <span className="text-off-white italic">fall</span>?
          </p>

          {/* CTAs */}
          <div className="flex flex-col md:flex-row gap-fb4 justify-center items-center mt-fb5 relative z-20">
            <button 
              onMouseEnter={clink}
              onClick={() => { slash(); window.location.href = "#alliance"; }} 
              className="btn-warrior flex items-center gap-4 group"
            >
              INITIALIZE TRANSFORMATION
              <Rocket className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onMouseEnter={clink}
              onClick={() => { clink(); window.location.href = "#artifacts"; }} 
              className="btn-ghost flex items-center gap-4 group"
            >
              [ EXPLORE CASE STUDIES ]
              <BookOpen className="w-4 h-4" />
            </button>
          </div>

          {/* Trust indicator */}
          <motion.p
            className="mt-fb6 text-sm text-off-white/20 font-ui uppercase tracking-[0.4em]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Efficiency • Permanence • Sovereignty 
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
