"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import type { Mesh } from "three";
import { usePointer } from "./PointerProvider";

type ShapeProps = {
  position: [number, number, number];
  color: string;
  geometry: "icosahedron" | "torus" | "octahedron";
  scale: number;
  speed: number;
  depth: number;
};

function WireShape({
  position,
  color,
  geometry,
  scale,
  speed,
  depth,
}: ShapeProps) {
  const ref = useRef<Mesh>(null);
  const { nx, ny } = usePointer();

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * speed * 0.4;
    ref.current.rotation.y += delta * speed * 0.55;
    ref.current.position.x = position[0] + nx * depth;
    ref.current.position.y = position[1] + ny * depth * 0.7;
  });

  const geo =
    geometry === "torus" ? (
      <torusGeometry args={[scale * 0.55, scale * 0.12, 8, 20]} />
    ) : geometry === "octahedron" ? (
      <octahedronGeometry args={[scale, 0]} />
    ) : (
      <icosahedronGeometry args={[scale, 0]} />
    );

  return (
    <mesh ref={ref} position={position}>
      {geo}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
    </mesh>
  );
}

const shapes: ShapeProps[] = [
  {
    position: [-3.8, 2.2, -1],
    color: "#9b8ae6",
    geometry: "icosahedron",
    scale: 0.55,
    speed: 0.5,
    depth: 0.8,
  },
  {
    position: [3.5, 1.4, -2],
    color: "#ef6bae",
    geometry: "torus",
    scale: 0.7,
    speed: 0.35,
    depth: 1.1,
  },
  {
    position: [-2.8, -2.1, -1.5],
    color: "#efc94e",
    geometry: "octahedron",
    scale: 0.5,
    speed: 0.45,
    depth: 0.6,
  },
  {
    position: [3.2, -1.8, -2.5],
    color: "#6f93cf",
    geometry: "icosahedron",
    scale: 0.45,
    speed: 0.55,
    depth: 0.9,
  },
];

export default function FloatingShapes3D() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        {shapes.map((s) => (
          <WireShape key={s.position.join(",")} {...s} />
        ))}
      </Canvas>
    </div>
  );
}
