// components/animations/SamariaLogoSVG.tsx
import { motion, useTransform, MotionValue, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface SamariaLogoSVGProps {
  progress?: MotionValue<number>; 
  className?: string;
}

export function SamariaLogoSVG({ progress, className = "w-full h-auto" }: SamariaLogoSVGProps) {
  const fallbackProgress = useMotionValue(1);
  const activeProgress = progress || fallbackProgress;
  
  const [showSeal, setShowSeal] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const unsubscribe = activeProgress.on("change", (latest) => {
      // Threshold for "End of Page"
      if (latest >= 0.99) {
        if (!showSeal && !timeout) {
          timeout = setTimeout(() => {
            setShowSeal(true);
          }, 1800);
        }
      } else if (latest < 0.97) {
        // Reset if we scroll away
        if (timeout) {
          clearTimeout(timeout);
          timeout = undefined as any;
        }
        setShowSeal(false);
      }
    });

    return () => {
      unsubscribe();
      if (timeout) clearTimeout(timeout);
    };
  }, [activeProgress, showSeal]);

  // Sun logic: Always visible as a base, fades only if we want to replace it
  // But user said "softly replace the sun", so we'll fade the Sun disc while Seal comes in
  
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <AnimatePresence mode="wait">
        {!showSeal ? (
          <motion.div 
            key="sun"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{ 
              width: "45%",
              height: "45%",
              background: "radial-gradient(circle, #D4AF37 0%, #CB984A 70%, transparent 100%)",
              borderRadius: "50%",
              filter: "blur(4px)",
              position: "absolute"
            }}
          />
        ) : (
          <motion.div 
            key="seal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              width: "100%",
              height: "100%",
              position: "relative"
            }}
            className="flex items-center justify-center"
          >
            {/* Decorative Circular Border (CSS version for crispness) */}
            <div className="absolute inset-0 rounded-full border-[6px] border-[#D4AF37]/40 scale-[0.85]" />
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4AF37]/20 scale-[0.82]" />
            
            {/* THE ICON */}
            <img 
              src="/logo_icon.png" 
              alt="Samaria Logo" 
              className="w-[85%] h-[85%] object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
