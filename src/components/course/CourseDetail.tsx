"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Course3DCard } from "@/components/3d/Course3DCard"
import { TutorAvatar } from "@/components/course/TutorAvatar"
import { CurriculumTabs } from "@/components/course/CurriculumTabs"
import { RazorpayButton } from "@/components/payment/RazorpayButton"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { Clock, Users, Star, Award, Globe, PlayCircle } from "lucide-react"
import toast from "react-hot-toast"

// Define the Course interface
interface CourseModule {
  id: string
  title: string
  lessons: any[] // Define lesson structure based on your data
}

interface CourseTutor {
  id: string
  name: string
  avatar: string
  title: string
  bio: string
  // Add other tutor properties as needed
}

interface Course {
  id: string
  slug: string
  title: string
  description: string
  thumbnail: string
  price: number
  duration: string
  enrolled_count: number
  rating: number
  level: "Beginner" | "Intermediate" | "Advanced"
  tags: string[]
  tutor: CourseTutor
  modules: CourseModule[]
  // Add any other properties your course has
}

interface CourseDetailProps {
  course: Course
}

export function CourseDetail({ course }: CourseDetailProps) {
  const [enrolled, setEnrolled] = useState(false)
  const { user } = useAuthStore()
  const router = useRouter()

  const handleEnroll = () => {
    if (!user) {
      toast.error("Please sign in to enroll")
      router.push(`/auth/signin?redirect=/courses/${course.slug}`)
      return
    }
    // Handle enrollment logic
  }

  // Calculate discount percentage (optional enhancement)
  const originalPrice = course.price * 2
  const discountPercentage = Math.round(((originalPrice - course.price) / originalPrice) * 100)

  return (
    <div className="min-h-screen pt-24 pb-10">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* 3D Course Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-8"
          >
            <Course3DCard
              title={course.title}
              price={course.price}
              thumbnail={course.thumbnail}
            />
          </motion.div>

          {/* Course Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Title & Description */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  course.level === "Beginner" ? "bg-green-100 text-green-600" :
                  course.level === "Intermediate" ? "bg-blue-100 text-blue-600" :
                  "bg-purple-100 text-purple-600"
                }`}>
                  {course.level}
                </span>
                <span className="text-sm text-gray-500">{course.tags.join(" • ")}</span>
              </div>
              
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {course.title}
              </h1>
              
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {course.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-md"
              >
                <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold">{course.duration}</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-md"
              >
                <Users className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="text-sm text-gray-500">Students</p>
                <p className="font-semibold">{course.enrolled_count.toLocaleString()}</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-md"
              >
                <Star className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                <p className="text-sm text-gray-500">Rating</p>
                <p className="font-semibold">{course.rating}/5.0</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-md"
              >
                <Award className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <p className="text-sm text-gray-500">Certificate</p>
                <p className="font-semibold">Yes</p>
              </motion.div>
            </div>

            {/* Price & Enroll */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Course Price</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-green-600">₹{course.price.toLocaleString()}</p>
                    <p className="text-lg text-gray-400 line-through">₹{originalPrice.toLocaleString()}</p>
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                      {discountPercentage}% OFF
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">30-Day</p>
                  <p className="text-sm font-semibold">Money Back Guarantee</p>
                </div>
              </div>
              
              {enrolled ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg flex items-center justify-center space-x-2"
                >
                  <PlayCircle size={24} />
                  <span>Continue Learning</span>
                </motion.button>
              ) : user ? (
                <RazorpayButton
                  amount={course.price}
                  courseId={course.id}
                  courseName={course.title}
                  onSuccess={() => setEnrolled(true)}
                />
              ) : (
                <motion.button
                  onClick={handleEnroll}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg"
                >
                  Enroll Now
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Tutor Section */}
        <TutorAvatar tutor={course.tutor} />

        {/* Curriculum */}
        <CurriculumTabs modules={course.modules} />
      </div>
    </div>
  )
}