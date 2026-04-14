'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedStatProps {
  value: number
  suffix?: string
  className?: string
}

export function AnimatedStat({ value, suffix = '', className = '' }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obj = { val: 0 }
    
    const tl = gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        if (el) el.textContent = Math.floor(obj.val).toString()
      }
    })

    return () => {
      tl.kill()
    }
  }, [value])

  return (
    <span className={className}>
      <span ref={ref}>0</span>{suffix}
    </span>
  )
}
