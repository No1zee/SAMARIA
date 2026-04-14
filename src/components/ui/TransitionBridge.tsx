"use client";

import { motion } from "framer-motion";
import { CelestialText } from "@/components/ui/CelestialText";

interface TransitionBridgeProps {
  text: string;
  className?: string;
  intensity?: number;
}

export default function TransitionBridge({ text, className = "", intensity = 0.6 }: TransitionBridgeProps) {
  return (
    <div className={`py-24 md:py-32 flex items-center justify-center overflow-hidden ${className}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="container max-w-[1500px] mx-auto px-6 text-center"
      >
        <div className="inline-block relative">
          {/* Subtle horizontal motifs */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-6 h-px bg-metallic-brass/20 hidden md:block" />
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-6 h-px bg-metallic-brass/20 hidden md:block" />
          
          <p className="text-xl md:text-4xl font-body text-off-white/60 tracking-tight leading-none italic max-w-3xl mx-auto">
            <CelestialText intensity={intensity}>{text}</CelestialText>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
