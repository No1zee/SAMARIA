"use client";

import { motion } from "framer-motion";
import { Lightbulb, FileText, Users, Target, TrendingUp } from "lucide-react";

const DIGITAL_RULES = [
  {
    icon: Lightbulb,
    rule: "DON'T PANIC, START SMALL",
    explanation: "Begin with one process, prove value, then scale"
  },
  {
    icon: FileText,
    rule: "DOCUMENT YOUR CURRENT PROCESS",
    explanation: "Understanding the problem is half the solution"
  },
  {
    icon: Users,
    rule: "INVOLVE YOUR TEAM EARLY",
    explanation: "The best systems are built with user input"
  },
  {
    icon: Target,
    rule: "MEASURE WHAT MATTERS",
    explanation: "Track metrics that align with business goals"
  },
  {
    icon: TrendingUp,
    rule: "PLAN FOR GROWTH",
    explanation: "Build systems that scale with your ambition"
  }
];

export default function DigitalRules() {
  return (
    <section id="manifesto" className="py-fb8 bg-royal-obsidian relative overflow-hidden border-y border-white/5">
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Movement Header */}
        <div className="mb-fb7 flex flex-col items-end text-right pr-fb3 border-r border-metallic-brass/40">
          <span className="text-silence text-metallic-brass mb-fb2">Movement 04 — The Manifesto</span>
          <h2 className="text-5xl md:text-[8rem] text-off-white font-heading uppercase tracking-tighter leading-[0.85]">
            The <br/>
            Principles.
          </h2>
          <p className="text-off-white/40 text-xl md:text-2xl font-body mt-fb4 max-w-2xl italic">
            Essential guidelines for engineering African digital sovereignty.
          </p>
        </div>

        {/* Rules grid */}
        <div className="space-y-fb4 max-w-5xl mx-auto">
          {DIGITAL_RULES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.rule}
                className="group relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-fb4 bg-obsidian-layered/40 p-fb5 hover:bg-obsidian-layered/60 transition-all duration-700 blade-motif border-l border-metallic-brass/10 hover:border-metallic-brass/40 relative overflow-hidden">
                  {/* Subtle Grain Overlay */}
                  <div className="absolute inset-0 bg-parchment-grain opacity-[0.03] pointer-events-none" />

                  {/* Icon */}
                  <div className="shrink-0 relative z-10">
                    <div className="w-12 h-12 rounded-full border border-metallic-brass/20 flex items-center justify-center group-hover:border-metallic-brass/60 transition-colors">
                      <Icon className="w-6 h-6 text-metallic-brass" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 relative z-10">
                    <h3 className="font-heading text-3xl md:text-4xl text-off-white mb-fb2 uppercase tracking-tighter leading-none">
                      {item.rule}
                    </h3>
                    <p className="text-off-white/40 text-lg md:text-xl font-body leading-relaxed max-w-3xl italic">
                      {item.explanation}
                    </p>
                  </div>

                  {/* Number (Golden Ratio Subtle) */}
                  <div className="hidden md:block shrink-0 relative z-10 self-center">
                    <span className="text-[6rem] font-heading font-black text-white/5 group-hover:text-metallic-brass/10 transition-colors leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
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
