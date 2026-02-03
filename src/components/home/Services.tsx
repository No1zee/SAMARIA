"use client";

import { Monitor, PenTool, Globe } from "lucide-react";
import TabletCard from "@/components/ui/TabletCard";

const services = [
  {
    title: "Web Architecture",
    description: "Building resilient, high-performance web applications using cutting-edge frameworks designed to scale with your ambition.",
    icon: <Monitor size={32} />,
    deliverables: [
      "Custom SaaS dashboards",
      "E-commerce platforms",
      "Admin panels & CMS"
    ]
  },
  {
    title: "Brand Identity",
    description: "Crafting digital legacies. We forge visual identities that blend ancient authority with futuristic innovation.",
    icon: <PenTool size={32} />,
    deliverables: [
      "Logo design & brand systems",
      "Design systems & UI kits",
      "Landing page design"
    ]
  },
  {
    title: "Digital Ecosystems",
    description: "Holistic digital strategies that connect your business to the global grid with seamless user experiences.",
    icon: <Globe size={32} />,
    deliverables: [
      "SEO audits & optimization",
      "Performance tuning",
      "Analytics & monitoring"
    ]
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-royal-obsidian relative">
      <div className="container max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="font-ui text-xs text-gold-metallic tracking-[0.3em] uppercase block mb-4">
            Capabilities
          </span>
          <h2 className="text-off-white">
            Digital Stone Tablets
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <TabletCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              deliverables={service.deliverables}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mt-20 pt-16 border-t border-brand-gold/10">
          <div className="text-center mb-10">
            <span className="font-ui text-xs text-brand-gold/60 tracking-[0.3em] uppercase">
              Built With
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "Tailwind CSS", "Vercel"].map((tech, i) => (
              <span 
                key={i}
                className="font-ui text-sm md:text-base text-off-white/50 hover:text-brand-gold transition-colors tracking-wide"
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
