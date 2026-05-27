"use client";

import { motion } from "framer-motion";
import ScrollConsolidatedText from "@/components/animations/ScrollConsolidatedText";

interface TransitionBridgeProps {
  text: string;
  className?: string;
  intensity?: number;
}

export default function TransitionBridge({ text, className = "", intensity = 0.6 }: TransitionBridgeProps) {
  return (
    <div className={`py-10 md:py-32 flex items-center justify-center overflow-hidden ${className}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="container max-w-[1500px] mx-auto px-6 text-center"
      >
        <div className="inline-block relative w-full">
          {/* Subtle horizontal motifs */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-6 h-px bg-metallic-brass/20 hidden md:block" />
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-6 h-px bg-metallic-brass/20 hidden md:block" />
          
          <div className="max-w-3xl mx-auto">
            <ScrollConsolidatedText text={text} fontSize={28} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
