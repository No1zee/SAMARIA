# Hero Template – 3D World (Bruno-style)

## Intent

- Create a playful 3D environment that embodies the brand.
- Hero is an **experience**, not just a banner.
- Focus: one clear CTA and clear affordances so users know what to do.

## Inputs Antigravity should ask for

- Brand “world” metaphor (garage, control room, command center, studio, city, lab, etc.)
- Primary CTA (visit portfolio, book a call, start a project, request ambulance, etc.)
- Key object(s) that represent the brand (car, ball, desk, map, waveform, etc.)
- Desired vibe on a 1–5 scale:
  - 1: minimal 2D
  - 3: hybrid 2D/3D
  - 5: full 3D playground

## Layout skeleton (desktop)

- Full-viewport canvas on the left (or top on mobile)
- Sticky textual column on the right:
  - Eyebrow: who / category
  - H1: bold promise
  - Supporting line: 1–2 sentences
  - Primary CTA button
  - Secondary CTA link (view work, see services)

Describe to the user:
- Camera starting position and path
- Initial 3D interaction (drive, drag, hover, orbit, click hotspots)
- Performance considerations: lazy loading, reduced motion mode, fallback static image.

## Motion notes

- Use Three.js / R3F for:
  - World, lighting, materials
  - Simple physics or constraints (no unnecessary complexity)
- Hero timeline:
  - 0–400ms: content fade-in, no movement yet
  - 400–1200ms: slow camera drift or single focal motion
  - After user input: react with small, satisfying feedback

## Output format for Antigravity

Return:

1. Hero copy block
2. 3D world description
3. Interaction design
4. Fallback design (no WebGL)
