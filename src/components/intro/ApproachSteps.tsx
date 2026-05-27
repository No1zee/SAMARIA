"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CelestialText } from "@/components/ui/CelestialText";

const AuditIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-current fill-none" strokeWidth="1.2">
    <path d="M20 50 L50 20 L80 50 L50 80 Z" />
    <circle cx="50" cy="50" r="15" />
    <path d="M50 35 V65 M35 50 H65" />
  </svg>
);

const ArchIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-current fill-none" strokeWidth="1.2">
    <rect x="20" y="20" width="60" height="60" />
    <path d="M20 20 L80 80 M80 20 L20 80" />
    <circle cx="50" cy="50" r="20" />
  </svg>
);

const BuildIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-current fill-none" strokeWidth="1.2">
    <path d="M10 80 L50 20 L90 80 Z" />
    <path d="M30 80 V50 M70 80 V50 M50 20 V80" />
  </svg>
);

const HandoverIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-current fill-none" strokeWidth="1.2">
    <path d="M20 30 h60 v40 h-60 z" />
    <path d="M20 40 h60 M20 50 h60 M20 60 h60" />
    <path d="M50 30 V70" />
  </svg>
);

const UnityIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-current fill-none" strokeWidth="1.2">
    <circle cx="40" cy="50" r="20" />
    <circle cx="60" cy="50" r="20" />
    <path d="M50 30 V70" />
  </svg>
);

const APPROACH_STEPS = [
  {
    number: "01",
    icon: AuditIcon,
    title: "AUDIT",
    description: "We map every edge case, every dependency, and every piece of legacy friction before we write a single line of new code."
  },
  {
    number: "02",
    icon: ArchIcon,
    title: "ARCHITECTURE",
    description: "Structure comes before surface. We blueprint the data flows and system constraints that will hold your growth for the next decade."
  },
  {
    number: "03",
    icon: BuildIcon,
    title: "BUILD",
    description: "Engineering, not assembly. Every component is stress-tested and refined until it performs at the limit of current technology."
  },
  {
    number: "04",
    icon: HandoverIcon,
    title: "TRANSFER",
    description: "We don't keep secrets. You receive the full documentation and the technical training to own your system entirely."
  },
  {
    number: "05",
    icon: UnityIcon,
    title: "CONTINUITY",
    description: "Growth creates new friction. When the system needs to expand, we're here to reinforce the architecture we built together."
  }
];

export default function ApproachSteps() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="discipline" className="py-12 md:py-24 bg-transparent relative overflow-hidden border-y border-metallic-brass/10">
      {/* Section background deliberately kept transparent so the SamuraiJackBackground skyline shows through */}

      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-left mb-16 border-l border-metallic-brass/40 pl-6 md:pl-8 max-w-4xl"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="text-[10px] md:text-xs font-ui text-metallic-brass tracking-[0.5em] uppercase block mb-fb3 opacity-40"
          >
            HOW WE WORK
          </motion.span>
          <h2 className="font-heading text-4xl md:text-8xl font-bold text-off-white mb-6 uppercase leading-[0.9]">
            <CelestialText intensity={1.2}>FIVE STEPS. ZERO SHORTCUTS.</CelestialText>
          </h2>
          <div className="text-off-white/80 text-lg md:text-2xl font-body leading-relaxed max-w-2xl italic no-prose">
            <CelestialText intensity={0.6}>
              Most agencies rush to the &quot;visuals&quot; because they&apos;re easy to sell. We start with the architecture because it&apos;s what keeps the system alive. 
              Every engagement follows the same sequence—the only honest way to build for the long run.
            </CelestialText> 
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            className="text-metallic-brass font-ui text-[10px] tracking-[0.6em] uppercase mt-8"
          >
            Slow is smooth. Smooth is permanent.
          </motion.p>
        </motion.div>

        {/* Steps Grid - Desktop (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-5 gap-px bg-white/5 border border-white/5">
          {APPROACH_STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                className="bg-obsidian-layered/95 p-8 hover:bg-obsidian-layered transition-all duration-500 group flex flex-col min-h-[450px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Number */}
                <div className="text-4xl font-heading font-black text-metallic-brass/10 group-hover:text-metallic-brass/20 transition-colors mb-8">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-8 text-metallic-brass/60 group-hover:text-metallic-brass group-hover:scale-110 transition-all duration-700 origin-left">
                  <Icon />
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl md:text-2xl font-black text-off-white mb-4 uppercase tracking-tighter">
                  <CelestialText intensity={0.8}>{step.title}</CelestialText>
                </h3>

                {/* Description */}
                <p className="text-off-white/95 text-base md:text-lg leading-relaxed font-body no-prose">
                  <CelestialText intensity={0.4}>{step.description}</CelestialText>
                </p>
                
                {/* Decorative scanning line */}
                <div className="mt-auto pt-8">
                  <div className="h-px w-0 group-hover:w-full bg-linear-to-r from-metallic-brass/40 to-transparent transition-all duration-1000" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Steps Accordion - Mobile (hidden on desktop) */}
        <div className="md:hidden flex flex-col border border-white/5 divide-y divide-white/5">
          {APPROACH_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isOpen = activeStep === index;

            return (
              <div 
                key={step.number}
                className="bg-obsidian-layered/95 overflow-hidden transition-all duration-500"
              >
                <button
                  onClick={() => setActiveStep(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-heading font-bold text-metallic-brass/35">
                      {step.number}
                    </span>
                    <h3 className="font-heading text-base font-bold text-off-white uppercase tracking-wider">
                      {step.title}
                    </h3>
                  </div>
                  <div className={`text-metallic-brass/60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 space-y-4">
                    <div className="text-metallic-brass/60">
                      <Icon />
                    </div>
                    <p className="text-off-white/80 text-sm leading-relaxed font-body no-prose">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Bottom circuit decoration */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="h-px w-24 bg-linear-to-r from-transparent to-brand-gold/30" />
          <div className="w-2 h-2 rounded-full bg-brand-gold" />
          <div className="h-px w-24 bg-linear-to-l from-transparent to-brand-gold/30" />
        </motion.div>
      </div>
    </section>
  );
}
