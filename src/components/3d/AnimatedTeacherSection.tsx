// components/3d/AnimatedTeacherSection.tsx - Wrapper for desktop-only 3D
'use client'

import { AnimatedTeacher } from './AnimatedTeacher'

export default function AnimatedTeacherSection() {
  return (
    <div className="h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
      <AnimatedTeacher />
    </div>
  )
}