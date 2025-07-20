"use client";
import { useEffect, useRef, useState } from "react";

const WaveBackground = () => {
  const [isDark, setIsDark] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.attributeName === "class")) {
        setIsDark(document.documentElement.classList.contains("dark"));
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const drawSun = () => {
      const centerX = canvas.width * 0.85;
      const centerY = canvas.height * 0.2;
      const radius = 40;

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.5,
        centerX,
        centerY,
        radius * 2
      );
      gradient.addColorStop(0, "rgba(255, 170, 0, 0.8)");
      gradient.addColorStop(0.5, "rgba(255, 170, 0, 0.2)");
      gradient.addColorStop(1, "rgba(255, 170, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#FFD700";
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#FFD700";
      ctx.lineWidth = 3;
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        const x1 = centerX + Math.cos(angle) * (radius * 1.5);
        const y1 = centerY + Math.sin(angle) * (radius * 1.5);
        const x2 = centerX + Math.cos(angle) * (radius * 2);
        const y2 = centerY + Math.sin(angle) * (radius * 2);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    };

    const drawMoon = () => {
      const centerX = canvas.width * 0.85;
      const centerY = canvas.height * 0.2;
      const radius = 40;

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.5,
        centerX,
        centerY,
        radius * 2
      );
      gradient.addColorStop(0, "rgba(200, 200, 255, 0.4)");
      gradient.addColorStop(0.5, "rgba(200, 200, 255, 0.1)");
      gradient.addColorStop(1, "rgba(200, 200, 255, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#E6E6FA";
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#D3D3D3";
      const craters = [
        { x: -15, y: -10, r: 8 },
        { x: 10, y: 5, r: 6 },
        { x: -5, y: 15, r: 5 },
      ];

      craters.forEach((crater) => {
        ctx.beginPath();
        ctx.arc(
          centerX + crater.x,
          centerY + crater.y,
          crater.r,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "rgba(37, 99, 235, 0.1)");
      gradient.addColorStop(0.5, "rgba(56, 189, 248, 0.1)");
      gradient.addColorStop(1, "rgba(30, 41, 59, 0.1)");

      ctx.fillStyle = gradient;

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        const amplitude = 50 * (1 + i * 0.5);
        const frequency = 0.005 * (1 + i * 0.2);
        const speed = 0.001 * (1 + i * 0.3);
        const mouseInfluence = 30 * mouseRef.current.x;

        for (let x = 0; x <= canvas.width; x += 5) {
          const dx = x / canvas.width;
          const y =
            canvas.height * 0.5 +
            amplitude * Math.sin(dx * frequency * canvas.width + time * speed) +
            mouseInfluence * Math.sin(dx * 3);

          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();
      }

      if (isDark) {
        drawMoon();
      } else {
        drawSun();
      }

      time += 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ top: 0, left: 0 }}
    />
  );
};

export default WaveBackground;
