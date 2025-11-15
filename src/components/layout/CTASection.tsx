'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students already learning on NullCampus
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/courses"
              className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Courses
            </Link>
            <Link
              href="/auth/sign-up"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}