"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame } from "lucide-react";
import { useHaptics } from "@/hooks/useHaptics";

export default function VersePopup() {
  const { clink } = useHaptics();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const handleScroll = () => {
      const threshold = 120; // Trigger when within 120px of the bottom
      const totalHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.innerHeight + window.scrollY;

      if (scrollPosition >= totalHeight - threshold) {
        if (!isVisible) {
          setIsVisible(true);
          clink(); // Subtle feedback
        }
      } else {
        // Option: we can keep it open once triggered, or hide it if they scroll up.
        // Keeping it open once triggered is cleaner and less distracting.
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check in case the page is short or loaded at the bottom
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed, isVisible, clink]);

  const handleClose = () => {
    clink();
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="fixed bottom-20 md:bottom-8 right-fb3 md:right-8 z-50 max-w-sm md:max-w-md bg-royal-obsidian/95 border border-metallic-brass/30 backdrop-blur-xl p-6 md:p-8 rounded-lg shadow-[0_0_35px_rgba(201,168,76,0.15)] overflow-hidden"
        >
          {/* Subtle gold glow behind */}
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-metallic-brass/10 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/30 hover:text-metallic-brass transition-colors p-1 cursor-pointer focus:outline-none"
            aria-label="Dismiss verse"
          >
            <X size={16} />
          </button>

          <div className="space-y-4">
            {/* Header / Citation */}
            <div className="flex items-center gap-2">
              <Flame size={12} className="text-metallic-brass animate-pulse" />
              <span className="text-[10px] tracking-[0.25em] font-ui text-metallic-brass uppercase font-bold">
                Acts 1:8
              </span>
            </div>

            {/* Verse content */}
            <p className="font-body text-xs md:text-sm text-off-white/90 leading-relaxed italic border-l border-metallic-brass/20 pl-4">
              &ldquo;But you will receive power when the Holy Spirit has come upon you, and you will be my witnesses in Jerusalem, in all Judea and Samaria, and to the ends of the earth.&rdquo;
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
