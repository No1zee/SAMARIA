# Hero Template – GSAP Parallax Stack (Wildcatter / Poppr)

## Intent

- Layered parallax hero with depth, but still readable and fast.
- Works great on scroll-focused storytelling homepages.

## Inputs

- Background story image or texture
- 3–5 foreground elements (photos, shapes, words)
- Main headline and subheadline
- Desired scroll “intensity” 1–5

## Structure

- Section height: 100vh or 120–150vh depending on story
- Layers:
  - Layer 0: solid or gradient background
  - Layer 1: main background asset (slow parallax)
  - Layers 2–4: mid foreground elements with moderate parallax
  - Layer 5: text block locked to viewport or moving subtly

## GSAP guidance

Prompt Antigravity to specify:

- ScrollTrigger sections (start/end, scrub)
- Data-speed style (faster near the camera, slower in the back)
- Safe default ranges:
  - Background: translateY 0 → 20–30%
  - Foreground: translateY 0 → 10–20%
- Reduced-motion handling (disable parallax, use subtle fades instead)

## Output format

Return:

- Hero copy (headline, subheadline, CTA)
- Layer list with z-index, asset type, motion range
- ScrollTrigger config described in words (so I can translate to code)
