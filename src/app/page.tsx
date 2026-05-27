// Skill 4+8: Server Component — no "use client" needed here
// All animation-heavy components loaded dynamically (ssr: false) for performance

import dynamic from "next/dynamic";

// Dynamic imports
const Hero = dynamic(() => import("@/components/home/Hero"));
const TransitionBridge = dynamic(() => import("@/components/ui/TransitionBridge"));
const Philosophy = dynamic(() => import("@/components/home/Philosophy"));
const TrustBar = dynamic(() => import("@/components/sections/TrustBar"));
const ApproachSteps = dynamic(() => import("@/components/intro/ApproachSteps"));
const Capabilities = dynamic(() => import("@/components/home/Capabilities"));
const ProjectsTeaser = dynamic(() => import("@/components/sections/ProjectsTeaser"));
const InteractionLab = dynamic(() => import("@/components/sections/InteractionLab"));
const GravityOrbit = dynamic(() => import("@/components/animations/GravityOrbit"));
const About = dynamic(() => import("@/components/home/About"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const WarCouncilContact = dynamic(() => import("@/components/sections/WarCouncilContact"));
const MobileStickyCTA = dynamic(() => import("@/components/ui/MobileStickyCTA"));

export default function Home() {
  return (
    <main className="bg-transparent">
      <GravityOrbit />
      <div className="skew-target">
        {/* 1. ARRIVAL */}
        <Hero />

        {/* 2. THE TRUST (Social Proof immediately below Hero) */}
        <TrustBar />

        {/* 3. THE SYSTEMS & SERVICES (What we do - early decision making) */}
        <Capabilities />

        {/* NARRATIVE BRIDGE 01 */}
        <TransitionBridge 
          text="The work is the argument. Built to outlast everyone else."
          intensity={0.5}
        />

        {/* 4. THE PROOF (Case Studies) */}
        <ProjectsTeaser />

        {/* 5. THE WORLDVIEW (Philosophy & Brand switchers) */}
        <Philosophy />
        <InteractionLab />

        {/* 6. THE DISCIPLINE (Methodology) */}
        <ApproachSteps />

        {/* 7. THE BELIEF & TRUST (Founders) */}
        <About />

        {/* 8. THE CLARITY (FAQ) */}
        <FAQ />

        {/* 9. THE INVITATION (Contact) */}
        <WarCouncilContact />
      </div>

      <MobileStickyCTA />
    </main>
  );
}
