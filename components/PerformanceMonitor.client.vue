<template>
  <span class="hidden" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, watchEffect } from 'vue';

type MetricValue = number | null;

const metrics = reactive({
  fcp: null as MetricValue,
  lcp: null as MetricValue,
  fid: null as MetricValue,
  cls: null as MetricValue,
  tti: null as MetricValue,
});

let observer: PerformanceObserver | undefined;
let ttiMeasured = false;
let ttiTimeout: ReturnType<typeof setTimeout> | undefined;

onMounted(() => {
  if (!process.client || process.env.NODE_ENV !== 'production') {
    return;
  }

  observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      const metric = entry as PerformanceEntry & { value?: number; hadRecentInput?: boolean };

      switch (entry.entryType) {
        case 'paint':
          if (entry.name === 'first-contentful-paint') {
            metrics.fcp = Math.round(metric.startTime);
          }
          break;
        case 'largest-contentful-paint':
          metrics.lcp = Math.round(metric.startTime);
          break;
        case 'layout-shift':
          if (!metric.hadRecentInput && typeof metric.value === 'number') {
            metrics.cls = (metrics.cls ?? 0) + metric.value;
          }
          break;
        default:
          break;
      }
    });
  });

  try {
    observer.observe({
      entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'],
    });
  } catch (err) {
    console.warn('Performance monitoring not supported:', err);
  }

  const checkTTI = () => {
    if (ttiMeasured) return;
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (navEntry) {
      metrics.tti = Math.round(navEntry.domContentLoadedEventEnd - navEntry.fetchStart);
      ttiMeasured = true;
    }
  };

  ttiTimeout = setTimeout(checkTTI, 1000);
});

watchEffect(() => {
  if (process.env.NODE_ENV !== 'production' && Object.values(metrics).some((value) => value !== null)) {
    console.log('Performance Metrics:', { ...metrics });
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
  if (ttiTimeout) {
    clearTimeout(ttiTimeout);
  }
});
</script>
