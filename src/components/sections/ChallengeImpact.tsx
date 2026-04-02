"use client";

import { motion } from "framer-motion";
import { Server, Clock, Database, Shield, Zap, CheckCircle, AlertCircle } from "lucide-react";

const CHALLENGES = [
  {
    icon: Server,
    title: "Legacy Friction",
    description: "Systems that fail when you scale, inherited from a pre-digital era.",
    color: "text-red-500"
  },
  {
    icon: Clock,
    title: "Manual Chaos",
    description: "Hours lost to repetitive bureaucracy and paper-heavy workflows.",
    color: "text-orange-500"
  },
  {
    icon: Database,
    title: "Data Silos",
    description: "Critical business intelligence trapped in disconnected tools.",
    color: "text-yellow-500"
  },
  {
    icon: Shield,
    title: "Security Gaps",
    description: "Vulnerabilities in non-hardened infrastructure risking your legacy.",
    color: "text-purple-500"
  }
];

const SOLUTIONS = [
  {
    title: "Bespoke Architectures",
    description: "Custom-forged systems designed for 99.99% uptime and infinite scale.",
    icon: <Zap className="w-5 h-5 text-green-400" />
  },
  {
    // Pricing Signal integrated here
    title: "Intelligent Automation",
    description: "Streamlined protocols starting from $2,500 that reclaim your team's time.",
    icon: <CheckCircle className="w-5 h-5 text-green-400" />
  }
];

export default function ChallengeImpact() {
  return (
    <section id="challenge" className="py-24 bg-royal-obsidian relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-circuit-grid" />
      </div>

      <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: The Challenge */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-ui text-xs text-spirit-red tracking-[0.3em] uppercase block mb-4">
                The Friction
              </span>
              <h2 className="text-off-white mb-6">
                Common Roadblocks to Expansion
              </h2>
              <p className="text-off-white/60 text-lg leading-relaxed mb-10">
                Most African businesses aren't limited by their vision, but by the performance 
                limitations of their existing digital tools.
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

          {/* Right: The Clarity */}
          <div className="relative">
            <motion.div
              className="bg-black-bean border border-brand-red/20 p-10 md:p-14 relative z-10 clip-blade shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-ui text-xs text-brand-gold tracking-[0.3em] uppercase block mb-4">
                The Clarity
              </span>
              <h2 className="text-off-white mb-10">
                Precision-Engineered Solutions
              </h2>

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

              {/* Pricing Signal Callout */}
              <div className="mt-12 p-6 border-t border-brand-red/10 bg-brand-red/5 rounded-b-lg">
                <p className="text-spirit-red font-ui text-xs uppercase tracking-widest mb-2 font-bold">
                  Expansion Readiness
                </p>
                <p className="text-off-white text-base font-light italic">
                  "We specialize in modular growth. Start with a focused system overhaul and 
                  scale into an enterprise ecosystem as your revenue grows."
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
