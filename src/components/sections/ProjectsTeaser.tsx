"use client";
 
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useHaptics } from "@/hooks/useHaptics";
import ProjectDetails from "@/components/modals/ProjectDetails";
import ScrambleText from "@/components/animations/ScrambleText";
import CinematicText from "@/components/ui/CinematicText";
 
import VercelProjectCard from "@/components/sections/VercelProjectCard";
// In production we will replace it with live Vercel projects fetched from the API.
interface Project {
  id: string;
  name: string;
  url: string;
  image: string;
  tag: string;
  category: string;
  techStack: string[];
  problem: string;
  solution: string;
  result: string;
}

// Placeholder projects used when the API fails or is unreachable.
const fallbackProjects: Project[] = [
  {
    id: "it-consulting",
    name: "Enterprise Operations Portal",
    url: "#",
    image: "/it-consulting-mockup.png",
    tag: "Operations Automation",
    category: "Operations Automation",
    techStack: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "REST API"],
    problem: "Managing consultation booking and calendar coordination manually caused high administration friction.",
    solution: "We built a customer booking workflow integrated with PostgreSQL databases and automated calendar synchronization.",
    result: "Automated the scheduling workflow completely, reducing manual admin work by 90% and doubling booking conversions."
  },
  {
    id: "database-system",
    name: "Cloud-Native Database System",
    url: "#",
    image: "/creative-showcase-mockup.png",
    tag: "Database Architecture",
    category: "System Architecture",
    techStack: ["TypeScript", "Redis", "PostgreSQL", "Next.js", "AWS Cloud"],
    problem: "A retail platform experienced database locks and slow search queries during high‑traffic promotional hours.",
    solution: "We engineered a serverless caching layer using Redis databases and optimized write‑heavy query pipelines.",
    result: "Reduced search query speeds from 3 seconds to under 45 ms, eliminating lock‑ups.",
  },
  {
    id: "continuity-system",
    name: "IT Continuity & Support Platform",
    url: "#",
    image: "/edward-portfolio-mockup.png",
    tag: "Continuity & Support",
    category: "Maintenance & Continuity",
    techStack: ["React", "Next.js", "Docker", "Sentry", "AWS VPC"],
    problem: "Critical client systems lacked automatic alerts and recovery systems, risking costly downtime.",
    solution: "We deployed an automated uptime monitor with redundant failover servers and immediate notification loops.",
    result: "Maintained a guaranteed 99.99 % uptime over 12 months with automated server recovery cycles.",
  },
];
 
import { useEffect, useState } from "react";
import useSWR from "swr";

// Simple fetcher for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProjectsTeaser() {
  const { clink } = useHaptics();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  // Fetch live Vercel projects – fallback to static data on error.
  const { data, error } = useSWR('/api/vercel-projects', fetcher);
  const projects: Project[] = data?.projects ?? fallbackProjects;

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
            <VercelProjectCard
              key={project.id}
              project={project}
              onSelect={() => {
                setSelectedProject(project);
                setIsModalOpen(true);
              }}
            />
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
