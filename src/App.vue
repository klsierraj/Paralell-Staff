<script setup lang="ts">
import ImageSlider from './components/ImageSlider.vue'
</script>

<template>
  <main>
    <h1>Publitas Frontend Code Challenge</h1>
    <ImageSlider />
  </main>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

h1 {
  color: #28b1ea;
  font-family: system-ui, sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
}
</style>
