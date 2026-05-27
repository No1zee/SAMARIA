"use client";

import { useEffect, useRef } from "react";
import { useScroll, useSpring } from "framer-motion";

interface Particle {
  tx: number; // Target X
  ty: number; // Target Y
  sx: number; // Scatter X
  sy: number; // Scatter Y
  x: number;  // Current X
  y: number;  // Current Y
  size: number;
  alpha: number;
  // Gradient color based on horizontal position (0..1)
  colorRatio: number;
}

interface ScrollConsolidatedTextProps {
  text: string;
  className?: string;
  fontSize?: number;
}

export default function ScrollConsolidatedText({
  text,
  fontSize = 32,
}: ScrollConsolidatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const htmlTextRef = useRef<HTMLParagraphElement>(null);

  // Track scroll progress of this container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Spring-smooth the scroll progress for a more organic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const htmlText = htmlTextRef.current;
    if (!canvas || !htmlText) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;
    let canvasMaxWidth = 0;

    // Build particles from pixel-sampled text
    const initParticles = () => {
      const isMobile = window.innerWidth < 768;
      const computedFontSize = isMobile ? fontSize * 0.7 : fontSize;

      const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
      
      // We need to measure text to wrap it properly and determine canvas height
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;
      tempCtx.font = `700 ${computedFontSize}px Montserrat, sans-serif`;

      const words = text.split(" ");
      let line = "";
      const lines: string[] = [];
      const maxLineWidth = containerWidth * 0.88;
      const lineHeight = computedFontSize * 1.3;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        if (tempCtx.measureText(testLine).width > maxLineWidth && i > 0) {
          lines.push(line.trim());
          line = words[i] + " ";
        } else {
          line = testLine;
        }
      }
      lines.push(line.trim());

      canvas.width = containerWidth;
      // Set canvas height based on lines to avoid clipping
      canvas.height = Math.max(computedFontSize * 3.5, lines.length * lineHeight + computedFontSize * 1.5);
      width = canvas.width;
      height = canvas.height;
      canvasMaxWidth = width;

      // Offscreen canvas for pixel sampling
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const oCtx = offscreen.getContext("2d");
      if (!oCtx) return;

      oCtx.fillStyle = "white";
      oCtx.font = `700 ${computedFontSize}px Montserrat, sans-serif`;
      oCtx.textAlign = "center";
      oCtx.textBaseline = "middle";

      const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;
      lines.forEach((l, idx) => {
        oCtx.fillText(l, width / 2, startY + idx * lineHeight);
      });

      // Sample pixel coordinates
      const imgData = oCtx.getImageData(0, 0, width, height);
      const data = imgData.data;
      particles = [];

      const step = isMobile ? 4 : 2;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          if (data[index + 3] > 128) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 120 + Math.random() * 280;

            particles.push({
              tx: x,
              ty: y,
              sx: x + Math.cos(angle) * distance,
              sy: y + Math.sin(angle) * distance,
              x: 0,
              y: 0,
              size: 0.9 + Math.random() * 1.6,
              alpha: 0.3 + Math.random() * 0.7,
              // Normalised X position [0..1] for horizontal gradient
              colorRatio: x / width,
            });
          }
        }
      }
    };

    initParticles();

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      const t = Math.min(Math.max(smoothProgress.get(), 0), 1);

      // When fully consolidated, hide canvas and show sharp HTML text
      if (htmlText) {
        if (t > 0.97) {
          canvas.style.opacity = String(Math.max(0, 1 - (t - 0.97) / 0.03));
          htmlText.style.opacity = String(Math.min(1, (t - 0.97) / 0.03));
        } else {
          canvas.style.opacity = "1";
          htmlText.style.opacity = "0";
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interpolate position from scatter to target
        p.x = p.sx + (p.tx - p.sx) * t;
        p.y = p.sy + (p.ty - p.sy) * t;

        // Organic noise wobble while scattered
        if (t < 0.94) {
          const noiseFactor = (1 - t) * 8;
          p.x += Math.sin(i * 0.07 + animationFrameId * 0.025) * noiseFactor * 0.25;
          p.y += Math.cos(i * 0.07 + animationFrameId * 0.025) * noiseFactor * 0.25;
        }

        // Horizontal HSL gradient: left = deep brass (#C5A059 hue ~38), right = bright gold (#F9CC88 hue ~42)
        const hue = 38 + p.colorRatio * 6;
        const lightness = 50 + p.colorRatio * 15;
        const opacity = p.alpha * (0.4 + t * 0.6);

        ctx.fillStyle = `hsla(${hue}, 80%, ${lightness}%, ${opacity})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    const handleResize = () => initParticles();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [text, fontSize, smoothProgress]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center justify-center py-10 min-h-[180px] relative">
      <div className="relative w-full flex items-center justify-center">
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="w-full pointer-events-none transition-opacity duration-300 block"
        />
        {/* Sharp HTML text overlay — fades in when particles fully consolidated */}
        <p
          ref={htmlTextRef}
          className="absolute inset-0 flex items-center justify-center text-xl md:text-4xl font-body text-metallic-brass/80 tracking-tight leading-snug italic text-center px-6 pointer-events-none transition-opacity duration-300"
          style={{ opacity: 0 }}
          aria-hidden="false"
        >
          {text}
        </p>
      </div>
    </div>
  );
}
