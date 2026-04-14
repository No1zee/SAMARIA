'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Movement
    const onMove = (e: MouseEvent) => {
      gsap.set(dot.current, { x: e.clientX, y: e.clientY })
      gsap.to(ring.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.18,
        ease: 'power2.out',
      })
    }

    // Expand on links and buttons
    const onEnterLink = () => {
      gsap.to(ring.current, { scale: 2.2, opacity: 0.35, duration: 0.3 })
      gsap.to(dot.current, { scale: 0, duration: 0.2 })
    }
    const onLeaveLink = () => {
      gsap.to(ring.current, { scale: 1, opacity: 1, duration: 0.3 })
      gsap.to(dot.current, { scale: 1, duration: 0.2 })
    }

    // Show "VIEW" label on portfolio cards
    const onEnterCard = () => {
      gsap.to(ring.current, { scale: 3, opacity: 0.2, duration: 0.4 })
      gsap.to(label.current, { opacity: 1, duration: 0.3 })
      gsap.to(dot.current, { scale: 0, duration: 0.2 })
    }
    const onLeaveCard = () => {
      gsap.to(ring.current, { scale: 1, opacity: 1, duration: 0.3 })
      gsap.to(label.current, { opacity: 0, duration: 0.2 })
      gsap.to(dot.current, { scale: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMove)

    const updateInteractions = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })

      document.querySelectorAll('[data-cursor="view"]').forEach(el => {
        el.removeEventListener('mouseenter', onEnterCard)
        el.removeEventListener('mouseleave', onLeaveCard)
        el.addEventListener('mouseenter', onEnterCard)
        el.addEventListener('mouseleave', onLeaveCard)
      })
    }

    // Initial run
    updateInteractions()

    // Mutation observer for dynamic content
    const observer = new MutationObserver(updateInteractions)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dot}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-metallic-brass 
                   pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ring}
        className="fixed top-0 left-0 w-9 h-9 rounded-full 
                   border border-metallic-brass/70 pointer-events-none z-9998 
                   -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        <span
          ref={label}
          className="text-[0.5rem] tracking-[0.2em] text-metallic-brass opacity-0 uppercase font-ui font-bold"
        >
          VIEW
        </span>
      </div>
    </>
  )
}
