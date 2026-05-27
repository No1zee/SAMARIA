# Pretext Phase Separation Design

## Overview
This document details the architectural design for elevating the use of Pretext (`@chenglou/pretext`) in the SAMARIA codebase. The primary focus is separating the expensive text preparation phase from the fast line layout phase to optimize performance during resize events and scroll-driven animation loops.

---

## 1. Architectural Details

### Phase Separation
Pretext operation is split into two phases:
1. **Prepare Phase**: Utilizes browser Canvas API to analyze text geometry, splitting strings into segments. This is CPU-intensive.
2. **Layout Phase**: Distributes prepared segments across dynamic line widths. This is extremely fast.

To avoid rendering lag:
* **Prepare** will run ONLY when text content, font family, or font size changes.
* **Layout** will run dynamically inside container `ResizeObserver` loops and scroll listener updates.

```
[Text / Font Change] ─> [Prepare Phase] ─> [Cached Prepared Segments]
                                                   │
[Resize / Scroll] ─────────> [Layout Phase] <──────┘
                                   │
                           [Rendered Lines]
```

---

## 2. Component Design Changes

### CinematicText.tsx
* Refactor the `preparedMeasure` hook to process the raw string into segments split by `\n`.
* Introduce a structured `preparedBlocks` memoized state.
* Clean up line height and tracking properties to avoid word-wrapping overlaps.

### useTextFit.ts / PretextSmoky.tsx
* Align hooks with the new phase separation caching paradigm where applicable.

---

## 3. Verification & Metrics
* Verify zero console warnings for font measurement thrashing during window resizing.
* Check that text does not split mid-word under narrow container widths.
