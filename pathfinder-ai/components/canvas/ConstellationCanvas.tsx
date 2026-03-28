'use client';

import * as React from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

interface CanvasProps {
  dotCount?: number;
  speed?: number;
  interactive?: boolean;
}

export function ConstellationCanvas({ 
  dotCount = 80, 
  speed = 0.3, 
  interactive = true 
}: CanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const pointsRef = React.useRef<Point[]>([]);
  const mouseRef = React.useRef({ x: -9999, y: -9999 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use parent container dimensions
    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Initialize points
    const points: Point[] = [];
    const colors = ['#F0A500', '#00D4A8'];
    
    // Scale count by area, with requested dotCount as baseline for a 1920x1080 screen
    const baseArea = 1920 * 1080;
    const currentArea = width * height;
    const actualCount = Math.max(20, Math.floor(dotCount * (currentArea / baseArea)));

    for (let i = 0; i < actualCount; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.7 + 0.3
      });
    }
    pointsRef.current = points;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const m = mouseRef.current;

      pointsRef.current.forEach((point, i) => {
        // Update position
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;

        // Mouse Repulsion
        if (interactive) {
          const dx = point.x - m.x;
          const dy = point.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const force = (150 - dist) / 150;
            point.vx += (dx / dist) * force * 0.5;
            point.vy += (dy / dist) * force * 0.5;
          }

          // Damping to return to normal speed
          const currentSpeed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
          if (currentSpeed > speed * 1.5) {
            point.vx *= 0.95;
            point.vy *= 0.95;
          }
        }

        // Draw connections
        for (let j = i + 1; j < pointsRef.current.length; j++) {
          const p2 = pointsRef.current[j];
          const cDx = point.x - p2.x;
          const cDy = point.y - p2.y;
          const cDist = Math.sqrt(cDx * cDx + cDy * cDy);

          if (cDist < 120) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(p2.x, p2.y);
            // Opacity based on distance
            const pOpacity = (1 - cDist / 120) * 0.15;
            ctx.strokeStyle = `rgba(255, 255, 255, ${pOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw Point
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        
        // Convert hex to rgb for rgba
        const rgb = point.color === '#F0A500' ? '240, 165, 0' : '0, 212, 168';
        ctx.fillStyle = `rgba(${rgb}, ${point.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dotCount, speed, interactive]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full block touch-none" 
    />
  );
}
