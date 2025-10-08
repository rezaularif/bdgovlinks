<template>
  <NuxtPage />
  <ClientOnly>
    <PerformanceMonitor v-if="isProduction" />
  </ClientOnly>
</template>

<script setup lang="ts">
const isProduction = process.env.NODE_ENV === 'production';

useHead({
  bodyAttrs: {
    class: 'antialiased',
  },
});
</script>
