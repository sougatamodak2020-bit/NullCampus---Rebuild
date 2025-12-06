// app/courses/[slug]/page.tsx
// ⚠️ NO 'use client' here!

import { notFound } from 'next/navigation'
import { coursesData } from '@/data/courses'
import CourseDetailClient from './CourseDetailClient'

interface PageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return Object.values(coursesData).map((course) => ({
    slug: course.slug,
  }))
}

export function generateMetadata({ params }: PageProps) {
  const course = Object.values(coursesData).find(
    (c) => c.slug === params.slug
  )

  if (!course) {
    return { title: 'Course Not Found' }
  }

  return {
    title: `${course.title} | EduPlatform`,
    description: course.description,
  }
}

export default function CoursePage({ params }: PageProps) {
  const course = Object.values(coursesData).find(
    (c) => c.slug === params.slug
  )

  if (!course) {
    notFound()
  }

  return <CourseDetailClient course={course} />
}