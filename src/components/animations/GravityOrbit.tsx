"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCelestial } from "@/components/providers/CelestialProvider";

interface NodeState {
  id: number;
  label: string;
  tags: string[];
  baseX: number; // percentage of viewport width
  baseY: number; // percentage of viewport height
  x: number;
  y: number;
  vx: number;
  vy: number;
  floatOffsetAngle: number;
  isHovered: boolean;
  color: string;
}

const NODE_TEMPLATES = [
  { id: 1, label: "Websites", tags: ["Next.js", "React", "SEO"], baseX: 25, baseY: 20, color: "#C9A84C" },
  { id: 2, label: "IT Services", tags: ["Cloud", "Security", "Databases"], baseX: 75, baseY: 30, color: "#4A88CC" },
  { id: 3, label: "Solutions", tags: ["Automation", "APIs", "CRM/ERP"], baseX: 50, baseY: 55, color: "#E8853A" },
  { id: 4, label: "Design", tags: ["Cinematic UI", "Brand Systems", "Motion"], baseX: 20, baseY: 75, color: "#C42B2B" },
  { id: 5, label: "Advisory", tags: ["Strategy", "Architecture", "Scale"], baseX: 80, baseY: 75, color: "#FFE270" },
];

export default function GravityOrbit() {
  const { x: mouseMotionX, y: mouseMotionY, interactionMode } = useCelestial();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<NodeState[]>([]);
  const domNodesRef = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const requestRef = useRef<number | null>(null);
  const shockwavesRef = useRef<{ x: number; y: number; radius: number; maxRadius: number; speed: number; opacity: number }[]>([]);

  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);

  // Initialize nodes
  useEffect(() => {
    if (interactionMode !== "gravity") return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    nodesRef.current = NODE_TEMPLATES.map((t) => ({
      ...t,
      x: (t.baseX / 100) * width,
      y: (t.baseY / 100) * height,
      vx: 0,
      vy: 0,
      floatOffsetAngle: Math.random() * Math.PI * 2,
      isHovered: false,
    }));

    // Setup mouse click listener for shockwaves
    const handleCanvasClick = (e: MouseEvent) => {
      shockwavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 250,
        speed: 6,
        opacity: 0.5,
      });
    };

    window.addEventListener("click", handleCanvasClick);
    return () => {
      window.removeEventListener("click", handleCanvasClick);
    };
  }, [interactionMode]);

  // Main animation loop
  useEffect(() => {
    if (interactionMode !== "gravity") {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const updatePhysics = () => {
      const mx = mouseMotionX.get();
      const my = mouseMotionY.get();
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw active click shockwaves
      shockwavesRef.current = shockwavesRef.current.filter((wave) => {
        wave.radius += wave.speed;
        wave.opacity -= 0.012;

        ctx.strokeStyle = `rgba(201, 168, 76, ${wave.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.stroke();

        return wave.opacity > 0;
      });

      // Update nodes physics
      nodesRef.current.forEach((node) => {
        const isHovered = hoveredNodeId === node.id;
        
        // 1. Gentle Brownian floating offset
        node.floatOffsetAngle += 0.005;
        const floatX = Math.cos(node.floatOffsetAngle) * 15;
        const floatY = Math.sin(node.floatOffsetAngle * 1.5) * 15;

        // Target position defaults to base position + float offset
        const baseTargetX = (node.baseX / 100) * width + floatX;
        const baseTargetY = (node.baseY / 100) * height + floatY;

        let targetX = baseTargetX;
        let targetY = baseTargetY;

        // 2. Gravitational pull toward mouse if within range (no circular orbit)
        const dx = mx - node.x;
        const dy = my - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxInfluenceRange = 400;

        if (dist < maxInfluenceRange && !isHovered) {
          // Pull increases as distance decreases, using a smooth curve
          const attractionForce = Math.pow(1 - dist / maxInfluenceRange, 1.5);
          targetX = baseTargetX + dx * attractionForce * 0.45;
          targetY = baseTargetY + dy * attractionForce * 0.45;
        } else if (isHovered) {
          // Hover locks node slightly closer to mouse for tactile precision
          targetX = mx;
          targetY = my;
        }

        // Apply physics forces (spring mechanics)
        const springStrength = isHovered ? 0.12 : 0.03;
        const friction = isHovered ? 0.8 : 0.94;

        node.vx += (targetX - node.x) * springStrength;
        node.vy += (targetY - node.y) * springStrength;

        // Shockwave impact
        shockwavesRef.current.forEach((wave) => {
          const sDx = node.x - wave.x;
          const sDy = node.y - wave.y;
          const sDist = Math.sqrt(sDx * sDx + sDy * sDy);
          const waveDist = Math.abs(sDist - wave.radius);
          if (waveDist < 40) {
            const pushForce = ((40 - waveDist) / 40) * 12 * wave.opacity;
            node.vx += (sDx / sDist) * pushForce;
            node.vy += (sDy / sDist) * pushForce;
          }
        });

        node.vx *= friction;
        node.vy *= friction;
        node.x += node.vx;
        node.y += node.vy;

        // 3. Draw tethers & cursor connections
        if (dist < maxInfluenceRange) {
          const alpha = (1 - dist / maxInfluenceRange) * 0.15;
          ctx.strokeStyle = isHovered 
            ? "rgba(201, 168, 76, 0.4)" 
            : `rgba(201, 168, 76, ${alpha})`;
          ctx.lineWidth = isHovered ? 1.5 : 0.75;
          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
        }

        // Update DOM elements using refs directly for maximum performance
        const domNode = domNodesRef.current[node.id];
        if (domNode) {
          domNode.style.transform = `translate3d(${node.x}px, ${node.y}px, 0) translate(-50%, -50%)`;
        }
      });

      // 4. Draw constellation lines between nearby nodes
      ctx.strokeStyle = "rgba(201, 168, 76, 0.05)";
      ctx.lineWidth = 0.5;
      const numNodes = nodesRef.current.length;
      for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
          const n1 = nodesRef.current[i];
          const n2 = nodesRef.current[j];
          const distance = Math.sqrt((n1.x - n2.x) ** 2 + (n1.y - n2.y) ** 2);
          if (distance < 300) {
            const lineAlpha = (1 - distance / 300) * 0.05;
            ctx.strokeStyle = `rgba(201, 168, 76, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [interactionMode, hoveredNodeId, mouseMotionX, mouseMotionY]);

  if (interactionMode !== "gravity") return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none"
    >
      {/* Background canvas for clean constellation lines and shockwaves */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Floating Interactive DOM Nodes */}
      {NODE_TEMPLATES.map((node) => (
        <div
          key={node.id}
          ref={(el) => { domNodesRef.current[node.id] = el; }}
          onMouseEnter={() => setHoveredNodeId(node.id)}
          onMouseLeave={() => setHoveredNodeId(null)}
          className="absolute left-0 top-0 pointer-events-auto cursor-pointer"
          style={{ willChange: "transform" }}
        >
          <motion.div 
            animate={{
              scale: hoveredNodeId === node.id ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`px-5 py-3 border rounded-sm backdrop-blur-md transition-all duration-500 flex flex-col items-center min-w-[140px] ${
              hoveredNodeId === node.id 
                ? "bg-metallic-brass/10 border-metallic-brass shadow-[0_0_20px_rgba(201,168,76,0.2)]" 
                : "bg-black/60 border-white/10 hover:border-metallic-brass/35"
            }`}
          >
            {/* Minimal Pulse Point */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`w-1.5 h-1.5 rounded-full`} style={{ backgroundColor: node.color }} />
              <span className="text-[10px] font-heading tracking-[0.3em] uppercase text-off-white">
                {node.label}
              </span>
            </div>

            {/* Expandable Tags on Hover */}
            <AnimatePresence>
              {hoveredNodeId === node.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex flex-wrap justify-center gap-1.5 pt-2 border-t border-white/5 w-full"
                >
                  {node.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[8px] font-ui tracking-widest text-metallic-brass/80 bg-metallic-brass/5 px-2 py-0.5 border border-metallic-brass/10 rounded-sm uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      ))}
      
      {/* Visual Instruction HUD */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 px-6 py-2 bg-royal-obsidian/60 border border-white/5 backdrop-blur-md rounded-full text-center">
        <span className="text-[9px] font-ui tracking-[0.4em] text-metallic-brass uppercase animate-pulse">
          GRAVITY ACTIVE // CLICK TO EMIT SHOCKWAVE
        </span>
      </div>
    </div>
  );
}
