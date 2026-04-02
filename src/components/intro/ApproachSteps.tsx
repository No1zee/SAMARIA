"use client";

import { motion } from "framer-motion";
import { Search, Pencil, Rocket, GraduationCap, Headphones } from "lucide-react";

const APPROACH_STEPS = [
  {
    number: "01",
    icon: Search,
    title: "ASSESS",
    description: "We map your current systems and pain points"
  },
  {
    number: "02",
    icon: Pencil,
    title: "DESIGN",
    description: "Custom solutions built for your workflow"
  },
  {
    number: "03",
    icon: Rocket,
    title: "IMPLEMENT",
    description: "Seamless deployment with zero disruption"
  },
  {
    number: "04",
    icon: GraduationCap,
    title: "TRAIN",
    description: "Your team becomes self-sufficient"
  },
  {
    number: "05",
    icon: Headphones,
    title: "SUPPORT",
    description: "Ongoing partnership, not one-time delivery"
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
            How Samaria Helps
          </h2>
          <p className="text-off-white/60 text-lg max-w-2xl mx-auto">
            Our proven 5-step process for digital transformation
          </p>
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
                  <div className="bg-black-bean border border-brand-gold/20 p-8 hover:border-brand-gold/60 transition-all duration-300 group">
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
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-off-white/70 text-sm leading-relaxed">
                      {step.description}
                    </p>
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
