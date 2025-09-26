export interface ExampleVideo {
  id: string
  title: string
  description: string
  category: string
  videoUrl: string
  thumbnailUrl: string
  prompt: string
  duration: number
  tags: string[]
  featured: boolean
  stats: {
    views: string
    likes: string
    shares: string
  }
}

export const exampleVideos: ExampleVideo[] = [
  {
    id: '1',
    title: 'Tech Product Launch',
    description: 'Modern minimalist smartphone product showcase with professional lighting effects and smooth product rotation animations',
    category: 'Business Products',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: '/examples/tech-product.jpg',
    prompt: 'A modern minimalist tech product launch video showcasing a new smartphone. Pure white background, product rotating 360 degrees with elegant light and shadow effects. Professional modern style conveying innovative technology.',
    duration: 25,
    tags: ['Product Showcase', 'Technology', 'Business', 'Modern'],
    featured: true,
    stats: {
      views: '12.5K',
      likes: '956',
      shares: '234'
    }
  },
  {
    id: '2',
    title: 'Food Making Process',
    description: 'Complete pizza making process in a cozy kitchen environment, from kneading dough to baking',
    category: 'Food & Dining',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: '/examples/food-making.jpg',
    prompt: 'Create an appetizing pizza making process video. Starting from kneading dough, adding tomato sauce, cheese and toppings, finally putting it in the oven. Warm kitchen environment with natural soft lighting, creating a cozy home cooking atmosphere.',
    duration: 30,
    tags: ['Food Making', 'Cooking', 'Process', 'Cozy'],
    featured: true,
    stats: {
      views: '8.3K',
      likes: '742',
      shares: '189'
    }
  },
  {
    id: '3',
    title: 'Nature Landscape Timelapse',
    description: 'Peaceful lake at sunrise with golden sky reflecting in clear water, birds flying across the horizon',
    category: 'Nature Landscape',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: '/examples/nature-sunrise.jpg',
    prompt: 'Create a peaceful lake sunrise video. Clear lake water reflecting golden sky, distant mountains clearly outlined, gentle breeze creating ripples on water surface. A few birds flying across the sky, conveying a serene and peaceful atmosphere.',
    duration: 35,
    tags: ['Nature', 'Sunrise', 'Lake', 'Peaceful'],
    featured: true,
    stats: {
      views: '15.2K',
      likes: '1.2K',
      shares: '456'
    }
  },
  {
    id: '4',
    title: 'Fashion Brand Commercial',
    description: 'High-end fashion brand promotional video with elegant model showcasing latest clothing collection',
    category: 'Fashion Brand',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: '/examples/fashion-brand.jpg',
    prompt: 'Create a high-end fashion brand promotional video. Elegant model wearing latest season clothing, runway show in minimalist modern studio. Soft lighting highlighting fabric texture and colors, overall atmosphere elegant and fashionable.',
    duration: 28,
    tags: ['Fashion', 'Brand', 'Clothing', 'Luxury'],
    featured: false,
    stats: {
      views: '9.7K',
      likes: '834',
      shares: '267'
    }
  },
  {
    id: '5',
    title: 'Corporate Office Environment',
    description: 'A day in modern office showcasing team collaboration and efficient work scenarios',
    category: 'Corporate Business',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: '/examples/office-work.jpg',
    prompt: 'Show a day in modern office. Employees collaborating in open office area, brainstorming in meeting rooms, casual conversations in coffee area. Modern, bright environment showcasing efficient professional work atmosphere.',
    duration: 32,
    tags: ['Corporate Culture', 'Office', 'Teamwork', 'Modern'],
    featured: false,
    stats: {
      views: '6.8K',
      likes: '521',
      shares: '143'
    }
  },
  {
    id: '6',
    title: 'Abstract Art Animation',
    description: 'Flowing abstract art animation with geometric shape transformations and color gradient transitions',
    category: 'Art & Creative',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnailUrl: '/examples/abstract-art.jpg',
    prompt: 'Create an abstract art animation video. Colorful geometric shapes flowing and transforming in the frame, colors transitioning from blue to purple to gold. Shapes include circles, triangles and irregular forms, overall feeling modern and creative.',
    duration: 20,
    tags: ['Abstract Art', 'Creative Animation', 'Colors', 'Geometric'],
    featured: false,
    stats: {
      views: '4.5K',
      likes: '389',
      shares: '97'
    }
  }
]

export const categories = [
  { name: 'All', value: 'all' },
  { name: 'Business Products', value: 'business' },
  { name: 'Food & Dining', value: 'food' },
  { name: 'Nature Landscape', value: 'nature' },
  { name: 'Fashion Brand', value: 'fashion' },
  { name: 'Corporate Business', value: 'corporate' },
  { name: 'Art & Creative', value: 'art' }
]