// Skill 4+8: Server Component — no "use client" needed here
// All animation-heavy components loaded dynamically (ssr: false) for performance

import dynamic from "next/dynamic";

// Dynamic imports
const Hero = dynamic(() => import("@/components/home/Hero"));
const Services = dynamic(() => import("@/components/home/Services"));
const ProjectsTeaser = dynamic(() => import("@/components/sections/ProjectsTeaser"));
const About = dynamic(() => import("@/components/home/About"));
const Contact = dynamic(() => import("@/components/sections/WarCouncilContact"));
const MobileStickyCTA = dynamic(() => import("@/components/ui/MobileStickyCTA"));

export default function Home() {
  return (
    <main className="">
      {/* 1. THE STRIKE (Movement 1: Hero) */}
      <Hero />

      {/* 2. THE MASTERY (Movement 2: Capabilities) */}
      <Services />

      {/* 3. THE ARTIFACTS (Movement 3: Work) */}
      <ProjectsTeaser />

      {/* 4. THE COVENANT (Movement 4: Manifesto) */}
      <About />

      {/* 5. THE ALLIANCE (Movement 5: Contact & Decision) */}
      <Contact />

      <MobileStickyCTA />
    </main>
  );
}
