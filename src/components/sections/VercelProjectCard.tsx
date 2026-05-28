import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/components/sections/ProjectsTeaser";

interface VercelProjectCardProps {
  project: Project;
  onSelect: () => void;
}

export default function VercelProjectCard({ project, onSelect }: VercelProjectCardProps) {
  return (
    <motion.div
      className="group cursor-pointer border border-white/5 bg-royal-obsidian/85 hover:border-metallic-brass/30 hover:bg-royal-obsidian/95 transition-all duration-500 p-8 flex flex-col justify-between min-h-[400px] md:min-h-[480px] relative overflow-hidden rounded-sm"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onSelect}
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
            <Image src={project.image} alt={`${project.name} system diagram`} fill className="object-cover" />
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
  );
}
