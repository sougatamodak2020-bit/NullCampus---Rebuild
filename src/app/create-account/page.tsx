'use client'


export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { User, Mail, Phone, Calendar, MapPin, Briefcase, BookOpen, Award, Loader2, ChevronRight, Upload } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function CreateAccountPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // Safe auth hook usage
  const authContext = (() => {
    try {
      return useAuth()
    } catch {
      return { user: null, login: async () => {}, logout: () => {}, isAuthenticated: false }
    }
  })()
  const { user, login, logout, isAuthenticated } = authContext
  const referralCode = searchParams.get('ref')

  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    date_of_birth: '',
    address: '',
    occupation: '',
    interests: [] as string[],
    bio: '',
    avatar_url: '',
    referral_code: referralCode || '',
  })

  const interests = [
    'Web Development',
    'Mobile Development', 
    'Data Science',
    'Machine Learning',
    'Cloud Computing',
    'DevOps',
    'Cybersecurity',
    'Blockchain',
    'Game Development',
    'UI/UX Design',
    'Digital Marketing',
    'Business',
  ]

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateProfile(formData)
      // Navigation is handled in AuthContext
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
            <p className="text-blue-100">Tell us more about yourself to personalize your experience</p>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Step {step} of 3</span>
                <span className="text-sm">{Math.round((step / 3) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  className="bg-white rounded-full h-2"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Professional Info */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Professional Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Occupation
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Software Developer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {referralCode && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-5 w-5 text-green-600" />
                      <h3 className="font-semibold text-green-800 dark:text-green-300">Referral Code Applied!</h3>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Code: <span className="font-mono font-bold">{referralCode}</span>
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      You'll receive special benefits after completing your profile!
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Interests */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Select Your Interests</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Choose topics you're interested in learning about
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interests.map((interest) => (
                    <motion.button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-xl border-2 font-medium transition-all ${
                        formData.interests.includes(interest)
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {interest}
                    </motion.button>
                  ))}
                </div>

                {formData.interests.length > 0 && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Selected {formData.interests.length} interest{formData.interests.length > 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  Previous
                </motion.button>
              )}

              {step < 3 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="ml-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={loading || !formData.full_name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="ml-auto px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating Profile...
                    </>
                  ) : (
                    <>
                      Complete Profile
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}



