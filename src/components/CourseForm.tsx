'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// === 1. Define Level Enum ===
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;
type Level = typeof LEVELS[number];

// === 2. Module Interface ===
interface Module {
  title: string;
  description: string;
  duration: string;
}

// === 3. Zod Schema ===
// Form schema with explicit types
const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description too short'),
  price: z.coerce.number().positive('Price must be positive'),
  level: z.enum(LEVELS),
  duration: z.string().min(1, 'Duration required'),
  thumbnail: z.string().url('Invalid thumbnail URL'),
  video_url: z.string().url('Invalid video URL'),
  tags: z.array(z.string()).default([]),
});

// === 4. Infer Type ===
type FormData = z.infer<typeof schema>;

export default function CourseForm() {
  const [modules, setModules] = useState<Module[]>([]);
  const router = useRouter();

  // === 5. useForm WITH GENERIC TYPE ===
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema) as any, // ? EXACT MATCH
    defaultValues: {
      level: 'Beginner',
      price: 999,
      tags: [],
    },
  });

  // === 6. onSubmit WITH CORRECT TYPE ===
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, modules }),
      });

      if (res.ok) {
        toast.success('Course created!');
        router.push('/courses');
      } else {
        toast.error('Failed to create course');
      }
    } catch {
      toast.error('Network error');
    }
  };

  const addModule = () => {
    setModules([...modules, { title: '', description: '', duration: '' }]);
  };

  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Create New Course</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <Input {...register('title')} placeholder="React Mastery Pro" />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Price (?)</label>
            <Input type="number" {...register('price')} placeholder="999" />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Level</label>
            <Select onValueChange={(v) => setValue('level', v as Level)} defaultValue="Beginner">
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.level && <p className="text-red-500 text-sm">{errors.level.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Duration</label>
            <Input {...register('duration')} placeholder="15 hours" />
            {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
          </div>
        </div>

        <div className="mt-4">
          <label className="block font-medium mb-1">Description</label>
          <Textarea {...register('description')} rows={3} placeholder="Learn React from zero to hero..." />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium mb-1">Thumbnail URL</label>
            <Input {...register('thumbnail')} placeholder="https://images.unsplash.com/..." />
            {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Intro Video URL</label>
            <Input {...register('video_url')} placeholder="https://youtube.com/watch?v=..." />
            {errors.video_url && <p className="text-red-500 text-sm">{errors.video_url.message}</p>}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">Modules</h3>
            <Button type="button" onClick={addModule} size="sm">
              <Plus className="w-4 h-4 mr-1" /> Add Module
            </Button>
          </div>

          {modules.map((mod, i) => (
            <Card key={i} className="p-4 mb-3">
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Module Title"
                  value={mod.title}
                  onChange={(e) => {
                    const newMods = [...modules];
                    newMods[i].title = e.target.value;
                    setModules(newMods);
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeModule(i)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <Textarea
                placeholder="Module Description"
                value={mod.description}
                onChange={(e) => {
                  const newMods = [...modules];
                  newMods[i].description = e.target.value;
                  setModules(newMods);
                }}
              />
              <Input
                placeholder="Duration (e.g. 2 hours)"
                className="mt-2"
                value={mod.duration}
                onChange={(e) => {
                  const newMods = [...modules];
                  newMods[i].duration = e.target.value;
                  setModules(newMods);
                }}
              />
            </Card>
          ))}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full mt-6">
          {isSubmitting ? 'Creating...' : 'Create Course'}
        </Button>
      </Card>
    </form>
  );
}

