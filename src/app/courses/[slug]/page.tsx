'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { notFound, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, Clock, Users, Star, Award, Globe, PlayCircle, 
  CheckCircle, Lock, BookOpen, Video, Download, FileCheck,
  TrendingUp, Zap, Heart, Share2, ShoppingCart, Sparkles
} from 'lucide-react'
import toast from 'react-hot-toast'

// Complete course data for all 6 courses
const coursesData = {
  'web-development-masterclass': {
    id: '1',
    slug: 'web-development-masterclass',
    title: 'Web Development Masterclass',
    subtitle: 'From Zero to Full-Stack Developer',
    description: 'Master the art of web development with this comprehensive course covering HTML, CSS, JavaScript, React, Next.js, and modern development practices.',
    longDescription: 'Start your journey to becoming a professional web developer. This course takes you from complete beginner to job-ready developer with hands-on projects and real-world applications.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
    price: 4999,
    originalPrice: 9999,
    duration: '40 hours',
    lessons: 120,
    enrolled: 2500,
    rating: 4.8,
    reviews: 450,
    level: 'Beginner',
    language: 'English',
    lastUpdated: 'November 2024',
    category: 'Development',
    trending: true,
    instructor: {
      name: 'John Doe',
      title: 'Senior Full-Stack Developer',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff&size=200',
      bio: '10+ years of experience in web development. Worked with Fortune 500 companies.',
      rating: 4.9,
      students: 15000,
      courses: 8
    },
    features: [
      'Lifetime access to course materials',
      'Certificate of completion',
      'Downloadable resources',
      '30-day money back guarantee',
      'Access on mobile and TV',
      'Full source code included'
    ],
    requirements: [
      'No programming experience required',
      'A computer with internet access',
      'Motivation to learn'
    ],
    whatYouLearn: [
      'Build 10+ real-world web applications',
      'Master HTML5, CSS3, and JavaScript ES6+',
      'Create responsive layouts with Flexbox and Grid',
      'Build dynamic apps with React and Next.js',
      'Deploy projects to production',
      'Best practices and industry standards'
    ],
    curriculum: [
      {
        id: 1,
        title: 'Getting Started',
        duration: '2 hours',
        lessons: [
          { title: 'Course Introduction', duration: '5:00', preview: true },
          { title: 'Setting Up Your Development Environment', duration: '15:00', preview: true },
          { title: 'How the Web Works', duration: '20:00', preview: false },
          { title: 'Your First Web Page', duration: '25:00', preview: false }
        ]
      },
      {
        id: 2,
        title: 'HTML & CSS Fundamentals',
        duration: '8 hours',
        lessons: [
          { title: 'HTML Structure and Semantics', duration: '45:00', preview: false },
          { title: 'CSS Styling Basics', duration: '50:00', preview: false },
          { title: 'Flexbox Layout', duration: '40:00', preview: false },
          { title: 'CSS Grid System', duration: '35:00', preview: false }
        ]
      },
      {
        id: 3,
        title: 'JavaScript Programming',
        duration: '12 hours',
        lessons: [
          { title: 'JavaScript Basics', duration: '60:00', preview: false },
          { title: 'Functions and Scope', duration: '45:00', preview: false },
          { title: 'DOM Manipulation', duration: '50:00', preview: false },
          { title: 'Async JavaScript', duration: '55:00', preview: false }
        ]
      },
      {
        id: 4,
        title: 'React & Next.js',
        duration: '18 hours',
        lessons: [
          { title: 'React Fundamentals', duration: '90:00', preview: false },
          { title: 'State Management', duration: '60:00', preview: false },
          { title: 'Next.js Introduction', duration: '70:00', preview: false },
          { title: 'Building Full-Stack Apps', duration: '120:00', preview: false }
        ]
      }
    ]
  },

  'ui-ux-design-fundamentals': {
    id: '2',
    slug: 'ui-ux-design-fundamentals',
    title: 'UI/UX Design Fundamentals',
    subtitle: 'Create Beautiful and Functional Designs',
    description: 'Master the principles of user interface and user experience design. Learn industry-standard tools and workflows.',
    longDescription: 'From wireframing to high-fidelity prototypes, this course covers everything you need to become a professional UI/UX designer.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    price: 3999,
    originalPrice: 7999,
    duration: '30 hours',
    lessons: 85,
    enrolled: 1800,
    rating: 4.9,
    reviews: 320,
    level: 'Beginner',
    language: 'English',
    lastUpdated: 'October 2024',
    category: 'Design',
    featured: true,
    instructor: {
      name: 'Jane Smith',
      title: 'Senior Product Designer',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=ec4899&color=fff&size=200',
      bio: 'Award-winning designer with experience at Google, Apple, and Microsoft. Specialized in user-centered design.',
      rating: 4.9,
      students: 12000,
      courses: 5
    },
    features: [
      'Real-world design projects',
      'Figma and Adobe XD files',
      'Design system templates',
      'Portfolio building guidance',
      'Industry certificates',
      '1-on-1 mentorship sessions'
    ],
    requirements: [
      'No design experience needed',
      'Computer with Figma (free)',
      'Basic computer skills'
    ],
    whatYouLearn: [
      'Design thinking methodology',
      'Create wireframes and prototypes',
      'Master color theory and typography',
      'Build responsive designs',
      'Conduct user research',
      'Create design systems'
    ],
    curriculum: [
      {
        id: 1,
        title: 'Introduction to Design',
        duration: '3 hours',
        lessons: [
          { title: 'What is UI/UX Design?', duration: '15:00', preview: true },
          { title: 'Design Thinking Process', duration: '25:00', preview: true },
          { title: 'Setting Up Figma', duration: '10:00', preview: false },
          { title: 'Your First Design', duration: '30:00', preview: false }
        ]
      },
      {
        id: 2,
        title: 'Design Principles',
        duration: '7 hours',
        lessons: [
          { title: 'Color Theory', duration: '45:00', preview: false },
          { title: 'Typography Basics', duration: '40:00', preview: false },
          { title: 'Layout and Grids', duration: '35:00', preview: false },
          { title: 'Visual Hierarchy', duration: '30:00', preview: false }
        ]
      },
      {
        id: 3,
        title: 'User Experience',
        duration: '10 hours',
        lessons: [
          { title: 'User Research Methods', duration: '60:00', preview: false },
          { title: 'Creating Personas', duration: '45:00', preview: false },
          { title: 'User Journey Mapping', duration: '50:00', preview: false },
          { title: 'Usability Testing', duration: '55:00', preview: false }
        ]
      },
      {
        id: 4,
        title: 'Prototyping',
        duration: '10 hours',
        lessons: [
          { title: 'Low-Fidelity Wireframes', duration: '40:00', preview: false },
          { title: 'High-Fidelity Mockups', duration: '60:00', preview: false },
          { title: 'Interactive Prototypes', duration: '70:00', preview: false },
          { title: 'Design Handoff', duration: '50:00', preview: false }
        ]
      }
    ]
  },

  'data-science-python': {
    id: '3',
    slug: 'data-science-python',
    title: 'Data Science with Python',
    subtitle: 'Master Data Analysis and Machine Learning',
    description: 'Learn data analysis, visualization, and machine learning with Python. Build predictive models and gain insights from data.',
    longDescription: 'Comprehensive data science bootcamp covering Python programming, statistics, machine learning, and deep learning with real-world projects.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    price: 5999,
    originalPrice: 11999,
    duration: '50 hours',
    lessons: 150,
    enrolled: 3200,
    rating: 4.7,
    reviews: 580,
    level: 'Intermediate',
    language: 'English',
    lastUpdated: 'November 2024',
    category: 'Data Science',
    trending: true,
    instructor: {
      name: 'Mike Johnson',
      title: 'Data Scientist at Microsoft',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=10b981&color=fff&size=200',
      bio: 'PhD in Computer Science, specializing in Machine Learning. Published researcher with 10+ years in data science.',
      rating: 4.8,
      students: 20000,
      courses: 12
    },
    features: [
      'Jupyter notebooks for practice',
      'Real datasets from Kaggle',
      'Cloud computing credits',
      'ML model deployment guide',
      'Interview preparation',
      'Job placement assistance'
    ],
    requirements: [
      'Basic programming knowledge helpful',
      'High school mathematics',
      'Enthusiasm for data'
    ],
    whatYouLearn: [
      'Python programming for data science',
      'NumPy, Pandas, and Matplotlib',
      'Statistical analysis and hypothesis testing',
      'Machine learning algorithms',
      'Deep learning with TensorFlow',
      'Deploy ML models to production'
    ],
    curriculum: [
      {
        id: 1,
        title: 'Python Foundations',
        duration: '5 hours',
        lessons: [
          { title: 'Python Basics Review', duration: '30:00', preview: true },
          { title: 'NumPy Arrays', duration: '45:00', preview: true },
          { title: 'Pandas DataFrames', duration: '60:00', preview: false },
          { title: 'Data Visualization', duration: '50:00', preview: false }
        ]
      },
      {
        id: 2,
        title: 'Statistical Analysis',
        duration: '10 hours',
        lessons: [
          { title: 'Descriptive Statistics', duration: '40:00', preview: false },
          { title: 'Probability Distributions', duration: '50:00', preview: false },
          { title: 'Hypothesis Testing', duration: '60:00', preview: false },
          { title: 'Regression Analysis', duration: '70:00', preview: false }
        ]
      },
      {
        id: 3,
        title: 'Machine Learning',
        duration: '20 hours',
        lessons: [
          { title: 'Supervised Learning', duration: '90:00', preview: false },
          { title: 'Unsupervised Learning', duration: '80:00', preview: false },
          { title: 'Model Evaluation', duration: '60:00', preview: false },
          { title: 'Feature Engineering', duration: '70:00', preview: false }
        ]
      },
      {
        id: 4,
        title: 'Deep Learning',
        duration: '15 hours',
        lessons: [
          { title: 'Neural Networks Basics', duration: '80:00', preview: false },
          { title: 'Convolutional Neural Networks', duration: '90:00', preview: false },
          { title: 'Recurrent Neural Networks', duration: '85:00', preview: false },
          { title: 'Model Deployment', duration: '75:00', preview: false }
        ]
      }
    ]
  },

  'digital-marketing-complete': {
    id: '4',
    slug: 'digital-marketing-complete',
    title: 'Digital Marketing Complete Course',
    subtitle: 'Grow Any Business with Digital Marketing',
    description: 'Master SEO, Social Media Marketing, Email Marketing, and Content Strategy. Learn to create and execute winning marketing campaigns.',
    longDescription: 'Become a T-shaped digital marketer with deep expertise in all channels. Learn strategies used by top companies to drive growth.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    price: 3499,
    originalPrice: 6999,
    duration: '35 hours',
    lessons: 95,
    enrolled: 2100,
    rating: 4.6,
    reviews: 380,
    level: 'Beginner',
    language: 'English',
    lastUpdated: 'October 2024',
    category: 'Marketing',
    instructor: {
      name: 'Sarah Williams',
      title: 'CMO & Marketing Consultant',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=f59e0b&color=fff&size=200',
      bio: 'Former Head of Marketing at HubSpot. 15+ years helping startups and Fortune 500 companies grow.',
      rating: 4.7,
      students: 18000,
      courses: 6
    },
    features: [
      'Marketing templates and tools',
      'Real campaign case studies',
      'Google Ads credits ($100)',
      'Facebook Ads guide',
      'Email marketing templates',
      'SEO audit checklist'
    ],
    requirements: [
      'No marketing experience needed',
      'Basic computer skills',
      'Access to social media'
    ],
    whatYouLearn: [
      'Create complete marketing strategies',
      'Master Google Ads and Facebook Ads',
      'SEO for top Google rankings',
      'Content marketing that converts',
      'Email marketing automation',
      'Analytics and ROI measurement'
    ],
    curriculum: [
      {
        id: 1,
        title: 'Marketing Foundations',
        duration: '4 hours',
        lessons: [
          { title: 'Digital Marketing Overview', duration: '20:00', preview: true },
          { title: 'Customer Journey Mapping', duration: '30:00', preview: true },
          { title: 'Marketing Funnels', duration: '40:00', preview: false },
          { title: 'Setting KPIs', duration: '35:00', preview: false }
        ]
      },
      {
        id: 2,
        title: 'Search Engine Optimization',
        duration: '8 hours',
        lessons: [
          { title: 'Keyword Research', duration: '50:00', preview: false },
          { title: 'On-Page SEO', duration: '45:00', preview: false },
          { title: 'Technical SEO', duration: '60:00', preview: false },
          { title: 'Link Building Strategies', duration: '55:00', preview: false }
        ]
      },
      {
        id: 3,
        title: 'Social Media Marketing',
        duration: '10 hours',
        lessons: [
          { title: 'Facebook & Instagram Marketing', duration: '70:00', preview: false },
          { title: 'LinkedIn for B2B', duration: '60:00', preview: false },
          { title: 'Twitter/X Strategy', duration: '50:00', preview: false },
          { title: 'Influencer Marketing', duration: '65:00', preview: false }
        ]
      },
      {
        id: 4,
        title: 'Paid Advertising',
        duration: '13 hours',
        lessons: [
          { title: 'Google Ads Mastery', duration: '90:00', preview: false },
          { title: 'Facebook Ads Advanced', duration: '85:00', preview: false },
          { title: 'Retargeting Campaigns', duration: '60:00', preview: false },
          { title: 'Campaign Optimization', duration: '75:00', preview: false }
        ]
      }
    ]
  },

  'mobile-app-development': {
    id: '5',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    subtitle: 'Build Native Apps for iOS and Android',
    description: 'Create professional mobile applications using React Native. Build once, deploy everywhere with modern development practices.',
    longDescription: 'Learn to build production-ready mobile apps from scratch. Master React Native and deploy apps to Apple App Store and Google Play Store.',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
    price: 5499,
    originalPrice: 10999,
    duration: '45 hours',
    lessons: 130,
    enrolled: 1900,
    rating: 4.8,
    reviews: 340,
    level: 'Intermediate',
    language: 'English',
    lastUpdated: 'November 2024',
    category: 'Development',
    featured: true,
    instructor: {
      name: 'David Brown',
      title: 'Mobile App Developer',
      avatar: 'https://ui-avatars.com/api/?name=David+Brown&background=3b82f6&color=fff&size=200',
      bio: 'Built 50+ apps with millions of downloads. Expert in React Native, Swift, and Kotlin. App Store optimization specialist.',
      rating: 4.9,
      students: 14000,
      courses: 7
    },
    features: [
      'Build 5 complete apps',
      'App Store deployment guide',
      'Push notifications setup',
      'In-app purchases integration',
      'Analytics implementation',
      'App monetization strategies'
    ],
    requirements: [
      'Basic JavaScript knowledge',
      'Mac for iOS development (optional)',
      'Smartphone for testing'
    ],
    whatYouLearn: [
      'React Native from scratch',
      'Navigation and routing',
      'State management with Redux',
      'Native device features',
      'App Store and Play Store publishing',
      'App performance optimization'
    ],
    curriculum: [
      {
        id: 1,
        title: 'React Native Basics',
        duration: '6 hours',
        lessons: [
          { title: 'Setting Up Development Environment', duration: '30:00', preview: true },
          { title: 'React Native Components', duration: '45:00', preview: true },
          { title: 'Styling in React Native', duration: '40:00', preview: false },
          { title: 'Handling User Input', duration: '50:00', preview: false }
        ]
      },
      {
        id: 2,
        title: 'Navigation & State',
        duration: '10 hours',
        lessons: [
          { title: 'React Navigation Setup', duration: '60:00', preview: false },
          { title: 'Stack, Tab, and Drawer Navigation', duration: '70:00', preview: false },
          { title: 'Redux Integration', duration: '80:00', preview: false },
          { title: 'Context API', duration: '50:00', preview: false }
        ]
      },
      {
        id: 3,
        title: 'Native Features',
        duration: '14 hours',
        lessons: [
          { title: 'Camera and Gallery', duration: '75:00', preview: false },
          { title: 'Geolocation and Maps', duration: '85:00', preview: false },
          { title: 'Push Notifications', duration: '90:00', preview: false },
          { title: 'Offline Storage', duration: '70:00', preview: false }
        ]
      },
      {
        id: 4,
        title: 'Deployment',
        duration: '15 hours',
        lessons: [
          { title: 'Building for Production', duration: '60:00', preview: false },
          { title: 'iOS App Store Submission', duration: '90:00', preview: false },
          { title: 'Google Play Store Submission', duration: '85:00', preview: false },
          { title: 'App Updates and Maintenance', duration: '95:00', preview: false }
        ]
      }
    ]
  },

  'cybersecurity-essentials': {
    id: '6',
    slug: 'cybersecurity-essentials',
    title: 'Cybersecurity Essentials',
    subtitle: 'Become an Ethical Hacker and Security Expert',
    description: 'Learn to protect systems and networks from cyber threats. Master penetration testing, ethical hacking, and security best practices.',
    longDescription: 'Comprehensive cybersecurity training from basic concepts to advanced penetration testing. Prepare for industry certifications.',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    price: 4799,
    originalPrice: 9599,
    duration: '38 hours',
    lessons: 110,
    enrolled: 1600,
    rating: 4.7,
    reviews: 290,
    level: 'Advanced',
    language: 'English',
    lastUpdated: 'November 2024',
    category: 'Security',
    instructor: {
      name: 'Emily Davis',
      title: 'Senior Security Consultant',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=dc2626&color=fff&size=200',
      bio: 'Certified Ethical Hacker (CEH) and CISSP. 12+ years in cybersecurity, worked with government agencies and Fortune 500 companies.',
      rating: 4.8,
      students: 10000,
      courses: 4
    },
    features: [
      'Virtual hacking labs',
      'Security tools included',
      'Certification preparation',
      'Real-world scenarios',
      'Incident response guides',
      'Legal and compliance training'
    ],
    requirements: [
      'Basic networking knowledge',
      'Familiarity with Linux',
      'Problem-solving mindset'
    ],
    whatYouLearn: [
      'Network security fundamentals',
      'Web application security',
      'Penetration testing methodology',
      'Malware analysis basics',
      'Cryptography and encryption',
      'Security compliance and auditing'
    ],
    curriculum: [
      {
        id: 1,
        title: 'Security Foundations',
        duration: '5 hours',
        lessons: [
          { title: 'Introduction to Cybersecurity', duration: '25:00', preview: true },
          { title: 'Types of Cyber Threats', duration: '35:00', preview: true },
          { title: 'Security Principles (CIA Triad)', duration: '30:00', preview: false },
          { title: 'Risk Assessment', duration: '40:00', preview: false }
        ]
      },
      {
        id: 2,
        title: 'Network Security',
        duration: '10 hours',
        lessons: [
          { title: 'TCP/IP and OSI Model', duration: '50:00', preview: false },
          { title: 'Firewall Configuration', duration: '60:00', preview: false },
          { title: 'VPN and Encryption', duration: '55:00', preview: false },
          { title: 'Wireless Security', duration: '65:00', preview: false }
        ]
      },
      {
        id: 3,
        title: 'Ethical Hacking',
        duration: '13 hours',
        lessons: [
          { title: 'Reconnaissance and Footprinting', duration: '70:00', preview: false },
          { title: 'Scanning and Enumeration', duration: '80:00', preview: false },
          { title: 'Exploitation Techniques', duration: '90:00', preview: false },
          { title: 'Post-Exploitation', duration: '85:00', preview: false }
        ]
      },
      {
        id: 4,
        title: 'Defense and Response',
        duration: '10 hours',
        lessons: [
          { title: 'Intrusion Detection Systems', duration: '60:00', preview: false },
          { title: 'Incident Response Planning', duration: '70:00', preview: false },
          { title: 'Digital Forensics Basics', duration: '65:00', preview: false },
          { title: 'Security Best Practices', duration: '55:00', preview: false }
        ]
      }
    ]
  }
}

