import { ServicesGrid } from "@/components/layout/ServicesGrid"

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-24 pb-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose your learning path and master new skills with expert guidance
          </p>
        </div>
        <ServicesGrid />
      </div>
    </div>
  )
}
