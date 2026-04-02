"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface LiquidButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function LiquidButton({ 
  children, 
  href, 
  onClick,
  variant = 'primary',
  className = '' 
}: LiquidButtonProps) {
  const liquidVariants = {
    initial: { scaleX: 0, transformOrigin: 'left center' as const },
    hover: { 
      scaleX: 1, 
      transformOrigin: 'left center' as const,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    },
    exit: { 
      scaleX: 0, 
      transformOrigin: 'right center' as const,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    }
  };

  const baseClasses = `
    relative overflow-hidden 
    border-2 px-8 py-4 
    font-ui text-sm uppercase tracking-widest
    transition-colors duration-300
    ${variant === 'primary' 
      ? 'border-brand-red text-spirit-red hover:text-royal-obsidian' 
      : 'border-toledo text-off-white hover:text-royal-obsidian'
    }
    ${className}
  `;

  const content = (
    <>
      <motion.div 
        className={`absolute inset-0 ${
          variant === 'primary'
            ? 'bg-linear-to-r from-brand-red to-toledo'
            : 'bg-linear-to-r from-toledo to-brand-red'
        }`}
        variants={liquidVariants}
        initial="initial"
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.div
        whileHover="hover"
        initial="initial"
        className="inline-block"
      >
        <Link href={href} className={baseClasses}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover="hover"
      initial="initial"
      onClick={onClick}
      className={baseClasses}
    >
      {content}
    </motion.button>
  );
}
