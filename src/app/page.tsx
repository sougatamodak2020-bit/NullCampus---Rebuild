// app/page.tsx - With Navigation Fixed
'use client'

import { Suspense } from 'react'
import { HeroSection } from "@/components/layout/HeroSection"
import { FeaturedCourses } from "@/components/course/FeaturedCourses"
import { Stats } from "@/components/layout/Stats"
import { Testimonials } from "@/components/layout/Testimonials"
import { CTASection } from "@/components/layout/CTASection"
import { AnimatedTeacher } from "@/components/3d/AnimatedTeacher"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

function HomePageContent() {
  // Smooth scroll function
  const scrollToFeaturedCourses = () => {
    const element = document.getElementById('featured-courses')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <HeroSection onStartLearning={scrollToFeaturedCourses} />
      
      {/* 3D Animated Teacher Section */}
      <section className="relative py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Meet Your AI Teacher
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Interactive 3D learning experience - Hover to interact!
            </p>
          </motion.div>
          
          <div className="h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
            <AnimatedTeacher />
          </div>
        </div>
      </section>
      
      {/* Add ID for scroll target */}
      <div id="featured-courses">
        <FeaturedCourses />
      </div>
      
      <Stats />
      <Testimonials />
      <CTASection />
    </>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <HomePageContent />
    </Suspense>
  )
}