"use client";

import { motion } from "framer-motion";

interface TabletCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  deliverables?: string[];
  delay?: number;
}

export default function TabletCard({ title, description, icon, deliverables, delay = 0 }: TabletCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="group relative bg-royal-obsidian border border-brand-gold/20 p-8 hover:border-brand-gold/60 transition-colors duration-500 overflow-hidden"
    >
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-gold/50"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-gold/50"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-gold/50"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-gold/50"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Icon Container */}
        <div className="mb-6 p-4 rounded-full bg-brand-gold/5 border border-brand-gold/20 text-brand-gold group-hover:scale-110 group-hover:bg-brand-gold/10 transition-all duration-300">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-off-white mb-4 group-hover:text-brand-gold transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-off-white/70 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Deliverables */}
        {deliverables && deliverables.length > 0 && (
          <div className="w-full mt-4 pt-4 border-t border-brand-gold/10">
            <ul className="space-y-2 text-left">
              {deliverables.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-off-white/60">
                  <span className="text-brand-gold mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-gold/10 group-hover:bg-brand-gold transition-colors duration-500"></div>
    </motion.div>
  );
}
