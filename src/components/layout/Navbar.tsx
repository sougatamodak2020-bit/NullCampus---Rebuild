"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { ProfileDropdown } from "@/components/auth/ProfileDropdown"
import { useAuthStore } from "@/store/authStore"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
  ]

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 shadow-lg glass"
          : "py-4 bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <svg
                className="w-10 h-10"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 5L35 15V25L20 35L5 25V15L20 5Z"
                  fill="url(#logo-gradient)"
                  fillOpacity="0.9"
                />
                <path
                  d="M20 15L25 18V22L20 25L15 22V18L20 15Z"
                  fill="white"
                />
              </svg>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NullCampus
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  className={`font-medium transition-colors ${
                    pathname === link.href
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <ProfileDropdown />
            ) : (
              <Link href="/auth/signin">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium"
                >
                  Sign In
                </motion.button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
              {!user && (
                <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-2 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium"
                  >
                    Sign In
                  </motion.button>
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
