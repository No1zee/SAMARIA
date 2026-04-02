"use client";

import { motion } from "framer-motion";

interface CircuitNodeProps {
  color?: 'gold' | 'green';
  size?: number;
}

function CircuitNodeSVG({ color = 'gold', size = 24 }: CircuitNodeProps) {
  const fillColor = color === 'gold' ? '#CB984A' : '#18413E';
  
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4" fill={fillColor} opacity="0.6"/>
      <circle cx="12" cy="12" r="2" fill={fillColor}/>
      <line x1="12" y1="0" x2="12" y2="8" stroke={fillColor} strokeWidth="1" opacity="0.4"/>
      <line x1="12" y1="16" x2="12" y2="24" stroke={fillColor} strokeWidth="1" opacity="0.4"/>
      <line x1="0" y1="12" x2="8" y2="12" stroke={fillColor} strokeWidth="1" opacity="0.4"/>
      <line x1="16" y1="12" x2="24" y2="12" stroke={fillColor} strokeWidth="1" opacity="0.4"/>
    </svg>
  );
}

export default function FloatingCircuits() {
  const nodes = [
    { left: '10%', top: '20%', delay: 0, color: 'gold' as const },
    { left: '25%', top: '15%', delay: 0.3, color: 'green' as const },
    { left: '45%', top: '10%', delay: 0.6, color: 'gold' as const },
    { left: '65%', top: '18%', delay: 0.9, color: 'green' as const },
    { left: '85%', top: '25%', delay: 1.2, color: 'gold' as const },
    { left: '15%', top: '70%', delay: 1.5, color: 'green' as const },
    { left: '75%', top: '75%', delay: 1.8, color: 'gold' as const },
    { left: '50%', top: '80%', delay: 2.1, color: 'green' as const },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [0.8, 1.2, 0.8],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 8 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: node.delay
          }}
          style={{
            left: node.left,
            top: node.top,
            filter: 'drop-shadow(0 0 8px rgba(203, 152, 74, 0.4))'
          }}
        >
          <CircuitNodeSVG color={node.color} size={20} />
        </motion.div>
      ))}
    </div>
  );
}
