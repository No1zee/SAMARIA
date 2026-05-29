"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { useHaptics } from "@/hooks/useHaptics";
import ScrambleText from "@/components/animations/ScrambleText";
import CelestialHeading from "@/components/ui/CelestialHeading";

interface Project {
  id: string;
  name: string;
  url: string;
  tag: string;
  description: string;
  techStack: string[];
  themeColor: string;
  accentColor: string;
  isLive?: boolean;
  clientType: string;
  problem: string;
  solution: string;
  outcome: string;
}

interface ProjectsTeaserProps {
  initialProjects?: Project[];
}

export default function ProjectsTeaser({ initialProjects = [] }: ProjectsTeaserProps) {
  const { clink } = useHaptics();

  return (
    <section id="selected-work" className="py-16 md:py-fb8 relative overflow-hidden bg-black/5">
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Section Header */}
        <div className="mb-fb6 border-l border-metallic-brass/40 pl-6 md:pl-8 max-w-3xl">
          <ScrambleText
            text="SELECTED WORK"
            className="text-metallic-brass font-ui text-xs tracking-[0.2em] border-b border-metallic-brass/30 pb-1 inline-block mb-fb3"
            duration={1.5}
          />
          <CelestialHeading 
            as="h2" 
            text="The work is the proof." 
            fontSize={56} 
            className="mb-fb3 uppercase tracking-tighter no-prose" 
            intensity={0.6} 
          />
          <p className="text-white/70 text-sm md:text-base font-body leading-relaxed max-w-2xl no-prose">
            A selection of live systems built for performance, permanence, and direct operational utility. Every line of code is owned by the client from day one.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {initialProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 md:p-8 border border-white/5 bg-white/5 hover:border-metallic-brass/25 transition-all duration-500 clip-blade-sm flex flex-col justify-between relative group"
            >
              {/* Subtle background glow based on project theme */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none"
                style={{ 
                  background: `radial-gradient(circle at 50% 50%, ${project.accentColor}44, transparent 70%)` 
                }} 
              />

              <div className="space-y-6 relative z-10">
                {/* Header info */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-ui tracking-[0.2em] text-metallic-brass uppercase block mb-1">
                      {project.tag} // {project.clientType}
                    </span>
                    <h3 className="text-2xl font-heading text-off-white uppercase tracking-tight">
                      {project.name}
                    </h3>
                  </div>
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={clink}
                    className="p-3 border border-white/10 hover:border-metallic-brass/50 bg-black/20 text-white/50 hover:text-metallic-brass transition-all rounded-sm flex items-center justify-center cursor-pointer shrink-0"
                    aria-label={`Visit ${project.name} live website`}
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>

                {/* Description */}
                <p className="text-sm font-body text-white/70 leading-relaxed italic border-l-2 border-metallic-brass/30 pl-4 py-1">
                  &ldquo;{project.description}&rdquo;
                </p>

                {/* Problem & Outcome Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/5">
                  <div className="space-y-2">
                    <span className="text-[9px] font-ui tracking-wider text-white/30 uppercase block">THE CHALLENGE</span>
                    <p className="text-xs font-body text-white/65 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-ui tracking-wider text-white/30 uppercase block">THE SYSTEM (BUILD)</span>
                    <p className="text-xs font-body text-white/65 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-ui tracking-wider text-metallic-brass uppercase block font-bold">MEASURED OUTCOME</span>
                    <p className="text-xs font-body text-white/80 leading-relaxed font-medium">
                      {project.outcome}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom footer bar with Tech Stack */}
              <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 relative z-10">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-0.5 border border-white/5 bg-white/2 text-[9px] font-ui text-white/40 uppercase tracking-widest"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={clink}
                  className="inline-flex items-center gap-2 text-off-white/70 hover:text-metallic-brass font-ui text-[10px] uppercase tracking-widest transition-colors"
                >
                  <span>Launch Live System</span>
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
