"use client";

import { motion } from "framer-motion";
import CircuitBlob from "@/components/animations/CircuitBlob";
import { ArrowRight, Zap, Clock, Shield } from "lucide-react";
import Link from "next/link";

const guarantees = [
  { icon: <Zap className="w-4 h-4" />, text: "Free Discovery Call" },
  { icon: <Clock className="w-4 h-4" />, text: "Response in 24 Hours" },
  { icon: <Shield className="w-4 h-4" />, text: "No Obligation" },
];

export default function FinalCTA() {
  return (
    <section className="relative py-36 bg-royal-obsidian overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0">
        <CircuitBlob variant="primary" className="opacity-50" />
        <CircuitBlob variant="secondary" className="opacity-30" />
      </div>

      {/* Radial gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(218,26,26,0.08)_0%,transparent_70%)] z-0" />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-red/30 to-transparent" />

      <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Eyebrow */}
          <span className="font-ui text-xs text-spirit-red tracking-[0.4em] uppercase block mb-6">
            Ready to Build?
          </span>

          <h2 className="text-off-white mb-6 leading-tight">
            Your Digital Legacy<br />
            <span className="text-spirit-red">Starts Here.</span>
          </h2>

          <p className="text-lg text-off-white/60 mb-12 leading-relaxed">
            Let&apos;s discuss how custom IT solutions can transform your business. 
            Get a free strategy session and discover what&apos;s possible.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="#contact"
              className="btn-warrior px-10 py-4 text-sm inline-flex items-center gap-2"
            >
              Book a Free Call
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#projects"
              className="btn-ghost px-10 py-4 text-sm inline-flex items-center gap-2"
            >
              See Our Work
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Guarantee badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {guarantees.map((g) => (
              <div key={g.text} className="flex items-center gap-2 text-off-white/40 font-ui text-xs uppercase tracking-wider">
                <span className="text-spirit-red">{g.icon}</span>
                {g.text}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
