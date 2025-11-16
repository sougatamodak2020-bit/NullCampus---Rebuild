"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlayCircle, Lock, CheckCircle, Clock, FileText } from "lucide-react"

interface Lesson {
  title: string
  duration: string
  type: "video" | "quiz" | "assignment" | "reading"
  is_free?: boolean
}

interface Module {
  title: string
  description?: string
  lessons: Lesson[]
  duration?: string
}

interface CurriculumTabsProps {
  modules: Module[]
}

export function CurriculumTabs({ modules }: CurriculumTabsProps) {
  const [expandedModule, setExpandedModule] = useState<number | null>(0)

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircle className="w-4 h-4" />
      case "quiz":
        return <CheckCircle className="w-4 h-4" />
      case "assignment":
        return <FileText className="w-4 h-4" />
      case "reading":
        return <FileText className="w-4 h-4" />
      default:
        return <PlayCircle className="w-4 h-4" />
    }
  }

  const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const totalDuration = modules.reduce((acc, module) => {
    const moduleDuration = module.lessons.reduce((sum, lesson) => {
      const minutes = parseInt(lesson.duration) || 0
      return sum + minutes
    }, 0)
    return acc + moduleDuration
  }, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <FileText className="w-8 h-8 text-blue-600" />
          Course Curriculum
        </h2>
        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-2">
            <PlayCircle className="w-4 h-4" />
            {totalLessons} Lessons
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
          </span>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-4">
        {modules.map((module, moduleIndex) => (
          <motion.div
            key={moduleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: moduleIndex * 0.1 }}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            {/* Module Header */}
            <button
              onClick={() =>
                setExpandedModule(expandedModule === moduleIndex ? null : moduleIndex)
              }
              className="w-full p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                      Module {moduleIndex + 1}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {module.lessons.length} lessons
                    </span>
                    {module.duration && (
                      <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {module.duration}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {module.title}
                  </h3>
                  {module.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {module.description}
                    </p>
                  )}
                </div>
                <motion.div
                  animate={{ rotate: expandedModule === moduleIndex ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </div>
            </button>

            {/* Lessons */}
            <AnimatePresence>
              {expandedModule === moduleIndex && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-white dark:bg-gray-800 space-y-3">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <motion.div
                        key={lessonIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: lessonIndex * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                            {getLessonIcon(lesson.type)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                {lesson.type}
                              </span>
                              {lesson.is_free && (
                                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-600 rounded-full font-semibold">
                                  Free Preview
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {lesson.duration}
                          </span>
                          {!lesson.is_free && (
                            <Lock className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}