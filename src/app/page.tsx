// app/page.tsx - ULTRA OPTIMIZED VERSION
'use client'

import { Suspense } from 'react'
import { HeroSection } from "@/components/layout/HeroSection"
import { FeaturedCourses } from "@/components/course/FeaturedCourses"
import { Stats } from "@/components/layout/Stats"
import { Testimonials } from "@/components/layout/Testimonials"
import { CTASection } from "@/components/layout/CTASection"
import { Loader2 } from "lucide-react"
import dynamic from 'next/dynamic'
import { useMobileDetection } from '@/hooks/useMobileDetection'

// Lazy load 3D components ONLY on desktop with no SSR
const AnimatedTeacherSection = dynamic(
  () => import('@/components/3d/AnimatedTeacherSection'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-96 md:h-[500px] rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }
)

function HomePageContent() {
  const { isMobile, mounted } = useMobileDetection(1024)

  return (
    <>
      <HeroSection />
      
      {/* 3D Animated Teacher Section - ONLY on desktop */}
      {mounted && !isMobile && (
        <section className="relative py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Meet Your AI Teacher
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Interactive 3D learning experience - Hover to interact!
              </p>
            </div>
            
            <Suspense fallback={
              <div className="h-[500px] rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-700" />
            }>
              <AnimatedTeacherSection />
            </Suspense>
          </div>
        </section>
      )}

      {/* Mobile-friendly alternative - NO 3D */}
      {mounted && isMobile && (
        <section className="relative py-12 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI-Powered Learning
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Experience personalized education with our AI assistant
              </p>
            </div>
            
            {/* Lightweight gradient placeholder for mobile - NO CANVAS */}
            <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center shadow-xl">
              <div className="text-center text-white p-6">
                <div className="text-6xl mb-4">🤖</div>
                <p className="text-xl font-bold">Your AI Learning Assistant</p>
                <p className="text-sm mt-2 opacity-90">Available on desktop for full 3D experience</p>
              </div>
            </div>
          </div>
        </section>
      )}
      
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <HomePageContent />
    </Suspense>
  )
}