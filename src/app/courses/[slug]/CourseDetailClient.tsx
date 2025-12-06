// app/courses/[slug]/CourseDetailClient.tsx
'use client'

import { CourseDetail } from '@/components/course/CourseDetail'
import type { Course } from '@/data/courses'

interface Props {
  course: Course
}

export default function CourseDetailClient({ course }: Props) {
  return <CourseDetail course={course} />
}