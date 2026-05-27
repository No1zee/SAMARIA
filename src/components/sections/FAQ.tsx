"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import CelestialHeading from "@/components/ui/CelestialHeading";

const faqs = [
  {
    q: "Why shouldn't I just use a template or a cheap agency?",
    a: "You should—if you only need a temporary site. But if you're building a business that you plan to run for the next ten years, a template is a liability. It's unoptimized, difficult to scale, and carries technical debt from day one. We build the infrastructure you can rely on for a decade."
  },
  {
    q: "Will I actually own my code?",
    a: "Yes. Entirely. We don't believe in licensing fees or keeping your data hostage. Once the project is complete and the final invoice is settled, the IP, the source code, and all system documentation are transferred to you."
  },
  {
    q: "How long does a build take?",
    a: "We don't rush. A typical core infrastructure build takes between 8 and 12 weeks. High-fidelity cinematic experiences or complex AI integrations may take longer. We value permanence over speed."
  },
  {
    q: "How do you handle maintenance?",
    a: "We build for zero-maintenance where possible. However, the web changes. We offer continuity retainers for clients who want us to proactively monitor, update, and scale their architecture as they grow."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-24 bg-transparent relative overflow-hidden">
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
            QUESTIONS
          </span>
          <CelestialHeading 
            text="THINGS WORTH KNOWING BEFORE WE TALK."
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
                className={`group relative bg-obsidian-layered/40 border rounded-lg overflow-hidden transition-colors duration-300 ${
                  openIndex === i
                    ? "border-metallic-brass/40"
                    : "border-metallic-brass/10 hover:border-metallic-brass/25"
                }`}
              >
                {/* Question row */}
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-red/40"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i ? "true" : "false"}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span className="font-heading text-lg md:text-xl text-white/95">
                    {faq.q}
                  </span>
                  <span className="shrink-0 text-metallic-brass">
                    {openIndex === i ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
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
