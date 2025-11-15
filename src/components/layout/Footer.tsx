import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">NullCampus</h3>
            <p className="text-gray-400">
              Empowering learners with cutting-edge education technology
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/courses" className="hover:text-white">Courses</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-primary-400">📧</a>
              <a href="#" className="hover:text-primary-400">🐦</a>
              <a href="#" className="hover:text-primary-400">💼</a>
              <a href="#" className="hover:text-primary-400">📱</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          © 2024 NullCampus. All rights reserved.
        </div>
      </div>
    </footer>
  )
}