"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function HeroParticles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Performance optimization: Only animate when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    setCanvasSize();
    const resizeObserver = new ResizeObserver(setCanvasSize);
    resizeObserver.observe(canvas);

    // Particle class with optimized properties
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
        this.size = Math.random() * 1.2 + 0.2; // Even smaller particles
        this.speedX = (Math.random() - 0.5) * 0.12; // Slower movement
        this.speedY = (Math.random() - 0.5) * 0.12;
        this.opacity = Math.random() * 0.15 + 0.03; // Lighter opacity
        this.colorType = Math.random() > 0.5 ? 0 : 1;
        
        // Pre-computed colors for better performance
        if (this.colorType === 0) {
          this.color = `rgba(0, 128, 0, ${this.opacity})`;
        } else {
          this.color = `rgba(220, 20, 60, ${this.opacity})`;
        }
      }

      update(width: number, height: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges with boundary checking
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

    // Create particles with optimized count
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 60); // Even fewer particles
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Optimized animation loop with throttling
    let animationFrameId: number;
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // Target 30 FPS instead of 60

    const animate = (currentTime: number) => {
      if (!isVisible) return;

      const elapsed = currentTime - lastTime;
      
      if (elapsed > fpsInterval) {
        lastTime = currentTime - (elapsed % fpsInterval);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Batch particle updates and draws
        particles.forEach(particle => {
          particle.update(canvas.width, canvas.height);
          particle.draw(ctx);
        });

        // Optimized connection drawing with spatial partitioning
        const connectionDistance = 70; // Reduced connection distance
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distanceSquared = dx * dx + dy * dy;
            
            // Use squared distance to avoid expensive sqrt
            if (distanceSquared < connectionDistance * connectionDistance) {
              const distance = Math.sqrt(distanceSquared);
              const opacity = (1 - distance / connectionDistance) * 0.04; // Lighter connections
              
              // Pre-computed connection colors
              if (particles[i].colorType === particles[j].colorType) {
                ctx.strokeStyle = particles[i].colorType === 0
                  ? `rgba(0, 128, 0, ${opacity})`
                  : `rgba(220, 20, 60, ${opacity})`;
              } else {
                ctx.strokeStyle = `rgba(110, 74, 30, ${opacity})`;
              }
              
              ctx.lineWidth = 0.2; // Thinner lines
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    if (isVisible) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [isVisible]);

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