"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { PlayCircle } from "lucide-react"

interface Course3DCardProps {
  title: string
  price: number
  thumbnail?: string
}

export function Course3DCard({ title, price, thumbnail }: Course3DCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        ref={cardRef}
        className="relative w-full max-w-md aspect-[3/4] perspective-1000"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          rotateY: isHovered ? 10 : 0,
          rotateX: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main Card */}
        <div className="relative w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl overflow-hidden">
          {/* Thumbnail/Preview */}
          <div className="absolute inset-0">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover opacity-20"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 opacity-30" />
            )}
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4"
              >
                Premium Course
              </motion.div>
              <h3 className="text-2xl font-bold mb-2 line-clamp-3">{title}</h3>
            </div>

            {/* Play Button */}
            <motion.div
              className="flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-lg">
                <PlayCircle className="w-10 h-10 text-purple-600" />
              </div>
            </motion.div>

            {/* Price Tag */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
              <p className="text-sm opacity-80">Course Price</p>
              <p className="text-3xl font-bold">₹{price.toLocaleString()}</p>
            </div>
          </div>

          {/* Floating Orbs */}
          <motion.div
            className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-32 h-32 bg-pink-300/20 rounded-full blur-xl"
            animate={{
              y: [0, 20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </div>

        {/* Shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-purple-600/30 blur-2xl rounded-full" />
      </motion.div>
    </div>
  )
}