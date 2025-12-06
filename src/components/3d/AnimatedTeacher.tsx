"use client"
import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { 
  Float, 
  Environment,
  ContactShadows,
  PerspectiveCamera,
  Center,
  MeshReflectorMaterial,
  Sparkles,
  Trail,
  OrbitControls,
  Loader,
  Text
} from "@react-three/drei"
import * as THREE from "three"

// Performance-optimized teacher component
function Teacher() {
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { viewport } = useThree()
  
  // Adaptive detail based on device
  const isMobile = viewport.width < 7
  const detail = isMobile ? 16 : 32
  
  // Blinking system
  const [blink, setBlink] = useState(1)
  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setBlink(0.1)
      setTimeout(() => setBlink(1), 150)
    }, 3000 + Math.random() * 2000)
    return () => clearInterval(blinkTimer)
  }, [])

  // Advanced animation system
  const time = useRef(0)
  useFrame((state, delta) => {
    time.current += delta
    if (!group.current) return
    
    // Smooth breathing motion
    group.current.position.y = Math.sin(time.current * 0.5) * 0.08
    
    // Interactive rotation
    const targetRotation = hovered ? Math.PI * 0.15 : Math.sin(time.current * 0.3) * 0.1
    group.current.rotation.y += (targetRotation - group.current.rotation.y) * 0.05
    
    // Subtle head tilt
    const head = group.current.children[0] as THREE.Group
    if (head) {
      head.rotation.x = Math.sin(time.current * 0.8) * 0.05
      head.rotation.z = Math.cos(time.current * 0.6) * 0.03
    }
  })

  return (
    <group 
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={isMobile ? 0.7 : 1}
    >
      {/* Head with subsurface scattering effect */}
      <group position={[0, 1.5, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.35, detail, detail]} />
          <meshPhysicalMaterial
            color="#ffd7a8"
            roughness={0.6}
            metalness={0.1}
            clearcoat={0.3}
            clearcoatRoughness={0.4}
            transmission={0.02}
            thickness={0.5}
          />
        </mesh>
        
        {/* Eyes with realistic iris */}
        {[-0.12, 0.12].map((x, i) => (
          <group key={i} position={[x, 0.05, 0.3]}>
            {/* Eyeball */}
            <mesh castShadow>
              <sphereGeometry args={[0.06, detail, detail]} />
              <meshPhysicalMaterial color="#ffffff" roughness={0.1} metalness={0.1} />
            </mesh>
            {/* Iris */}
            <mesh position={[0, 0, 0.04]} scale={[1, blink, 1]}>
              <sphereGeometry args={[0.035, detail, detail]} />
              <meshPhysicalMaterial
                color="#4a90e2"
                roughness={0.3}
                metalness={0.8}
                emissive="#2a5a9e"
                emissiveIntensity={0.3}
              />
            </mesh>
            {/* Pupil */}
            <mesh position={[0, 0, 0.06]} scale={[1, blink, 1]}>
              <sphereGeometry args={[0.015, 12, 12]} />
              <meshBasicMaterial color="#000000" />
            </mesh>
            {/* Eye shine */}
            <mesh position={[-0.015, 0.02, 0.065]} scale={[1, blink, 1]}>
              <sphereGeometry args={[0.008, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        ))}
        
        {/* Stylish glasses */}
        <group position={[0, 0.05, 0.25]}>
          {[-0.15, 0.15].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} castShadow>
              <torusGeometry args={[0.09, 0.015, 16, 32]} />
              <meshPhysicalMaterial
                color="#2c2c2c"
                roughness={0.1}
                metalness={0.9}
                transmission={0.1}
                thickness={0.5}
              />
            </mesh>
          ))}
          {/* Bridge */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.012, 0.012, 0.12, 12]} />
            <meshPhysicalMaterial color="#2c2c2c" roughness={0.1} metalness={0.9} />
          </mesh>
        </group>
        
        {/* Nose */}
        <mesh position={[0, -0.02, 0.32]} castShadow>
          <coneGeometry args={[0.04, 0.08, 12]} />
          <meshPhysicalMaterial color="#ffc896" roughness={0.7} />
        </mesh>
        
        {/* Smile */}
        <mesh position={[0, -0.12, 0.28]} rotation={[Math.PI * 0.1, 0, 0]}>
          <torusGeometry args={[0.1, 0.015, 12, 32, Math.PI]} />
          <meshStandardMaterial color="#d4756a" roughness={0.6} />
        </mesh>
        
        {/* Hair - styled professionally */}
        <group position={[0, 0.25, 0]}>
          {Array.from({length: 12}).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2
            const radius = 0.36
            return (
              <mesh
                key={i}
                position={[
                  Math.sin(angle) * radius,
                  Math.cos(i * 0.5) * 0.08,
                  Math.cos(angle) * radius
                ]}
                rotation={[angle * 0.3, angle, 0]}
                castShadow
              >
                <sphereGeometry args={[0.08, 12, 12]} />
                <meshPhysicalMaterial
                  color="#3d2817"
                  roughness={0.8}
                  metalness={0.1}
                />
              </mesh>
            )
          })}
        </group>
        
        {/* Graduation cap */}
        <group position={[0, 0.38, 0]} rotation={[0, Math.PI * 0.25, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.5, 0.03, 0.5]} />
            <meshPhysicalMaterial color="#1a1a1a" roughness={0.3} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.08, 0]} castShadow>
            <cylinderGeometry args={[0.28, 0.32, 0.15, 4]} />
            <meshPhysicalMaterial color="#1a1a1a" roughness={0.3} metalness={0.6} />
          </mesh>
          {/* Tassel */}
          <Trail width={0.5} length={6} color="#ffd700" attenuation={(t) => t * t}>
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
              <mesh position={[0.22, 0, 0]}>
                <sphereGeometry args={[0.03, 12, 12]} />
                <meshPhysicalMaterial
                  color="#ffd700"
                  roughness={0.3}
                  metalness={0.8}
                  emissive="#ffd700"
                  emissiveIntensity={0.5}
                />
              </mesh>
            </Float>
          </Trail>
        </group>
      </group>

      {/* Torso - professional attire */}
      <group position={[0, 0.75, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.32, 0.38, 0.9, 32]} />
          <meshPhysicalMaterial
            color="#2c5aa0"
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
        
        {/* Collar */}
        <mesh position={[0, 0.42, 0.15]} castShadow>
          <boxGeometry args={[0.35, 0.08, 0.02]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        
        {/* Tie with pattern */}
        <group position={[0, 0.2, 0.32]}>
          <mesh castShadow>
            <boxGeometry args={[0.1, 0.5, 0.02]} />
            <meshPhysicalMaterial
              color="#8b0000"
              roughness={0.5}
              metalness={0.3}
            />
          </mesh>
          {Array.from({length: 5}).map((_, i) => (
            <mesh key={i} position={[0, 0.2 - i * 0.1, 0.015]}>
              <sphereGeometry args={[0.015, 8, 8]} />
              <meshBasicMaterial color="#ffd700" />
            </mesh>
          ))}
        </group>
        
        {/* Belt */}
        <mesh position={[0, -0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.38, 0.03, 16, 32]} />
          <meshPhysicalMaterial color="#4a2511" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* Arms with detailed hands */}
      {[-1, 1].map((side, idx) => (
        <group key={idx} position={[side * 0.45, 0.9, 0]}>
          {/* Upper arm */}
          <mesh castShadow rotation={[0, 0, side * 0.3]}>
            <cylinderGeometry args={[0.1, 0.09, 0.45, 16]} />
            <meshPhysicalMaterial color="#2c5aa0" roughness={0.6} />
          </mesh>
          {/* Forearm */}
          <mesh position={[side * 0.05, -0.4, 0]} rotation={[0, 0, side * 0.2]} castShadow>
            <cylinderGeometry args={[0.09, 0.08, 0.4, 16]} />
            <meshPhysicalMaterial color="#2c5aa0" roughness={0.6} />
          </mesh>
          {/* Hand */}
          <mesh position={[side * 0.08, -0.7, 0]} castShadow>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshPhysicalMaterial color="#ffd7a8" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Legs */}
      {[-0.15, 0.15].map((x, idx) => (
        <group key={idx} position={[x, 0.15, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.12, 0.11, 0.7, 16]} />
            <meshPhysicalMaterial color="#1a1a1a" roughness={0.7} />
          </mesh>
          {/* Shoes */}
          <mesh position={[0, -0.4, 0.08]} castShadow>
            <boxGeometry args={[0.15, 0.08, 0.25]} />
            <meshPhysicalMaterial
              color="#0a0a0a"
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </group>
      ))}

      {/* Floating book */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh position={[0.7, 1.2, 0.3]} castShadow>
          <boxGeometry args={[0.15, 0.22, 0.03]} />
          <meshPhysicalMaterial
            color="#8b0000"
            roughness={0.3}
            metalness={0.1}
            emissive="#ff4444"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* Energy particles when hovered */}
      {hovered && (
        <>
          <Sparkles
            count={isMobile ? 30 : 60}
            scale={3}
            size={1.5}
            speed={0.3}
            color="#4a90e2"
          />
          
          {/* Floating text symbols using Text component */}
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Text
              position={[-0.9, 1.8, 0]}
              fontSize={0.2}
              color="#4a90e2"
              anchorX="center"
              anchorY="middle"
            >
              ABC
            </Text>
          </Float>
          
          <Float speed={1.8} rotationIntensity={1} floatIntensity={2}>
            <Text
              position={[0.8, 1.6, 0]}
              fontSize={0.15}
              color="#ffd700"
              anchorX="center"
              anchorY="middle"
            >
              123
            </Text>
          </Float>
          
          <Float speed={1.6} rotationIntensity={1} floatIntensity={2}>
            <Text
              position={[-0.7, 1.2, 0]}
              fontSize={0.12}
              color="#10b981"
              anchorX="center"
              anchorY="middle"
            >
              E=mc²
            </Text>
          </Float>
        </>
      )}
    </group>
  )
}

