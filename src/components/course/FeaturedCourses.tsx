'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const courses = [
  {
    id: 1,
    title: 'Advanced React Development',
    instructor: 'John Doe',
    price: 89.99,
    image: '🚀',
    level: 'Advanced',
    students: 1234,
  },
  {
    id: 2,
    title: 'Python for Data Science',
    instructor: 'Jane Smith',
    price: 79.99,
    image: '🐍',
    level: 'Intermediate',
    students: 2341,
  },
  {
    id: 3,
    title: 'Web Design Masterclass',
    instructor: 'Mike Johnson',
    price: 69.99,
    image: '🎨',
    level: 'Beginner',
    students: 3456,
  },
]

export function FeaturedCourses() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-6xl">
                {course.image}
              </div>
              <div className="p-6">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm rounded-full">
                  {course.level}
                </span>
                <h3 className="text-xl font-semibold mt-3 mb-2">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  by {course.instructor}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">${course.price}</span>
                  <Link
                    href={`/courses/${course.id}`}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}