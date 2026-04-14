"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useTransform, animate, motion } from "framer-motion";

interface CountUpProps {
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export default function CountUp({
  to,
  duration = 2,
  className = "",
  prefix = "",
  suffix = "",
  decimals = 0,
}: CountUpProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return prefix + latest.toFixed(decimals) + suffix;
  });

  useEffect(() => {
    // We handle the animation logic inside a function that can be triggered by InView
  }, [to, duration, count]);

  return (
    <motion.span 
      className={className}
      onViewportEnter={() => {
        animate(count, to, {
          duration: duration,
          ease: "easeOut",
        });
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {rounded}
    </motion.span>
  );
}
