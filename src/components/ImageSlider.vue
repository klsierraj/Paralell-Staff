<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useImageLoader } from '../composables/useImageLoader'
import { useDragState } from '../composables/useDragState'
import { drawSliderFrame, drawLoadingScreen } from '../utils/canvasRenderer'

const CANVAS_W = 640
const CANVAS_H = 400

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

const { images, allLoaded, loadImages } = useImageLoader()
const drag = useDragState(
  () => images.value.length,
  () => CANVAS_W,
)

function renderFrame(): void {
  if (!ctx) return
  if (!allLoaded.value) {
    drawLoadingScreen(ctx, CANVAS_W, CANVAS_H)
    return
  }
  drawSliderFrame(ctx, images.value, drag.scrollX.value, CANVAS_W, CANVAS_H)
}

function handlePointerDown(e: PointerEvent): void {
  e.preventDefault()
  drag.onPointerDown(e, canvasRef.value!)
}

function handlePointerMove(e: PointerEvent): void {
  if (!drag.isDragging.value) return
  e.preventDefault()
  drag.onPointerMove(e)
  renderFrame()
}

function handlePointerUp(e: PointerEvent): void {
  e.preventDefault()
  drag.onPointerUp()
}

onMounted(async () => {
  const canvas = canvasRef.value!
  const dpr = window.devicePixelRatio || 1
  ctx = canvas.getContext('2d')

  canvas.width = CANVAS_W * dpr
  canvas.height = CANVAS_H * dpr
  ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

  await loadImages()
  renderFrame()
})
</script>

<template>
  <canvas
    ref="canvasRef"
    :style="{ cursor: drag.isDragging.value ? 'grabbing' : 'grab' }"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
    @pointercancel="handlePointerUp"
  />
</template>

<style scoped>
canvas {
  display: block;
  width: 640px;
  height: 400px;
  touch-action: none;
  user-select: none;
  outline: 1px solid #ccc;
  cursor: -webkit-grab;
}
</style>
