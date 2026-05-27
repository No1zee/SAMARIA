"use client";
 
import { motion } from "framer-motion";
import { useState } from "react";
import { useHaptics } from "@/hooks/useHaptics";
import ProjectDetails from "@/components/modals/ProjectDetails";
import ScrambleText from "@/components/animations/ScrambleText";
import CinematicText from "@/components/ui/CinematicText";
 
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
}

export default function ProjectsTeaser() {
  const { clink } = useHaptics();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  return (
    <section id="artifacts" className="py-fb8 relative overflow-hidden">
      
 
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Section Header */}
        <div className="mb-fb7 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-l border-metallic-brass/40 pl-6 md:pl-8">
          <div>
            <div className="flex items-center gap-fb1 mb-fb2">
                <ScrambleText 
                  text="UNDER CONSTRUCTION" 
                  className="text-metallic-brass font-ui text-xs tracking-[0.6em] border-b border-metallic-brass/30 pb-1"
                  duration={1.5}
                />
            </div>
            <div className="flex items-center gap-fb1 mb-fb2">
                <span className="text-silence text-white/20 text-[10px] uppercase tracking-widest">
                  We are working on some truly exciting projects this year. New tactical assets are being forged as we speak.
                </span>
            </div>
            <CinematicText 
              fontSize={128}
              className="text-5xl md:text-[8rem] text-off-white font-heading uppercase tracking-tighter leading-[0.85] block"
              maxWidth={1200}
            >
              BUILD ACTIVE.
            </CinematicText>
          </div>
          <div className="text-silence text-metallic-brass/30 uppercase tracking-[0.2em] text-[10px] pb-2 border-b border-metallic-brass/10">
            [ ARCHIVES OFFLINE ]
          </div>
        </div>
 
        {/* Cinematic Case Study Panels (Forge in Progress State) */}
        <div className="flex flex-col gap-fb6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative flex flex-col items-center justify-center border border-white/10 bg-black/40 backdrop-blur-xl p-fb8 md:p-fb10 text-center clip-blade overflow-hidden group min-h-[500px]"
          >
            {/* Ambient Background Visual */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-parchment-grain opacity-5" />
                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-metallic-brass/5 to-transparent opacity-20" />
            </div>

            {/* Scanning Line Animation */}
            <motion.div 
              initial={{ top: "-100%" }}
              animate={{ top: "200%" }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[40%] bg-linear-to-b from-transparent via-metallic-brass/10 to-transparent pointer-events-none"
            />

            <div className="relative z-10 max-w-2xl">
               <div className="inline-block px-4 py-1 border border-metallic-brass/40 rounded-full mb-fb4">
                  <span className="text-[10px] font-ui text-metallic-brass tracking-[0.5em] uppercase">
                    BUILD STATUS: ACTIVE
                  </span>
               </div>
               
               <h3 className="text-4xl md:text-6xl font-heading text-off-white mb-fb4 leading-[1.1] uppercase tracking-tighter">
                 Architecting the <span className="text-metallic-brass/80 italic">Next Decade.</span>
               </h3>
               
               <p className="text-off-white/50 text-xl font-body leading-relaxed mb-fb7 border-l-2 border-metallic-brass/20 pl-6 mx-auto max-w-xl text-left">
                 Throughout 2026 we have been working on a lot of exciting projects and can&apos;t wait to show you. This area is under construction.
               </p>
            </div>

            {/* Background design elements */}
            <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-metallic-brass/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/3 h-px bg-linear-to-r from-transparent via-metallic-brass/40 to-transparent" />
          </motion.div>
        </div>
 
      </div>
 
      <ProjectDetails 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={selectedProject} 
      />
    </section>
  );
}
