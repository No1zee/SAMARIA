"use client";

import { motion } from "framer-motion";
import { Search, Pencil, Rocket, GraduationCap, Headphones } from "lucide-react";
import { PretextSmoky } from "@/components/animations/PretextSmoky";
import { CelestialText } from "@/components/ui/CelestialText";

const APPROACH_STEPS = [
  {
    number: "01",
    icon: Search,
    title: "THE AUDIT",
    description: "We begin with a thorough audit of your digital surface—identifying gaps and mapping the route to your next expansion."
  },
  {
    number: "02",
    icon: Pencil,
    title: "THE ARCHITECTURE",
    description: "We don't just 'design'; we architect systems. Every pixel and line of code is forged to support your unique operational load."
  },
  {
    number: "03",
    icon: Rocket,
    title: "THE BUILD",
    description: "High-fidelity engineering in action. We deploy resilient, scalable assets that integrate seamlessly into your existing nexus."
  },
  {
    number: "04",
    icon: GraduationCap,
    title: "THE HANDOVER",
    description: "You retain total command. We provide the technical enabling your team needs to manage and scale your internal ecosystem."
  },
  {
    number: "05",
    icon: Headphones,
    title: "CONTINUITY",
    description: "Elite engineering never sleeps. We remain as your strategic reinforcement, ensuring your technology evolves as fast as you do."
  }
];

export default function ApproachSteps() {
  return (
    <section className="py-24 bg-royal-obsidian relative overflow-hidden border-y border-brand-gold/10">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full blur-3xl" />
      </div>

      <div className="container max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-off-white mb-4 uppercase text-balance">
            <CelestialText intensity={1.2}>A Proven Methodology</CelestialText>
          </h2>
          <span className="block text-off-white/60 text-lg max-w-2xl mx-auto">
            <CelestialText intensity={0.6}>Our five-stage protocol for</CelestialText> 
            <span className="inline-block min-w-[300px] md:min-w-[400px]">
              <PretextSmoky text="digital excellence" className="text-brand-gold/90" maxWidth={1000} />
            </span>
          </span>
        </motion.div>

        {/* Steps - Horizontal on desktop, vertical on mobile */}
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-0">
          {APPROACH_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === APPROACH_STEPS.length - 1;

            return (
              <div key={step.number} className="flex-1 flex flex-col lg:flex-row items-center">
                <motion.div
                  className="relative w-full"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  {/* Step card */}
                  <div className="bg-black-bean border border-brand-gold/20 p-8 hover:border-brand-gold/60 transition-all duration-300 group min-h-[320px] flex flex-col">
                    {/* Number */}
                    <div className="text-6xl font-heading font-bold text-brand-gold/20 group-hover:text-brand-gold/40 transition-colors mb-4">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="mb-4">
                      <Icon className="w-10 h-10 text-brand-gold" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-2xl font-bold text-off-white mb-3 uppercase">
                      <CelestialText intensity={0.8}>{step.title}</CelestialText>
                    </h3>

                    {/* Description */}
                    <span className="block text-off-white/70 text-sm leading-relaxed">
                      <CelestialText intensity={0.4}>{step.description}</CelestialText>
                    </span>
                  </div>
                </motion.div>

                {/* Connector line (hidden on last item and mobile) */}
                {!isLast && (
                  <div className="hidden lg:block w-12 h-px bg-brand-gold/30 mx-0" />
                )}
                {!isLast && (
                  <div className="lg:hidden h-8 w-px bg-brand-gold/30 mx-auto" />
                )}
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
