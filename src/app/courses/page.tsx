// app/courses/page.tsx
'use client'

import React, { Suspense, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, MeshDistortMaterial, Float, Stars, Points, PointMaterial, Sparkles, MeshTransmissionMaterial, Environment } from "@react-three/drei"
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion"
import { Sparkles as SparklesIcon, Zap, BookOpen, Clock, Users, Star, ArrowRight, Grid3x3, List, Search, Trophy, Gem, Crown, Rocket, Heart } from "lucide-react"
import * as THREE from 'three'
import Link from 'next/link'
import Image from 'next/image'

// Import course data from centralized file
import { coursesData, Course } from '@/data/courses'

// Import course icons
import { Code, Brain, Palette, Shield, Database, Globe } from "lucide-react"

// ==================== Icon Mapping ====================
const categoryIcons: Record<string, any> = {
  'Development': Code,
  'Design': Palette,
  'Data Science': Database,
  'Artificial Intelligence': Brain,
  'Blockchain': Shield,
  'Cloud Computing': Globe,
}

const categoryColors: Record<string, string> = {
  'Development': 'from-blue-600 via-cyan-500 to-blue-600',
  'Design': 'from-pink-600 via-rose-500 to-pink-600',
  'Data Science': 'from-orange-600 via-amber-500 to-orange-600',
  'Artificial Intelligence': 'from-purple-600 via-pink-500 to-purple-600',
  'Blockchain': 'from-emerald-600 via-green-500 to-emerald-600',
  'Cloud Computing': 'from-indigo-600 via-blue-500 to-indigo-600',
}

const categoryBgColors: Record<string, string> = {
  'Development': 'bg-blue-500/10',
  'Design': 'bg-pink-500/10',
  'Data Science': 'bg-orange-500/10',
  'Artificial Intelligence': 'bg-purple-500/10',
  'Blockchain': 'bg-emerald-500/10',
  'Cloud Computing': 'bg-indigo-500/10',
}

// ==================== 3D Components ====================

