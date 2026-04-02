"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls past 600px
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="fixed bottom-6 left-6 right-6 z-60 md:hidden"
        >
          <a
            href="#contact"
            className="flex items-center justify-between bg-brand-gold text-royal-obsidian px-5 py-4 rounded-2xl shadow-[0_10px_30px_rgba(197,160,89,0.3)] font-ui font-bold text-sm tracking-wide transition-transform active:scale-95"
          >
            <div className="flex items-center gap-3">
              <div className="bg-royal-obsidian/10 p-1.5 rounded-lg">
                <Phone className="w-4 h-4" />
              </div>
              <span>START A PROJECT</span>
            </div>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
