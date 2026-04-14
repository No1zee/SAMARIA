"use client";

import { useEffect } from "react";
import WarCouncilContact from "@/components/sections/WarCouncilContact";
import { useCelestial } from "@/components/providers/CelestialProvider";
import { motion } from "framer-motion";

export default function StartProjectPage() {
  const { setIsCinematicMode } = useCelestial();

  useEffect(() => {
    // Automatically trigger eclipse mode when entering this page
    setIsCinematicMode(true);
    
    // Optional: Reset when leaving?
    // User hasn't specified, but many premium sites keep the state until manual return.
    // For now, let's keep it sticky for the "Eclipse" atmosphere.
  }, [setIsCinematicMode]);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen pt-24"
    >
      <WarCouncilContact />
    </motion.main>
  );
}