// Scene setup with optimizations
function Scene() {
  const { viewport } = useThree()
  const isMobile = viewport.width < 7

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.5, 4]} fov={50} />
      
      {/* Interactive camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        target={[0, 1, 0]}
      />
      
      {/* Optimized lighting */}
      <ambientLight intensity={0.4} />
      <spotLight
        position={[5, 8, 5]}
        angle={0.3}
        penumbra={0.5}
        intensity={1.5}
        castShadow={!isMobile}
        shadow-mapSize={isMobile ? 512 : 1024}
      />
      <pointLight position={[-3, 2, -3]} intensity={0.5} color="#4a90e2" />
      <pointLight position={[3, 2, -3]} intensity={0.5} color="#ffd700" />
      
      {/* HDR environment for realistic reflections */}
      <Environment preset={isMobile ? "warehouse" : "city"} />
      
      {/* Teacher */}
      <Center>
        <Teacher />
      </Center>
      
      {/* Ground with reflection */}
      <group>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={isMobile ? 512 : 1024}
            mixBlur={1}
            mixStrength={isMobile ? 0.3 : 0.5}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#1a1a1a"
            metalness={0.5}
            mirror={0}
          />
        </mesh>
      </group>
      
      {/* Contact shadows for depth */}
      <group>
        <ContactShadows
          position={[0, -0.49, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={4}
        />
      </group>
    </>
  )
}

// Loading fallback
function LoadingFallback() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4a90e2" wireframe />
      </mesh>
    </group>
  )
}

// Main component with Canvas - SELF-CONTAINED
export function AnimatedTeacher() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, #0f172a, #1e293b)', position: 'relative' }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene />
        </Suspense>
      </Canvas>
      <Loader />
      
      {/* Instructions overlay - OUTSIDE Canvas */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.7)',
        padding: '15px 30px',
        borderRadius: '12px',
        color: 'white',
        fontFamily: 'system-ui',
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        🖱️ Drag to rotate • Scroll to zoom • Hover for magic ✨
      </div>
    </div>
  )
}