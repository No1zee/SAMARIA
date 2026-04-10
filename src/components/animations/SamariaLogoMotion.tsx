"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SamariaLogoSVG } from "./SamariaLogoSVG";

gsap.registerPlugin(useGSAP);

type SamariaLogoMotionProps = {
  className?: string;
  playIntro?: boolean;
  onComplete?: () => void;
};

export function SamariaLogoMotion({
  className,
  playIntro = true,
  onComplete,
}: SamariaLogoMotionProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!playIntro) {
        // Only idle breathing if intro is skipped
        gsap.to("#samaria-logo", {
          scale: 1.02,
          repeat: -1,
          yoyo: true,
          duration: 3,
          ease: "power1.inOut",
          transformOrigin: "50% 50%",
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          // Start idle loop after intro completes
          gsap.to("#samaria-logo", {
            scale: 1.02,
            repeat: -1,
            yoyo: true,
            duration: 3,
            ease: "power1.inOut",
            transformOrigin: "50% 50%",
          });
          onComplete?.();
        },
      });

      // 1) Initial fade/scale of whole logo
      tl.from("#samaria-logo", {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        transformOrigin: "50% 50%",
      });

      // 2) Sword draw + slash
      tl.from(
        "#sword",
        {
          strokeDasharray: 400,
          strokeDashoffset: 400,
          duration: 0.4,
        },
        "-=0.1"
      )
        .to("#sword", {
          rotation: -8,
          duration: 0.18,
          transformOrigin: "20% 80%",
        })
        .to("#sword", {
          rotation: 0,
          duration: 0.25,
        });

      // 3) Laptop + chip pop
      tl.from(
        "#laptop",
        {
          y: 24,
          opacity: 0,
          duration: 0.35,
        },
        "-=0.25"
      );

      tl.from(
        "#chip",
        {
          scale: 0.7,
          opacity: 0,
          duration: 0.3,
          transformOrigin: "50% 50%",
        },
        "-=0.2"
      );

      // 4) Rays ping out
      tl.from(
        "#chip-rays > *",
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.25,
          transformOrigin: "50% 50%",
          stagger: 0.04,
        },
        "-=0.15"
      );

      // 5) Hair + cloak highlight sweep
      tl.fromTo(
        "#hero-highlight",
        {
          opacity: 0,
          xPercent: -100,
        },
        {
          opacity: 1,
          xPercent: 100,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "-=0.2"
      ).to("#hero-highlight", {
        opacity: 0,
        duration: 0.2,
      });

      // 6) Wordmark rise
      tl.from(
        "#wordmark",
        {
          y: 20,
          opacity: 0,
          duration: 0.45,
        },
        "-=0.3"
      );
    },
    { scope: rootRef }
  );

  return (
    <motion.div
      ref={rootRef}
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <SamariaLogoSVG />
    </motion.div>
  );
}
