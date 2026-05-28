"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import CelestialHeading from "@/components/ui/CelestialHeading";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most projects take between 4 and 12 weeks from kickoff to launch. A standard website takes about 4 to 6 weeks, custom dashboards or web portals take 8 to 10 weeks, and complex database integrations or custom enterprise platforms can take 12 weeks or more. We work in weekly sprints and show you running progress every 7 days so you always know exactly where the project stands."
  },
  {
    q: "Will I actually own my code and systems?",
    a: "Yes, 100%. We do not believe in locking clients into proprietary platforms or charging licensing fees. As soon as the project is complete and paid for, you receive full ownership of the source code, databases, design assets, and host accounts. We help you set up the accounts under your own company's name so you retain complete control."
  },
  {
    q: "What is your pricing model and how much does it cost?",
    a: "We work on a fixed-bid project basis. We agree on the scope and price upfront, and that number is final—no surprise hourly bills, hidden fees, or overage charges. High-end business websites range from $5,000 to $12,000; custom web applications and client portals range from $15,000 to $45,000; and enterprise databases or custom integrations start at $50,000. We also offer monthly support retainers for ongoing updates."
  },
  {
    q: "What technologies do you build with and why?",
    a: "We build with modern, industry-standard technologies to ensure your system is fast, secure, and easy to maintain. We use React and Next.js for frontends, Node.js and TypeScript for backend logic, and PostgreSQL or Supabase for databases. By hosting on reliable platforms like AWS or Vercel, we ensure your site can handle traffic spikes and remains online 24/7."
  },
  {
    q: "How do you handle maintenance and support after launch?",
    a: "We build systems to be highly reliable and require minimal ongoing maintenance. However, web browsers, third-party APIs, and security protocols change. We provide 30 days of free post-launch support to resolve any initial bugs. After that, we offer optional monthly support retainers to handle routine security checks, database backups, updates, and future feature upgrades."
  },
  {
    q: "How does the delivery team operate?",
    a: "We operate as a focused core team of designers and engineers led by our founder and lead architect, Edward Magejo. By keeping our team small, you work directly with the people writing your code—eliminating project managers and communication delays. If the lead architect is unavailable, we have dedicated support engineers who maintain full access to system documentation and source code to ensure continuity of support."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            FAQ
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
          <div className="space-y-6">
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
