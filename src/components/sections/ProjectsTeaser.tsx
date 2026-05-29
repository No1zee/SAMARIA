"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Globe } from "lucide-react";
import { useHaptics } from "@/hooks/useHaptics";
import ScrambleText from "@/components/animations/ScrambleText";
import CinematicText from "@/components/ui/CinematicText";

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
}

interface ProjectsTeaserProps {
  initialProjects?: Project[];
}

export default function ProjectsTeaser({ initialProjects = [] }: ProjectsTeaserProps) {
  const { clink } = useHaptics();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeIndex, setActiveIndex] = useState(0);

  const [iframeLoading, setIframeLoading] = useState(true);

  const handleNext = () => {
    clink();
    setIframeLoading(true);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    clink();
    setIframeLoading(true);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const selectCard = (index: number) => {
    if (index === activeIndex) return;
    clink();
    setIframeLoading(true);
    setActiveIndex(index);
  };

  // Render a mock preview of each website based on its specific brand layout
  const renderWebsiteMockPreview = (project: Project) => {
    switch (project.id) {
      case "nguva-sand":
        return (
          <div className="w-full h-full bg-gradient-to-br from-amber-950 via-stone-900 to-yellow-950 flex flex-col justify-between p-6 select-none">
            <div className="flex justify-between items-center border-b border-amber-500/10 pb-3">
              <span className="font-heading text-xs tracking-widest text-amber-500 font-bold">NGUVA SAND</span>
              <div className="flex gap-2 text-[8px] text-amber-500/60 font-ui uppercase">
                <span>Services</span>
                <span>Procurement</span>
                <span>Contact</span>
              </div>
            </div>
            <div className="my-auto space-y-3">
              <div className="text-amber-500/20 text-[10px] tracking-widest font-ui uppercase">Premium Sand Supplier</div>
              <h4 className="font-heading text-2xl text-amber-100 uppercase tracking-tight leading-none max-w-md">
                HIGH-QUALITY SILICA & CONSTRUCTION SAND DELIVERED.
              </h4>
              <p className="text-[10px] text-amber-200/50 max-w-sm font-body leading-normal">
                Streamlined logistics infrastructure delivering bulk sand across commercial sectors.
              </p>
              <div className="inline-block border border-amber-500/30 px-3 py-1 text-[8px] text-amber-400 font-ui uppercase tracking-widest bg-amber-500/5">
                Request Quote
              </div>
            </div>
            <div className="border-t border-amber-500/10 pt-3 flex justify-between items-center text-[7px] text-amber-500/40 font-ui uppercase">
              <span>© NGUVA SAND CO.</span>
              <span>LOGISTICS PLATFORM</span>
            </div>
          </div>
        );

      case "smiles-dental":
        return (
          <div className="w-full h-full bg-gradient-to-br from-teal-950 via-slate-900 to-emerald-950 flex flex-col justify-between p-6 select-none">
            <div className="flex justify-between items-center border-b border-teal-500/10 pb-3">
              <span className="font-heading text-xs tracking-widest text-teal-400 font-bold">SMILES DENTAL</span>
              <div className="flex gap-2 text-[8px] text-teal-400/60 font-ui uppercase">
                <span>Treatments</span>
                <span>Staff</span>
                <span>Portal</span>
              </div>
            </div>
            <div className="my-auto space-y-3">
              <div className="text-teal-400/20 text-[10px] tracking-widest font-ui uppercase">Clinical Excellence</div>
              <h4 className="font-heading text-2xl text-teal-50 uppercase tracking-tight leading-none max-w-md">
                YOUR TRUSTED DENTAL HEALTH PARTNER.
              </h4>
              <p className="text-[10px] text-teal-200/50 max-w-sm font-body leading-normal">
                Schedule consultations and manage your clinical records via our secure online portal.
              </p>
              <div className="inline-block bg-teal-500 text-teal-950 px-3 py-1 text-[8px] font-ui uppercase tracking-widest font-bold rounded-sm">
                Book Consultation
              </div>
            </div>
            <div className="border-t border-teal-500/10 pt-3 flex justify-between items-center text-[7px] text-teal-500/40 font-ui uppercase">
              <span>SMILES DENTAL CLINIC</span>
              <span>PATIENT CARE</span>
            </div>
          </div>
        );

      case "connectlink":
        return (
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 flex flex-col justify-between p-6 select-none">
            <div className="flex justify-between items-center border-b border-sky-500/10 pb-3">
              <span className="font-heading text-xs tracking-widest text-sky-400 font-bold">CONNECT LINK</span>
              <div className="flex gap-2 text-[8px] text-sky-400/60 font-ui uppercase">
                <span>Buy</span>
                <span>Rent</span>
                <span>Properties</span>
              </div>
            </div>
            <div className="my-auto space-y-3">
              <div className="text-sky-400/20 text-[10px] tracking-widest font-ui uppercase">Brokerage Ledger</div>
              <h4 className="font-heading text-2xl text-sky-50 uppercase tracking-tight leading-none max-w-md">
                DISCOVER PREMIUM PROPERTIES IN ZIMBABWE.
              </h4>
              <p className="text-[10px] text-sky-200/50 max-w-sm font-body leading-normal">
                Complete property ledger, interactive search maps, and streamlined leasing agreements.
              </p>
              <div className="inline-block border border-sky-500/30 px-3 py-1 text-[8px] text-sky-400 font-ui uppercase tracking-widest bg-sky-500/5">
                Browse Ledger
              </div>
            </div>
            <div className="border-t border-sky-500/10 pt-3 flex justify-between items-center text-[7px] text-sky-500/40 font-ui uppercase">
              <span>CONNECT LINK PROPERTIES</span>
              <span>REAL ESTATE</span>
            </div>
          </div>
        );

      case "carhub":
        return (
          <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-stone-900 to-red-950 flex flex-col justify-between p-6 select-none">
            <div className="flex justify-between items-center border-b border-red-500/15 pb-3">
              <span className="font-heading text-xs tracking-widest text-red-500 font-bold">CARHUB ZW</span>
              <div className="flex gap-2 text-[8px] text-red-500/60 font-ui uppercase">
                <span>Inventory</span>
                <span>Financing</span>
                <span>Sell</span>
              </div>
            </div>
            <div className="my-auto space-y-3">
              <div className="text-red-500/20 text-[10px] tracking-widest font-ui uppercase">Automotive Engine</div>
              <h4 className="font-heading text-2xl text-zinc-100 uppercase tracking-tight leading-none max-w-md">
                FIND YOUR NEXT DRIVING EXPERIENCE.
              </h4>
              <p className="text-[10px] text-zinc-400 max-w-sm font-body leading-normal">
                Filter through curated high-performance vehicles with live pricing and history.
              </p>
              <div className="inline-block bg-red-600 text-white px-3 py-1 text-[8px] font-ui uppercase tracking-widest font-bold">
                View Inventory
              </div>
            </div>
            <div className="border-t border-red-500/15 pt-3 flex justify-between items-center text-[7px] text-red-500/40 font-ui uppercase">
              <span>CARHUB ZIMBABWE</span>
              <span>MARKETPLACE</span>
            </div>
          </div>
        );

      case "valkubu":
        return (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-stone-900 to-zinc-950 flex flex-col justify-between p-6 select-none">
            <div className="flex justify-between items-center border-b border-zinc-500/10 pb-3">
              <span className="font-heading text-xs tracking-widest text-zinc-300 font-bold">VALKUBU LIMITED</span>
              <div className="flex gap-2 text-[8px] text-zinc-400/60 font-ui uppercase">
                <span>Logistics</span>
                <span>Sectors</span>
                <span>ESG</span>
              </div>
            </div>
            <div className="my-auto space-y-3">
              <div className="text-zinc-400/20 text-[10px] tracking-widest font-ui uppercase">Global Operations</div>
              <h4 className="font-heading text-2xl text-zinc-50 uppercase tracking-tight leading-none max-w-md">
                GLOBAL LOGISTICS AND STRATEGIC INFRASTRUCTURE.
              </h4>
              <p className="text-[10px] text-zinc-500 max-w-sm font-body leading-normal">
                Connecting supply chains with custom shipping solutions and secure ledger systems.
              </p>
              <div className="inline-block border border-zinc-500/30 px-3 py-1 text-[8px] text-zinc-300 font-ui uppercase tracking-widest bg-zinc-500/5">
                Corporate Report
              </div>
            </div>
            <div className="border-t border-zinc-500/10 pt-3 flex justify-between items-center text-[7px] text-zinc-500/40 font-ui uppercase">
              <span>© VALKUBU LIMITED</span>
              <span>GLOBAL HEADQUARTERS</span>
            </div>
          </div>
        );

      case "zimrugby":
        return (
          <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-slate-900 to-yellow-950 flex flex-col justify-between p-6 select-none">
            <div className="flex justify-between items-center border-b border-emerald-500/10 pb-3">
              <span className="font-heading text-xs tracking-widest text-emerald-400 font-bold">ZIM RUGBY</span>
              <div className="flex gap-2 text-[8px] text-emerald-400/60 font-ui uppercase">
                <span>Fixtures</span>
                <span>Squads</span>
                <span>Registry</span>
              </div>
            </div>
            <div className="my-auto space-y-3">
              <div className="text-emerald-400/20 text-[10px] tracking-widest font-ui uppercase">National League</div>
              <h4 className="font-heading text-2xl text-emerald-50 uppercase tracking-tight leading-none max-w-md">
                OFFICIAL COORDINATOR & TOURNAMENT LEDGER.
              </h4>
              <p className="text-[10px] text-emerald-200/50 max-w-sm font-body leading-normal">
                Verifying registered matches, player statistics, and regional division updates.
              </p>
              <div className="inline-block bg-emerald-600 text-yellow-100 px-3 py-1 text-[8px] font-ui uppercase tracking-widest font-bold">
                Fixtures Hub
              </div>
            </div>
            <div className="border-t border-emerald-500/10 pt-3 flex justify-between items-center text-[7px] text-emerald-500/40 font-ui uppercase">
              <span>ZIMBABWE RUGBY UNION</span>
              <span>TOURNAMENT REGISTRY</span>
            </div>
          </div>
        );

      default:
        return <div className="w-full h-full bg-zinc-950 flex items-center justify-center text-white font-ui">PORTFOLIO SITE</div>;
    }
  };

  return (
    <section id="artifacts" className="py-12 md:py-fb8 relative overflow-hidden z-10 border-y border-white/5">
      <div className="absolute inset-0 bg-royal-obsidian/55 backdrop-blur-[2px] pointer-events-none" />
      {/* Background visual graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-metallic-brass/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-brand-red/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Section Header */}
        <div className="mb-fb7 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-l border-metallic-brass/40 pl-6 md:pl-8">
          <div>
            <div className="flex items-center gap-fb1 mb-fb2">
              <ScrambleText 
                text="PORTFOLIO — WORK & ARTIFACTS" 
                className="text-metallic-brass font-ui text-xs tracking-[0.2em] border-b border-metallic-brass/30 pb-1"
                duration={1.5}
              />
            </div>
            <div className="flex items-center gap-fb1 mb-fb2 max-w-4xl">
              <span className="text-silence text-white/50 text-xs md:text-sm uppercase tracking-widest leading-relaxed block my-3">
                We build fast, secure, and production-hardened web platforms. Below is an interactive flipbook display of our deployments. Flip through to preview the interface and verify their live server status.
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
          
          <div className="flex gap-4 items-center">
            <button 
              onClick={handlePrev}
              className="p-3 border border-white/10 bg-white/5 hover:border-metallic-brass/50 hover:bg-white/10 transition-all rounded-full text-off-white/80 hover:text-metallic-brass cursor-pointer"
              aria-label="Previous Project"
            >
              <ArrowLeft size={16} />
            </button>
            <button 
              onClick={handleNext}
              className="p-3 border border-white/10 bg-white/5 hover:border-metallic-brass/50 hover:bg-white/10 transition-all rounded-full text-off-white/80 hover:text-metallic-brass cursor-pointer"
              aria-label="Next Project"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* 3D Stack Carousel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px]">
          
          {/* Interactive Stack Display (Columns 1-7) */}
          <div className="lg:col-span-7 relative h-[380px] md:h-[480px] flex items-center justify-center">
            <div className="relative w-full max-w-[550px] aspect-[16/10] select-none">
              {projects.map((project, idx) => {
                // Calculate position relative to active index
                const relativeIndex = (idx - activeIndex + projects.length) % projects.length;
                
                // Stack layout formulas
                const isActive = relativeIndex === 0;
                const isStackVisible = relativeIndex < 3; // Display up to 3 cards in stack

                if (!isStackVisible) return null;

                // Rotations and offsets for 3D stacking effect
                const rotate = relativeIndex * 3.5 - 2;
                const xOffset = relativeIndex * 24;
                const yOffset = -relativeIndex * 14;
                const zIndex = projects.length - relativeIndex;
                const opacity = 1 - relativeIndex * 0.25;

                return (
                  <motion.div
                    key={project.id}
                    className={`absolute inset-0 rounded-lg border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md cursor-pointer`}
                    style={{
                      transformOrigin: "bottom right",
                      zIndex,
                    }}
                    animate={{
                      x: xOffset,
                      y: yOffset,
                      rotate: rotate,
                      scale: 1 - relativeIndex * 0.03,
                      opacity,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    onClick={() => selectCard(idx)}
                  >
                    {/* Browser Window Mock Wrapper */}
                    <div className="w-full h-full flex flex-col bg-royal-obsidian">
                      {/* Browser top-bar control bar */}
                      <div className="h-9 border-b border-white/5 bg-obsidian-layered px-4 flex items-center justify-between">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-red/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-metallic-brass/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-aku-green/80" />
                        </div>
                        {/* Domain bar */}
                        <div className="h-6 px-4 border border-white/5 rounded bg-black/40 text-[9px] font-ui text-white/40 flex items-center gap-1.5 select-all max-w-[220px] truncate">
                          <Globe size={8} />
                          {project.url.replace("https://", "")}
                        </div>
                        {/* Live Status indicator */}
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${project.isLive ? "bg-aku-green shadow-[0_0_8px_#39FF14]" : "bg-brand-red shadow-[0_0_8px_#C42B2B] animate-pulse"}`} />
                          <span className="text-[7px] font-ui uppercase tracking-wider text-white/40">
                            {project.isLive ? "Live" : "Offline"}
                          </span>
                        </div>
                      </div>
                      
                      {/* Web Site Content Area Preview */}
                      <div className="flex-1 overflow-hidden relative">
                        {isActive ? (
                          <>
                            {iframeLoading && (
                              <div className="absolute inset-0 flex items-center justify-center bg-royal-obsidian/90 z-20">
                                <div className="w-6 h-6 border-2 border-metallic-brass/80 border-t-transparent rounded-full animate-spin" />
                              </div>
                            )}
                            <iframe
                              src={project.url}
                              className="w-full h-full border-none bg-royal-obsidian"
                              title={project.name}
                              onLoad={() => setIframeLoading(false)}
                              sandbox="allow-scripts allow-same-origin allow-forms"
                            />
                          </>
                        ) : (
                          renderWebsiteMockPreview(project)
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Details / Text Description (Columns 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-ui text-metallic-brass tracking-[0.25em] uppercase border border-metallic-brass/20 px-3 py-1 rounded-sm bg-metallic-brass/5">
                      {projects[activeIndex].tag}
                    </span>
                    <span className="text-[10px] font-ui text-white/30 uppercase tracking-[0.2em]">
                      DEPLOYED
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-heading text-off-white uppercase leading-none">
                    {projects[activeIndex].name}
                  </h3>
                </div>

                <p className="text-white/70 font-body text-sm md:text-base leading-relaxed">
                  {projects[activeIndex].description}
                </p>

                {/* Tech Stack Badge List */}
                <div className="flex flex-wrap gap-2">
                  {projects[activeIndex].techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-[9px] font-ui tracking-wider uppercase bg-white/5 border border-white/10 px-2.5 py-1 text-off-white/75"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Main Call to Action: Visit Site */}
                <div className="pt-2">
                  <a
                    href={projects[activeIndex].url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 border border-metallic-brass/40 bg-metallic-brass/5 hover:border-metallic-brass hover:bg-metallic-brass/15 transition-all text-xs font-ui tracking-widest text-metallic-brass uppercase select-none cursor-pointer"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Bullet Indicators */}
            <div className="flex gap-2.5 pt-4">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => selectCard(idx)}
                  className={`h-1 transition-all duration-300 rounded-full cursor-pointer ${idx === activeIndex ? "w-8 bg-metallic-brass" : "w-2 bg-white/20"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
