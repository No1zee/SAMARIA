'use client'
import { useEffect } from 'react'

export function GrainOverlay() {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    
    Object.assign(canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0', 
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: '998',
      opacity: '0.032',
      mixBlendMode: 'overlay',
    })
    
    document.body.appendChild(canvas)

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let rafId: number
    const tick = () => {
      const img = ctx.createImageData(canvas.width, canvas.height)
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v
        img.data[i + 3] = 255
      }
      ctx.putImageData(img, 0, 0)
      rafId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      document.body.removeChild(canvas)
    }
  }, [])

  return null
}
