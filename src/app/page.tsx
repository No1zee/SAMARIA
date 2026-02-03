"use client";

import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <main className="bg-royal-obsidian">
      <Hero />
      <Services />
      <About />
      <Contact />
    </main>
  );
}
