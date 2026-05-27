"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import CinematicText from "@/components/ui/CinematicText";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const chapters = [
  {
    id: "01",
    label: "WEBSITES",
    name: "CUSTOM WEBSITES & APPLICATIONS",
    description: "Digital experiences that capture attention and build authority.",
    expanded: "We design and develop high-end bespoke websites and web applications tailored to your brand. From corporate platforms to custom SaaS applications, our code is optimized for SEO, speed, and conversion.",
    image: "/assets/capabilities/websites-apps.png",
    tags: ["Next.js & React", "E-commerce Platforms", "SaaS Applications", "SEO & Performance Optimization"],
    align: "left"
  },
  {
    id: "02",
    label: "IT SERVICES",
    name: "IT SERVICES & DIGITAL OPERATIONS",
    description: "Secure, scalable systems that power your daily business operations.",
    expanded: "Enterprise-grade IT consultancy, system integration, cloud deployments, and custom database solutions. We construct the reliable backbones that support your growth without interruption.",
    image: "/assets/capabilities/it-services.png",
    tags: ["Cloud Infrastructure", "System Integrations", "Database Design", "Security & Auditing"],
    align: "right"
  },
  {
    id: "03",
    label: "STRATEGY",
    name: "STRATEGIC CUSTOM DIGITAL SOLUTIONS",
    description: "Innovative tech tailored specifically to solve your business bottlenecks.",
    expanded: "Workflow automation, interactive customer portals, custom CRM/ERP integration, and advanced AI-assisted processes. We build the exact tools you need to optimize productivity and outperform your competition.",
    image: "/assets/capabilities/strategic-solutions.png",
    tags: ["Custom ERP/CRM", "Workflow Automation", "API Development", "AI Integrations"],
    align: "left"
  }
];

export default function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for images
      gsap.utils.toArray(".chapter-image-container").forEach((container) => {
        const item = container as HTMLElement;
        const img = item.querySelector("img");
        if (!img) return;
        
        gsap.to(img, {
          y: "-15%",
          ease: "none",
          scrollTrigger: {
            trigger: item,
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
    <section id="capabilities" className="py-12 md:py-fb9 relative overflow-hidden bg-transparent" ref={containerRef}>
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Section Header — Editorial Style */}
        <div className="mb-fb8 border-l border-metallic-brass/40 pl-6 md:pl-8">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-fb4 items-end">
            <div className="md:col-span-6">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="section-label block mb-fb3"
              >
                WHAT WE BUILD
              </motion.span>
              <CinematicText 
                fontSize={128}
                className="text-5xl md:text-[8rem] text-white/95 font-heading uppercase tracking-tighter leading-[0.85] block no-prose"
                maxWidth={1200}
              >
                THREE THINGS. Done completely.
              </CinematicText>
            </div>
            <div className="md:col-span-4 pl-fb3 md:border-l border-metallic-brass/20">
              <p className="text-white/85 text-base md:text-lg font-body leading-relaxed italic no-prose">
                We don&apos;t do everything. We focus on custom websites, robust IT systems, and strategic digital operations. We design the interaction, secure the infrastructure, and automate the workflow to change the trajectory of your business.
              </p>
            </div>
          </div>
        </div>

        {/* Chapters List */}
        <div className="flex flex-col gap-12 md:gap-fb10">
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

                <div className="flex flex-wrap gap-x-fb4 gap-y-2 pt-2 group/tags">
                  {chapter.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-[10px] uppercase tracking-[0.3em] text-metallic-brass bg-metallic-brass/5 font-ui px-4 py-1.5 border border-metallic-brass/25 rounded-full transition-all duration-300 hover:scale-105 group-hover/tags:opacity-30 hover:!opacity-100 hover:border-metallic-brass hover:shadow-[0_0_12px_rgba(201,168,76,0.3)] cursor-default"
                    >
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
          <div className="flex flex-wrap justify-center gap-x-fb4 gap-y-2 group/arsenal">
            {['Next.js', 'React', 'TypeScript', 'Node.js', 'Supabase', 'Vercel', 'GSAP'].map((tech) => (
              <span 
                key={tech} 
                className="text-[10px] font-ui tracking-[0.3em] uppercase transition-all duration-300 hover:scale-105 border border-white/10 bg-white/2 px-4 py-1.5 rounded-full text-off-white/80 hover:text-metallic-brass hover:border-metallic-brass/40 group-hover/arsenal:opacity-30 hover:!opacity-100 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
