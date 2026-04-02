"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTextFit } from "@/hooks/useTextFit";

interface TabletCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  deliverables?: string[];
  delay?: number;
}

export default function TabletCard({ title, description, icon, deliverables, delay = 0 }: TabletCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Use Case 5: Blade Overflow Protection
  // We want to ensure the description fits within the top 80% (safety margin) of the card's rectangular area.
  const fittedDescSize = useTextFit(description, {
    maxWidth: dimensions.width > 100 ? dimensions.width - 64 : 0, // Padding 2rem (32px * 2)
    maxHeight: dimensions.height > 100 ? dimensions.height * 0.4 : 100, // Allocate 40% height for description
    font: "var(--font-body)",
    lineHeight: 1.6,
    initialFontSize: 16,
    minFontSize: 12
  });
  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="group relative bg-royal-obsidian border border-brand-red/20 p-8 hover:border-brand-red/60 transition-colors duration-500 overflow-hidden clip-blade @container"
    >
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-red/50"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-red/50"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-red/50"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-red/50"></div>

      <div className="relative z-10 flex flex-col items-center text-center @[400px]:flex-row @[400px]:items-start @[400px]:text-left @[400px]:gap-6">
        {/* Icon Container */}
        <div className="mb-6 p-4 rounded-full bg-brand-red/5 border border-brand-red/20 text-spirit-red group-hover:scale-110 group-hover:bg-brand-red/10 transition-[transform,background-color] duration-300 @[400px]:mb-0">
          {icon}
        </div>

        <div className="flex-1">

        {/* Title */}
        <h3 className="text-off-white mb-4 group-hover:text-spirit-red transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p 
          className="text-off-white/70 leading-relaxed mb-6 transition-[font-size] duration-300"
          style={{ fontSize: `${fittedDescSize}px` } as any}
        >
          {description}
        </p>

        {/* Deliverables */}
        {deliverables && deliverables.length > 0 && (
          <div className="w-full mt-4 pt-4 border-t border-brand-red/10">
            <ul className="space-y-2 text-left">
              {deliverables.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-off-white/60">
                  <span className="text-spirit-red mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red/10 group-hover:bg-brand-red transition-colors duration-500"></div>
    </motion.div>
  );
}
