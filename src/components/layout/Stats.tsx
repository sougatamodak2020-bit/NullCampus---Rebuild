'use client'

import { motion } from 'framer-motion'

const stats = [
  { label: 'Active Students', value: '10,000+', icon: '👥' },
  { label: 'Courses Available', value: '150+', icon: '📚' },
  { label: 'Expert Instructors', value: '50+', icon: '👨‍🏫' },
  { label: 'Completion Rate', value: '95%', icon: '🎯' },
]

export function Stats() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}