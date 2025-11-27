"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

interface ScribbleUserData {
  initialPositions: Float32Array;
  offset: number;
}

export default function ScribbleCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const scribbleLineRef = useRef<THREE.Line | null>(null);

  const createSingleScribbleLine = useCallback(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];
    const numPoints = 600; // Increased points for smoother knots

    for (let i = 0; i < numPoints; i++) {
      const t = i / numPoints;

      // 1. HORIZONTAL: Stretch wide (-110 to 110)
      const x = (t - 0.5) * 220; 

      // 2. KNOTS & POSITIONING
      // baseWave: The gentle curve of the string
      const baseWave = Math.sin(t * Math.PI * 4) * 5; 
      
      // knots: High frequency wave to create the loops/tangles
      const knots = Math.sin(t * Math.PI * 45) * 2.5 * Math.cos(t * Math.PI * 10);
      
      // verticalOffset: +35 moves it to the TOP of the screen (0 is center)
      const verticalOffset = 35; 

      const y = baseWave + knots + verticalOffset;

      // 3. DEPTH: Adds 3D volume to the knots
      const z = Math.cos(t * Math.PI * 20) * 4;

      positions.push(x, y, z);

      // Gradient Color
      const color = new THREE.Color(0xffe0b2);
      color.lerp(new THREE.Color(0xff8c00), t);
      colors.push(color.r, color.g, color.b);
    }

    const positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
    geometry.setAttribute("position", positionAttribute);
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      linewidth: 3,
      transparent: true,
      opacity: 0.85,
    });

    const line = new THREE.Line(geometry, material);

    line.userData = {
      initialPositions: positionAttribute.array.slice() as Float32Array,
      offset: Math.random() * Math.PI * 2,
    } as ScribbleUserData;

    return line;
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Use window dimensions since it sits on the body
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    // Z = 120 keeps the line within view but maintains the "long" look
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 120; 
    camera.lookAt(0, 20, 0); // Look slightly up so the perspective is nice
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add Scribble
    const scribble = createSingleScribbleLine();
    scene.add(scribble);
    scribbleLineRef.current = scribble;

    // Animation
    const animate = (time: number) => {
      animationFrameId.current = requestAnimationFrame(() =>
        animate(Date.now() * 0.001)
      );

      if (scribbleLineRef.current) {
        const currentScribble = scribbleLineRef.current;
        const positions = currentScribble.geometry.attributes.position.array as Float32Array;
        const { initialPositions, offset } = currentScribble.userData as ScribbleUserData;
        const speed = 0.3; // Slower, more gentle breathing

        for (let i = 0; i < positions.length; i += 3) {
          // Gentle morphing animation
          positions[i] = initialPositions[i] + Math.sin(time * speed + offset + i * 0.02) * 1.0; 
          positions[i + 1] = initialPositions[i + 1] + Math.cos(time * speed * 0.7 + offset + i * 0.01) * 1.0;
          positions[i + 2] = initialPositions[i + 2] + Math.sin(time * speed * 0.5 + offset + i * 0.03) * 0.5;
        }
        currentScribble.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate(0);

    // Resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      if (scribbleLineRef.current) {
        scribbleLineRef.current.geometry.dispose();
        // @ts-ignore
        scribbleLineRef.current.material.dispose();
      }
      if (sceneRef.current) sceneRef.current.clear();
    };
  }, [createSingleScribbleLine]);

  return (
    <div
      ref={mountRef}
      // Fixed: Ensure it stays at the top of the viewport
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: "hidden" }}
    />
  );
}