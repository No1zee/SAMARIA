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

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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
        className="absolute w-4 h-4 rounded-full bg-brand-red/20 blur-md"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isClicking ? 4 : isHovering ? 2.5 : 1,
        }}
      />

      {/* Main Blade Point */}
      <motion.div
        className="absolute"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Precise Blade Tip (Pointing exactly at center) */}
          <motion.path
            d="M24 4L28 24L24 44L20 24L24 4Z"
            fill="white"
            stroke="var(--color-brand-red)"
            strokeWidth="1.5"
            animate={{
              scale: isClicking ? 0.7 : isHovering ? 1.3 : 1,
              fill: isHovering ? "var(--color-brand-red)" : "white",
              rotate: isHovering ? 90 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          
          {/* Interaction Halo */}
          <motion.circle
            cx="24"
            cy="24"
            r="12"
            stroke="var(--color-metallic-brass)"
            strokeWidth="0.5"
            strokeDasharray="2 4"
            animate={{
              rotate: 360,
              opacity: isHovering ? 0.4 : 0.1,
              scale: isHovering ? 1.5 : 1
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          {/* Reactive Spark on Click */}
          {isClicking && (
            <motion.circle
              cx="24"
              cy="24"
              r="4"
              fill="var(--color-brand-red)"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </svg>
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
