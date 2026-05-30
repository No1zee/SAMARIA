"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import CelestialHeading from "@/components/ui/CelestialHeading";

const services = [
  {
    id: "01",
    label: "WEBSITES",
    title: "Websites and platforms",
    desc: "We design and build fast, credible websites and web platforms that help businesses present themselves properly and scale without friction.",
    bullets: [
      "Company and brand websites",
      "Client and subscriber portals",
      "Performance and SEO foundations",
      "Custom interface design"
    ]
  },
  {
    id: "02",
    label: "SYSTEMS",
    title: "Business systems and automation",
    desc: "We build the internal systems that make operations clearer and more efficient, from databases and dashboards to integrations and workflow automation.",
    bullets: [
      "Internal operational tools",
      "Database setup and structure",
      "API integrations",
      "Cloud deployment and reliability"
    ]
  },
  {
    id: "03",
    label: "SUPPORT",
    title: "Digital operations support",
    desc: "We provide structured ongoing support for businesses that need continuity after launch, including updates, maintenance, and operational assistance.",
    bullets: [
      "Content and publishing support",
      "Routine website updates",
      "Maintenance and backups",
      "Technical support"
    ]
  }
];

export default function Capabilities() {
  return (
    <section id="services" className="py-16 md:py-36 relative overflow-hidden bg-[#0e0e10]/80 border-b border-white/5">
      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Section Header */}
        <div className="mb-fb6 border-l border-metallic-brass/40 pl-6 md:pl-8 max-w-3xl">
          <span className="section-label mb-3 block">SERVICES</span>
          <CelestialHeading 
            as="h2" 
            text="What we build." 
            fontSize={56} 
            className="mb-fb3 uppercase tracking-tighter no-prose" 
            intensity={0.6} 
          />
          <p className="text-white/70 text-sm md:text-base font-body leading-relaxed max-w-2xl no-prose">
            We focus on a small set of systems we can build properly. Each engagement is shaped around usefulness, reliability, and long-term ownership.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-fb6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-8 border border-white/5 bg-white/5 hover:border-metallic-brass/25 transition-colors duration-500 clip-blade-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-ui tracking-[0.25em] text-metallic-brass uppercase block mb-4">
                  {service.id} / {service.label}
                </span>
                
                <h3 className="text-lg md:text-xl font-heading text-off-white uppercase tracking-tighter mb-4">
                  {service.title}
                </h3>
                
                <p className="text-xs md:text-sm font-body text-white/50 leading-relaxed mb-6">
                  {service.desc}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-xs text-white/70 font-body">
                      <span className="w-1 h-1 bg-metallic-brass/60 rotate-45 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link 
                  href="/start-project" 
                  className="inline-flex items-center gap-3 text-metallic-brass hover:text-white transition-all uppercase tracking-[0.25em] text-[10px] font-ui group border border-metallic-brass/20 hover:border-metallic-brass/60 px-5 py-2.5 bg-metallic-brass/5 w-full justify-center"
                >
                  <span>Discuss this build</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
