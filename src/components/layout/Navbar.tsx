'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Navbar() {
  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary-500">
          NullCampus
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/courses" className="text-sm font-medium hover:text-primary-500">
            Courses
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
