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

        {/* NARRATIVE BRIDGE 01 */}
        <TransitionBridge 
          text="The launch is easy. The decade after is where most agencies leave you alone."
          intensity={0.4}
        />

        {/* 2. THE WORLDVIEW (Philosophy) */}
        <Philosophy />
        
        {/* EXPERIMENT: THE CRUCIBLE (Interactive Switcher surfaced early) */}
        <InteractionLab />
        
        {/* 2.5 THE TRUST (Social Proof) */}
        <TrustBar />

        {/* NARRATIVE BRIDGE 02 */}
        <TransitionBridge 
          text="Permanence is earned slowly, then maintained aggressively."
          intensity={0.5}
        />

        {/* 3. THE DISCIPLINE (Methodology) */}
        <ApproachSteps />

        {/* NARRATIVE BRIDGE 03 */}
        <TransitionBridge 
          text="The work is the argument."
          intensity={0.6}
        />

        {/* 4. THE SYSTEMS (Capabilities) */}
        <Capabilities />

        {/* NARRATIVE BRIDGE 04 */}
        <TransitionBridge 
          text="From discipline comes structure. From structure comes advantage."
          intensity={0.7}
        />

        {/* 5. THE PROOF (Case Studies) */}
        <ProjectsTeaser />



        {/* NARRATIVE BRIDGE 05 */}
        <TransitionBridge 
          text="What we build reflects what we believe."
          intensity={0.8}
        />

        {/* 6. THE BELIEF & TRUST (Manifesto / Founders) */}
        <About />

        {/* 7. THE CLARITY (FAQ) */}
        <FAQ />

        {/* 8. THE INVITATION (Contact) */}
        <WarCouncilContact />
      </div>

      <MobileStickyCTA />
    </main>
  );
}
