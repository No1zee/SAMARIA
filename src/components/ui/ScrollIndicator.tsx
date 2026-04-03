"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0, 0, 1]);

  return (
    <motion.div 
      style={{ opacity }}
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center gap-2"
    >
      <span className="text-[10px] tracking-[0.5em] font-ui text-metallic-brass/40 uppercase">Scroll to Forge</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-metallic-brass/20"
      >
        <ChevronDown size={24} strokeWidth={1} />
      </motion.div>
    </motion.div>
  );
}
