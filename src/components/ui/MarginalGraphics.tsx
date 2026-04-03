"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function MarginalGraphics() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress for a "blade-like" fill
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-60 select-none hidden lg:block">
      
      {/* LEFT MARGIN */}
      <div className="absolute left-[2%] top-0 bottom-0 w-[4%] flex flex-col items-center justify-between py-12">
        {/* Top Sigil */}
        <motion.div 
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-metallic-brass"
        >
          <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>

        {/* Vertical Text */}
        <div className="flex-1 flex items-center">
          <span className="text-vertical text-silence tracking-[0.6em] text-metallic-brass/40 text-[10px] uppercase">
            SAMARIA // ELITE DIGITAL ARCHITECTURE
          </span>
        </div>

        {/* Bottom Sigil */}
        <motion.div 
          animate={{ 
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="text-metallic-brass"
        >
          <svg width="30" height="30" viewBox="0 0 100 100" fill="currentColor">
            <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 50 50)" />
            <rect x="35" y="35" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 50 50)" />
          </svg>
        </motion.div>
      </div>

      {/* RIGHT MARGIN */}
      <div className="absolute right-[2%] top-0 bottom-0 w-[4%] flex flex-col items-center justify-between py-12">
        {/* Blade Scroll Spine */}
        <div className="absolute top-[20%] bottom-[20%] left-1/2 -translate-x-1/2 w-px bg-white/5 overflow-hidden">
          <motion.div 
            className="w-full bg-metallic-brass origin-top"
            style={{ scaleY }}
          />
        </div>

        {/* Top Label */}
        <div className="text-silence text-[9px] tracking-widest text-metallic-brass/30">
          EST. MMXXV
        </div>

        {/* Vertical Text */}
        <div className="flex-1 flex items-center justify-center">
          <span className="text-vertical text-silence tracking-[0.8em] text-metallic-brass/40 text-[10px] uppercase">
            BUILT FOR AFRICA // FORGED IN CODE
          </span>
        </div>

        {/* Scroll Label */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-vertical text-silence text-[8px] opacity-20">SCROLL TO FORGE</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-8 bg-linear-to-b from-metallic-brass to-transparent opacity-40"
          />
        </div>
      </div>

    </div>
  );
}
