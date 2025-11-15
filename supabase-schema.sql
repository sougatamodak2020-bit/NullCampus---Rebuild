-- Supabase Schema for NullCampus

-- Users Profile Extension
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  avatar_3d TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  thumbnail TEXT,
  video_url TEXT,
  level TEXT CHECK (level IN ("Beginner", "Intermediate", "Advanced")),
  duration TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  enrolled_count INT DEFAULT 0,
  tags TEXT[],
  tutor_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  payment_id TEXT,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  progress DECIMAL(5,2) DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  UNIQUE(user_id, course_id)
);

-- Modules Table
CREATE TABLE IF NOT EXISTS modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lessons Table
CREATE TABLE IF NOT EXISTS lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration TEXT,
  order_index INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id),
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT "INR",
  status TEXT DEFAULT "pending",
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, user_id)
);

-- 3D Avatars Table
CREATE TABLE IF NOT EXISTS avatars_3d (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  model_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE avatars_3d ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Courses are viewable by everyone" ON courses FOR SELECT USING (true);
CREATE POLICY "Users can view their enrollments" ON enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create enrollments" ON enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Avatars viewable by everyone" ON avatars_3d FOR SELECT USING (true);

-- Create trigger for updating profiles
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, display_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>"display_name");
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert sample data
INSERT INTO courses (slug, title, description, price, level, duration, rating, enrolled_count, tags) VALUES
  ("react-mastery", "React Mastery: From Zero to Hero", "Master React 18, Next.js 14, and modern web development", 4999, "Intermediate", "40 hours", 4.8, 2341, ARRAY["React", "Next.js", "TypeScript"]),
  ("ai-fundamentals", "AI & Machine Learning Fundamentals", "Learn AI/ML from scratch with Python and TensorFlow", 5999, "Beginner", "60 hours", 4.9, 1856, ARRAY["Python", "TensorFlow", "ML"]),
  ("ui-ux-design", "UI/UX Design Masterclass", "Create stunning interfaces with Figma", 3999, "Beginner", "35 hours", 4.7, 3124, ARRAY["Figma", "Design", "UX"]);
