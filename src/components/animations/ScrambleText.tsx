import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin globally (safe to do multiple times)
gsap.registerPlugin(ScrollTrigger);

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  chars?: string;
  delay?: number;
}

export default function ScrambleText({
  text,
  className = "",
  duration = 1.2,
  chars = "01<>/*#@",
  delay = 0,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(chars.substring(0, Math.min(chars.length, text.length)));
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrambleObj = { value: 0 };
      
      gsap.to(scrambleObj, {
        duration: duration,
        delay: delay,
        value: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", // Start when text is near bottom of viewport
            toggleActions: "play none none none" 
        },
        onUpdate: () => {
          const progress = scrambleObj.value;
          let result = "";
          for (let i = 0; i < text.length; i++) {
            if (progress >= (i + 1) / text.length) {
              result += text[i];
            } else {
              result += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          setDisplayText(result);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text, duration, chars, delay]);

  return (
    <span ref={containerRef} className={className}>
      {displayText}
    </span>
  );
}
