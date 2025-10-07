"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function HeroParticles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    setCanvasSize();
    const resizeObserver = new ResizeObserver(setCanvasSize);
    resizeObserver.observe(canvas);

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

    const particles: Particle[] = [];
    const particleCount = Math.min(
      Math.floor((canvas.width * canvas.height) / 10000),
      60
    );

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    let animationFrameId = 0;
    let lastTime = 0;
    let isVisible = false;
    const fpsInterval = 1000 / 30;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = currentTime - lastTime;
      if (elapsed <= fpsInterval) return;

      lastTime = currentTime - (elapsed % fpsInterval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      const connectionDistance = 70;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared >= connectionDistance * connectionDistance) continue;

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
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none",
        className
      )}
    />
  );
}
