'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { Clock, Users, Star, CheckCircle, PlayCircle, Award, ArrowLeft, Globe, Infinity as InfinityIcon, Smartphone, Download, TrendingUp, ShoppingCart, BookOpen, Video, FileText, MessageCircle } from 'lucide-react'
import { coursesData } from '@/data/courses'
import dynamic from 'next/dynamic'

// Dynamically import Three.js components to avoid SSR issues
const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), { ssr: false })
const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => mod.OrbitControls), { ssr: false })
const Float = dynamic(() => import('@react-three/drei').then(mod => mod.Float), { ssr: false })
const Box = dynamic(() => import('@react-three/drei').then(mod => mod.Box), { ssr: false })
const Sphere = dynamic(() => import('@react-three/drei').then(mod => mod.Sphere), { ssr: false })


// 3D Course Card Component
function AnimatedCourseCard() {
  const meshRef = useRef<any>(null)
  const [hovered, setHovered] = useState(false)

  // Animation frame
  useEffect(() => {
    if (!meshRef.current) return
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01
        meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1
      }
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        {/* Book/Course representation */}
        <Box args={[2, 2.8, 0.3]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#4f46e5" roughness={0.3} metalness={0.5} />
        </Box>

        {/* Pages effect */}
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            args={[1.9, 2.7, 0.02]}
            position={[-0.05 * i, 0, 0.15 + i * 0.01]}
          >
            <meshStandardMaterial color="#ffffff" roughness={0.8} />
          </Box>
        ))}

        {/* Glowing orbs around */}
        <Sphere args={[0.1]} position={[1.5, 1.5, 0.5]}>
          <meshBasicMaterial color="#a855f7" />
        </Sphere>
        <Sphere args={[0.08]} position={[-1.5, -1.5, 0.5]}>
          <meshBasicMaterial color="#3b82f6" />
        </Sphere>
      </group>
    </Float>
  )
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const course = coursesData[slug as keyof typeof coursesData]
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [activeTab, setActiveTab] = useState('curriculum')
  const [show3D, setShow3D] = useState(false)

  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.8])
  const headerScale = useTransform(scrollY, [0, 200], [1, 0.95])

  // Enable 3D after mount
  useEffect(() => {
    setShow3D(true)
  }, [])

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
          <button onClick={() => router.push('/courses')} className="text-primary-500 hover:underline">
            Back to Courses
          </button>
        </div>
      </div>
    )
  }

  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)

  const handleBuyNow = () => {
    setShowBuyModal(true)
  }

  const handleRazorpayPayment = async () => {
    // Check if Razorpay is loaded
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'your_test_key_here',
        amount: course.price * 100, // Amount in paise
        currency: 'INR',
        name: 'NullCampus',
        description: course.title,
        image: '/logo.png',
        handler: function (response: any) {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id)
          setShowBuyModal(false)
          // Here you would typically verify payment on backend and grant access
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#4f46e5'
        }
      }

      const razorpay = new (window as any).Razorpay(options)
      razorpay.open()
    } else {
      alert('Payment system is loading. Please try again.')
    }
  }

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Animated Header */}
      <motion.div
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white"
      >
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
          <button
            onClick={() => router.push('/courses')}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </button>

          <div className="flex items-center gap-3 mb-4">
            {course.trending && (
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/90 backdrop-blur-sm rounded-full text-sm font-bold">
                <TrendingUp className="w-4 h-4" />
                Trending
              </div>
            )}
            {course.featured && (
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/90 backdrop-blur-sm rounded-full text-sm font-bold">
                <Award className="w-4 h-4" />
                Featured
              </div>
            )}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {course.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 mb-6"
          >
            {course.description}
          </motion.p>

          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/40'}`} />
                ))}
              </div>
              <span className="font-bold">{course.rating}</span>
              <span className="text-white/80">({course.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{course.students.toLocaleString()} students</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{course.duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-14 h-14 rounded-full border-2 border-white"
            />
            <div>
              <p className="text-sm text-white/80">Created by</p>
              <p className="font-bold text-lg">{course.instructor.name}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: 3D Course Card + Course Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* 3D Interactive Course Card - Only show if client-side */}
            {show3D && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <BookOpen className="w-7 h-7 text-primary-500" />
                  Interactive Course Preview
                </h2>
                <div className="h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                  <div className="text-center">
                    <PlayCircle className="w-20 h-20 text-primary-500 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Course Preview</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Click play to watch intro</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tabs Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Tab Headers */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                {[
                  { id: 'curriculum', label: 'Curriculum', icon: PlayCircle },
                  { id: 'learn', label: "What You'll Learn", icon: CheckCircle },
                  { id: 'instructor', label: 'Instructor', icon: Users },
                  { id: 'reviews', label: 'Reviews', icon: Star },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-4 font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === tab.id
                        ? 'text-primary-500 border-b-2 border-primary-500 bg-white dark:bg-gray-900'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="hidden md:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'curriculum' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-bold mb-6">Course Curriculum</h3>
                    {course.curriculum.map((section, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-lg font-bold">
                              Section {index + 1}: {section.section}
                            </h4>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="px-3 py-1 bg-blue-500 text-white rounded-full font-semibold">
                                {section.lessons} lessons
                              </span>
                              <span className="text-gray-600 dark:text-gray-400">{section.duration}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {section.topics.map((topic, topicIndex) => (
                              <div
                                key={topicIndex}
                                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 py-2"
                              >
                                <PlayCircle className="w-4 h-4 text-primary-500" />
                                <span>{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'learn' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-2xl font-bold mb-6">What You'll Learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.whatYouLearn.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl"
                        >
                          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'instructor' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-2xl font-bold mb-6">Meet Your Instructor</h3>
                    <div className="flex items-start gap-6">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-32 h-32 rounded-full border-4 border-primary-500 shadow-xl"
                      />
                      <div>
                        <h4 className="text-3xl font-bold mb-2">{course.instructor.name}</h4>
                        <p className="text-primary-500 font-semibold text-lg mb-3">{course.instructor.title}</p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                          {course.instructor.bio}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Students</p>
                            <p className="text-xl font-bold text-blue-600">15k+</p>
                          </div>
                          <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Courses</p>
                            <p className="text-xl font-bold text-purple-600">12</p>
                          </div>
                          <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                            <p className="text-xl font-bold text-green-600">4.8★</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="text-2xl font-bold mb-6">Student Reviews</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((_, index) => (
                        <div key={index} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                          <div className="flex items-center gap-4 mb-3">
                            <img
                              src={`https://i.pravatar.cc/150?img=${index + 10}`}
                              alt="User"
                              className="w-12 h-12 rounded-full"
                            />
                            <div>
                              <p className="font-bold">Student {index + 1}</p>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            Excellent course! The instructor explains everything clearly and the projects are very practical.
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right: Sticky Purchase Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700"
            >
              {/* Course Preview Image */}
              <div className="relative aspect-video mb-6 rounded-2xl overflow-hidden group">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center cursor-pointer"
                  >
                    <PlayCircle className="w-8 h-8 text-primary-500" />
                  </motion.div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ₹{course.price.toLocaleString()}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{course.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                    {discount}% OFF
                  </span>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400 font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Limited time offer ends soon!
                </p>
              </div>

              {/* Buy Button */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg mb-4 shadow-lg flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </motion.button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                💯 30-day money-back guarantee
              </p>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {[
                  { icon: InfinityIcon, text: 'Lifetime access', color: 'text-purple-500' },
                  { icon: Smartphone, text: 'Mobile & TV access', color: 'text-blue-500' },
                  { icon: Award, text: 'Certificate of completion', color: 'text-yellow-500' },
                  { icon: Download, text: `${course.lessons} downloadable resources`, color: 'text-green-500' },
                  { icon: MessageCircle, text: 'Direct instructor support', color: 'text-pink-500' },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    <span className="text-sm font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
                  <Video className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{course.lessons}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Lessons</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
                  <Clock className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{course.duration.split(' ')[0]}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Hours</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
                  <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{(course.students / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Students</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{course.rating}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Rating</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Buy Modal */}
      {showBuyModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowBuyModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-6">Complete Your Purchase</h3>
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400 mb-2">Course: {course.title}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary-500">₹{course.price.toLocaleString()}</span>
                <span className="text-lg text-gray-400 line-through">₹{course.originalPrice.toLocaleString()}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRazorpayPayment}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold text-lg mb-4 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Pay with Razorpay
            </motion.button>

            <button
              onClick={() => setShowBuyModal(false)}
              className="w-full py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
              🔒 Secure payment powered by Razorpay
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}