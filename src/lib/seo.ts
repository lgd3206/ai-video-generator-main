export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product' | 'video'
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  noindex?: boolean
  nofollow?: boolean
}

export const defaultSEO: SEOConfig = {
  title: 'AI Video Studio - Create Stunning AI Videos in Seconds',
  description: 'Transform your text prompts and images into captivating videos using cutting-edge AI technology. No video editing experience required. Start creating amazing videos today.',
  keywords: [
    'AI video generator',
    'text to video AI',
    'image to video AI',
    'AI video creation',
    'automated video generation',
    'artificial intelligence video maker',
    'video AI tool',
    'AI animation generator',
    'text to video converter',
    'free AI video generator',
    'professional video creation',
    'instant video maker'
  ],
  ogType: 'website',
  twitterCard: 'summary_large_image'
}

export const siteConfig = {
  name: 'AI Video Studio',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com',
  description: defaultSEO.description,
  links: {
    twitter: 'https://twitter.com/aivideostudio',
    github: 'https://github.com/your-username/ai-video-generator'
  }
}

export function generateMetadata(config: Partial<SEOConfig> = {}) {
  const seo = { ...defaultSEO, ...config }
  const title = seo.title
  const description = seo.description

  return {
    title,
    description,
    keywords: seo.keywords?.join(', '),
    authors: [{ name: 'AI Video Studio' }],
    creator: 'AI Video Studio',
    publisher: 'AI Video Studio',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: seo.canonical || '/',
    },
    openGraph: {
      type: seo.ogType || 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: seo.ogImage || '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: seo.twitterCard || 'summary_large_image',
      title,
      description,
      images: [seo.ogImage || '/og-image.png'],
      creator: '@aivideostudio',
    },
    robots: {
      index: !seo.noindex,
      follow: !seo.nofollow,
      googleBot: {
        index: !seo.noindex,
        follow: !seo.nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
  }
}

export const pageConfigs = {
  home: {
    title: 'AI Video Generator - Create Professional Videos from Text & Images | AI Video Studio',
    description: 'Transform your text prompts and images into stunning professional videos using cutting-edge AI technology. No video editing experience required. Start creating amazing videos today.',
    keywords: ['AI video generator', 'text to video AI', 'image to video AI', 'AI video creation', 'automated video generation', 'artificial intelligence video maker', 'video AI tool', 'AI animation generator', 'free video generator', 'online video creator', 'instant video maker', 'professional video creation']
  },
  textToVideo: {
    title: 'Text to Video AI Generator - Create Videos from Text Prompts | AI Video Studio',
    description: 'Generate amazing videos from text descriptions using advanced AI. Simply write your prompt and watch as AI creates professional-quality videos in seconds.',
    keywords: ['text to video AI', 'text to video generator', 'AI video from text', 'prompt to video', 'text-based video creation', 'AI text video maker', 'convert text to video', 'AI script to video']
  },
  imageToVideo: {
    title: 'Image to Video AI - Animate Your Photos with AI | AI Video Studio',
    description: 'Transform static images into dynamic videos with AI animation. Upload any photo and create stunning animated videos with realistic motion effects.',
    keywords: ['image to video AI', 'photo animation AI', 'animate images', 'image animation generator', 'AI photo to video converter', 'picture to video AI', 'animate photos online', 'AI image animation']
  },
  dashboard: {
    title: 'Dashboard - Manage Your AI Video Projects | AI Video Studio',
    description: 'Access your AI video generation history, manage projects, and track your video creation progress. View all your generated videos in one place.',
    keywords: ['AI video dashboard', 'video project management', 'AI video history', 'video generation tracking', 'video creation dashboard']
  },
  signin: {
    title: 'Sign In - AI Video Studio | Professional AI Video Generator',
    description: 'Sign in to your AI Video Studio account to start creating amazing videos with artificial intelligence technology.',
    keywords: ['sign in', 'login', 'AI video account', 'video generator login', 'AI video studio login']
  },
  signup: {
    title: 'Sign Up - Start Creating AI Videos Today | AI Video Studio',
    description: 'Create your free AI Video Studio account and start generating professional-quality videos from text and images using advanced AI technology.',
    keywords: ['sign up', 'register', 'create account', 'AI video registration', 'free AI video generator', 'AI video studio account']
  },
  blog: {
    title: 'AI Video Creation Blog & Tutorials | Tips & Case Studies | AI Video Studio',
    description: 'Learn AI video creation techniques, get expert tips, and explore successful case studies. Master the art of creating professional videos with AI.',
    keywords: ['AI video tutorials', 'video creation tips', 'AI video blog', 'video generation guide', 'AI video case studies', 'video making techniques']
  },
  examples: {
    title: 'AI Video Examples & Gallery | Inspiring AI-Generated Videos | AI Video Studio',
    description: 'Browse our gallery of stunning AI-generated videos. Get inspired by examples created with text prompts and image animations.',
    keywords: ['AI video examples', 'AI generated videos', 'video gallery', 'AI video showcase', 'AI video samples', 'video creation inspiration']
  },
  cases: {
    title: 'Success Stories & Case Studies | Real AI Video Results | AI Video Studio',
    description: 'Discover how businesses and creators are using AI Video Studio to achieve amazing results. Real case studies with metrics and outcomes.',
    keywords: ['AI video case studies', 'success stories', 'video marketing results', 'AI video ROI', 'business video creation', 'video generation success']
  },
  tryFree: {
    title: 'Free AI Video Generator Trial | No Credit Card Required | AI Video Studio',
    description: 'Try our AI video generator for free! Create professional videos from text or images in 30 seconds. No registration or credit card required.',
    keywords: ['free AI video generator', 'free video trial', 'no credit card video maker', 'free AI video creation', 'try AI video generator', 'free online video creator', 'no signup video generator', 'instant free video']
  }
}