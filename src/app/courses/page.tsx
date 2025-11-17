'use client'

import { Suspense } from 'react'
import { HeroSection } from "@/components/layout/HeroSection"
import { FeaturedCourses } from "@/components/course/FeaturedCourses"
import { Stats } from "@/components/layout/Stats"
import { Testimonials } from "@/components/layout/Testimonials"
import { CTASection } from "@/components/layout/CTASection"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Sparkles as DreiSparkles } from "@react-three/drei"
import { AnimatedTeacher } from "@/components/3d/AnimatedTeacher"
import { motion, useScroll, useTransform } from "framer-motion"
import { Loader2, Sparkles, Zap } from "lucide-react"

function HomePageContent() {
  const { scrollYProgress } = useScroll()
  const teacherOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])
  const teacherScale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1])

  return (
    <>
      <HeroSection />

      {/* 3D Animated Teacher Section - ENHANCED */}
      <motion.section 
        style={{ opacity: teacherOpacity, scale: teacherScale }}
        className="relative py-32 bg-gradient-to-b from-white via-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%" 
              }}
              animate={{
                y: [null, "-100%"],
                opacity: [0.2, 0, 0.2]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Enhanced heading with floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: 0.2 
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-full border border-purple-300/30 dark:border-purple-500/30 shadow-lg mb-6"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </motion.div>
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI-Powered Interactive Learning
              </span>
              <Zap className="w-4 h-4 text-pink-600 dark:text-pink-400" />
            </motion.div>

            <motion.h2 
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
                Meet Your AI Teacher
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Interactive 3D learning experience - <span className="font-semibold text-purple-600 dark:text-purple-400">Hover to interact!</span>
            </motion.p>
          </motion.div>

          {/* Enhanced 3D Canvas Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Canvas container */}
            <div className="relative h-[450px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
              <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <OrbitControls 
                  enableZoom={false} 
                  autoRotate 
                  autoRotateSpeed={0.5}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 1.5}
                />
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
                <pointLight position={[-10, -10, -5]} intensity={0.6} color="#8b5cf6" />
                <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={1} castShadow />
                
                {/* Animated particles around teacher */}
                <DreiSparkles 
                  count={50}
                  scale={4}
                  size={3}
                  speed={0.3}
                  opacity={0.4}
                  color="#a78bfa"
                />
                
                <AnimatedTeacher />
              </Canvas>

              {/* Floating instruction badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-full shadow-xl border border-gray-200/50 dark:border-gray-700/50"
              >
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  🖱️ <span className="text-purple-600 dark:text-purple-400 font-semibold">Drag to rotate</span> • Hover to wave
                </p>
              </motion.div>
            </div>

            {/* Corner decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-20 animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
          </motion.div>

          {/* Feature highlights below 3D */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: "🎯", title: "Interactive Learning", desc: "Engage with 3D AI assistants" },
              { icon: "⚡", title: "Real-time Feedback", desc: "Get instant responses" },
              { icon: "🚀", title: "Accelerated Growth", desc: "Learn 3x faster" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <FeaturedCourses />
      <Stats />
      <Testimonials />
      <CTASection />
    </>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-12 h-12 mx-auto text-blue-600 dark:text-blue-400" />
          </motion.div>
          <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">
            Loading NullCampus...
          </p>
        </motion.div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  )
}