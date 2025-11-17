'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Computer Science Student',
    content: 'NullCampus transformed my learning experience. The interactive courses are amazing!',
    avatar: '👩‍💻',
    rating: 5,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Mike Chen',
    role: 'Data Science Enthusiast',
    content: 'Best platform for self-paced learning. The community support is incredible.',
    avatar: '👨‍💻',
    rating: 5,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Web Developer',
    content: 'The courses are well-structured and the projects are real-world applicable.',
    avatar: '👩‍🎨',
    rating: 5,
    gradient: 'from-orange-500 to-red-500'
  },
]

export function Testimonials() {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/10 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%" 
            }}
            animate={{
              x: [null, Math.random() * 100 + "%"],
              y: [null, Math.random() * 100 + "%"],
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-6"
          >
            <Quote className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Student Success Stories
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              What Our Students Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Real stories from real learners who transformed their careers
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -15,
                transition: { type: "spring", stiffness: 400, damping: 15 }
              }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${testimonial.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              
              {/* Card */}
              <div className="relative h-full bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl flex flex-col">
                {/* Quote icon background */}
                <div className="absolute top-6 right-6 opacity-5">
                  <Quote className="w-24 h-24 text-gray-900 dark:text-white" />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.15 + i * 0.05,
                        type: "spring",
                        stiffness: 500
                      }}
                    >
                      <Star className={`w-5 h-5 fill-yellow-400 text-yellow-400`} />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed flex-grow relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  "{testimonial.content}"
                </motion.p>

                {/* Author info */}
                <motion.div 
                  className="flex items-center gap-4 relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.4 }}
                >
                  {/* Avatar with gradient ring */}
                  <motion.div
                    className="relative"
                    whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center text-3xl border-4 border-white dark:border-gray-900 shadow-lg">
                      {testimonial.avatar}
                    </div>
                  </motion.div>

                  <div>
                    <h3 className={`font-bold text-lg bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </motion.div>

                {/* Decorative corner */}
                <motion.div
                  className={`absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br ${testimonial.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex -space-x-2">
              {['👨‍💻', '👩‍💼', '👨‍🎓', '👩‍🔬', '👨‍🏫'].map((emoji, i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  whileHover={{ y: -5, scale: 1.2 }}
                >
                  <span className="text-lg">{emoji}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Join <span className="text-purple-600 dark:text-purple-400">10,000+</span> happy learners
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}