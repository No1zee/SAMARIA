# 3D Parallax Misty Clouds Design

## Overview
This document details the architectural and visual design for elevating the sky background in SAMARIA. We are introducing a new **Volumetric Misty** cloud style using SVG filters and dynamic Harare-diurnal color gradients. The current stylized **Ukiyo-e** vector clouds will be preserved as a togglable option in the Sandbox control panel (`InteractionLab`). In addition, the background elements will be refactored into a multi-plane 3D parallax stack to interleave clouds between the mountain ranges, complete with interactive cursor wind-drift.

---

## 1. Architectural Details & State Flow

To control the active cloud style across components, we will introduce a state mechanism in the global celestial engine.

```
[InteractionLab Sandbox Toggle] ──> [CelestialProvider (cloudStyle State)]
                                                 │
                                                 ▼
                                   [SamuraiJackBackground]
                                   ├── Render 'misty' or 'ukiyo' style
                                   └── Interleaved in 3D parallax stack
```

### Celestial Context Updates (`CelestialProvider.tsx`)
- Introduce a new state: `cloudStyle: 'misty' | 'ukiyo'` (defaulting to `'misty'`).
- Export `cloudStyle` and `setCloudStyle` from `useCelestial()`.

### Sandbox Controls (`InteractionLab.tsx`)
- Render a new control panel row labeled **CLOUD RENDERING**.
- Expose buttons to toggle between `Misty Atmosphere` and `Ukiyo-e Silhouette`.
- Style active/inactive states with HSL custom properties, indicator dots, and subtle scale animations.

---

## 2. Component Design Changes

### A. SamuraiJackBackground (`SamuraiJackBackground.tsx`)
The mountains and clouds will be separated and ordered from back to front to create a true depth buffer:

```
[Far Sky & Stars] -> [Sun/Moon] -> [Clouds Layer 1 (Far)] -> [Back Mountain] -> [Clouds Layer 2 (Mid)] -> [Mid Mountain] -> [Clouds Layer 3 (Near)] -> [Front Mountain] -> [Mist Bands & Embers]
```

- **Interactive Wind**: Apply different scaling factors of `mouseX` and `mouseY` to each cloud layer via Framer Motion's `x` and `y` inline styles.
- **Layer Splitting**: Remove the consolidated mountain wrapper `z-20` and render the three mountain layers as standalone elements in the layout tree.

### B. UkiyoCloud & MistyCloud Renderers
- Render Ukiyo-e clouds if `cloudStyle === 'ukiyo'`.
- Render Misty clouds if `cloudStyle === 'misty'`.
- **Misty Cloud implementation**:
  - Uses an SVG `<feGaussianBlur>` filter inside `<defs>`.
  - Defines a `<linearGradient id="misty-grad">` with stops animated by Framer Motion's `progress` value to follow the sky's light phases (Midnight Navy ──> Amber Sunrise ──> Ivory Midday ──> Scarlet Sunset ──> Crimson Totality).
  - Renders 3-4 overlapping shapes (ellipses, paths) inside the blur filter to give the cloud three-dimensional body and soft edges.

---

## 3. Verification Plan

### Manual Verification
- Verify that changing the Cloud Style in the Sandbox (`InteractionLab`) correctly updates the clouds in real-time across the home page.
- Verify that scrolling shifts the mountains and clouds at different rates (parallax validation).
- Verify that moving the mouse cursor triggers the appropriate wind parallax offset for each layer.
- Verify color transitions on scroll: ensure clouds blend into the dark navy background at night rather than remaining golden.
