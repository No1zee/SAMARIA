"use client";

import { motion } from "framer-motion";
import CircuitBlob from "@/components/animations/CircuitBlob";
import { ArrowRight, Zap, Clock, Shield } from "lucide-react";
import Link from "next/link";
import { useCelestial } from "@/components/providers/CelestialProvider";

const guarantees = [
  { icon: <Zap className="w-4 h-4" />, text: "Free Discovery Call" },
  { icon: <Clock className="w-4 h-4" />, text: "Response in 24 Hours" },
  { icon: <Shield className="w-4 h-4" />, text: "No Obligation" },
];

export default function FinalCTA() {
  const { setIsCinematicMode } = useCelestial();
  return (
    <section className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 bg-royal-obsidian/55 backdrop-blur-[2px] pointer-events-none" />
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
          <span className="font-ui text-xs text-brand-gold tracking-[0.4em] uppercase block mb-6">
            The Final Step is a Dialogue
          </span>

          <h2 className="text-off-white mb-6 leading-tight uppercase">
            Your Digital Legacy<br />
            <span className="text-brand-gold">Starts Now.</span>
          </h2>

          <p className="text-lg text-off-white/60 mb-12 leading-relaxed">
            You&apos;ve seen the architecture. You&apos;ve heard our ideology. 
            If you are ready to depart from the status quo and build for the expansion ahead, let&apos;s talk.
            We only accept a limited number of high-stakes engagements each quarter to ensure total focus.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/start-project"
              onClick={() => setIsCinematicMode(true)}
              className="btn-warrior px-10 py-4 text-sm inline-flex items-center gap-2 uppercase tracking-widest"
            >
              Begin the Dialogue
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#artifacts"
              className="btn-ghost px-10 py-4 text-sm inline-flex items-center gap-2 uppercase tracking-widest"
            >
              View the Artifacts
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
