"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  decay: number;
  hue: number;
  saturation: number;
  lightness: number;
}

// Detect whether the cursor is currently over a light-background section
function getSectionBrightness(x: number, y: number): "light" | "dark" {
  try {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    if (!el) return "dark";
    // Walk up the DOM to find a section with a known background class
    const section = el.closest(
      ".section-light, .bg-ivory-glow, [class*=\"bg-white\"], [class*=\"bg-off-white\"]"
    );
    return section ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function emitBurst(
  cx: number,
  cy: number,
  particles: Particle[],
  brightness: "light" | "dark",
  count = 28
) {
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
    const force = 2.5 + Math.random() * 5;
    const { hue, saturation, lightness } = pickColor(brightness);

    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * force,
      vy: Math.sin(angle) * force,
      alpha: 0.85 + Math.random() * 0.15,
      size: 3 + Math.random() * 7,
      decay: 0.022 + Math.random() * 0.018,
      hue,
      saturation,
      lightness,
    });
  }
}

function pickColor(brightness: "light" | "dark"): { hue: number; saturation: number; lightness: number } {
  if (brightness === "light") {
    // On light backgrounds: deep Toledo crimson / ink
    const hue = Math.random() < 0.6 ? 350 + Math.random() * 20 : 28 + Math.random() * 12;
    return { hue, saturation: 70, lightness: 25 };
  }
  // On dark backgrounds: metallic brass / bright gold
  const hue = 38 + Math.random() * 7;
  return { hue, saturation: 85, lightness: 52 };
}

export default function FluidCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, px: 0, py: 0, active: false });

  useEffect(() => {
    // Feature detection: skip on touch devices
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // --- Mouse Move: emit trail particles ---
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      const dx = mouse.x - mouse.px;
      const dy = mouse.y - mouse.py;
      const speed = Math.sqrt(dx * dx + dy * dy);

      const brightness = getSectionBrightness(mouse.x, mouse.y);
      const count = Math.min(Math.floor(speed * 0.4) + 1, 8);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const force = Math.random() * speed * 0.15;
        const { hue, saturation, lightness } = pickColor(brightness);

        particles.push({
          x: mouse.x,
          y: mouse.y,
          vx: Math.cos(angle) * force + dx * 0.1,
          vy: Math.sin(angle) * force + dy * 0.1,
          alpha: 0.7 + Math.random() * 0.3,
          size: 2 + Math.random() * 5,
          decay: 0.015 + Math.random() * 0.02,
          hue,
          saturation,
          lightness,
        });
      }
    };

    // --- Click: emit radial ink splash burst ---
    const handleClick = (e: MouseEvent) => {
      const brightness = getSectionBrightness(e.clientX, e.clientY);
      emitBurst(e.clientX, e.clientY, particles, brightness, 28);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // --- Rendering loop ---
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics: friction, upward draft
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy -= 0.02;
        p.x += p.vx;
        p.y += p.vy;

        // Ink bleed
        p.size += 0.22;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Radial gradient per particle
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${p.alpha})`);
        grad.addColorStop(0.35, `hsla(${p.hue}, ${p.saturation - 5}%, ${p.lightness - 8}%, ${p.alpha * 0.55})`);
        grad.addColorStop(1, `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, 0)`);
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] w-full h-full mix-blend-screen"
    />
  );
}
