import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import ClientProviders from '@/components/ClientProviders'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'NullCampus - Master Skills in Immersive 3D',
  description: 'Learn with AI-powered education and interactive 3D experiences. Transform your career with cutting-edge courses.',
  keywords: ['online learning', 'e-learning', '3D education', 'AI courses', 'interactive learning'],
  authors: [{ name: 'NullCampus Team' }],
  openGraph: {
    title: 'NullCampus - Master Skills in Immersive 3D',
    description: 'Experience the future of learning with AI-powered courses',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NullCampus - Master Skills in Immersive 3D',
    description: 'Experience the future of learning with AI-powered courses',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <ClientProviders>
            {/* Main app structure */}
            <div className="flex flex-col min-h-screen">
              {/* Navbar */}
              <Navbar />
              
              {/* Main content */}
              <main className="flex-grow">
                {children}
              </main>
              
              {/* Footer */}
              <Footer />
            </div>
          </ClientProviders>
        </AuthProvider>
      </body>
    </html>
  )
}