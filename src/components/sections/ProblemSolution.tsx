"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function ProblemSolution() {
  const problems = [
    "Outdated legacy systems holding your business back",
    "Manual processes consuming valuable time",
    "Disconnected tools creating data silos",
    "Lack of technical expertise in-house"
  ];

  const solutions = [
    "Modern, scalable web applications",
    "Intelligent automation workflows",
    "Seamless system integrations",
    "Dedicated technical partnership"
  ];

  return (
    <section className="py-24 bg-royal-obsidian relative overflow-hidden border-y border-brand-red/10">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-ui text-xs text-spirit-red tracking-[0.3em] uppercase block mb-4">
            The Challenge
          </span>
          <h2 className="text-off-white mb-4">
            We Solve Real Business Problems
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-spirit-red/80" />
              <h3 className="text-2xl font-heading text-off-white text-balance uppercase tracking-tight">Common Pain Points</h3>
            </div>
            
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="list-none">
                  <motion.div
                    className="flex items-start gap-3 text-off-white/70"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="text-spirit-red/60 mt-1">✗</span>
                    <span>{problem}</span>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-6 h-6 text-spirit-red" />
              <h3 className="text-2xl font-heading text-off-white text-balance uppercase tracking-tight">Our Solutions</h3>
            </div>
            
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="list-none">
                  <motion.div
                    className="flex items-start gap-3 text-off-white/70"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="text-spirit-red mt-1">✓</span>
                    <span>{solution}</span>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Circuit divider */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-24 bg-linear-to-r from-transparent to-brand-red/30"></div>
          <div className="w-2 h-2 bg-brand-red clip-slash"></div>
          <div className="h-px w-24 bg-linear-to-l from-transparent to-brand-red/30"></div>
        </div>
      </div>
    </section>
  );
}
