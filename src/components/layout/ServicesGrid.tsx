'use client'

import { motion } from 'framer-motion'
import { BookOpen, Users, Video, Award, Headphones, Clock } from 'lucide-react'

const services = [
  {
    icon: BookOpen,
    title: 'Interactive Courses',
    description: 'Engage with dynamic, hands-on learning experiences tailored to your pace.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    title: 'Expert Mentorship',
    description: 'Get guidance from industry professionals with years of real-world experience.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Video,
    title: 'Live Sessions',
    description: 'Join interactive live classes and workshops with expert instructors.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Award,
    title: 'Certifications',
    description: 'Earn recognized certificates upon completing your courses.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Access our dedicated support team whenever you need assistance.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Clock,
    title: 'Flexible Learning',
    description: 'Learn at your own pace with lifetime access to course materials.',
    color: 'from-pink-500 to-rose-500'
  }
]

export function ServicesGrid() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover comprehensive learning solutions designed to accelerate your growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-card group cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
