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
    name: "WEBSITES & PORTFOLIOS",
    description: "We build custom websites, company portfolios, and web apps that look professional, load fast, and build customer trust.",
    expanded: "We design and develop fast, secure corporate websites, creative portfolios, and subscriber systems. We focus on modern design, clear navigation, and mobile speed to make sure your audience stays engaged and takes action.",
    image: "/the-oracle.png",
    tags: ["Corporate Websites", "Brand Portfolios", "E-Commerce & Online Stores", "SEO & Load Speed Optimization"],
    align: "left"
  },
  {
    id: "02",
    label: "SYSTEMS",
    name: "BUSINESS SYSTEMS & AUTOMATION",
    description: "We set up internal software, databases, integrations, and server infrastructure to organize your operations.",
    expanded: "We build custom client portals, customer booking systems, and database layers to connect your tools. We help your business move away from chaotic spreadsheets and manual entry into structured software you own.",
    image: "/the-data-temple.png",
    tags: ["Client Portals & Booking", "Database Setup & Security", "Third-Party API Integrations", "Reliable Cloud Hosting"],
    align: "right"
  },
  {
    id: "03",
    label: "SUPPORT",
    name: "SOCIAL MEDIA & DIGITAL SUPPORT",
    description: "We provide content creation, social media management, and ongoing technical support to keep your brand active.",
    expanded: "From content scheduling and page setups to routine website updates and performance checks, we keep your digital channels consistent. We handle the technical maintenance so you can focus on running your business.",
    image: "/the-guardian.png",
    tags: ["Social Media Support", "Content Strategy & Scheduling", "Ongoing Website Updates", "Routine Maintenance & Backups"],
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
    <section id="capabilities" className="py-12 md:py-fb9 relative overflow-hidden z-10" ref={containerRef}>
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        {/* Ambient backing — scoped to container, fades right like hero */}
        <div className="absolute inset-0 bg-gradient-to-r from-royal-obsidian via-royal-obsidian/80 to-transparent blur-md opacity-90 pointer-events-none -z-10" />
        
        {/* Section Header — Editorial Style */}
        <div className="mb-fb8 border-l border-metallic-brass/40 pl-6 md:pl-8">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-fb4 items-end">
            <div className="md:col-span-6">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="section-label block mb-fb3"
              >
                WHAT WE DO
              </motion.span>
              <CinematicText 
                fontSize={128}
                className="text-5xl md:text-[8rem] text-white/95 font-heading uppercase tracking-tighter leading-[0.85] block no-prose"
                maxWidth={1200}
              >
                WHAT WE BUILD.
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
                    className="inline-flex items-center gap-3 text-metallic-brass hover:text-white transition-all uppercase tracking-[0.25em] text-[10px] font-ui group border border-metallic-brass/30 hover:border-metallic-brass/80 px-5 py-2.5 bg-metallic-brass/5"
                  >
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-metallic-brass group-hover:after:w-full after:transition-all after:duration-300">
                      START A PROJECT
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
                  <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors duration-1000 z-10" />
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


      </div>
    </section>
  );
}
