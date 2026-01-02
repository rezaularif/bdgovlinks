<template>
  <button
    type="button"
    aria-label="Scroll to top"
    @click="scrollToTop"
    :class="[
      'fixed right-4 bottom-24 sm:bottom-10 md:bottom-6 z-50 rounded-full bg-gradient-to-b from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 hover:scale-105 hover:shadow-xl hover:shadow-primary/25',
      show
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-2 pointer-events-none',
    ]"
  >
    <ArrowUp class="h-5 w-5" />
  </button>
</template>

<script setup lang="ts">
import { ArrowUp } from 'lucide-vue-next';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const show = ref(false);

const handleScroll = () => {
  if (!process.client) return;
  const viewportBottom = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;
  const nearBottomThreshold = 120;
  show.value = viewportBottom >= pageHeight - nearBottomThreshold;
};

const scrollToTop = () => {
  if (!process.client) return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  if (!process.client) return;
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onBeforeUnmount(() => {
  if (!process.client) return;
  window.removeEventListener('scroll', handleScroll);
});
</script>
