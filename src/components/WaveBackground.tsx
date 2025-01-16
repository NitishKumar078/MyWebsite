import React, { useEffect, useRef } from "react";

interface WeatherProps {
  rainIntensity?: number; // 0 to 1
  cloudDensity?: number; // 0 to 1
  windSpeed?: number; // 0 to 1
}

interface Raindrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

const WaveBackground: React.FC<WeatherProps> = ({
  rainIntensity = 0.5,
  cloudDensity = 0.6,
  windSpeed = 0.3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const raindropsRef = useRef<Raindrop[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const createRaindrop = (x?: number) => {
      return {
        x: x ?? Math.random() * canvas.width,
        y: -10,
        length: 10 + Math.random() * 20,
        speed: (15 + Math.random() * 10) * rainIntensity,
        opacity: 0.3 + Math.random() * 0.5,
      };
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      raindropsRef.current = Array(Math.floor(100 * rainIntensity))
        .fill(null)
        .map(() => createRaindrop());
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const drawRaindrop = (drop: Raindrop) => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(156, 163, 175, ${drop.opacity})`;
      ctx.lineWidth = 1;
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(
        drop.x + Math.sin(time * 0.1) * windSpeed * 2,
        drop.y + drop.length
      );
      ctx.stroke();
    };

    const updateRain = () => {
      raindropsRef.current = raindropsRef.current.filter((drop) => {
        drop.y += drop.speed;
        drop.x += Math.sin(time * 0.1) * windSpeed * 2;
        return drop.y < canvas.height;
      });

      // Add new raindrops based on intensity
      while (raindropsRef.current.length < 100 * rainIntensity) {
        raindropsRef.current.push(createRaindrop());
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw waves
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

      // Update and draw weather effects
      updateRain();

      // Draw rain
      raindropsRef.current.forEach(drawRaindrop);

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
  }, [rainIntensity, cloudDensity, windSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
};

export default WaveBackground;
