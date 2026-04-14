// components/animations/SamariaLogoSVG.tsx
import { motion, MotionValue, useMotionValue, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface SamariaLogoSVGProps {
  progress?: MotionValue<number>; 
  className?: string;
}

import { useCelestial } from "@/components/providers/CelestialProvider";

export function SamariaLogoSVG({ progress, className = "w-full h-auto" }: SamariaLogoSVGProps) {
  const { isCinematicMode } = useCelestial();
  const fallbackProgress = useMotionValue(1);
  const activeProgress = progress || fallbackProgress;
  
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const showSeal = isCinematicMode || isScrolledToBottom;

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    const unsubscribe = activeProgress.on("change", (latest) => {
      // Threshold for "End of Page"
      if (latest >= 0.99) {
        if (!isScrolledToBottom && !timeout) {
          timeout = setTimeout(() => {
            setIsScrolledToBottom(true);
          }, 400); 
        }
      } else if (latest < 0.97) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = undefined;
        }
        setIsScrolledToBottom(false);
      }
    });

    return () => {
      unsubscribe();
      if (timeout) clearTimeout(timeout);
    };
  }, [activeProgress, isScrolledToBottom]);

  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <AnimatePresence>
        {!showSeal ? (
          <motion.div 
            key="sun"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ 
              width: "80%", // Parity with Seal bounds
              height: "80%",
              background: "radial-gradient(circle at center, #FFF8D0 0%, #F4A820 45%, #7B3A10 100%)",
              borderRadius: "50%",
              filter: "blur(4px)", // Reduced blur for limb sharpening
              position: "absolute",
              boxShadow: "0 0 40px rgba(244, 168, 32, 0.3)"
            }}
          />
        ) : (
          <motion.div 
            key="seal"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              width: "80%", // Parity with Sun bounds
              height: "80%",
              position: "relative"
            }}
            className="flex items-center justify-center"
          >
            {/* Decorative Circular Border (CSS version for crispness) */}
            <div className="absolute inset-0 rounded-full border-[6px] border-[#D4AF37]/40" />
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4AF37]/20 scale-[0.98]" />
            
            {/* THE ICON */}
            <img 
              src="/logo.png" 
              alt="Samaria Logo" 
              className="w-[85%] h-[85%] object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
