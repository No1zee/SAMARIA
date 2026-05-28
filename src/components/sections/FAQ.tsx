"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import CelestialHeading from "@/components/ui/CelestialHeading";

const faqs = [
  {
    q: "Why shouldn't I just use a template or a cheap agency?",
    a: "You should—if you only need a temporary site. But if you're building a business that you plan to run for the next ten years, a template is a liability. It's unoptimized, difficult to scale, and carries technical debt from day one. We build the custom, high-performance infrastructure you can rely on for a decade."
  },
  {
    q: "Will I actually own my code?",
    a: "Yes. Entirely. We don't believe in licensing fees or keeping your data hostage. Once the project is complete and the final invoice is settled, the IP, the source code, and all system documentation are transferred to you."
  },
  {
    q: "What is your pricing model?",
    a: "We operate on a fixed-bid project basis. The scope is blueprinted upfront, and the budget we agree upon is final. We do not charge hidden fees or surprise hourly overages. For context: high-end corporate websites range from $5,000 to $12,000; custom web applications and SaaS systems range from $15,000 to $45,000; and complex enterprise integrations or custom databases start at $50,000. Transparency is a prerequisite of partnership."
  },
  {
    q: "What is your communication and sprint rhythm?",
    a: "We work in weekly sprint cycles, delivering direct Loom video walkthroughs showing running code at the end of each sprint. You get direct Slack access to the lead architects—no account managers or communication buffers."
  },
  {
    q: "What technologies do you build with?",
    a: "We specialize in modern, production-hardened web tech: Next.js, React, TypeScript, Node.js, and cloud-native database infrastructure (AWS, PostgreSQL, Supabase). We build for speed, security, and future-proof scaling."
  },
  {
    q: "How do you handle maintenance?",
    a: "We build for zero-maintenance where possible. However, external APIs and environments evolve. We offer custom continuity retainers for clients who want proactive monitoring, security audits, and continuous scaling."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(2);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-12 md:py-24 bg-royal-obsidian z-10 relative overflow-hidden border-t border-white/5">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.04)_0%,transparent_60%)] pointer-events-none" />

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
            OTHER STUFF
          </span>
          <CelestialHeading 
            text="COMMON QUESTIONS."
            as="h2"
            fontSize={56}
            className="text-balance"
          />
          <p className="text-white/85 mt-4 text-xl max-w-xl leading-relaxed no-prose">
            Honest answers to the questions serious clients always ask.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="max-w-4xl border-l border-white/5 pl-6 md:pl-8">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group relative bg-obsidian-layered/85 border rounded-lg overflow-hidden transition-colors duration-300 ${
                  openIndex === i
                    ? "border-metallic-brass/45 shadow-[0_0_15px_rgba(201,168,76,0.15)]"
                    : "border-white/5 hover:border-metallic-brass/30"
                }`}
              >
                {/* Question row */}
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-red/40 z-10"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i ? "true" : "false"}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span className="font-heading text-lg md:text-xl text-off-white group-hover:text-metallic-brass transition-colors duration-300">
                    {faq.q}
                  </span>
                  <span className="shrink-0 text-metallic-brass">
                    {openIndex === i ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                    >
                      <div className="px-6 pb-6 text-white/82 text-base md:text-lg leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA nudge */}
          <motion.p
            className="text-left mt-10 text-off-white/40 text-sm font-ui"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Still have questions?{" "}
            <a
              href="#contact"
              className="text-metallic-brass hover:text-off-white transition-colors underline underline-offset-2"
            >
              Send us a message →
            </a>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
