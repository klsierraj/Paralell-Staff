import { ref } from 'vue'
import type { SliderImage } from '../types/slider'

const IMAGE_SRCS = [
  '/images/image1.png',
  '/images/image2.png',
  '/images/image3.png',
  '/images/image4.png',
]
export function useImageLoader() {
  const images = ref<SliderImage[]>([])
  const allLoaded = ref(false)
  const loadError = ref(false)

  async function loadImages(): Promise<void> {
    const results = await Promise.all(
      IMAGE_SRCS.map(
        (src) =>
          new Promise<SliderImage>((resolve) => {
            const element = new Image()
            const item: SliderImage = {
              src,
              element,
              loaded: false,
              naturalWidth: 0,
              naturalHeight: 0,
            }

            element.onload = () => {
              item.loaded = true
              item.naturalWidth = element.naturalWidth
              item.naturalHeight = element.naturalHeight
              resolve(item)
            }

            element.onerror = () => {
              console.warn(`[ImageSlider] Failed to load image: ${src}`)
              resolve(item)
            }

            element.src = src
          }),
      ),
    )

    images.value = results
    allLoaded.value = results.some((img) => img.loaded)
    loadError.value = results.every((img) => !img.loaded)
  }

  return { images, allLoaded, loadError, loadImages }
}
