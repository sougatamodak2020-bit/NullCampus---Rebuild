import { HeroSection } from "@/components/layout/HeroSection"
import { FeaturedCourses } from "@/components/course/FeaturedCourses"
import { Stats } from "@/components/layout/Stats"
import { Testimonials } from "@/components/layout/Testimonials"
import { CTASection } from "@/components/layout/CTASection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCourses />
      <Stats />
      <Testimonials />
      <CTASection />
    </>
  )
}
