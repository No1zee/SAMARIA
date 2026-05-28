// Skill 4+8: Server Component — no "use client" needed here
// All animation-heavy components loaded dynamically (ssr: false) for performance

import dynamic from "next/dynamic";

// Dynamic imports
const Hero = dynamic(() => import("@/components/home/Hero"));
import AboutWrapper from "@/components/home/AboutWrapper";
const TransitionBridge = dynamic(() => import("@/components/ui/TransitionBridge"));
const Philosophy = dynamic(() => import("@/components/home/Philosophy"));
const TrustBar = dynamic(() => import("@/components/sections/TrustBar"));
const ApproachSteps = dynamic(() => import("@/components/intro/ApproachSteps"));
const Capabilities = dynamic(() => import("@/components/home/Capabilities"));
const ProjectsTeaser = dynamic(() => import("@/components/sections/ProjectsTeaser"));
const InteractionLab = dynamic(() => import("@/components/sections/InteractionLab"));
const GravityOrbit = dynamic(() => import("@/components/animations/GravityOrbit"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const WarCouncilContact = dynamic(() => import("@/components/sections/WarCouncilContact"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const MobileStickyCTA = dynamic(() => import("@/components/ui/MobileStickyCTA"));

export default function Home() {
  return (
    <main className="bg-transparent">
      <GravityOrbit />
      <div className="skew-target">
        {/* 1. WHO WE ARE */}
        <Hero />
<AboutWrapper />
        <TrustBar />

        {/* 2. WHAT WE DO */}
        <Capabilities />

        {/* 3. HOW WE CAN HELP / PROOF */}
        <TransitionBridge 
          text="The work is the argument. Built to outlast everyone else."
          intensity={0.5}
        />
        <ProjectsTeaser />
        <Philosophy />
        <ApproachSteps />
        <InteractionLab />

        {/* 4. GET IN TOUCH */}
        <WarCouncilContact />

        {/* 5. OTHER STUFF */}
        <Testimonials />
        <FAQ />
      </div>

      <MobileStickyCTA />
    </main>
  );
}
