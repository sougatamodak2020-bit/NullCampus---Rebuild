// src/data/courses.ts

export interface Course {
  id: number;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  instructor: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
  };
  duration: string;
  students: number;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  level: string;
  language: string;
  lastUpdated: string;
  trending?: boolean;
  featured?: boolean;
  lessons: number;
  features: string[];
  whatYouLearn: string[];
  requirements: string[];
  curriculum: {
    section: string;
    lessons: number;
    duration: string;
    topics: string[];
  }[];
}

export const coursesData: Record<string, Course> = {
  'web-development-masterclass': {
    id: 1,
    slug: 'web-development-masterclass',
    title: 'Web Development Masterclass',
    description: 'Learn HTML, CSS, JavaScript, React, and Next.js from scratch',
    fullDescription: 'Master modern web development with this comprehensive course. You will learn everything from the basics of HTML and CSS to advanced React and Next.js concepts. Build real-world projects and gain the skills needed to become a professional web developer.',
    instructor: {
      name: 'John Doe',
      title: 'Senior Full-Stack Developer',
      bio: '10+ years of experience in web development',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'
    },
    duration: '40 hours',
    students: 2500,
    rating: 4.8,
    reviews: 450,
    price: 4999,
    originalPrice: 9999,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
    category: 'Development',
    level: 'Beginner to Advanced',
    language: 'English',
    lastUpdated: 'November 2024',
    trending: true,     // ← NOW VALID
    featured: false,    // ← NOW VALID
    lessons: 156,
    features: [
      '40 hours of on-demand video',
      '156 downloadable resources',
      'Full lifetime access',
      'Access on mobile and TV',
      'Certificate of completion',
      'Direct instructor support',
      'Money-back guarantee'
    ],
    whatYouLearn: [
      'Build responsive websites with HTML5 and CSS3',
      'Master JavaScript ES6+ and modern features',
      'Create interactive UIs with React.js',
      'Build full-stack applications with Next.js',
      'Deploy applications to production',
      'Work with APIs and databases'
    ],
    requirements: [
      'A computer with internet access',
      'No prior coding experience needed',
      'Willingness to learn and practice'
    ],
    curriculum: [
      {
        section: 'Introduction to Web Development',
        lessons: 12,
        duration: '2 hours',
        topics: [
          'What is Web Development?',
          'Setting up your development environment',
          'Your first HTML page',
          'Understanding how the web works'
        ]
      },
      {
        section: 'HTML & CSS Fundamentals',
        lessons: 25,
        duration: '5 hours',
        topics: [
          'HTML5 semantic elements',
          'CSS3 styling and layouts',
          'Flexbox and Grid',
          'Responsive design principles'
        ]
      },
      {
        section: 'JavaScript Essentials',
        lessons: 35,
        duration: '8 hours',
        topics: [
          'Variables and data types',
          'Functions and scope',
          'DOM manipulation',
          'Async JavaScript and APIs'
        ]
      },
      {
        section: 'React.js Deep Dive',
        lessons: 40,
        duration: '12 hours',
        topics: [
          'Components and props',
          'State and lifecycle',
          'Hooks in depth',
          'Context API and state management'
        ]
      },
      {
        section: 'Next.js & Server-Side Rendering',
        lessons: 30,
        duration: '10 hours',
        topics: [
          'Next.js fundamentals',
          'File-based routing',
          'Server-side rendering',
          'API routes and backend'
        ]
      },
      {
        section: 'Building Real-World Projects',
        lessons: 14,
        duration: '3 hours',
        topics: [
          'E-commerce website',
          'Blog platform',
          'Social media dashboard',
          'Portfolio website'
        ]
      }
    ]
  },

  'ui-ux-design-fundamentals': {
    id: 2,
    slug: 'ui-ux-design-fundamentals',
    title: 'UI/UX Design Fundamentals',
    description: 'Master the principles of user interface and user experience design',
    fullDescription: 'Learn the fundamentals of UI/UX design and create stunning, user-friendly interfaces. This course covers design thinking, wireframing, prototyping, and modern design tools like Figma and Adobe XD.',
    instructor: {
      name: 'Jane Smith',
      title: 'Lead UX Designer',
      bio: '8+ years designing for Fortune 500 companies',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80'
    },
    duration: '30 hours',
    students: 1800,
    rating: 4.9,
    reviews: 320,
    price: 3999,
    originalPrice: 7999,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    category: 'Design',
    level: 'Beginner',
    language: 'English',
    lastUpdated: 'October 2024',
    trending: false,
    featured: true,     // ← NOW VALID
    lessons: 120,
    features: [
      '30 hours of design content',
      'Design projects and assignments',
      'Figma & Adobe XD tutorials',
      'Portfolio-ready projects',
      'Industry best practices',
      'Lifetime access',
      'Certificate of completion'
    ],
    whatYouLearn: [
      'Understand design thinking process',
      'Create wireframes and prototypes',
      'Master visual design principles',
      'Conduct user research',
      'Use Figma and Adobe XD professionally',
      'Build a design portfolio'
    ],
    requirements: [
      'A computer with Figma (free) installed',
      'No design experience required',
      'Passion for creating great user experiences'
    ],
    curriculum: [
      {
        section: 'Introduction to UI/UX',
        lessons: 15,
        duration: '3 hours',
        topics: [
          'What is UI/UX design?',
          'Design thinking mindset',
          'Tools and software overview',
          'Career paths in design'
        ]
      },
      {
        section: 'Design Thinking Process',
        lessons: 20,
        duration: '5 hours',
        topics: [
          'Empathize with users',
          'Define problem statements',
          'Ideation techniques',
          'Prototyping and testing'
        ]
      },
      {
        section: 'Wireframing & Prototyping',
        lessons: 25,
        duration: '7 hours',
        topics: [
          'Low-fidelity wireframes',
          'High-fidelity mockups',
          'Interactive prototypes',
          'User flows and site maps'
        ]
      },
      {
        section: 'Visual Design Principles',
        lessons: 30,
        duration: '8 hours',
        topics: [
          'Color theory',
          'Typography',
          'Layout and composition',
          'Design systems'
        ]
      },
      {
        section: 'User Research Methods',
        lessons: 20,
        duration: '5 hours',
        topics: [
          'User interviews',
          'Surveys and questionnaires',
          'Usability testing',
          'Analytics and metrics'
        ]
      },
      {
        section: 'Final Design Project',
        lessons: 10,
        duration: '2 hours',
        topics: [
          'Project brief and planning',
          'Research and ideation',
          'Design and prototype',
          'Present your work'
        ]
      }
    ]
  },

  'data-science-python': {
    id: 3,
    slug: 'data-science-python',
    title: 'Data Science with Python',
    description: 'Learn data analysis, visualization, and machine learning',
    fullDescription: 'Dive into the world of data science with Python. Master data analysis, visualization, and machine learning techniques used by top tech companies. Build real projects and learn to extract insights from data.',
    instructor: {
      name: 'Mike Johnson',
      title: 'Data Science Lead',
      bio: 'PhD in Machine Learning, 12+ years in data science',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80'
    },
    duration: '50 hours',
    students: 3200,
    rating: 4.7,
    reviews: 580,
    price: 5999,
    originalPrice: 12999,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    category: 'Data Science',
    level: 'Intermediate',
    language: 'English',
    lastUpdated: 'November 2024',
    trending: true,     // ← NOW VALID
    featured: false,    // ← NOW VALID
    lessons: 180,
    features: [
      '50 hours of comprehensive content',
      'Hands-on Python projects',
      'Real-world datasets',
      'Machine learning algorithms',
      'Jupyter notebooks included',
      'Career guidance',
      'Certificate of completion'
    ],
    whatYouLearn: [
      'Python programming for data science',
      'Data analysis with Pandas and NumPy',
      'Data visualization with Matplotlib and Seaborn',
      'Machine learning with Scikit-learn',
      'Deep learning basics with TensorFlow',
      'Deploy ML models to production'
    ],
    requirements: [
      'Basic programming knowledge',
      'Understanding of mathematics (algebra)',
      'Python installed on your computer'
    ],
    curriculum: [
      {
        section: 'Python for Data Science',
        lessons: 30,
        duration: '8 hours',
        topics: [
          'Python basics review',
          'NumPy fundamentals',
          'Pandas for data manipulation',
          'Working with data files'
        ]
      },
      {
        section: 'Data Analysis & Cleaning',
        lessons: 35,
        duration: '10 hours',
        topics: [
          'Exploratory data analysis',
          'Data cleaning techniques',
          'Handling missing data',
          'Feature engineering'
        ]
      },
      {
        section: 'Data Visualization',
        lessons: 25,
        duration: '7 hours',
        topics: [
          'Matplotlib basics',
          'Advanced Seaborn',
          'Interactive plots with Plotly',
          'Dashboard creation'
        ]
      },
      {
        section: 'Machine Learning',
        lessons: 50,
        duration: '15 hours',
        topics: [
          'Supervised learning',
          'Unsupervised learning',
          'Model evaluation',
          'Hyperparameter tuning'
        ]
      },
      {
        section: 'Deep Learning Basics',
        lessons: 25,
        duration: '7 hours',
        topics: [
          'Neural networks introduction',
          'TensorFlow and Keras',
          'Image classification',
          'Natural language processing'
        ]
      },
      {
        section: 'Real-World Projects',
        lessons: 15,
        duration: '3 hours',
        topics: [
          'Customer churn prediction',
          'Stock price analysis',
          'Sentiment analysis',
          'Recommendation system'
        ]
      }
    ]
  }
};