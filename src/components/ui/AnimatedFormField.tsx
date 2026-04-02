"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedFormFieldProps {
  label: string;
  helperText: string;
  type?: 'text' | 'email' | 'textarea';
  placeholder: string;
  required?: boolean;
}

export default function AnimatedFormField({
  label,
  helperText,
  type = 'text',
  placeholder,
  required = false
}: AnimatedFormFieldProps) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    const glow = glowRef.current;
    if (!input || !glow) return;

    const handleFocus = () => {
      glow.style.opacity = '1';
      glow.style.transform = 'scaleX(1)';
    };

    const handleBlur = () => {
      glow.style.opacity = '0';
      glow.style.transform = 'scaleX(0)';
    };

    input.addEventListener('focus', handleFocus);
    input.addEventListener('blur', handleBlur);

    return () => {
      input.removeEventListener('focus', handleFocus);
      input.removeEventListener('blur', handleBlur);
    };
  }, []);

  const inputClasses = `
    w-full bg-royal-obsidian 
    border-b border-brand-red/30 
    focus:border-spirit-red 
    text-off-white p-3 
    outline-none 
    transition-colors duration-300
    placeholder:text-off-white/20
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <label className="font-ui text-xs uppercase text-spirit-red tracking-widest flex items-center gap-2">
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      <p className="text-xs text-off-white/40 mt-1 mb-2">{helperText}</p>
      
      {/* Circuit Glow Effect */}
      <div
        ref={glowRef}
        className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-brand-red to-toledo transition-all duration-500 ease-out glow-bar-init"
      />

      {/* Circuit Node Indicator */}
      <div className="absolute -left-3 top-8 w-2 h-2 rounded-full bg-brand-red/0 transition-all duration-300 peer-focus:bg-brand-red peer-focus:shadow-[0_0_8px_rgba(218,26,26,0.6)]" />

      {type === 'textarea' ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={inputClasses + ' resize-none peer'}
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type={type}
          placeholder={placeholder}
          required={required}
          className={inputClasses + ' peer'}
        />
      )}
    </motion.div>
  );
}
