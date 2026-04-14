"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import CinematicText from "@/components/ui/CinematicText";
import CelestialHeading from "@/components/ui/CelestialHeading";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const chapters = [
  {
    id: "01",
    label: "INFRASTRUCTURE",
    name: "BESPOKE DIGITAL INFRASTRUCTURE",
    description: "Systems that handle the heavy lifting.",
    expanded: "Custom web applications designed for high-load operations. We build for performance, security, and absolute reliability. Your business shouldn't outgrow its foundation.",
    image: "/assets/capabilities/web-architecture.png",
    tags: ["SaaS Platforms", "Marketplaces", "Custom CRM/ERP", "High-Performance Backends"],
    align: "left"
  },
  {
    id: "02",
    label: "INTELLIGENCE",
    name: "AGENTIC & AI SYSTEMS",
    description: "Logic that works while you sleep.",
    expanded: "We integrate advanced LLMs and agentic workflows directly into your operational core. Automating the complex, not just the simple.",
    image: "/assets/capabilities/brand-identity.png",
    tags: ["Custom GPTs", "Workflow Automation", "AI-Native SaaS", "Cognitive Architecture"],
    align: "right"
  },
  {
    id: "03",
    label: "GROWTH",
    name: "PERFORMANCE GROWTH ENGINES",
    description: "Websites that convert by default.",
    expanded: "High-fidelity, cinematic web experiences engineered for one purpose: credibility. We build the digital environments that make your competition look like they're still in the last decade.",
    image: "/assets/capabilities/digital-infrastructure.png",
    tags: ["Premium Portfolio", "Interactive Experience", "SEO Mastery", "Conversion Optimization"],
    align: "left"
  }
];

export default function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for images
      gsap.utils.toArray(".chapter-image-container").forEach((container: any) => {
        const img = container.querySelector("img");
        gsap.to(img, {
          y: "-15%",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="capabilities" className="py-fb9 relative overflow-hidden bg-transparent" ref={containerRef}>
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Section Header — Editorial Style */}
        <div className="mb-fb8 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-label block mb-fb3"
          >
            WHAT WE BUILD
          </motion.span>
          <CinematicText 
            fontSize={128}
            className="text-5xl md:text-[8rem] text-white/95 font-heading uppercase tracking-tighter leading-[0.85] block mb-fb4 no-prose"
            maxWidth={1200}
          >
            THREE THINGS. Done completely.
          </CinematicText>
          <p className="text-white/85 text-xl md:text-3xl font-body leading-tight max-w-2xl border-l border-metallic-brass/20 pl-fb4 italic">
            We don&apos;t do everything. We do three things that change the trajectory of a business: we build the logic, we design the interaction, and we engineer the growth. We do not compromise on the execution of any of them.
          </p>
        </div>

        {/* Chapters List */}
        <div className="flex flex-col gap-fb9 md:gap-fb10">
          {chapters.map((chapter, idx) => (
            <div 
              key={chapter.id}
              className={`flex flex-col ${chapter.align === "right" ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-fb6 md:gap-fb8`}
            >
              {/* Text Side */}
              <div className="w-full md:w-1/2 space-y-fb5">
                <div className="flex items-center gap-4">
                  <span className="section-label text-metallic-brass">{chapter.id} / {chapter.label}</span>
                </div>
                
                <div className="space-y-fb3">
                  <h3 className="text-4xl md:text-6xl text-white/95 font-heading uppercase tracking-tight no-prose">{chapter.name}</h3>
                  <p className="text-white/88 text-lg md:text-2xl font-body leading-relaxed max-w-md italic">
                    {chapter.description}
                  </p>
                  <p className="card-description max-w-lg">
                    {chapter.expanded}
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-fb4 gap-y-2 pt-2">
                  {chapter.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-[0.3em] text-metallic-brass/60 font-ui px-4 py-1.5 border border-metallic-brass/10 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-fb4">
                  <Link 
                    href="/start-project" 
                    className="inline-flex items-center gap-3 text-metallic-brass hover:text-off-white transition-colors uppercase tracking-[0.4em] text-[10px] font-ui group"
                  >
                    START YOUR BUILD <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Image Side */}
              <div className="w-full md:w-1/2">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="chapter-image-container relative aspect-[1.2/1] md:aspect-[1.5/1] overflow-hidden rounded-sm grayscale-50 hover:grayscale-0 transition-all duration-1000 group bg-white/2 backdrop-blur-[20px] border border-metallic-brass/15"
                >
                  <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-transparent transition-colors duration-1000 z-10" />
                  <Image 
                    src={chapter.image} 
                    alt={chapter.name}
                    fill
                    className="object-cover scale-110"
                    priority={idx === 0}
                  />
                  {/* Subtle corner motif */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-white/20 z-20" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-white/20 z-20" />
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* Arsenal (Simplified & Integrated) */}
        <div className="mt-fb10 pt-fb6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-fb4 text-white/20">
          <span className="text-[10px] font-ui tracking-[0.6em] uppercase">THE STACK.</span>
          <div className="flex flex-wrap justify-center gap-x-fb5 gap-y-fb2">
            {['Next.js', 'React', 'TypeScript', 'Node.js', 'Supabase', 'Vercel', 'GSAP'].map((tech) => (
              <span key={tech} className="text-[10px] font-ui tracking-[0.4em] uppercase hover:text-metallic-brass transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
