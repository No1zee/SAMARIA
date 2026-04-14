"use client";

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailX = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const trailY = useSpring(mouseY, { damping: 30, stiffness: 150 });

  // COORDINATE STATE
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-9999 hidden lg:block">
      {/* Blade Trail (The Slash) */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-brand-red/10 blur-xl"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isClicking ? 8 : isHovering ? 4 : 1,
        }}
      />

      {/* Main Compass Body */}
      <motion.div
        className="absolute"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="relative flex items-center justify-center w-32 h-32">
          
          {/* Cardinal Points */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
             <span className="absolute top-0 text-[8px] font-ui text-metallic-brass/60">N</span>
             <span className="absolute bottom-0 text-[8px] font-ui text-metallic-brass/60">S</span>
             <span className="absolute right-0 text-[8px] font-ui text-metallic-brass/60">E</span>
             <span className="absolute left-0 text-[8px] font-ui text-metallic-brass/60">W</span>
          </div>

          {/* Rotating Instrument Layer */}
          <motion.div
            className="absolute inset-0 border border-white/5 rounded-full"
            animate={{ rotate: isHovering ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-white/5" />
            <div className="absolute top-0 left-1/2 w-[0.5px] h-full bg-white/5" />
          </motion.div>

          {/* Coordinate Metadata */}
          <div className="absolute top-8 left-12 flex flex-col gap-1 pointer-events-none opacity-40">
             <span className="text-[6px] font-ui text-metallic-brass uppercase tracking-widest whitespace-nowrap">
               LAT_REF: {coords.y}
             </span>
             <span className="text-[6px] font-ui text-metallic-brass uppercase tracking-widest whitespace-nowrap">
               LON_REF: {coords.x}
             </span>
          </div>

          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            className="z-10"
          >
            {/* Precise Blade Tip */}
            <motion.path
              d="M32 8L36 32L32 56L28 32L32 8Z"
              fill={isHovering ? "var(--color-brand-red)" : "white"}
              stroke="var(--color-brand-red)"
              strokeWidth="1"
              animate={{
                scale: isClicking ? 0.6 : isHovering ? 1.4 : 1,
                rotate: isHovering ? 45 : 0
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
            
            {/* Inner Rotating Ring */}
            <motion.circle
              cx="32"
              cy="32"
              r="16"
              stroke="rgba(201, 168, 76, 0.4)"
              strokeWidth="0.5"
              strokeDasharray="1 3"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Pulsing Core */}
            <motion.circle
              cx="32"
              cy="32"
              r={isHovering ? 4 : 2}
              fill="var(--color-brand-red)"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>

          {/* Interaction Wave */}
          {isClicking && (
            <motion.div
              className="absolute w-24 h-24 border border-brand-red rounded-full"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>
      </motion.div>

      {/* Latency Mask (Ensures browser cursor is hidden) */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        @media (max-width: 1024px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
