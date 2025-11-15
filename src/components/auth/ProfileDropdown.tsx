'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white">
          U
        </div>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50"
          >
            <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              Dashboard
            </Link>
            <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              Profile
            </Link>
            <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              Settings
            </Link>
            <hr className="my-2 border-gray-200 dark:border-gray-700" />
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500">
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}