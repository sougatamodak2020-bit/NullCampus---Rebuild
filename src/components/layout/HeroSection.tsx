"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sparkles, Float } from "@react-three/drei"
import { motion } from "framer-motion"
import Link from "next/link"
import { AnimatedTeacher } from "@/components/3d/AnimatedTeacher"

export function HeroSection() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedTeacher />
          <Sparkles
            count={100}
            scale={10}
            size={2}
            speed={0.5}
            color="#8b5cf6"
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-900" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Master Skills at{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NullCampus
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Learn from industry experts with immersive 3D experiences and interactive courses
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <Link href="/services">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-lg font-semibold shadow-xl relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get Started</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>

          <Link href="/courses">
            <motion.button
              className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-blue-600 text-blue-600 rounded-full text-lg font-semibold shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Courses
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <div className="text-center">
            <motion.div
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileInView={{
                scale: [1, 1.2, 1],
                transition: { duration: 0.5 },
              }}
            >
              10k+
            </motion.div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active Students</p>
          </div>
          <div className="text-center">
            <motion.div
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              whileInView={{
                scale: [1, 1.2, 1],
                transition: { duration: 0.5, delay: 0.1 },
              }}
            >
              100+
            </motion.div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Expert Tutors</p>
          </div>
          <div className="text-center">
            <motion.div
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
              whileInView={{
                scale: [1, 1.2, 1],
                transition: { duration: 0.5, delay: 0.2 },
              }}
            >
              4.9★
            </motion.div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Average Rating</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
