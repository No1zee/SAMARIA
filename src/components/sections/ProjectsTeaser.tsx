"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
  // Take exactly 3 projects max for the homepage
  const featuredProjects = initialProjects.slice(0, 3);

  if (featuredProjects.length === 0) return null;

  return (
    <section id="selected-work" className="py-16 md:py-fb8 relative overflow-hidden bg-black/10">
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Section Header */}
        <div className="mb-fb6 border-l border-metallic-brass/40 pl-6 md:pl-8 max-w-3xl">
          <span className="section-label mb-3 block">SELECTED WORK</span>
          <CelestialHeading 
            as="h2" 
            text="Proof of Execution." 
            fontSize={56} 
            className="mb-fb3 uppercase tracking-tighter no-prose" 
            intensity={0.6} 
          />
          <p className="text-white/70 text-sm md:text-base font-body leading-relaxed max-w-2xl no-prose">
            The work is the argument. Below are live, production-grade applications built for long-term reliability.
          </p>
        </div>

        {/* Selected Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-8 border border-white/5 bg-white/5 hover:border-metallic-brass/25 transition-colors duration-500 clip-blade-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-ui tracking-[0.25em] text-metallic-brass uppercase block mb-4">
                  {project.tag}
                </span>
                
                <h3 className="text-lg md:text-xl font-heading text-off-white uppercase tracking-tighter mb-4">
                  {project.name}
                </h3>
                
                {/* Challenge */}
                <div className="mb-4">
                  <span className="text-[9px] font-ui tracking-[0.2em] text-white/30 uppercase block mb-1">Challenge</span>
                  <p className="text-xs md:text-sm font-body text-white/60 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* Outcome */}
                <div className="mb-8">
                  <span className="text-[9px] font-ui tracking-[0.2em] text-white/30 uppercase block mb-1">Outcome</span>
                  <p className="text-xs md:text-sm font-body text-white/70 leading-relaxed font-medium">
                    {project.outcome}
                  </p>
                </div>
              </div>

              <div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-metallic-brass hover:text-white transition-all uppercase tracking-[0.25em] text-[10px] font-ui group border border-metallic-brass/20 hover:border-metallic-brass/60 px-5 py-2.5 bg-metallic-brass/5 w-full justify-center"
                >
                  <span>View Live System</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
