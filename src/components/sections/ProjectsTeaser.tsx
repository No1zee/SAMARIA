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
  metricValue: number;
  metricSuffix: string;
  metricLabel: string;
  tag: string;
  image: string;
  techStack: string[];
  problem: string;
  solution: string;
  result: string;
}

const projects: Project[] = [
  {
    id: "the-architect",
    name: "The Architect",
    type: "Custom ERP & Operations Engine",
    category: "Custom Software",
    teaser: "A custom transit management platform built for a regional logistics provider in Gaborone, consolidating 14 warehouse databases into a single real-time dashboard and processing $12M+ in annual transit volume.",
    metricValue: 140,
    metricSuffix: "%",
    metricLabel: "Operational Efficiency Gain",
    tag: "Logistics ERP",
    image: "/the-architect.png",
    techStack: ["React", "Node.js", "PostgreSQL", "Docker", "REST API"],
    problem: "Client ran 14 isolated legacy databases, causing constant transit delays and manual dispatch bottlenecks.",
    solution: "Constructed a monolithic, real-time dispatch dashboard and synchronized Postgres database to unify fleet operations.",
    result: "Unified dispatch workflows, processing $12M+ annual transit volume with a 140% operational efficiency gain."
  },
  {
    id: "the-data-temple",
    name: "The Data Temple",
    type: "Database Architecture & Migration",
    category: "Cloud Infrastructure",
    teaser: "A secure, highly-available cloud-native data architecture designed for a southern African financial services institution, migrating legacy core banking ledgers to AWS with zero downtime.",
    metricValue: 99.999,
    metricSuffix: "%",
    metricLabel: "System Uptime Maintained",
    tag: "Cloud Infrastructure",
    image: "/the-data-temple.png",
    techStack: ["AWS (RDS/S3)", "Terraform", "PostgreSQL", "Python", "IAM"],
    problem: "Legacy core banking database suffered from frequent latency spikes and high risk during high-volume periods.",
    solution: "Architected a highly-available, multi-AZ PostgreSQL setup on AWS RDS with structured replication and custom schemas.",
    result: "Successfully migrated 100% of transaction ledgers to the cloud while maintaining 99.999% system uptime."
  },
  {
    id: "the-guardian",
    name: "The Guardian",
    type: "Vulnerability Audit & Hardening",
    category: "Cybersecurity",
    teaser: "An end-to-end security penetration audit and perimeter defense configuration for a fast-growing African fintech platform, securing over 2 million active customer wallets.",
    metricValue: 100,
    metricSuffix: "%",
    metricLabel: "Threat Protection Success",
    tag: "Security Hardening",
    image: "/the-guardian.png",
    techStack: ["OWASP Hardening", "JWT Auth", "Cloudflare WAF", "Nginx", "System Audit"],
    problem: "Fast-growing fintech app had unpatched API endpoints, presenting vulnerabilities to automated credential stuffing attacks.",
    solution: "Executed a full penetration audit, hardened JWT authentication flow, and configured a custom perimeter web firewall.",
    result: "Secured 2M+ customer wallets with 100% threat mitigation and zero breach attempts since deployment."
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
                  className="text-metallic-brass font-ui text-xs tracking-[0.4em] border-b border-metallic-brass/30 pb-1"
                  duration={1.5}
                />
            </div>
            <div className="flex items-center gap-fb1 mb-fb2">
                <span className="text-silence text-white/40 text-[10px] uppercase tracking-widest">
                  Systems built to perform, scale, and outlast under institutional constraints.
                </span>
            </div>
            <CinematicText 
              fontSize={128}
              className="text-5xl md:text-[8rem] text-off-white font-heading uppercase tracking-tighter leading-[0.85] block"
              maxWidth={1200}
            >
              OUR WORK.
            </CinematicText>
          </div>
          <div className="text-silence text-metallic-brass/30 uppercase tracking-[0.2em] text-[10px] pb-2 border-b border-metallic-brass/10">
            RECENT REGISTRY
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
              className="group cursor-pointer border border-white/5 bg-royal-obsidian/85 hover:border-metallic-brass/30 hover:bg-royal-obsidian/95 transition-all duration-500 p-8 flex flex-col justify-between min-h-[460px] md:min-h-[560px] relative overflow-hidden rounded-sm"
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
 
                <div className="border-t border-white/5 pt-6 mt-6">
                  <span className="block text-[9px] font-ui text-white/40 uppercase tracking-widest mb-1">{project.metricLabel}</span>
                  <div className="text-3xl font-heading text-metallic-brass font-bold flex items-baseline">
                    {project.metricValue}{project.metricSuffix}
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
