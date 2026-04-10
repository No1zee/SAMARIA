"use client";
 
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useHaptics } from "@/hooks/useHaptics";
import ProjectDetails from "@/components/modals/ProjectDetails";
import Image from "next/image";
import ScrambleText from "@/components/animations/ScrambleText";
 
const PROJECTS = [
  {
    id: "project-01",
    name: "The Obsidian Ledger",
    type: "Financial Architecture",
    teaser: "A high-fidelity framework engineered for total visibility and resilient capital flow. This is where audit-ready precision meets the demands of high-intent financial architecture.",
    metric: "99.99%",
    metricLabel: "Uptime Protocol",
    tag: "Movement 01 // Institutional",
    image: "/the-architect.png",
  },
  {
    id: "project-02",
    name: "Solstice Infrastructure",
    type: "Digital Ecosystem",
    teaser: "We didn't just build a portal; we harmonized a fragmented global network into a single, reactive ecosystem for real-time asset governance.",
    metric: "14ms",
    metricLabel: "Global Latency Floor",
    tag: "Movement 02 // Infrastructure",
    image: "/the-data-temple.png",
  },
  {
    id: "project-03",
    name: "Aether Digital",
    type: "Editorial Experience",
    teaser: "Forged for those who require permanent brand authority in a noisy digital age. A cinematic experience that commands attention through obsessive detail.",
    metric: "82%",
    metricLabel: "Retention Authority",
    tag: "Movement 03 // Identity",
    image: "/the-gate.png",
  },
];
 
interface Project {
  id: string;
  name: string;
  type: string;
  teaser: string;
  metric: string;
  metricLabel: string;
  tag: string;
  image: string;
}

export default function ProjectsTeaser() {
  const { clink } = useHaptics();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const openProject = (project: Project) => {
    clink();
    setSelectedProject(project);
    setIsModalOpen(true);
  };
 
  return (
    <section id="artifacts" className="py-fb8 relative overflow-hidden">
      
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Section Header */}
        <div className="mb-fb7 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-l border-metallic-brass/40 pl-fb3">
          <div>
            <div className="flex items-center gap-fb1 mb-fb2">
                <ScrambleText 
                  text="ACTION" 
                  className="text-metallic-brass font-ui text-xs tracking-[0.6em] border-b border-metallic-brass/30 pb-1"
                  duration={1.5}
                />
            </div>
            <div className="flex items-center gap-fb1 mb-fb2">
                <span className="text-silence text-white/20 text-[10px] uppercase tracking-widest">Movement 03 — Artifacts</span>
            </div>
            <h2 className="text-5xl md:text-[8rem] text-off-white font-heading uppercase tracking-tighter leading-[0.85]">
              Architecture <br className="md:hidden"/> In <ScrambleText text="Motion." duration={2} />
            </h2>
          </div>
          <a href="/case-studies" className="text-silence text-metallic-brass/60 hover:text-metallic-brass transition-colors uppercase tracking-[0.2em] text-xs pb-2 border-b border-metallic-brass/20">
            [ View All Systems ]
          </a>
        </div>
 
        {/* Cinematic Case Study Panels (Vertical Stack) */}
        <div className="flex flex-col gap-fb6">
          {PROJECTS.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-16/10 md:aspect-[2.618/1] border border-white/5 blade-motif group cursor-pointer hover:border-metallic-brass/40 transition-all duration-700 overflow-hidden grid grid-cols-1 md:grid-cols-10 blade-reveal"
              onClick={() => openProject(project)}
            >
              {/* Left Zone: Metadata (38.2% Split) */}
              <div className="md:col-span-4 p-fb5 md:p-fb6 flex flex-col justify-between relative z-20 bg-obsidian-layered/60 backdrop-blur-sm shadow-2xl">
                <div className="relative">
                  <span className="text-silence text-metallic-brass mb-fb4 block opacity-100">{project.tag}</span>
                  <h3 className="text-4xl md:text-6xl font-heading text-off-white mb-fb3 leading-none uppercase tracking-tighter">
                    {project.name}
                  </h3>
                  <p className="text-off-white/40 max-w-sm text-lg md:text-xl font-body leading-relaxed border-l border-metallic-brass/20 pl-fb2 italic">
                    {project.teaser}
                  </p>
                </div>
 
                <div className="flex items-end gap-fb4 pt-fb4 border-t border-white/5">
                   <div className="flex flex-col">
                      <span className="text-[10px] tracking-[0.4em] font-ui text-metallic-brass/60 mb-1 uppercase">Proof Outcome</span>
                      <span className="text-5xl md:text-7xl font-heading text-brand-red tracking-tighter">{project.metric}</span>
                   </div>
                   <span className="text-xs uppercase tracking-[0.3em] font-ui text-off-white/20 mb-2">{project.metricLabel}</span>
                </div>
 
                {/* Metric Watermark */}
                <span className="absolute bottom-4 right-4 text-[12rem] font-heading text-white/3 pointer-events-none select-none leading-none">
                  {project.metric}
                </span>
              </div>
 
              {/* Right Zone: Proof Visual (61.8% Split) */}
              <div className="md:col-span-6 relative overflow-hidden bg-black outline-1 outline-white/5">
                <Image 
                  src={project.image} 
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1500px) 60vw, 900px"
                  className="object-cover opacity-80 grayscale-0 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100"
                  style={{ filter: "sepia(0.1) contrast(1.1) brightness(0.9)" }}
                />
                
                {/* Ukiyo-e Texture Overlay */}
                <div className="absolute inset-0 bg-parchment-grain opacity-10 mix-blend-overlay pointer-events-none" />
                
                {/* Scanning Line Animation */}
                <motion.div 
                  initial={{ top: "-100%" }}
                  animate={{ top: "200%" }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-[10%] bg-linear-to-b from-transparent via-metallic-brass/5 to-transparent pointer-events-none"
                />
 
                <div className="absolute bottom-fb4 right-fb4">
                   <button className="btn-warrior py-3 px-8 text-[10px]">
                      Explore Build <ArrowRight className="w-3 h-3" />
                   </button>
                </div>
              </div>
            </motion.article>
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
