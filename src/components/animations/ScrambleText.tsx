import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin globally
gsap.registerPlugin(ScrollTrigger);

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

/**
 * ArchitecturalBloom / ElegantReveal
 * Replaces the 'Scramble' effect with a sophisticated vertical reveal.
 * Characters slide up, fade in, and sharpen with a staggered rhythm.
 */
export default function ScrambleText({
  text,
  className = "",
  duration = 1.2,
  delay = 0,
}: ScrambleTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = charsRef.current.filter(Boolean);
      
      if (chars.length === 0) return;

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 20,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: duration,
          delay: delay,
          stagger: {
            each: 0.1,
            from: "start",
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text, duration, delay]);

  // Split text into characters, treating spaces as non-breakable spans to preserve layout
  const characters = text.split("").map((char, index) => (
    <span
      key={`${char}-${index}`}
      ref={(el) => (charsRef.current[index] = el)}
      className="inline-block"
      style={{ whiteSpace: char === " " ? "pre" : "normal" }}
    >
      {char}
    </span>
  ));

  return (
    <span ref={containerRef} className={`${className} inline-block whitespace-nowrap`}>
      {characters}
    </span>
  );
}
