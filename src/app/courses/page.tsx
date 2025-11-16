'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, Users, Star, TrendingUp, Award, Zap } from 'lucide-react'

const courses = [
  {
    id: 1,
    slug: 'web-development-masterclass',
    title: 'Web Development Masterclass',
    description: 'Learn HTML, CSS, JavaScript, React, and Next.js from scratch',
    instructor: 'John Doe',
    duration: '40 hours',
    students: 2500,
    rating: 4.8,
    price: 4999,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    category: 'Development',
    trending: true
  },
  {
    id: 2,
    slug: 'ui-ux-design-fundamentals',
    title: 'UI/UX Design Fundamentals',
    description: 'Master the principles of user interface and user experience design',
    instructor: 'Jane Smith',
    duration: '30 hours',
    students: 1800,
    rating: 4.9,
    price: 3999,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    category: 'Design',
    featured: true
  },
  {
    id: 3,
    slug: 'data-science-python',
    title: 'Data Science with Python',
    description: 'Learn data analysis, visualization, and machine learning',
    instructor: 'Mike Johnson',
    duration: '50 hours',
    students: 3200,
    rating: 4.7,
    price: 5999,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    category: 'Data Science',
    trending: true
  },
  {
    id: 4,
    slug: 'digital-marketing-complete',
    title: 'Digital Marketing Complete Course',
    description: 'SEO, Social Media, Email Marketing, and Content Strategy',
    instructor: 'Sarah Williams',
    duration: '35 hours',
    students: 2100,
    rating: 4.6,
    price: 3499,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    category: 'Marketing'
  },
  {
    id: 5,
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    description: 'Build iOS and Android apps with React Native',
    instructor: 'David Brown',
    duration: '45 hours',
    students: 1900,
    rating: 4.8,
    price: 5499,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    category: 'Development',
    featured: true
  },
  {
    id: 6,
    slug: 'cybersecurity-essentials',
    title: 'Cybersecurity Essentials',
    description: 'Learn to protect systems and networks from cyber threats',
    instructor: 'Emily Davis',
    duration: '38 hours',
    students: 1600,
    rating: 4.7,
    price: 4799,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    category: 'Security'
  }
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20" />
        <motion.div
          className="absolute top-0 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header with floating elements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 relative"
          >
            <motion.div
              className="absolute -top-10 left-1/4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl rotate-12 opacity-20 blur-sm"
              animate={{
                rotate: [12, 25, 12],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute -top-5 right-1/4 w-16 h-16 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full opacity-20 blur-sm"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold text-sm shadow-lg">
                <Zap className="inline w-4 h-4 mr-2" />
                Premium Courses
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Explore Premium
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">Courses</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Transform your career with industry-leading courses taught by world-class instructors
            </p>
          </motion.div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Link key={course.id} href={`/courses/${course.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -12,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
                >
                  {/* Badges */}
                  {course.trending && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white text-xs font-bold flex items-center gap-1 shadow-lg">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </div>
                  )}
                  {course.featured && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white text-xs font-bold flex items-center gap-1 shadow-lg">
                      <Award className="w-3 h-3" />
                      Featured
                    </div>
                  )}

                  {/* Image with overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Category badge */}
                    <div className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-sm font-bold shadow-lg">
                      {course.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-5 text-sm text-gray-600 dark:text-gray-400 mb-5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span className="font-medium">{(course.students / 1000).toFixed(1)}k</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{course.rating}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-5 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Instructor</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {course.instructor}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Price</p>
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ₹{(course.price / 1000).toFixed(1)}k
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}