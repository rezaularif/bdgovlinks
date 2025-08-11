"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function HeroParticles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      colorType: number; // 0 for green, 1 for red

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.3; // Smaller particles
        this.speedX = (Math.random() - 0.5) * 0.15; // Slower movement
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.2 + 0.05; // Lighter opacity
        this.colorType = Math.random() > 0.5 ? 0 : 1;
        
        // Bangladesh flag colors: green and red
        if (this.colorType === 0) {
          this.color = `rgba(0, 128, 0, ${this.opacity})`; // Green
        } else {
          this.color = `rgba(220, 20, 60, ${this.opacity})`; // Red
        }
      }

      update(width: number, height: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 7000), 80); // Fewer particles
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      // Draw connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) { // Shorter connection distance
            const opacity = (1 - distance / 80) * 0.05; // Lighter connections
            // Mix the colors of the two particles
            if (particles[i].colorType === particles[j].colorType) {
              ctx.strokeStyle = particles[i].colorType === 0
                ? `rgba(0, 128, 0, ${opacity})`
                : `rgba(220, 20, 60, ${opacity})`;
            } else {
              // Blend green and red
              ctx.strokeStyle = `rgba(110, 74, 30, ${opacity})`;
            }
            ctx.lineWidth = 0.3; // Thinner lines
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

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