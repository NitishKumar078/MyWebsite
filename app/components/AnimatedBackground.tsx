// src/components/AnimatedBackground.tsx

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// Define props with width and height optional
interface AnimatedBackgroundProps {
  width?: number;
  height?: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  width = window.innerWidth,
  height = window.innerHeight,
}) => {
  // Canvas reference has type HTMLCanvasElement or null
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDark, setIsDark] = useState(false);


  useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
    // === Scene & Camera ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 15, 30);
    camera.lookAt(0, 0, 0);

    // === Renderer ===
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current!,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // === Particle System ===
    const gridSize = 50;
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * gridSize;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * gridSize;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: isDark ? "#0E3D34" : 0x08f9f9 ,
      size: 0.2,
      transparent: true,
      opacity: 0.7,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // === Animation Loop ===
    let frameId: number;
    const animate = () => {
      particles.rotation.y -= 0.0002;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // === Handle Resize ===
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // === Cleanup ===
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      scene.clear();
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ top: 0, left: 0 }}
    />
  );
};

export default AnimatedBackground;
