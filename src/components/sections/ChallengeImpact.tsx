"use client";

import { motion } from "framer-motion";
import { Server, Clock, Database, Shield, Zap, CheckCircle } from "lucide-react";
import CelestialHeading from "@/components/ui/CelestialHeading";

const CHALLENGES = [
  {
    icon: Server,
    title: "Pre-Agentic Debt",
    description: "Systems inherited from a pre-agentic era that begin to rot the moment they are deployed.",
    color: "text-red-500"
  },
  {
    icon: Clock,
    title: "Black-Box Process",
    description: "Legacy entities where you pay for hours, not outcomes, losing all visibility into the process.",
    color: "text-orange-500"
  },
  {
    icon: Database,
    title: "Fragmentation",
    description: "Disconnected tools that create more work instead of solving it, trapping your business intelligence.",
    color: "text-yellow-500"
  },
  {
    icon: Shield,
    title: "Non-Hardened Tech",
    description: "Vulnerabilities in legacy infrastructure that risk your expansion and institutional legacy.",
    color: "text-purple-500"
  }
];

const SOLUTIONS = [
  {
    title: "Agentic-First Architecture",
    description: "We don't just build for your team; we build for the AI agents that will soon run your business.",
    icon: <Zap className="w-5 h-5 text-green-400" />
  },
  {
    title: "High-Fidelity Resilience",
    description: "Precision-built systems designed for 99.99% uptime and extreme operational load.",
    icon: <CheckCircle className="w-5 h-5 text-green-400" />
  }
];

export default function ChallengeImpact() {
  return (
    <section id="challenge" className="py-24 relative overflow-hidden">
      <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Ambient backing — scoped to container width, fades right like hero */}
        <div className="absolute inset-0 bg-gradient-to-r from-royal-obsidian via-royal-obsidian/80 to-transparent blur-md opacity-90 pointer-events-none -z-10" />
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: The Old Guard */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-ui text-xs text-spirit-red tracking-[0.3em] uppercase block mb-4">
                The Old Guard
              </span>
              <CelestialHeading 
                text={"The Failure of\nStatic Systems."}
                as="h2"
                fontSize={48}
                className="mb-6"
                intensity={0.8}
              />
              <p className="text-off-white/60 text-lg leading-relaxed mb-10">
                Most businesses aren&apos;t limited by their vision, but by the performance 
                limitations of agencies still building for the 2010s.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {CHALLENGES.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="p-6 bg-black-bean/40 border border-brand-red/10 rounded-lg group hover:border-brand-red/30 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Icon className={`w-8 h-8 ${item.color} mb-4 group-hover:scale-110 transition-transform`} />
                    <h3 className="font-heading text-lg text-off-white mb-2">{item.title}</h3>
                    <p className="text-xs text-off-white/50 leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: The New Standard */}
          <div className="relative">
            <motion.div
              className="bg-black-bean border border-brand-red/20 p-10 md:p-14 relative z-10 clip-blade shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-ui text-xs text-brand-gold tracking-[0.3em] uppercase block mb-4">
                The New Standard
              </span>
              <CelestialHeading 
                text={"High-Fidelity Intelligence\n& Institutional Architecture."}
                as="h2"
                fontSize={48}
                className="mb-10 text-off-white"
                intensity={1.0}
              />

              <ul className="space-y-10">
                {SOLUTIONS.map((sol, index) => (
                  <li key={index} className="flex gap-5 items-start">
                    <div className="mt-1">{sol.icon}</div>
                    <div>
                      <h3 className="font-heading text-xl text-off-white mb-2 leading-none">{sol.title}</h3>
                      <p className="text-sm text-off-white/60 leading-relaxed">{sol.description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Strategic Exception Callout */}
              <div className="mt-12 p-6 border-t border-brand-red/10 bg-brand-red/5 rounded-b-lg">
                <p className="text-spirit-red font-ui text-xs uppercase tracking-widest mb-2 font-bold">
                  The Strategic Exception
                </p>
                <p className="text-off-white text-base font-light italic">
                  &quot;You don&apos;t hire us to &apos;build features.&apos; You hire us to architect 
                  your identity. We specialize in modular growth—overhauling silos 
                  into enterprise ecosystems that handle the weight of expansion.&quot;
                </p>
              </div>
            </motion.div>

            {/* Glowing Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-red/5 blur-3xl pointer-events-none -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
