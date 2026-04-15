"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCelestial } from "@/components/providers/CelestialProvider";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const { isCinematicMode } = useCelestial();

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      // Expansion phase: 1.8s
      // Collapse phase starts at 1.8s
      const collapseTimer = setTimeout(() => setIsCollapsing(true), 1800);
      // Finished at 2.5s
      const doneTimer = setTimeout(() => setIsLoading(false), 2600);

      return () => {
        clearTimeout(collapseTimer);
        clearTimeout(doneTimer);
        document.body.style.overflow = "unset";
      };
    }
  }, [isLoading]);

  // Bypass for direct navigation to cinematic-heavy pages
  if (isCinematicMode || !isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ backgroundColor: "#F2EDD8" }}
          animate={{
            backgroundColor: isCollapsing ? "#080809" : "#F2EDD8",
          }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="fixed inset-0 z-10000 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Concentric Expanding Rings (Solar Ripples) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0.6 }}
                animate={
                  isCollapsing
                    ? {
                        scale: 0,
                        opacity: 0,
                        transition: { duration: 0.5, ease: "backIn", delay: i * 0.05 },
                      }
                    : {
                        scale: [0, 6],
                        opacity: [0.6, 0],
                      }
                }
                transition={
                  isCollapsing
                    ? {}
                    : {
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: "easeOut",
                      }
                }
                className="absolute w-64 h-64 border border-[#C4933A]/30 rounded-full"
              />
            ))}
          </div>

          {/* Central Solar Core / Logo Birth */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: isCollapsing ? 0 : 1,
              opacity: 1,
              filter: isCollapsing ? "brightness(2) blur(20px)" : "brightness(1) blur(0px)",
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* The Logo during birth */}
            <motion.div
              animate={isCollapsing ? { rotate: 180, scale: 0 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "circIn" }}
            >
              <div className="relative w-48 h-32">
                <Image
                  src="/logo.png"
                  alt="Samaria Logo"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_30px_rgba(196,147,58,0.4)]"
                />
              </div>
            </motion.div>

            {/* Implosion Singularity Element */}
            <motion.div
              initial={{ scale: 0 }}
              animate={
                isCollapsing
                  ? {
                      scale: [0, 20],
                      opacity: [1, 0],
                      backgroundColor: "#FFF8D0",
                    }
                  : { scale: 0, opacity: 0 }
              }
              transition={{ duration: 0.7, ease: "circIn" }}
              className="absolute w-10 h-10 rounded-full blur-2xl pointer-events-none"
            />
          </motion.div>

          {/* Luxury Typography */}
          {!isCollapsing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-12 text-center"
            >
              <p className="text-[#7B3A10] font-light tracking-[0.4em] uppercase text-[10px] md:text-xs">
                Modern Zen of Design
              </p>
              <div className="mt-2 w-12 h-px bg-[#C4933A]/40 mx-auto" />
            </motion.div>
          )}

          {/* Dynamic Light Sweep (Atmospheric) */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/5 to-transparent pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
