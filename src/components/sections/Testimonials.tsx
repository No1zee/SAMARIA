"use client";

import { motion } from "framer-motion";
import CelestialHeading from "@/components/ui/CelestialHeading";

const TESTIMONIALS = [
  {
    quote: "We'd worked with three agencies before Samaria. Each time, we were handed a black box we couldn't maintain. Samaria didn't just build our system; they handed us the keys, the blueprint, and the confidence to run it ourselves.",
    author: "Kojo Mensah",
    role: "Head of Product",
    company: "LumiStream"
  },
  {
    quote: "Samaria operates at a level of rigor we didn't think existed in external teams. Their five-step continuity framework protected our legacy migration from any downtime, executing flawlessly on schedule.",
    author: "Elena Petrova",
    role: "VP of Engineering",
    company: "Obsidian Core"
  },
  {
    quote: "Their focus on permanence means we aren't constantly paying for codebase rewrites. The system they deployed in 2023 handles $2M+ in daily transaction volume without a single server memory leak.",
    author: "Dr. Akin Alabi",
    role: "Chief Architect",
    company: "Aether Institutional"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 md:py-24 bg-royal-obsidian z-10 relative overflow-hidden border-t border-white/5">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Header */}
        <motion.div
          className="text-left mb-14 border-l border-metallic-brass/40 pl-6 md:pl-8 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label mb-4 block">
            TESTIMONIALS
          </span>
          <CelestialHeading 
            text="WHAT CLIENTS SAY."
            as="h2"
            fontSize={56}
            className="text-balance"
          />
          <p className="text-white/85 mt-4 text-xl max-w-xl leading-relaxed no-prose">
            How our engineering philosophies translate into operational realities for African builders.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="border-l border-white/5 pl-6 md:pl-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={i}
                className="flex flex-col justify-between bg-obsidian-layered/30 border border-white/5 p-8 hover:border-metallic-brass/25 hover:bg-obsidian-layered/50 transition-all duration-500 group relative rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              >
                {/* Custom Glyph Corners */}
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-metallic-brass/10 group-hover:border-metallic-brass/40 transition-colors" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-metallic-brass/10 group-hover:border-metallic-brass/40 transition-colors" />
                
                <p className="text-white/80 italic text-sm md:text-base leading-relaxed no-prose mb-8">
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-metallic-brass/20" />
                  <div className="flex flex-col">
                    <span className="font-heading text-xs text-metallic-brass font-bold tracking-wider">{t.author}</span>
                    <span className="font-ui text-[9px] text-off-white/50 uppercase tracking-widest">{t.role}, {t.company}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
