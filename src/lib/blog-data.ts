export interface BlogPost {
  id: string
  title: string
  slug: string
  description: string
  content: string
  author: string
  publishedAt: Date
  updatedAt: Date
  tags: string[]
  category: string
  featured: boolean
  readingTime: number
  image: string
  seo: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  postCount: number
}

export const blogCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'AI Video Tutorials',
    slug: 'tutorials',
    description: 'Learn how to create stunning video content with AI technology',
    postCount: 12
  },
  {
    id: '2',
    name: 'Industry Trends',
    slug: 'trends',
    description: 'Latest developments and trend analysis in AI video generation',
    postCount: 8
  },
  {
    id: '3',
    name: 'Case Studies',
    slug: 'case-studies',
    description: 'Real success stories from AI video creators and businesses',
    postCount: 15
  },
  {
    id: '4',
    name: 'Technical Insights',
    slug: 'technical',
    description: 'Deep dive into AI video generation technology and principles',
    postCount: 6
  }
]

export const featuredPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Create Professional Promo Videos with AI in 30 Seconds',
    slug: 'create-professional-promo-video-in-30-seconds',
    description: 'Complete tutorial: From text description to finished video, learn how to make high-quality commercial promotional videos with AI',
    content: '',
    author: 'AI Video Studio Team',
    publishedAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    tags: ['Tutorial', 'Text-to-Video', 'Business Videos', 'Quick Creation'],
    category: 'tutorials',
    featured: true,
    readingTime: 5,
    image: '/blog/professional-promo-video.jpg',
    seo: {
      title: 'How to Create Professional Promo Videos with AI in 30 Seconds | AI Video Studio Tutorial',
      description: 'Learn to use AI video generator to quickly create professional promotional videos. Complete tutorial from text description to finished product in just 30 seconds.',
      keywords: ['AI promo video creation', 'text to video tutorial', 'quick video production', 'AI video generator tutorial']
    }
  },
  {
    id: '2',
    title: 'Image Animation: Bring Static Photos to Life Instantly',
    slug: 'animate-static-photos-with-ai',
    description: 'Explore AI image animation technology and learn how to convert any static image into dynamic video content',
    content: '',
    author: 'AI Video Studio Team',
    publishedAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    tags: ['Image Animation', 'Image-to-Video', 'AI Animation', 'Photo Processing'],
    category: 'tutorials',
    featured: true,
    readingTime: 4,
    image: '/blog/photo-animation.jpg',
    seo: {
      title: 'Image Animation: Bring Static Photos to Life Instantly | AI Animation Tutorial',
      description: 'Learn to use AI technology to convert static photos into dynamic videos. Detailed tutorial with best practices and tips.',
      keywords: ['AI image animation', 'photo to video', 'AI photo animation', 'static image animation']
    }
  },
  {
    id: '3',
    title: '2024 AI Video Generation Technology Trends Forecast',
    slug: 'ai-video-generation-trends-2024',
    description: 'In-depth analysis of AI video generation technology development directions and market opportunities in 2024',
    content: '',
    author: 'AI Research Team',
    publishedAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    tags: ['Industry Trends', 'AI Technology', 'Market Analysis', 'Future Development'],
    category: 'trends',
    featured: true,
    readingTime: 8,
    image: '/blog/ai-trends-2024.jpg',
    seo: {
      title: '2024 AI Video Generation Technology Trends Forecast | Industry Analysis Report',
      description: 'Comprehensive analysis of AI video generation technology trends, market opportunities, and technological breakthroughs in 2024.',
      keywords: ['AI video trends 2024', 'AI video technology development', 'AI video market analysis', 'artificial intelligence video generation']
    }
  }
]