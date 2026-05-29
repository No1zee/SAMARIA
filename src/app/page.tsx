// Skill 4+8: Server Component — no "use client" needed here
// All animation-heavy components loaded dynamically (ssr: false) for performance

import dynamic from "next/dynamic";

// Dynamic imports
const Hero = dynamic(() => import("@/components/home/Hero"));
import AboutWrapper from "@/components/home/AboutWrapper";
const TransitionBridge = dynamic(() => import("@/components/ui/TransitionBridge"));
const ApproachSteps = dynamic(() => import("@/components/intro/ApproachSteps"));
const Capabilities = dynamic(() => import("@/components/home/Capabilities"));
const ProjectsTeaser = dynamic(() => import("@/components/sections/ProjectsTeaser"));
const GravityOrbit = dynamic(() => import("@/components/animations/GravityOrbit"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const WarCouncilContact = dynamic(() => import("@/components/sections/WarCouncilContact"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const InteractionLab = dynamic(() => import("@/components/sections/InteractionLab"));
const MobileStickyCTA = dynamic(() => import("@/components/ui/MobileStickyCTA"));

import { Suspense } from "react";
import { getPortfolioProjects } from "@/app/portfolio-data";

async function ProjectsSection() {
  const projects = await getPortfolioProjects();
  return <ProjectsTeaser initialProjects={projects} />;
}

export default function Home() {
  return (
    <main className="bg-transparent">
      <GravityOrbit />
      <div className="skew-target">
        {/* 1. HERO */}
        <Hero />
        
        {/* 2. POSITIONING */}
        <AboutWrapper />

        {/* 3. SERVICES */}
        <Capabilities />

        {/* 4. SELECTED WORK */}
        <TransitionBridge 
          text="The work is the argument. Built to outlast everyone else."
          intensity={0.5}
        />
        <Suspense fallback={
          <div className="py-20 text-center text-xs font-ui text-white/20 uppercase tracking-widest">
            Loading Portfolio...
          </div>
        }>
          <ProjectsSection />
        </Suspense>

        {/* 5. PROCESS */}
        <ApproachSteps />

        {/* 6. TRUST LAYER */}
        <Testimonials />
        <FAQ />

        {/* 7. CONTACT CTA */}
        <WarCouncilContact />

        {/* 8. INTERACTIVE CONTROLS */}
        <InteractionLab />
      </div>

      <MobileStickyCTA />
    </main>
  );
}
