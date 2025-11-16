'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  duration: z.string(),
  thumbnail: z.string().url(),
  video_url: z.string().url(),
  tags: z.array(z.string()).default([]),
});

interface Module {
  title: string;
  description: string;
  duration: string;
}

export default function CourseForm() {
  const [modules, setModules] = useState<Module[]>([]);
  const router = useRouter();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const res = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, modules }),
    });

    if (res.ok) {
      toast.success('Course created!');
      router.push('/courses');
    } else {
      toast.error('Failed');
    }
  };

  const addModule = () => {
    setModules([...modules, { title: '', description: '', duration: '' }]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Create New Course</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <Input {...register('title')} />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Price (₹)</label>
            <Input type="number" {...register('price')} />
          </div>
          <div>
            <label className="block font-medium mb-1">Level</label>
            <Select onValueChange={(v) => setValue('level', v)}>
              <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block font-medium mb-1">Duration</label>
            <Input {...register('duration')} placeholder="12 hours" />
          </div>
        </div>

        <div className="mt-4">
          <label className="block font-medium mb-1">Description</label>
          <Textarea {...register('description')} rows={3} />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium mb-1">Thumbnail URL</label>
            <Input {...register('thumbnail')} />
          </div>
          <div>
            <label className="block font-medium mb-1">Intro Video URL</label>
            <Input {...register('video_url')} />
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
                  onClick={() => setModules(modules.filter((_, idx) => idx !== i))}
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
            </Card>
          ))}
        </div>

        <Button type="submit" className="w-full mt-6">Create Course</Button>
      </Card>
    </form>
  );
}
