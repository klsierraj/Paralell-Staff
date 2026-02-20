import type { SliderImage } from '../types/slider'

export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
): void {
  const imgAspect = img.naturalWidth / img.naturalHeight
  const destAspect = dw / dh

  let sx = 0
  let sy = 0
  let sw = img.naturalWidth
  let sh = img.naturalHeight

  if (imgAspect > destAspect) {
    sw = img.naturalHeight * destAspect
    sx = (img.naturalWidth - sw) / 2
  } else {
    sh = img.naturalWidth / destAspect
    sy = (img.naturalHeight - sh) / 2
  }

  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
}

export function drawSliderFrame(
  ctx: CanvasRenderingContext2D,
  images: SliderImage[],
  scrollX: number,
  W: number,
  H: number,
): void {
  ctx.clearRect(0, 0, W, H)

  for (let i = 0; i < images.length; i++) {
    const x = i * W - scrollX
    const img = images[i]
    if (x + W > 0 && x < W && img?.loaded) {
      drawImageCover(ctx, img.element, x, 0, W, H)
    }
  }
}

export function drawLoadingScreen(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
): void {
  ctx.fillStyle = '#111'
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.font = '16px system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Loading...', W / 2, H / 2)
}
