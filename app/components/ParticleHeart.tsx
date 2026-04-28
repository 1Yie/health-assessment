"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  hue: number; // 0-30 red range
  offset: number;
}

// Heart surface in parametric form (u, v) → (x, y, z)
// u: longitude 0..2π, v: latitude -π/2..π/2
// We inflate the 2D heart profile into a sphere-like 3D shape
function heartSurface(u: number, v: number): [number, number, number] {
  // 2D heart at angle v (latitude)
  const r = Math.cos(v); // radius shrinks toward poles
  const hx = 16 * Math.pow(Math.sin(u), 3);
  const hy = 13 * Math.cos(u) - 5 * Math.cos(2 * u) - 2 * Math.cos(3 * u) - Math.cos(4 * u);

  // Map 2D heart profile onto sphere surface
  const x = hx * r * 0.062; // normalize to ~[-1,1]
  const y = hy * r * 0.062;
  const z = Math.sin(v);     // Z is the sphere's polar axis

  return [x, y, z];
}

export default function ParticleHeart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const count = 900;

    for (let i = 0; i < count; i++) {
      const u = Math.random() * Math.PI * 2;
      // Area-preserving: v = asin(2*rand - 1) gives uniform sphere distribution
      const v = Math.asin(2 * Math.random() - 1);

      const [nx, ny, nz] = heartSurface(u, v);

      const scale = Math.min(width, height) * 0.38;

      particles.push({
        baseX: nx * scale,
        baseY: ny * scale,
        baseZ: nz * scale,
        size: Math.random() * 1.8 + 0.8,
        hue: Math.random() * 30,       // 0=red, 30=orange-red
        offset: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      const rotY = 0;
      const rotX = 0;
      const breath = 1 + Math.sin(time * 0.6) * 0.08;

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      const particles = particlesRef.current;

      // Sort by Z for painter's algorithm
      const sorted = particles.map((p) => {
        const bx = p.baseX * breath;
        const by = p.baseY * breath;
        const bz = p.baseZ * breath;

        const rx = bx * cosY - bz * sinY;
        const rz = bx * sinY + bz * cosY;
        const ry = by * cosX - rz * sinX;
        const fz = by * sinX + rz * cosX;

        const persp = 500 / (500 + fz + 200);
        return { p, sx: cx + rx * persp, sy: cy - ry * persp, fz, persp };
      }).sort((a, b) => a.fz - b.fz);

      for (const { p, sx, sy, persp } of sorted) {
        const alpha = Math.max(0.2, Math.min(1, 0.3 + persp * 0.9));
        const lightness = Math.round(35 + persp * 30);
        const color = `hsla(${p.hue}, 90%, ${lightness}%, ${alpha.toFixed(2)})`;
        const r = p.size * persp;

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      time += 0.016;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ filter: "drop-shadow(0 0 40px rgba(220,38,38,0.3))" }}
    />
  );
}
