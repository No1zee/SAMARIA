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
    id: "edward-magejo-portfolio",
    name: "Edward Magejo Portfolio",
    type: "High-Fidelity Developer Portfolio",
    category: "Creative Frontend",
    teaser: "A premium portfolio system designed for our lead architect, showcasing interactive WebGL visuals, bespoke layouts, and complex physics-based constellations.",
    metricValue: 100,
    metricSuffix: "%",
    metricLabel: "Lighthouse Performance Score",
    tag: "Lead Architect Portfolio",
    image: "/edward-portfolio-mockup.png",
    techStack: ["React", "Next.js", "Framer Motion", "GSAP", "Tailwind CSS"],
    problem: "Our lead architect needed a visual portfolio that immediately establishes engineering credibility without losing performance.",
    solution: "Engineered a customized Next.js application with optimized visual caching, custom state bridges, and hardware-accelerated animations.",
    result: "Delivered a premium digital canvas that scores a perfect 100% on Vercel Lighthouse metrics under heavy graphics load."
  },
  {
    id: "portfolio-website",
    name: "Portfolio Website",
    type: "Interactive Developer Portal",
    category: "UI/UX & WebGL",
    teaser: "A lightweight, highly responsive developer hub showcasing complex canvas renders, spring-physics motion controllers, and customizable themes.",
    metricValue: 99.9,
    metricSuffix: "%",
    metricLabel: "Core Web Vitals Pass Rate",
    tag: "Creative Showcase",
    image: "/creative-showcase-mockup.png",
    techStack: ["TypeScript", "Three.js", "WebGL", "Next.js", "PostCSS"],
    problem: "Traditional portfolio sites with heavy animation suffer from high bounce rates and poor Core Web Vitals grades.",
    solution: "Built custom DOM-free canvas rendering cycles and debounced event loop listener layers to optimize interaction cycles.",
    result: "Maintained 99.9% pass rates for Core Web Vitals across simulated mobile devices."
  },
  {
    id: "it-consulting",
    name: "IT Consulting Portal",
    type: "Enterprise Scheduling & Booking System",
    category: "Automated Systems",
    teaser: "A custom consulting portal built for corporate clients, featuring client log tracking, integrated booking schedules, and dynamic intake wizard states.",
    metricValue: 2.4,
    metricSuffix: "x",
    metricLabel: "Intake Conversion Rate",
    tag: "Enterprise Portal",
    image: "/it-consulting-mockup.png",
    techStack: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "REST API"],
    problem: "Manual consulting coordination caused severe intake booking friction and client conversion drop-offs.",
    solution: "Constructed a custom booking workflow integrated with PostgreSQL databases and automatic calendar alerts.",
    result: "Fully automated the consultation pipeline, yielding a 2.4x increase in conversion rate within the first quarter."
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
