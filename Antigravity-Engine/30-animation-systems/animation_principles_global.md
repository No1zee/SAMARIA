# Global Animation Principles

For every project, define:

## 1. Motion personality

- Speed: slow / medium / fast
- Energy: calm / balanced / high
- Density: light (few), moderate, heavy (lots of motion)

## 2. Rules

- Duration bands:
  - Micro-interactions: 120–220ms
  - Section entrances: 300–600ms
  - Major transitions: 600–900ms
- Easing defaults:
  - Primary: power2.out / power3.out
  - Overshoot sparingly (back.out) on playful brands only.
- Max concurrent animations:
  - Desktop: cap at 3–4 moving clusters
  - Mobile: cap at 1–2 moving clusters

## 3. Reduced motion

Always define:
- Behavior when prefers-reduced-motion is true:
  - Disable parallax and complex sequences
  - Replace with fades and opacity shifts
  - Stop automatic looping unless critical

Antigravity: always output a “reduced motion” variant of any animation plan.
