"use client";
 
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
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
  tag: string;
  image: string;
  techStack: string[];
  problem: string;
  solution: string;
  result: string;
}

const projects: Project[] = [
  {
    id: "it-consulting",
    name: "Enterprise Operations Portal",
    type: "Custom Operations Portal & Scheduling",
    category: "Operations Automation",
    teaser: "An automated client intake and scheduling system that connects booking forms directly to secure calendars and client management databases.",
    tag: "Operations Automation",
    image: "/it-consulting-mockup.png",
    techStack: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "REST API"],
    problem: "Managing consultation booking and calendar coordination manually caused high administration friction.",
    solution: "We built a customer booking workflow integrated with PostgreSQL databases and automated calendar synchronization.",
    result: "Automated the scheduling workflow completely, reducing manual admin work by 90% and doubling booking conversions."
  },
  {
    id: "database-system",
    name: "Cloud-Native Database System",
    type: "High-Scale Inventory & Sync Engine",
    category: "System Architecture",
    teaser: "A serverless inventory caching and synchronization system designed to handle high transaction volumes and instant inventory search queries.",
    tag: "Database Architecture",
    image: "/creative-showcase-mockup.png",
    techStack: ["TypeScript", "Redis", "PostgreSQL", "Next.js", "AWS Cloud"],
    problem: "A retail platform experienced database locks and slow search queries during high-traffic promotional hours.",
    solution: "We engineered a serverless caching layer using Redis databases and optimized write-heavy query pipelines.",
    result: "Reduced search query speeds from 3 seconds to under 45 milliseconds, resolving system lockups completely."
  },
  {
    id: "continuity-system",
    name: "IT Continuity & Support Platform",
    type: "Critical Monitoring & Failover Server",
    category: "Maintenance & Continuity",
    teaser: "A redundant web architecture and monitoring system built to prevent server down-times and guarantee secure continuity.",
    tag: "Continuity & Support",
    image: "/edward-portfolio-mockup.png",
    techStack: ["React", "Next.js", "Docker", "Sentry", "AWS VPC"],
    problem: "Critical client systems lacked automatic alerts and recovery systems, risking costly downtime during hosting failures.",
    solution: "We deployed an automated uptime monitor with redundant failover servers and immediate notification loops.",
    result: "Maintained a guaranteed 99.99% system uptime over 12 months with automated server recovery cycles."
  }
];
 
export default function ProjectsTeaser() {
  const { clink } = useHaptics();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  return (
    <section id="artifacts" className="py-12 md:py-fb8 relative overflow-hidden bg-royal-obsidian z-10">
      
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Section Header */}
        <div className="mb-fb7 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-l border-metallic-brass/40 pl-6 md:pl-8">
          <div>
            <div className="flex items-center gap-fb1 mb-fb2">
                <ScrambleText 
                  text="HOW WE HELP — OUR WORK" 
                  className="text-metallic-brass font-ui text-xs tracking-[0.2em] border-b border-metallic-brass/30 pb-1"
                  duration={1.5}
                />
            </div>
            <div className="flex items-center gap-fb1 mb-fb2 max-w-4xl">
                <span className="text-silence text-white/50 text-xs md:text-sm uppercase tracking-widest leading-relaxed block my-3">
                  We build custom digital infrastructure tailored to your exact operational requirements. While our live deployments showcase front-facing creative systems, our capabilities extend across custom database architectures, logistics ERPs, financial ledgers, and secure backend systems. Here are three of our best live Vercel deployments.
                </span>
            </div>
            <CinematicText 
              fontSize={128}
              className="text-5xl md:text-[8rem] text-off-white font-heading uppercase tracking-tighter leading-[0.85] block"
              maxWidth={1200}
            >
              WHAT WE'VE BUILT.
            </CinematicText>
          </div>
          <div className="text-silence text-metallic-brass/30 uppercase tracking-[0.15em] text-[10px] pb-2 border-b border-metallic-brass/10">
            CASE STUDIES
          </div>
        </div>
 
        {/* Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-fb4 items-stretch">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              onClick={() => {
                setSelectedProject(project);
                setIsModalOpen(true);
              }}
              className="group cursor-pointer border border-white/5 bg-royal-obsidian/85 hover:border-metallic-brass/30 hover:bg-royal-obsidian/95 transition-all duration-500 p-8 flex flex-col justify-between min-h-[400px] md:min-h-[480px] relative overflow-hidden rounded-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
 
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[9px] font-ui text-metallic-brass tracking-[0.3em] uppercase border border-metallic-brass/25 px-3 py-1 rounded-full bg-metallic-brass/5">
                      {project.tag}
                    </span>
                    <span className="text-[9px] font-ui text-white/30 uppercase tracking-[0.2em]">
                      {project.category}
                    </span>
                  </div>
 
                  <h3 className="text-2xl md:text-3xl font-heading text-off-white uppercase mb-4 group-hover:text-metallic-brass transition-colors duration-300">
                    {project.name}
                  </h3>
 
                  {/* Architecture Diagram Slot */}
                  <div className="relative w-full aspect-[16/10] my-4 border border-white/10 bg-black/40 overflow-hidden rounded-sm group-hover:border-metallic-brass/35 transition-colors duration-500">
                    <Image 
                      src={project.image} 
                      alt={`${project.name} system diagram`}
                      fill
                      className="object-cover"
                    />
                    {/* Cyber blueprint grid overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.03)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
                  </div>
 
                  {/* Problem / Solution / Result Bullet Points */}
                  <div className="space-y-4 my-6 font-body text-xs text-off-white/70 leading-relaxed">
                    <div>
                      <span className="font-ui text-[9px] uppercase tracking-wider text-metallic-brass block font-bold mb-0.5">Problem</span>
                      <p className="no-prose">{project.problem}</p>
                    </div>
                    <div>
                      <span className="font-ui text-[9px] uppercase tracking-wider text-metallic-brass block font-bold mb-0.5">Solution</span>
                      <p className="no-prose">{project.solution}</p>
                    </div>
                    <div>
                      <span className="font-ui text-[9px] uppercase tracking-wider text-metallic-brass block font-bold mb-0.5">Result</span>
                      <p className="no-prose">{project.result}</p>
                    </div>
                  </div>
 
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-[8px] font-ui tracking-widest uppercase bg-white/5 border border-white/10 px-2 py-0.5 text-off-white/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
