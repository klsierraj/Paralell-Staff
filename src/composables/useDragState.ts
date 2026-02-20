import { ref } from 'vue'

export function useDragState(imageCount: () => number, canvasWidth: () => number) {
  const scrollX = ref(0)
  const isDragging = ref(false)

  let startPointerX = 0
  let startScrollX = 0

  function onPointerDown(e: PointerEvent, canvas: HTMLCanvasElement): void {
    isDragging.value = true
    startPointerX = e.clientX
    startScrollX = scrollX.value
    canvas.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: PointerEvent): void {
    if (!isDragging.value) return
    const delta = e.clientX - startPointerX
    const maxScroll = (imageCount() - 1) * canvasWidth()
    scrollX.value = Math.max(0, Math.min(startScrollX - delta, maxScroll))
  }

  function onPointerUp(): void {
    isDragging.value = false
  }

  return { scrollX, isDragging, onPointerDown, onPointerMove, onPointerUp }
}
