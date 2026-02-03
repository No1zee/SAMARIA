"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-royal-obsidian">
      
      {/* Background Elements (Subtle) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(203,152,74,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(203,152,74,0.05)_1px,transparent_1px)] bg-size-[40px_40px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-deep-green/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-[1200px] mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        {/* Eyebrow */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-ui text-xs md:text-sm text-gold-metallic tracking-[0.4em] uppercase mb-8"
        >
            The Ancient Future
        </motion.div>

        {/* Main Title (Athena Grade) */}
        <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-off-white mb-8 text-shadow-glow font-heading text-6xl md:text-8xl lg:text-[7rem] leading-none"
        >
            SAMARIA
        </motion.h1>

        {/* Subtitle / Mission */}
        <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-off-white/80 max-w-2xl mx-auto mb-4 text-lg md:text-xl font-light"
        >
            Forging digital fortresses with the precision of the ancients and the speed of the future.
        </motion.p>

        {/* Value Proposition */}
        <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-off-white/60 max-w-3xl mx-auto mb-12 text-base md:text-lg"
        >
            Full-stack web development for startups and SMEs building secure, high-performance applications
        </motion.p>

        {/* CTAs */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
        >
            <Link 
                href="#contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gold-metallic font-ui font-bold uppercase tracking-widest hover:brightness-110 transition-all duration-300 clip-path-slant"
            >
                Start Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-royal-obsidian" />
            </Link>
        </motion.div>

      </div>

      {/* Footer Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-gold/20 to-transparent"></div>
    </section>
  );
}