function PremiumBackground() {
  const groupRef = useRef<THREE.Group>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const boxRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.1
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.15
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
    if (boxRef.current) {
      boxRef.current.rotation.y = -state.clock.elapsedTime * 0.08
      boxRef.current.rotation.x = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={sphereRef} position={[4, 2, -8]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={5}
            thickness={2}
            chromaticAberration={0.5}
            anisotropicBlur={0.1}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.2}
            color="#8b5cf6"
            transmission={0.9}
            roughness={0.05}
            ior={1.5}
          />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={torusRef} position={[-3, -1, -6]}>
          <torusGeometry args={[2, 0.6, 16, 100]} />
          <MeshDistortMaterial
            color="#ec4899"
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={0.9}
            emissive="#ec4899"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={boxRef} position={[0, 3, -10]}>
          <boxGeometry args={[2, 2, 2]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={5}
            thickness={2}
            chromaticAberration={0.3}
            color="#06b6d4"
            transmission={0.95}
            roughness={0.1}
            ior={2.4}
            distortion={0.3}
          />
        </mesh>
      </Float>
      
      <Sparkles count={100} scale={20} size={2} speed={0.4} opacity={0.3} color="#a78bfa" />
    </group>
  )
}

function AnimatedParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 500
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [count])
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })
  
  return (
    <Points ref={particlesRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// ==================== Premium Course Card ====================

function PremiumCourseCard({ course, index, viewMode }: { course: Course, index: number, viewMode: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]))
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]))
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  // Get icon and colors based on category
  const Icon = categoryIcons[course.category] || Code
  const color = categoryColors[course.category] || 'from-purple-600 via-pink-500 to-purple-600'
  const bgColor = categoryBgColors[course.category] || 'bg-purple-500/10'

  // Calculate discount
  const discount = Math.round((1 - course.price / course.originalPrice) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.15, 
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
      style={{
        rotateX: viewMode === 'grid' ? rotateX : 0,
        rotateY: viewMode === 'grid' ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className="relative group cursor-pointer"
    >
      {/* Premium Glow Effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.15 : 0.95,
        }}
        transition={{ duration: 0.4 }}
        className={`absolute -inset-4 bg-gradient-to-r ${color} rounded-[2rem] blur-3xl`}
      />
      
      {/* Card Container */}
      <motion.div 
        className="relative bg-white/95 dark:bg-gray-900/95 rounded-[2rem] overflow-hidden border border-white/50 dark:border-gray-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-2xl"
        whileHover={{ y: -15, scale: 1.02 }}
        transition={{ duration: 0.4, type: "spring" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 z-40 flex justify-between items-start">
          <div className="flex gap-2">
            {course.trending && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                className="bg-gradient-to-r from-red-500/90 to-orange-500/90 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/30 shadow-lg flex items-center gap-1"
              >
                <Rocket className="w-3 h-3 text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Trending</span>
              </motion.div>
            )}
            {course.featured && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                className="bg-gradient-to-r from-yellow-500/90 to-amber-500/90 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/30 shadow-lg flex items-center gap-1"
              >
                <Trophy className="w-3 h-3 text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Featured</span>
              </motion.div>
            )}
            
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
              className={`${bgColor} backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/30 shadow-lg`}
            >
              <span className={`text-xs font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent uppercase tracking-wider`}>
                {course.level}
              </span>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
          >
            <Zap className="w-3 h-3" />
            {discount}% OFF
          </motion.div>
        </div>

        {/* Image Hero */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Floating Icon */}
          <motion.div 
            className="absolute bottom-6 right-6 z-20"
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? [1, 1.3, 1.1] : 1,
              y: isHovered ? [-5, -15, -10] : 0,
            }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className={`relative w-20 h-20 bg-gradient-to-br ${color} backdrop-blur-xl rounded-2xl flex items-center justify-center border-4 border-white/40 shadow-2xl`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          
          {/* Heart Icon */}
          <motion.button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsLiked(!isLiked)
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg"
          >
            <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Category & Certificate */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {course.category}
              </span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-full">
              <Trophy className="w-3 h-3 text-yellow-600" />
              <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-500">Certificate</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-black text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 transition-colors">
            {course.title}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500/30">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {course.instructor.name}
              </p>
              <p className="text-xs text-gray-500">{course.instructor.title}</p>
            </div>
          </div>

          {/* Features Pills */}
          <div className="flex flex-wrap gap-2">
            {course.features.slice(0, 3).map((feature: string, i: number) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.6 + i * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300 shadow-md"
              >
                {feature.length > 20 ? feature.substring(0, 20) + '...' : feature}
              </motion.span>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-center p-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl"
            >
              <Clock className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{course.duration}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-center p-2 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl"
            >
              <Users className="w-4 h-4 text-green-600 mx-auto mb-1" />
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{course.students.toLocaleString()}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-center p-2 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl"
            >
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mx-auto mb-1" />
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{course.rating}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-center p-2 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl"
            >
              <BookOpen className="w-4 h-4 text-purple-600 mx-auto mb-1" />
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{course.lessons}</p>
            </motion.div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-end justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-xs text-gray-500 line-through">₹{course.originalPrice.toLocaleString()}</p>
              <motion.div 
                className="flex items-baseline gap-2"
                animate={{
                  scale: isHovered ? [1, 1.1, 1.05] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ₹{course.price.toLocaleString()}
                </span>
              </motion.div>
            </div>
            
            <Link href={`/courses/${course.slug}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 py-3 bg-gradient-to-r ${color} text-white rounded-xl font-bold text-sm shadow-xl overflow-hidden`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </span>
                
                {/* Premium Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: isHovered ? ["-100%", "200%"] : "-100%",
                  }}
                  transition={{ duration: 0.8 }}
                />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ==================== Main Courses Page ====================

export default function CoursesPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  // Convert coursesData object to array
  const allCourses = Object.values(coursesData)
  
  // Get unique categories
  const categories = ["All", ...new Set(allCourses.map(course => course.category))]
  
  // Filter courses
  const filteredCourses = allCourses.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ultra Premium 3D Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50/50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900" />
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault />
              <ambientLight intensity={0.3} />
              <directionalLight position={[10, 10, 10]} intensity={0.5} />
              <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
              <PremiumBackground />
              <AnimatedParticles />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.1} enablePan={false} />
              <Environment preset="sunset" blur={0.8} />
            </Suspense>
          </Canvas>
        </div>
      </motion.div>

      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Ultra Premium Header */}
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
            className="text-center mb-20"
          >
            {/* Animated Crown Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -360 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-2xl rounded-full border-2 border-purple-400/30 shadow-[0_20px_50px_rgba(139,92,246,0.3)]"
              >
                <Crown className="w-6 h-6 text-yellow-500" />
                <span className="text-lg font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-widest">
                  Premium Learning Experience
                </span>
                <Gem className="w-6 h-6 text-cyan-500" />
              </motion.div>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1, type: "spring" }}
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "300% 300%",
                  backgroundImage: "linear-gradient(120deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #10b981, #3b82f6)",
                }}
                className="bg-clip-text text-transparent inline-block pb-2"
              >
                Elite Courses
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
            >
              Transform your career with industry-leading courses from top experts
            </motion.p>

            {/* Premium Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="max-w-3xl mx-auto mb-10"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative flex items-center">
                  <Search className="absolute left-6 w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses, instructors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-2xl border-2 border-white/50 dark:border-gray-700/50 shadow-2xl text-lg focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-xl"
                  >
                    Search
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              {categories.map((category, i) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.9 + i * 0.05, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_10px_30px_rgba(139,92,246,0.4)]'
                      : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl text-gray-700 dark:text-gray-300 border border-gray-200/50 hover:border-purple-400/50'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>

            {/* View Mode Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="flex justify-center gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                    : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur text-gray-600'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                    : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Results Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 dark:text-gray-400 mb-8"
          >
            Showing {filteredCourses.length} of {allCourses.length} courses
          </motion.p>

          {/* Premium Course Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + viewMode + searchQuery}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className={`grid ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 max-w-4xl mx-auto'
              } gap-8`}
            >
              {filteredCourses.map((course, index) => (
                <PremiumCourseCard 
                  key={course.id} 
                  course={course} 
                  index={index} 
                  viewMode={viewMode} 
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-gray-500 dark:text-gray-400 mb-4">
                No courses found matching your criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                }}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}