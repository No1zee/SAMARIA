"use client";

import { motion } from "framer-motion";
import { Factory, Truck, ShoppingCart, ArrowRight } from "lucide-react";

const TIMELINE_ITEMS = [
  {
    year: "2022",
    icon: Factory,
    industry: "MANUFACTURING SME",
    transformation: "Manual inventory → Real-time tracking",
    metric: "67% reduction in stockouts",
    color: "text-blue-400"
  },
  {
    year: "2023",
    icon: Truck,
    industry: "LOGISTICS COMPANY",
    transformation: "Paper invoices → Automated billing",
    metric: "3x faster payment processing",
    color: "text-green-400"
  },
  {
    year: "2024",
    icon: ShoppingCart,
    industry: "RETAIL CHAIN",
    transformation: "Disconnected POS → Unified system",
    metric: "45% increase in sales insights",
    color: "text-purple-400"
  }
];

export default function ImpactTimeline() {
  return (
    <section className="py-24 bg-black-bean relative overflow-hidden">
      <div className="container max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-off-white mb-4 uppercase text-balance">
            Impact Timeline
          </h2>
          <p className="text-off-white/60 text-lg max-w-2xl mx-auto">
            Real transformations, measurable results
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-brand-gold/20" />

          {/* Timeline items */}
          <div className="space-y-16">
            {TIMELINE_ITEMS.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.year}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                  initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Year marker */}
                  <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center justify-center w-16 h-16 bg-royal-obsidian border-2 border-brand-gold rounded-full z-10`}>
                    <span className="font-ui text-[8px] uppercase tracking-tighter text-brand-gold/60 leading-none">Year</span>
                    <span className="font-heading text-sm font-bold text-brand-gold">
                      {item.year}
                    </span>
                  </div>

                  {/* Content card */}
                  <div className={`ml-24 md:ml-0 ${isEven ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'} md:w-1/2`}>
                    <div className="bg-royal-obsidian border border-brand-gold/20 p-6 hover:border-brand-gold/60 transition-all duration-300 group">
                      {/* Icon and industry */}
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className={`w-8 h-8 ${item.color}`} strokeWidth={1.5} />
                        <span className="font-ui text-xs uppercase tracking-wider text-brand-gold">
                          {item.industry}
                        </span>
                      </div>

                      {/* Transformation */}
                      <p className="text-off-white/80 mb-4 leading-relaxed">
                        {item.transformation}
                      </p>

                      {/* Metric */}
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-lg font-bold text-brand-gold">
                          {item.metric}
                        </span>
                        <button className="flex items-center gap-2 text-xs text-brand-gold hover:text-gold-metallic font-ui uppercase tracking-wider group-hover:gap-3 transition-all">
                          View Story
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <a
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold hover:text-gold-metallic transition-colors font-ui uppercase tracking-wider"
          >
            Explore All Success Stories
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
