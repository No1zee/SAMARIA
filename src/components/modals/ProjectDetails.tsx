"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp } from "lucide-react";
import { prepare, layout } from "@chenglou/pretext";

interface ProjectDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

export default function ProjectDetails({ isOpen, onClose, project }: ProjectDetailsProps) {
  const [contentHeight, setContentHeight] = useState(0);

  // Case 4: Pre-calculate the exact height of the modal content using Pretext
  // This prevents the "pop-in" or layout shift when the modal content hydrates.
  useEffect(() => {
    if (!project || !isOpen) return;

    const font = "400 16px Montserrat"; // Body font
    const width = 600; // Expected inner width of modal content
    const lineHeight = 1.6 * 16;

    try {
      const prepared = prepare(project.teaser, font);
      const { height } = layout(prepared, width, lineHeight);
      
      // Add extra height for title, metrics, and padding
      setContentHeight(height + 300); 
    } catch (e) {
      console.error("Layout calculation failed for modal:", e);
      setContentHeight(600); // Fallback
    }
  }, [project, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-royal-obsidian/90 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full max-w-2xl bg-black-bean border border-brand-red/30 p-8 md:p-12 overflow-hidden clip-blade`}
            style={{ minHeight: contentHeight > 0 ? `${contentHeight}px` : "auto" }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-off-white/40 hover:text-spirit-red transition-colors"
              aria-label="Close Project Details"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative z-10">
              <span className="font-ui text-xs text-spirit-red tracking-[0.3em] uppercase block mb-6">
                Case Study: {project.tag}
              </span>
              
              <h2 className="font-heading text-3xl md:text-5xl text-off-white mb-6">
                {project.name}
              </h2>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 px-3 py-1 bg-brand-red/10 border border-brand-red/20 text-spirit-red rounded-full text-xs font-ui">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {project.metric}
                </div>
                <span className="text-off-white/40 text-sm font-ui uppercase tracking-widest">
                  {project.status}
                </span>
              </div>

              <div className="space-y-6 text-off-white/70 leading-relaxed text-lg">
                <p>{project.teaser}</p>
                <p className="font-light">
                  Our involvement in this project centered on creating a robust digital infrastructure 
                  that prioritized both speed and security. By leveraging cutting-edge web technologies, 
                  we transformed the client's operational model into a precision-driven ecosystem.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-brand-red/10">
                <button className="btn-warrior w-full md:w-auto">
                  Start Your Project
                </button>
              </div>
            </div>

            {/* Background design elements */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-red/5 blur-3xl rounded-full" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
