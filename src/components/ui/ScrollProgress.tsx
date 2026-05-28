'use client'
import { useScroll, useSpring, motion } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleY }}
      className="fixed right-0 top-0 w-[2px] h-screen 
                 bg-metallic-brass origin-top z-9997 opacity-60 pointer-events-none"
    />
  )
}
