"use client";

import { Monitor, PenTool, Globe } from "lucide-react";
import TabletCard from "@/components/ui/TabletCard";

const services = [
  {
    title: "Web Architecture",
    description: "Building resilient, high-performance web applications using cutting-edge frameworks (Next.js, React) designed to scale with your ambition.",
    icon: <Monitor size={32} />,
  },
  {
    title: "Brand Identity",
    description: "Crafting digital legacies. We forge visual identities that blend ancient authority with futuristic innovation, ensuring your brand stands time's test.",
    icon: <PenTool size={32} />,
  },
  {
    title: "Digital Ecosystems",
    description: "Holistic digital strategies that connect your business to the global grid. SEO, performance optimization, and seamless user experiences.",
    icon: <Globe size={32} />,
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
              delay={index * 0.2}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
