'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'

export function useScrollSkew(selector: string = '.skew-target') {
  useEffect(() => {
    let lastY = window.scrollY
    let rafId: number
    let isRunning = false

    const update = () => {
      const currentY = window.scrollY
      const velocity = (currentY - lastY)
      lastY = currentY

      const skewValue = velocity * -0.008;
      const clampedSkew = Math.max(Math.min(skewValue, 5), -5);

      if (Math.abs(velocity) > 0.1) {
        gsap.to(selector, {
          skewY: clampedSkew,
          ease: 'power3.out',
          duration: 0.4,
          overwrite: 'auto',
        })
      } else {
        gsap.to(selector, {
          skewY: 0,
          ease: 'power3.out',
          duration: 0.4,
          overwrite: 'auto',
        })
      }

      isRunning = false
    }

    const onScroll = () => {
      if (!isRunning) {
        isRunning = true
        rafId = requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [selector])
}
