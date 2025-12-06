// src/components/course/CourseDetail.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, Users, Star, Award, Globe, BookOpen, PlayCircle, Check, 
  ChevronDown, Video, Download, Infinity as InfinityIcon,
  Monitor, Calendar, Languages, Heart, Share2, Trophy,
  ArrowRight, CheckCircle2, ShoppingCart, AlertCircle, FileText,
  MessageCircle, Smartphone, Award as Certificate
} from 'lucide-react'
import Image from 'next/image'
import type { Course } from '@/data/courses'

// ==================== Types ====================
interface CourseDetailProps {
  course: Course
}

// ==================== Sub Components ====================

// Rating Stars Component
const RatingStars = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < Math.floor(rating)
              ? 'text-yellow-400 fill-yellow-400'
              : i < rating
              ? 'text-yellow-400 fill-yellow-400/50'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

// Feature Item Component
const FeatureItem = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
    <Icon className="w-5 h-5 text-gray-500 flex-shrink-0" />
    <span>{text}</span>
  </div>
)

// Learning Point Component
const LearningPoint = ({ text, index }: { text: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="flex items-start gap-3"
  >
    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
    <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{text}</span>
  </motion.div>
)

// Curriculum Section Component
const CurriculumSection = ({ 
  section, 
  index, 
  isExpanded, 
  onToggle 
}: { 
  section: any
  index: number
  isExpanded: boolean
  onToggle: () => void 
}) => (
  <div className="border border-gray-200 dark:border-gray-700">
    <button
      onClick={onToggle}
      className="w-full p-4 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <div className="flex items-center gap-3 text-left">
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
            Section {index + 1}: {section.section}
          </h3>
        </div>
      </div>
      <div className="text-sm text-gray-500">
        {section.lessons} lectures • {section.duration}
      </div>
    </button>
    
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {section.topics.map((topic: string, topicIndex: number) => (
              <div
                key={topicIndex}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <PlayCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{topic}</span>
                <span className="text-xs text-gray-400">05:30</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

// ==================== Main Component ====================
export function CourseDetail({ course }: CourseDetailProps) {
  const [expandedSections, setExpandedSections] = useState<number[]>([0])
  const [isSticky, setIsSticky] = useState(false)
  const [liked, setLiked] = useState(false)

  // Calculate discount percentage
  const discount = Math.round((1 - course.price / course.originalPrice) * 100)
  
  // Total curriculum stats
  const totalLessons = course.curriculum.reduce((acc, section) => acc + section.lessons, 0)
  const totalSections = course.curriculum.length

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Toggle curriculum section
  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  // Expand/Collapse all sections
  const toggleAllSections = () => {
    if (expandedSections.length === course.curriculum.length) {
      setExpandedSections([])
    } else {
      setExpandedSections(course.curriculum.map((_, i) => i))
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* ==================== Hero Section ==================== */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Breadcrumb - FIXED: removed subcategory */}
              <nav className="flex items-center gap-2 text-sm text-gray-400">
                <span className="hover:text-white cursor-pointer">Development</span>
                <span>›</span>
                <span className="hover:text-white cursor-pointer">{course.category}</span>
              </nav>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-300 leading-relaxed">
                {course.fullDescription || course.description}
              </p>

              {/* Badges & Rating */}
              <div className="flex flex-wrap items-center gap-4">
                {course.featured && (
                  <span className="px-2 py-1 bg-yellow-500 text-yellow-900 text-xs font-bold rounded">
                    Bestseller
                  </span>
                )}
                {course.trending && (
                  <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">
                    Hot & New
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-bold">{course.rating}</span>
                  <RatingStars rating={course.rating} />
                  <span className="text-purple-400 underline cursor-pointer">
                    ({course.reviews.toLocaleString()} ratings)
                  </span>
                </div>
                <span className="text-gray-300">
                  {course.students.toLocaleString()} students
                </span>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Created by</span>
                <span className="text-purple-400 hover:underline cursor-pointer">
                  {course.instructor.name}
                </span>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>Last updated {course.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>{course.language}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>English [Auto], Hindi [Auto]</span>
                </div>
              </div>
            </div>

            {/* Right - Preview Card placeholder */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* ==================== Sticky Header ==================== */}
      <AnimatePresence>
        {isSticky && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-40 bg-gray-900 text-white shadow-xl border-b border-gray-800"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="font-bold truncate">{course.title}</h2>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-yellow-400 font-semibold">{course.rating}</span>
                  <RatingStars rating={course.rating} size="sm" />
                  <span className="text-gray-400">({course.reviews.toLocaleString()})</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xl font-bold">₹{course.price.toLocaleString()}</p>
                </div>
                <button className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ==================== Main Content ==================== */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* ===== What You'll Learn ===== */}
            <section className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                What you'll learn
              </h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                {course.whatYouLearn.map((item, i) => (
                  <LearningPoint key={i} text={item} index={i} />
                ))}
              </div>
            </section>

            {/* ===== This course includes ===== */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                This course includes:
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <FeatureItem icon={Video} text={`${course.duration} on-demand video`} />
                <FeatureItem icon={FileText} text="15 articles" />
                <FeatureItem icon={Download} text="25 downloadable resources" />
                <FeatureItem icon={InfinityIcon} text="Full lifetime access" />
                <FeatureItem icon={Smartphone} text="Access on mobile and TV" />
                <FeatureItem icon={Certificate} text="Certificate of completion" />
              </div>
            </section>

            {/* ===== Course Content ===== */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Course content
                </h2>
                <button 
                  onClick={toggleAllSections}
                  className="text-purple-600 hover:text-purple-700 text-sm font-semibold"
                >
                  {expandedSections.length === course.curriculum.length 
                    ? 'Collapse all sections' 
                    : 'Expand all sections'}
                </button>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {totalSections} sections • {totalLessons} lectures • {course.duration} total length
              </p>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                {course.curriculum.map((section, index) => (
                  <CurriculumSection
                    key={index}
                    section={section}
                    index={index}
                    isExpanded={expandedSections.includes(index)}
                    onToggle={() => toggleSection(index)}
                  />
                ))}
              </div>
            </section>

            {/* ===== Requirements ===== */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Requirements
              </h2>
              <ul className="space-y-2">
                {course.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 dark:bg-white rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* ===== Description ===== */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Description
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none text-sm">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {course.fullDescription || course.description}
                </p>
              </div>
            </section>

            {/* ===== Instructor ===== */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Instructor
              </h2>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-600 hover:underline cursor-pointer">
                  {course.instructor.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {course.instructor.title}
                </p>
                
                <div className="flex items-start gap-4">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      <span>4.7 Instructor Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>45,000+ Reviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>200,000+ Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlayCircle className="w-4 h-4" />
                      <span>12 Courses</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {course.instructor.bio}
                </p>
              </div>
            </section>
          </div>

          {/* ==================== Right Sidebar - Purchase Card ==================== */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl overflow-hidden"
              >
                {/* Video Preview */}
                <div className="relative aspect-video bg-gray-900 group cursor-pointer">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-8 h-8 text-gray-900 ml-1" />
                    </div>
                  </div>
                  <p className="absolute bottom-4 left-0 right-0 text-center text-white text-sm font-semibold">
                    Preview this course
                  </p>
                </div>

                {/* Price Section */}
                <div className="p-6 space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ₹{course.price.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{course.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {discount}% off
                    </span>
                  </div>

                  {/* Timer */}
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">2 days left at this price!</span>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded transition-colors">
                      Enroll Now
                    </button>
                    <button className="w-full py-3 border border-gray-900 dark:border-white text-gray-900 dark:text-white font-bold rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      Add to Cart
                    </button>
                  </div>

                  <p className="text-center text-xs text-gray-500">
                    30-Day Money-Back Guarantee
                  </p>

                  {/* Course includes */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      This course includes:
                    </h4>
                    <FeatureItem icon={Video} text={course.duration} />
                    <FeatureItem icon={FileText} text={`${course.lessons} lessons`} />
                    <FeatureItem icon={Download} text="Downloadable resources" />
                    <FeatureItem icon={InfinityIcon} text="Lifetime access" />
                    <FeatureItem icon={Smartphone} text="Mobile access" />
                    <FeatureItem icon={Certificate} text="Certificate" />
                  </div>

                  {/* Share & Gift */}
                  <div className="pt-4 flex items-center justify-center gap-4 text-sm">
                    <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                    <button 
                      onClick={() => setLiked(!liked)}
                      className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                      Wishlist
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Mobile Purchase Bar ==================== */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ₹{course.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹{course.originalPrice.toLocaleString()}
              </span>
            </div>
          </div>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded transition-colors">
            Enroll Now
          </button>
        </div>
      </div>
      
      {/* Bottom spacing for mobile */}
      <div className="h-20 lg:hidden" />
    </div>
  )
}

export default CourseDetail