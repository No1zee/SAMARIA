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

  // Branded mock previews for non-active (background) cards
  const renderWebsiteMockPreview = (project: Project) => {
    switch (project.id) {
      case "nguva-sand":
        return (
          <div className="w-full h-full bg-gradient-to-br from-amber-950 via-stone-900 to-yellow-950 flex flex-col justify-between p-6 select-none">
            <div className="flex justify-between items-center border-b border-amber-500/10 pb-3">
              <span className="font-heading text-xs tracking-widest text-amber-500 font-bold">NGUVA SAND</span>
              <div className="flex gap-2 text-[8px] text-amber-500/60 font-ui uppercase">
                <span>Services</span><span>Procurement</span><span>Contact</span>
              </div>
            </div>
            <div className="my-auto space-y-3">
              <div className="text-amber-500/20 text-[10px] tracking-widest font-ui uppercase">Premium Sand Supplier</div>
              <h4 className="font-heading text-2xl text-amber-100 uppercase tracking-tight leading-none max-w-md">
                HIGH-QUALITY SILICA & CONSTRUCTION SAND DELIVERED.
              </h4>
              <div className="inline-block border border-amber-500/30 px-3 py-1 text-[8px] text-amber-400 font-ui uppercase tracking-widest bg-amber-500/5">
                Request Quote
              </div>
            </div>
            <div className="border-t border-amber-500/10 pt-3 flex justify-between items-center text-[7px] text-amber-500/40 font-ui uppercase">
              <span>© NGUVA SAND CO.</span><span>LOGISTICS PLATFORM</span>
            </div>
          </div>
        );

      case "smiles-dental":
        return (
          <div className="w-full h-full bg-gradient-to-br from-teal-950 via-slate-900 to-emerald-950 flex flex-col justify-between p-6 select-none">
            <div className="flex justify-between items-center border-b border-teal-500/10 pb-3">
              <span className="font-heading text-xs tracking-widest text-teal-400 font-bold">SMILES DENTAL</span>
              <div className="flex gap-2 text-[8px] text-teal-400/60 font-ui uppercase">
                <span>Treatments</span><span>Staff</span><span>Portal</span>
              </div>
            </div>
            <div className="my-auto space-y-3">
              <div className="text-teal-400/20 text-[10px] tracking-widest font-ui uppercase">Clinical Excellence</div>
              <h4 className="font-heading text-2xl text-teal-50 uppercase tracking-tight leading-none max-w-md">
                YOUR TRUSTED DENTAL HEALTH PARTNER.
              </h4>
              <div className="inline-block bg-teal-500 text-teal-950 px-3 py-1 text-[8px] font-ui uppercase tracking-widest font-bold rounded-sm">
                Book Consultation
              </div>
            </div>
            <div className="border-t border-teal-500/10 pt-3 flex justify-between items-center text-[7px] text-teal-500/40 font-ui uppercase">
              <span>SMILES DENTAL CLINIC</span><span>PATIENT CARE</span>
            </div>
          </div>
        );

      case "connectlink":
        return (
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 flex flex-col justify-between p-6 select-none">
            <div className="flex justify-between items-center border-b border-sky-500/10 pb-3">
              <span className="font-heading text-xs tracking-widest text-sky-400 font-bold">CONNECT LINK</span>
              <div className="flex gap-2 text-[8px] text-sky-400/60 font-ui uppercase">
                <span>Buy</span><span>Rent</span><span>Properties</span>
              </div>
            </div>
            <div className="my-auto space-y-3">
              <div className="text-sky-400/20 text-[10px] tracking-widest font-ui uppercase">Brokerage Ledger</div>
              <h4 className="font-heading text-2xl text-sky-50 uppercase tracking-tight leading-none max-w-md">
                DISCOVER PREMIUM PROPERTIES IN ZIMBABWE.
              </h4>
              <div className="inline-block border border-sky-500/30 px-3 py-1 text-[8px] text-sky-400 font-ui uppercase tracking-widest bg-sky-500/5">
                Browse Ledger
              </div>
            </div>
            <div className="border-t border-sky-500/10 pt-3 flex justify-between items-center text-[7px] text-sky-500/40 font-ui uppercase">
              <span>CONNECT LINK PROPERTIES</span><span>REAL ESTATE</span>
            </div>
          </div>
        );

      case "carhub":
        return (
          <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-stone-900 to-red-950 flex flex-col justify-between p-6 select-none">
            <div className="flex justify-between items-center border-b border-red-500/15 pb-3">
              <span className="font-heading text-xs tracking-widest text-red-500 font-bold">CARHUB ZW</span>
              <div className="flex gap-2 text-[8px] text-red-500/60 font-ui uppercase">
                <span>Inventory</span><span>Financing</span><span>Sell</span>
              </div>
            </div>
            <div className="my-auto space-y-3">
              <div className="text-red-500/20 text-[10px] tracking-widest font-ui uppercase">Automotive Engine</div>
              <h4 className="font-heading text-2xl text-zinc-100 uppercase tracking-tight leading-none max-w-md">
                FIND YOUR NEXT DRIVING EXPERIENCE.
              </h4>
              <div className="inline-block bg-red-600 text-white px-3 py-1 text-[8px] font-ui uppercase tracking-widest font-bold">
                View Inventory
              </div>
            </div>
            <div className="border-t border-red-500/15 pt-3 flex justify-between items-center text-[7px] text-red-500/40 font-ui uppercase">
              <span>CARHUB ZIMBABWE</span><span>MARKETPLACE</span>
            </div>
          </div>
        );

      case "valkubu":
        return (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-stone-900 to-zinc-950 flex flex-col justify-between p-6 select-none">
            <div className="flex justify-between items-center border-b border-zinc-500/10 pb-3">
              <span className="font-heading text-xs tracking-widest text-zinc-300 font-bold">VALKUBU LIMITED</span>
              <div className="flex gap-2 text-[8px] text-zinc-400/60 font-ui uppercase">
                <span>Logistics</span><span>Sectors</span><span>ESG</span>
              </div>
            </div>
            <div className="my-auto space-y-3">
              <div className="text-zinc-400/20 text-[10px] tracking-widest font-ui uppercase">Global Operations</div>
              <h4 className="font-heading text-2xl text-zinc-50 uppercase tracking-tight leading-none max-w-md">
                GLOBAL LOGISTICS AND STRATEGIC INFRASTRUCTURE.
              </h4>
              <div className="inline-block border border-zinc-500/30 px-3 py-1 text-[8px] text-zinc-300 font-ui uppercase tracking-widest bg-zinc-500/5">
                Corporate Report
              </div>
            </div>
            <div className="border-t border-zinc-500/10 pt-3 flex justify-between items-center text-[7px] text-zinc-500/40 font-ui uppercase">
              <span>© VALKUBU LIMITED</span><span>GLOBAL HEADQUARTERS</span>
            </div>
          </div>
        );

      case "zimrugby":
        return (
          <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-slate-900 to-yellow-950 flex flex-col justify-between p-6 select-none">
            <div className="flex justify-between items-center border-b border-emerald-500/10 pb-3">
              <span className="font-heading text-xs tracking-widest text-emerald-400 font-bold">ZIM RUGBY</span>
              <div className="flex gap-2 text-[8px] text-emerald-400/60 font-ui uppercase">
                <span>Fixtures</span><span>Squads</span><span>Registry</span>
              </div>
            </div>
            <div className="my-auto space-y-3">
              <div className="text-emerald-400/20 text-[10px] tracking-widest font-ui uppercase">National League</div>
              <h4 className="font-heading text-2xl text-emerald-50 uppercase tracking-tight leading-none max-w-md">
                OFFICIAL COORDINATOR & TOURNAMENT LEDGER.
              </h4>
              <div className="inline-block bg-emerald-600 text-yellow-100 px-3 py-1 text-[8px] font-ui uppercase tracking-widest font-bold">
                Fixtures Hub
              </div>
            </div>
            <div className="border-t border-emerald-500/10 pt-3 flex justify-between items-center text-[7px] text-emerald-500/40 font-ui uppercase">
              <span>ZIMBABWE RUGBY UNION</span><span>TOURNAMENT REGISTRY</span>
            </div>
          </div>
        );

      default:
        return <div className="w-full h-full bg-zinc-950 flex items-center justify-center text-white font-ui">PORTFOLIO SITE</div>;
    }
  };

  if (projects.length === 0) return null;

  return (
    <section id="artifacts" className="py-12 md:py-fb8 relative overflow-hidden z-10 border-y border-white/5">
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        {/* Ambient backing — scoped to container, fades right like hero */}
        <div className="absolute inset-0 bg-gradient-to-r from-royal-obsidian via-royal-obsidian/80 to-transparent blur-md opacity-90 pointer-events-none -z-10" />

        {/* Section Header — minimal */}
        <div className="mb-fb6 border-l border-metallic-brass/40 pl-6 md:pl-8">
          <ScrambleText
            text="PORTFOLIO — WORK & ARTIFACTS"
            className="text-metallic-brass font-ui text-xs tracking-[0.2em] border-b border-metallic-brass/30 pb-1 inline-block mb-fb3"
            duration={1.5}
          />
          <CinematicText
            fontSize={128}
            className="text-5xl md:text-[8rem] text-off-white font-heading uppercase tracking-tighter leading-[0.85] block"
            maxWidth={1200}
          >
            WHAT WE&apos;VE BUILT.
          </CinematicText>
        </div>

        {/* ── Full-width cinematic showcase ── */}
        <div className="relative">

          {/* Floating prev arrow */}
          <button
            onClick={handlePrev}
            onMouseEnter={clink}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-30 p-3 border border-white/10 bg-black/40 backdrop-blur-sm hover:border-metallic-brass/60 hover:bg-metallic-brass/10 transition-all rounded-full text-off-white/70 hover:text-metallic-brass cursor-pointer"
            aria-label="Previous"
          >
            <ArrowLeft size={16} />
          </button>

          {/* Card stack — full width, tall */}
          <div className="relative w-full h-[420px] md:h-[580px] flex items-center justify-center px-8 md:px-14">
            <div className="relative w-full h-full">
              {projects.map((project, idx) => {
                const relativeIndex = (idx - activeIndex + projects.length) % projects.length;
                const isActive = relativeIndex === 0;
                const isStackVisible = relativeIndex < 3;
                if (!isStackVisible) return null;

                const rotate = relativeIndex * 2.5 - 1;
                const xOffset = relativeIndex * 30;
                const yOffset = -relativeIndex * 10;
                const zIndex = projects.length - relativeIndex;
                const scale = 1 - relativeIndex * 0.04;
                const opacity = 1 - relativeIndex * 0.3;

                return (
                  <motion.div
                    key={project.id}
                    className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border border-white/8 cursor-pointer"
                    style={{ transformOrigin: "bottom center", zIndex }}
                    animate={{ x: xOffset, y: yOffset, rotate, scale, opacity }}
                    transition={{ type: "spring", stiffness: 280, damping: 28 }}
                    onClick={() => !isActive && selectCard(idx)}
                  >
                    {/* Browser chrome */}
                    <div className="w-full h-full flex flex-col bg-[#0e0e0e]">
                      {/* Top bar */}
                      <div className="h-9 shrink-0 border-b border-white/5 bg-[#181818] px-4 flex items-center justify-between gap-3">
                        {/* Traffic lights */}
                        <div className="flex gap-1.5 shrink-0">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        {/* URL bar */}
                        <div className="flex-1 max-w-sm mx-auto h-6 px-3 border border-white/8 rounded-md bg-black/50 text-[9px] font-ui text-white/40 flex items-center gap-1.5 truncate">
                          <Globe size={8} className="shrink-0" />
                          <span className="truncate">{project.url.replace("https://", "")}</span>
                        </div>
                        {/* Live dot */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <div className={`w-1.5 h-1.5 rounded-full ${project.isLive ? "bg-[#28c840] shadow-[0_0_6px_#28c840]" : "bg-red-500 animate-pulse"}`} />
                          <span className="text-[7px] font-ui uppercase tracking-wider text-white/30 hidden md:inline">
                            {project.isLive ? "Live" : "Offline"}
                          </span>
                        </div>
                      </div>

                      {/* Content area */}
                      <div className="flex-1 overflow-hidden relative group">
                        {isActive ? (
                          <>
                            {iframeLoading && (
                              <div className="absolute inset-0 flex items-center justify-center bg-[#0e0e0e] z-20">
                                <div className="w-7 h-7 border-2 border-metallic-brass/70 border-t-transparent rounded-full animate-spin" />
                              </div>
                            )}
                            <iframe
                              src={project.url}
                              className="w-full h-full border-none"
                              title={project.name}
                              onLoad={() => setIframeLoading(false)}
                              sandbox="allow-scripts allow-same-origin allow-forms"
                            />
                            {/* Hover-to-visit overlay — icon only, no text */}
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noreferrer"
                              className="absolute inset-0 z-30 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-all duration-300 opacity-0 hover:opacity-100 group"
                            >
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileHover={{ scale: 1, opacity: 1 }}
                                className="w-16 h-16 rounded-full border border-metallic-brass/60 bg-metallic-brass/10 backdrop-blur-sm flex items-center justify-center text-metallic-brass shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                              >
                                <ExternalLink size={22} />
                              </motion.div>
                            </a>
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

          {/* Floating next arrow */}
          <button
            onClick={handleNext}
            onMouseEnter={clink}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-30 p-3 border border-white/10 bg-black/40 backdrop-blur-sm hover:border-metallic-brass/60 hover:bg-metallic-brass/10 transition-all rounded-full text-off-white/70 hover:text-metallic-brass cursor-pointer"
            aria-label="Next"
          >
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-2.5 pt-8">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => selectCard(idx)}
              className={`h-1 transition-all duration-300 rounded-full cursor-pointer ${
                idx === activeIndex ? "w-8 bg-metallic-brass" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
