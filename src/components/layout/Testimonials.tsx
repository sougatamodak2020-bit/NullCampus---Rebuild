'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Computer Science Student',
    content: 'NullCampus transformed my learning experience. The interactive courses are amazing!',
    avatar: '👩‍💻',
    rating: 5,
  },
  {
    name: 'Mike Chen',
    role: 'Data Science Enthusiast',
    content: 'Best platform for self-paced learning. The community support is incredible.',
    avatar: '👨‍💻',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Web Developer',
    content: 'The courses are well-structured and the projects are real-world applicable.',
    avatar: '👩‍🎨',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{testimonial.avatar}</div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}