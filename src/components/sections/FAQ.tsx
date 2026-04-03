"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How long does a project typically take?",
    a: "Most projects are delivered in 6–12 weeks depending on scope. A brand identity + landing page can be done in 3 weeks; a full SaaS or enterprise system takes 2–4 months. We give you a detailed timeline before any work begins.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Absolutely. We love working with founders early. We can help validate your idea with a lean MVP, build your brand from scratch, and scale the tech as you grow. Flexible engagement models available.",
  },
  {
    q: "What does your pricing model look like?",
    a: "We work on a project-based model — you get a fixed quote after a discovery call, not an hourly bill that balloons. For ongoing partnerships, we offer retainer packages for continued development and support.",
  },
  {
    q: "Can you integrate with our existing systems?",
    a: "Yes. API integration is one of our core competencies. We've connected legacy ERPs, payment gateways, CRMs, and third-party SaaS platforms. We'll assess your current stack in the discovery phase and map out the integration.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Every project includes a 30-day post-launch support window at no extra cost. After that, you can subscribe to one of our maintenance and growth retainer plans, which include monitoring, updates, and priority support.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-24 bg-royal-obsidian relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(218,26,26,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="container max-w-[860px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-ui text-xs text-spirit-red tracking-[0.35em] uppercase block mb-4">
            Common Questions
          </span>
          <h2 className="text-off-white text-balance">Frequently Asked</h2>
          <p className="text-off-white/50 mt-4 text-base max-w-xl mx-auto leading-relaxed">
            Everything you need to know before we start building together.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative bg-royal-obsidian border rounded-lg overflow-hidden transition-colors duration-300 ${
                openIndex === i
                  ? "border-brand-red/40"
                  : "border-brand-red/10 hover:border-brand-red/25"
              }`}
            >
              {/* Question row */}
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-red/40"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span className="font-heading text-base md:text-lg text-off-white">
                  {faq.q}
                </span>
                <span className="shrink-0 text-spirit-red">
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
                    <div className="px-6 pb-6 text-off-white/60 text-sm leading-relaxed border-t border-brand-red/10 pt-4">
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
          className="text-center mt-10 text-off-white/40 text-sm font-ui"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Still have questions?{" "}
          <a
            href="#contact"
            className="text-spirit-red hover:text-off-white transition-colors underline underline-offset-2"
          >
            Send us a message →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
