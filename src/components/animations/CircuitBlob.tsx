"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CircuitBlobProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  animate?: boolean;
}

// Morph state definitions - circuit-inspired organic shapes
const morphStates = {
  primary: {
    initial: "M400,100 C500,120 550,200 520,280 C490,360 380,400 300,370 C220,340 180,250 220,180 C260,110 320,80 400,100 Z",
    state1: "M380,80 C480,100 540,180 530,270 C520,360 410,420 320,390 C230,360 170,260 200,170 C230,80 300,60 380,80 Z",
    state2: "M420,90 C520,110 580,190 560,290 C540,390 420,440 330,410 C240,380 180,270 210,180 C240,90 340,70 420,90 Z",
    state3: "M390,110 C490,130 560,210 540,300 C520,390 400,430 310,400 C220,370 160,270 190,180 C220,90 310,90 390,110 Z"
  },
  secondary: {
    initial: "M600,250 C650,270 680,320 660,380 C640,440 580,470 520,450 C460,430 430,370 450,320 C470,270 540,230 600,250 Z",
    state1: "M580,240 C630,260 670,310 655,370 C640,430 585,465 525,445 C465,425 425,365 445,315 C465,265 530,220 580,240 Z",
    state2: "M620,260 C670,280 700,330 680,390 C660,450 600,480 540,460 C480,440 440,380 460,330 C480,280 560,240 620,260 Z",
    state3: "M590,255 C640,275 675,325 658,385 C642,445 588,475 528,455 C468,435 428,375 448,325 C468,275 540,235 590,255 Z"
  },
  tertiary: {
    initial: "M200,400 C250,410 290,450 280,500 C270,550 220,570 170,555 C120,540 90,490 105,445 C120,400 150,390 200,400 Z",
    state1: "M190,395 C240,405 285,445 275,495 C265,545 215,565 165,550 C115,535 85,485 100,440 C115,395 145,385 190,395 Z",
    state2: "M210,405 C260,415 300,455 290,505 C280,555 230,575 180,560 C130,545 100,495 115,450 C130,405 160,395 210,405 Z",
    state3: "M195,398 C245,408 288,448 278,498 C268,548 218,568 168,553 C118,538 88,488 103,443 C118,398 148,388 195,398 Z"
  }
};

const gradientIds = {
  primary: 'circuit-gradient-primary',
  secondary: 'circuit-gradient-secondary',
  tertiary: 'circuit-gradient-tertiary'
};

export default function CircuitBlob({ 
  className = '', 
  variant = 'primary',
  animate = true 
}: CircuitBlobProps) {
  const blobRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!animate || !blobRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const states = morphStates[variant];
    const stateKeys = ['state1', 'state2', 'state3', 'initial'] as const;
    const morphTimeline = gsap.timeline({ 
      repeat: -1,
      defaults: { duration: 4, ease: "power1.inOut" }
    });

    // Create continuous morphing loop
    stateKeys.forEach((stateKey) => {
      morphTimeline.to(blobRef.current, {
        attr: { d: states[stateKey] },
      });
    });

    return () => {
      morphTimeline.kill();
    };
  }, [animate, variant]);

  return (
    <svg 
      viewBox="0 0 800 600" 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient 1: Metallic Brass to Tribal Green */}
        <linearGradient id={gradientIds.primary} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CB984A" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#18413E" stopOpacity="0.15"/>
        </linearGradient>

        {/* Gradient 2: Tribal Green glow */}
        <radialGradient id={gradientIds.secondary} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#18413E" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#CB984A" stopOpacity="0.1"/>
        </radialGradient>

        {/* Gradient 3: Brass accent */}
        <linearGradient id={gradientIds.tertiary} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#CB984A" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#18413E" stopOpacity="0.12"/>
        </linearGradient>

        {/* Blur filter for organic feel */}
        <filter id="glow-filter">
          <feGaussianBlur stdDeviation="40" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <path 
        ref={blobRef}
        d={morphStates[variant].initial}
        fill={`url(#${gradientIds[variant]})`}
        filter="url(#glow-filter)"
        opacity={variant === 'primary' ? '1' : variant === 'secondary' ? '0.7' : '0.5'}
      />
    </svg>
  );
}
