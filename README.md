# Publitas Frontend Code Challenge

An image slider rendered entirely on a single `<canvas>` element, built with Vue 3 and TypeScript.

**Tested on:** Chrome (latest)

---

## Approach

The core challenge was modeling a drag interaction on canvas — no DOM helpers, no CSS transitions. Every pixel is drawn manually.

**Drag model — free scroll, not snap**
Images are laid out as a continuous horizontal strip. Dragging moves the viewport across that strip 1:1 with the pointer. On release, the slider stays exactly where it is. There is no auto-snap or spring-back. This felt truer to the reference behavior: you are in full control of the position at all times.

**Canvas rendering**
Each frame, only the images that intersect the visible area are drawn. Images are rendered with an `object-fit: cover` equivalent — the image is scaled uniformly to fill the canvas, then center-cropped. This keeps all images visually consistent regardless of their original dimensions.

**Pointer Events API**
Mouse and touch are handled through a single unified `pointerdown / pointermove / pointerup` code path. `setPointerCapture` ensures the drag continues even if the pointer leaves the canvas bounds mid-drag.

**DPR-aware canvas**
The canvas physical size is scaled by `window.devicePixelRatio`, then the context is scaled back down. This makes the rendered output sharp on retina and high-DPI displays.

---

## Architecture

```
src/
├── types/slider.ts           — shared interfaces
├── utils/canvasRenderer.ts   — pure draw functions (cover crop, frame render, loading screen)
├── composables/
│   ├── useImageLoader.ts     — loads all images in parallel via Promise.all
│   └── useDragState.ts       — pointer event handlers, scrollX state, edge clamping
└── components/
    └── ImageSlider.vue       — canvas ref, wires composables, drives render on pointermove
```

Each composable has a single responsibility. `useDragState` knows nothing about rendering; `canvasRenderer` knows nothing about drag. `ImageSlider.vue` is the only place they meet.

---

## Requirements

- Node >= 20

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Run from dist

The `dist/` folder is prebuilt and can be served directly from any static file server:

```bash
npx nws -d dist
# or
npm run preview
```

---

## What I would improve with more time

- **Momentum / inertia on release** — carry the velocity of the drag into a decelerating animation after `pointerup`, making fast flicks feel natural
- **Keyboard navigation** — left/right arrow keys to jump between images
- **Lazy loading** — for large image sets, only load images near the current viewport position
