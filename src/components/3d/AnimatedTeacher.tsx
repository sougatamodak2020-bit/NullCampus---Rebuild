"use client"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Sphere, Cylinder, Float } from "@react-three/drei"
import * as THREE from "three"

export function AnimatedTeacher() {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [waving, setWaving] = useState(false)

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Continuous slow rotation
      if (!hovered) {
        groupRef.current.rotation.y += delta * 0.1
      }
      // Floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
      
      // Wave animation trigger
      if (hovered && !waving) {
        setWaving(true)
        setTimeout(() => setWaving(false), 1000)
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group
        ref={groupRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.6 : 1.5}
      >
        {/* Head */}
        <Sphere args={[0.4, 32, 32]} position={[0, 1.2, 0]}>
          <meshStandardMaterial color="#fdbcb4" roughness={0.5} />
        </Sphere>

        {/* Body */}
        <Box args={[0.7, 0.9, 0.3]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#4a5568" />
        </Box>

        {/* Arms */}
        <group rotation={[0, 0, waving ? Math.sin(Date.now() * 0.01) * 0.5 : 0]}>
          <Cylinder
            args={[0.08, 0.08, 0.6]}
            position={[-0.45, 0.5, 0]}
            rotation={[0, 0, -0.3]}
          >
            <meshStandardMaterial color="#4a5568" />
          </Cylinder>
        </group>
        
        <Cylinder
          args={[0.08, 0.08, 0.6]}
          position={[0.45, 0.5, 0]}
          rotation={[0, 0, 0.3]}
        >
          <meshStandardMaterial color="#4a5568" />
        </Cylinder>

        {/* Legs */}
        <Cylinder
          args={[0.08, 0.08, 0.7]}
          position={[-0.15, -0.2, 0]}
        >
          <meshStandardMaterial color="#2d3748" />
        </Cylinder>
        <Cylinder
          args={[0.08, 0.08, 0.7]}
          position={[0.15, -0.2, 0]}
        >
          <meshStandardMaterial color="#2d3748" />
        </Cylinder>

        {/* Glasses */}
        <Box args={[0.5, 0.08, 0.01]} position={[0, 1.25, 0.22]}>
          <meshStandardMaterial color="#1a202c" />
        </Box>

        {/* Book in hand */}
        <Box args={[0.15, 0.2, 0.02]} position={[0.4, 0.3, 0.2]}>
          <meshStandardMaterial color="#3b82f6" />
        </Box>

        {/* Glow effect when hovered */}
        {hovered && (
          <Sphere args={[1, 32, 32]} position={[0, 0.5, 0]}>
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} />
          </Sphere>
        )}
      </group>
    </Float>
  )
}
