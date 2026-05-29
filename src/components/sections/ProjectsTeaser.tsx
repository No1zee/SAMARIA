"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";
import { useHaptics } from "@/hooks/useHaptics";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const { clink } = useHaptics();

  // Scroll controls
  const scrollLeft = () => {
    if (containerRef.current) {
      clink();
      containerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      clink();
      containerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  if (initialProjects.length === 0) return null;

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-black/10">
      {/* 3D Perspective container wrapper */}
      <div className="w-full max-w-[1600px] mx-auto px-6 relative z-10">
        
        {/* Navigation arrows (Floating) */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
          <button
            onClick={scrollLeft}
            className="p-4 border border-white/10 bg-black/60 backdrop-blur-md hover:border-metallic-brass/60 hover:bg-metallic-brass/10 transition-all rounded-full text-off-white/70 hover:text-metallic-brass cursor-pointer"
            aria-label="Scroll left"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:block">
          <button
            onClick={scrollRight}
            className="p-4 border border-white/10 bg-black/60 backdrop-blur-md hover:border-metallic-brass/60 hover:bg-metallic-brass/10 transition-all rounded-full text-off-white/70 hover:text-metallic-brass cursor-pointer"
            aria-label="Scroll right"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Scrollable Container with Perspective */}
        <div 
          ref={containerRef}
          className="flex overflow-x-auto gap-8 md:gap-12 py-12 px-4 md:px-12 scrollbar-none snap-x snap-mandatory scroll-smooth relative"
          style={{ 
            perspective: "1200px", 
            transformStyle: "preserve-3d",
            scrollbarWidth: "none"
          }}
        >
          {initialProjects.map((project) => (
            <BookCard 
              key={project.id} 
              project={project} 
              containerRef={containerRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Inner component for each card to handle local scroll calculations
function BookCard({ project, containerRef }: { project: Project; containerRef: React.RefObject<HTMLDivElement | null> }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateY: 0, scale: 1, z: 0 });
  const [iframeLoading, setIframeLoading] = useState(true);
  const { clink } = useHaptics();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculate3DTransforms = () => {
      const card = cardRef.current;
      if (!card) return;

      const cardRect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Horizontal centers
      const containerCenter = containerRect.left + containerRect.width / 2;
      const cardCenter = cardRect.left + cardRect.width / 2;

      const distance = cardCenter - containerCenter;
      const maxDistance = containerRect.width / 2;

      // Ratio of distance from center (-1 to 1)
      const ratio = Math.max(-1, Math.min(1, distance / maxDistance));

      // Calculate 3D book-fold rotation
      const rotateY = ratio * -28; // Tilts inward as you scroll past
      const scale = 1 - Math.abs(ratio) * 0.08; // Shrinks slightly on edges
      const z = Math.abs(ratio) * -80; // Moves back in z-depth on edges

      setTransform({ rotateY, scale, z });
    };

    container.addEventListener("scroll", calculate3DTransforms, { passive: true });
    calculate3DTransforms(); // Initial calculation

    // Recalculate on window resize
    window.addEventListener("resize", calculate3DTransforms, { passive: true });

    return () => {
      container.removeEventListener("scroll", calculate3DTransforms);
      window.removeEventListener("resize", calculate3DTransforms);
    };
  }, [containerRef]);

  return (
    <motion.div
      ref={cardRef}
      className="w-[280px] sm:w-[360px] md:w-[480px] h-[360px] sm:h-[420px] md:h-[520px] shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer relative group snap-center"
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
      animate={{
        rotateY: transform.rotateY,
        scale: transform.scale,
        z: transform.z,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.5 }}
    >
      {/* Mockup wrapper */}
      <div className="w-full h-full bg-[#0e0e0e] flex flex-col">
        {/* Browser Chrome Header */}
        <div className="h-9 shrink-0 border-b border-white/5 bg-[#181818] px-4 flex items-center justify-between gap-3">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 max-w-[200px] md:max-w-xs mx-auto h-5 px-3 border border-white/8 rounded bg-black/50 text-[8px] md:text-[9px] font-ui text-white/40 flex items-center gap-1.5 truncate">
            <span className="truncate">{project.url.replace("https://", "")}</span>
          </div>
          <div className="w-10" />
        </div>

        {/* Mockup Contents */}
        <div className="flex-1 overflow-hidden relative">
          {iframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0e0e0e] z-10">
              <div className="w-8 h-8 border-2 border-metallic-brass/70 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          
          <iframe
            src={`/api/proxy?url=${encodeURIComponent(project.url)}`}
            className="w-full h-full border-none bg-[#0e0e0e]"
            title={project.name}
            loading="lazy"
            onLoad={() => setIframeLoading(false)}
            sandbox="allow-scripts allow-same-origin allow-forms"
          />

          {/* Hover to Visit Overlay */}
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={clink}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 hover:bg-black/50 transition-all duration-300 opacity-0 hover:opacity-100"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 rounded-full border border-metallic-brass/60 bg-metallic-brass/10 backdrop-blur-sm flex items-center justify-center text-metallic-brass shadow-[0_0_30px_rgba(201,168,76,0.3)]"
            >
              <ExternalLink size={22} />
            </motion.div>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
