"use client";

import dynamic from "next/dynamic";

// Dynamically load the About component with client-side only rendering
const About = dynamic(() => import("@/components/home/About"), { ssr: false });

export default function AboutWrapper() {
  return <About />;
}
