<template>
  <canvas
    ref="canvasRef"
    :class="['pointer-events-none absolute inset-0 h-full w-full', props.class]"
  />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = withDefaults(defineProps<{ class?: string }>(), {
  class: undefined,
});
const canvasRef = ref<HTMLCanvasElement | null>(null);

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  colorType: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 1.2 + 0.2;
    this.speedX = (Math.random() - 0.5) * 0.12;
    this.speedY = (Math.random() - 0.5) * 0.12;
    this.opacity = Math.random() * 0.15 + 0.03;
    this.colorType = Math.random() > 0.5 ? 0 : 1;
    this.color =
      this.colorType === 0
        ? `rgba(0, 128, 0, ${this.opacity})`
        : `rgba(220, 20, 60, ${this.opacity})`;
  }

  update(width: number, height: number) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x <= 0 || this.x >= width) this.speedX *= -1;
    if (this.y <= 0 || this.y >= height) this.speedY *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

onMounted(() => {
  if (!canvasRef.value || typeof window === 'undefined') {
    return;
  }

  const canvas = canvasRef.value;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  let particles: Particle[] = [];
  let animationFrameId: number | null = null;
  let lastTime = 0;
  let isVisible = false;
  const fpsInterval = 1000 / 30;

  const setCanvasSize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  const regenerateParticles = () => {
    particles = [];
    const count = Math.min(
      Math.floor((canvas.width * canvas.height) / 10000),
      60,
    );
    for (let i = 0; i < count; i += 1) {
      particles.push(new Particle(canvas.width, canvas.height));
    }
  };

  const handleResize = () => {
    setCanvasSize();
    regenerateParticles();
  };

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let prefersReducedMotion = mediaQuery.matches;

  const stopAnimation = () => {
    if (animationFrameId === null) return;
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  };

  const animate = (time: number) => {
    if (!isVisible || prefersReducedMotion) {
      stopAnimation();
      return;
    }

    const elapsed = time - lastTime;
    if (elapsed > fpsInterval) {
      lastTime = time - (elapsed % fpsInterval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      const connectionDistance = 70;
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared >= connectionDistance * connectionDistance) {
            continue;
          }

          const distance = Math.sqrt(distanceSquared);
          const opacity = (1 - distance / connectionDistance) * 0.04;

          if (particles[i].colorType === particles[j].colorType) {
            ctx.strokeStyle =
              particles[i].colorType === 0
                ? `rgba(0, 128, 0, ${opacity})`
                : `rgba(220, 20, 60, ${opacity})`;
          } else {
            ctx.strokeStyle = `rgba(110, 74, 30, ${opacity})`;
          }

          ctx.lineWidth = 0.2;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (prefersReducedMotion || animationFrameId !== null) return;
    lastTime = performance.now();
    animationFrameId = requestAnimationFrame(animate);
  };

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(canvas);

  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    },
    { threshold: 0.1 },
  );
  intersectionObserver.observe(canvas);

  handleResize();

  const handleMotionChange = (event: MediaQueryListEvent) => {
    prefersReducedMotion = event.matches;
    if (prefersReducedMotion) {
      stopAnimation();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    if (isVisible) {
      startAnimation();
    }
  };

  mediaQuery.addEventListener('change', handleMotionChange);

  onBeforeUnmount(() => {
    stopAnimation();
    intersectionObserver.disconnect();
    resizeObserver.disconnect();
    mediaQuery.removeEventListener('change', handleMotionChange);
  });
});
</script>
