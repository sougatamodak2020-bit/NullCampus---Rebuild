"use client"

import { motion } from "framer-motion"
import { Star, Award, Users, BookOpen } from "lucide-react"

interface Tutor {
  name: string
  avatar?: string
  title?: string
  bio?: string
  rating?: number
  students?: number
  courses?: number
}

interface TutorAvatarProps {
  tutor: Tutor
}

export function TutorAvatar({ tutor }: TutorAvatarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12"
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Award className="w-7 h-7 text-purple-600" />
        Meet Your Instructor
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex-shrink-0"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 blur-xl" />
            <img
              src={tutor.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name)}&size=200&background=random`}
              alt={tutor.name}
              className="relative w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-xl"
            />
          </div>
        </motion.div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">{tutor.name}</h3>
          {tutor.title && (
            <p className="text-purple-600 dark:text-purple-400 font-semibold mb-3">
              {tutor.title}
            </p>
          )}
          
          {tutor.bio && (
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {tutor.bio}
            </p>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tutor.rating && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4"
              >
                <Star className="w-6 h-6 text-yellow-500 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {tutor.rating} ★
                </p>
              </motion.div>
            )}

            {tutor.students && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4"
              >
                <Users className="w-6 h-6 text-blue-500 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {tutor.students >= 1000 
                    ? `${(tutor.students / 1000).toFixed(1)}k+` 
                    : tutor.students}
                </p>
              </motion.div>
            )}

            {tutor.courses && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4"
              >
                <BookOpen className="w-6 h-6 text-purple-500 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Courses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {tutor.courses}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}