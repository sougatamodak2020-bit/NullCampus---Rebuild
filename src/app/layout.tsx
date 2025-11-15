import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/layout/Providers"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NullCampus - Master Skills in 3D",
  description: "Next-generation e-learning platform with immersive 3D experiences",
  keywords: "e-learning, online courses, 3D education, programming, AI, design",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  )
}