// THIS IS THE MAIN COMPONENT - ADD THIS!
export default function CoursePage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedSection, setSelectedSection] = useState<number | null>(null)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Get course data
  const course = coursesData[params.slug as keyof typeof coursesData]

  // If course not found, show 404
  if (!course) {
    notFound()
  }

  const handleEnroll = () => {
    toast.success('Added to cart! 🛒')
    // Add enrollment logic here
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist! ❤️')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link 
            href="/courses"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Course Info */}
            <div className="lg:col-span-2">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {'trending' in course && course.trending && (
                  <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </span>
                )}
                {'featured' in course && course.featured && (
                  <span className="px-3 py-1 bg-pink-500 text-white rounded-full text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </span>
                )}
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                  {course.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-white/90 mb-6">{course.subtitle}</p>
              <p className="text-lg text-white/80 mb-6">{course.longDescription}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-white/70">({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.enrolled.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span>{course.language}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-16 h-16 rounded-full border-2 border-white/50"
                />
                <div>
                  <p className="text-sm text-white/70">Instructor</p>
                  <p className="font-semibold text-lg">{course.instructor.name}</p>
                  <p className="text-sm text-white/80">{course.instructor.title}</p>
                </div>
              </div>
            </div>

            {/* Right: Purchase Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sticky top-24">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full aspect-video object-cover rounded-xl mb-6"
                />

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      ₹{course.price}
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      ₹{course.originalPrice}
                    </span>
                  </div>
                  <p className="text-green-600 font-semibold">
                    Save ₹{course.originalPrice - course.price} ({Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF)
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleEnroll}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleWishlist}
                      className={`py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                        isWishlisted
                          ? 'bg-red-50 text-red-600 border-2 border-red-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-600' : ''}`} />
                      Wishlist
                    </button>
                    <button
                      onClick={handleShare}
                      className="py-3 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                  </div>
                </div>

                {/* Course Includes */}
                <div className="mt-6 pt-6 border-t">
                  <p className="font-semibold text-gray-900 mb-3">This course includes:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Video className="w-4 h-4 text-indigo-600" />
                      {course.lessons} video lessons
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Download className="w-4 h-4 text-indigo-600" />
                      Downloadable resources
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4 text-indigo-600" />
                      Certificate of completion
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-indigo-600" />
                      Lifetime access
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Course Details */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="flex border-b overflow-x-auto">
                {['overview', 'curriculum', 'instructor', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 font-semibold capitalize whitespace-nowrap transition-colors ${
                      activeTab === tab
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {/* What You'll Learn */}
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Zap className="w-6 h-6 text-yellow-500" />
                          What You'll Learn
                        </h2>
                        <div className="grid md:grid-cols-2 gap-3">
                          {course.whatYouLearn.map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                        <ul className="space-y-2">
                          {course.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-700">
                              <span className="text-indigo-600 font-bold">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Description */}
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                        <p className="text-gray-700 leading-relaxed">{course.description}</p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'curriculum' && (
                    <motion.div
                      key="curriculum"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                      <div className="space-y-4">
                        {course.curriculum.map((section) => (
                          <div
                            key={section.id}
                            className="border border-gray-200 rounded-xl overflow-hidden"
                          >
                            <button
                              onClick={() =>
                                setSelectedSection(
                                  selectedSection === section.id ? null : section.id
                                )
                              }
                              className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                            >
                              <div className="flex items-center gap-4">
                                <BookOpen className="w-5 h-5 text-indigo-600" />
                                <div className="text-left">
                                  <h3 className="font-semibold text-gray-900">
                                    Section {section.id}: {section.title}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {section.lessons.length} lessons • {section.duration}
                                  </p>
                                </div>
                              </div>
                              <motion.div
                                animate={{ rotate: selectedSection === section.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <svg
                                  className="w-5 h-5 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </motion.div>
                            </button>

                            <AnimatePresence>
                              {selectedSection === section.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-6 py-4 bg-white space-y-3">
                                    {section.lessons.map((lesson, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between py-2"
                                      >
                                        <div className="flex items-center gap-3">
                                          {lesson.preview ? (
                                            <PlayCircle className="w-5 h-5 text-green-500" />
                                          ) : (
                                            <Lock className="w-5 h-5 text-gray-400" />
                                          )}
                                          <span className="text-gray-700">{lesson.title}</span>
                                          {lesson.preview && (
                                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                              Preview
                                            </span>
                                          )}
                                        </div>
                                        <span className="text-sm text-gray-500">
                                          {lesson.duration}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'instructor' && (
                    <motion.div
                      key="instructor"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <div className="flex items-start gap-6">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-32 h-32 rounded-full border-4 border-indigo-100"
                        />
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {course.instructor.name}
                          </h2>
                          <p className="text-indigo-600 font-medium mb-4">
                            {course.instructor.title}
                          </p>
                          <p className="text-gray-700 mb-6">{course.instructor.bio}</p>

                          <div className="grid grid-cols-3 gap-6">
                            <div>
                              <div className="flex items-center gap-2 text-yellow-500 mb-1">
                                <Star className="w-5 h-5 fill-yellow-500" />
                                <span className="font-bold text-gray-900">
                                  {course.instructor.rating}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">Instructor Rating</p>
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-xl mb-1">
                                {course.instructor.students.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-600">Students</p>
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-xl mb-1">
                                {course.instructor.courses}
                              </p>
                              <p className="text-sm text-gray-600">Courses</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'reviews' && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <div className="text-center py-12">
                        <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {course.rating} out of 5
                        </h3>
                        <p className="text-gray-600">
                          Based on {course.reviews} reviews
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right: Features */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Course Features</h3>
              <div className="space-y-3">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FileCheck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600">
                  Last updated: <span className="font-medium">{course.lastUpdated}</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Level: <span className="font-medium">{course.level}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}