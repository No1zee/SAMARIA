"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp } from "lucide-react";
import { prepare, layout } from "@chenglou/pretext";

interface Project {
  id: string;
  name: string;
  type: string;
  category: string;
  teaser: string;
  metricValue: number;
  metricSuffix: string;
  metricLabel: string;
  tag: string;
  image: string;
  techStack?: string[];
  problem?: string;
  solution?: string;
  result?: string;
  status?: string;
}

interface ProjectDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
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
      queueMicrotask(() => setContentHeight(height + 300));
    } catch (e) {
      console.error("Layout calculation failed for modal:", e);
      queueMicrotask(() => setContentHeight(600)); // Fallback
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
                Case Study: {project?.tag}
              </span>
              
              <h2 className="font-heading text-3xl md:text-5xl text-off-white mb-6">
                {project?.name}
              </h2>

              {/* Technical Diagram Container */}
              {project?.image && (
                <div className="relative w-full aspect-[16/9] mb-8 border border-white/10 bg-black/60 overflow-hidden rounded-sm">
                  <img 
                    src={project.image} 
                    alt={`${project.name} system architecture`}
                    className="w-full h-full object-cover"
                  />
                  {/* Cyber blueprint grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.03)_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />
                </div>
              )}

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 px-3 py-1 bg-metallic-brass/10 border border-metallic-brass/20 text-metallic-brass rounded-full text-xs font-ui">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {project?.metricValue}{project?.metricSuffix}
                </div>
                <span className="text-off-white/40 text-sm font-ui uppercase tracking-widest">
                  {project?.category}
                </span>
              </div>

              <div className="space-y-6 text-off-white/70 leading-relaxed text-lg">
                <p>{project?.teaser}</p>
                <p className="font-light">
                  Our involvement in this project centered on creating a robust digital infrastructure 
                  that prioritized both speed and security. By leveraging cutting-edge web technologies, 
                  we transformed the client&apos;s operational model into a precision-driven ecosystem.
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
