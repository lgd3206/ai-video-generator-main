export interface CaseStudy {
  id: string
  title: string
  subtitle: string
  company: string
  industry: string
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
    description: string
  }[]
  videoUrl: string
  thumbnail: string
  testimonial: {
    quote: string
    author: string
    position: string
    avatar: string
  }
  tags: string[]
  featured: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Tech Company Product Launch Video',
    subtitle: 'Professional product demo in 30 seconds',
    company: 'TechFlow Solutions',
    industry: 'SaaS Software',
    challenge: 'Needed to quickly create professional demo videos for new product launches. Traditional video production was expensive and time-consuming.',
    solution: 'Used AI Video Studio\'s text-to-video feature, inputting detailed product functionality descriptions and visual requirements.',
    results: [
      {
        metric: 'Production Time',
        value: '30 seconds',
        description: 'From concept to finished product'
      },
      {
        metric: 'Cost Savings',
        value: '95%',
        description: 'Compared to traditional video production'
      },
      {
        metric: 'Video Completion Rate',
        value: '87%',
        description: 'Social media performance'
      },
      {
        metric: 'Lead Growth',
        value: '156%',
        description: 'Within one week of launch'
      }
    ],
    videoUrl: 'https://example.com/case-study-1.mp4',
    thumbnail: '/cases/techflow-thumbnail.jpg',
    testimonial: {
      quote: 'AI Video Studio enabled us to have professional-grade demo videos ready on the day of our product launch. This combination of speed and quality is unprecedented.',
      author: 'Sarah Chen',
      position: 'Marketing Director',
      avatar: '/avatars/sarah-chen.jpg'
    },
    tags: ['SaaS', 'Product Demo', 'Text-to-Video', 'B2B Marketing'],
    featured: true
  },
  {
    id: '2',
    title: 'E-commerce Brand Commercial',
    subtitle: 'Creating dynamic ads from static product photos',
    company: 'Premium Lifestyle',
    industry: 'E-commerce Retail',
    challenge: 'Had many high-quality product photos but needed to transform them into engaging video ads to boost conversion rates.',
    solution: 'Used image-to-video functionality to add dynamic effects and background music to product photos.',
    results: [
      {
        metric: 'Conversion Rate Increase',
        value: '42%',
        description: 'Video ads vs static images'
      },
      {
        metric: 'Engagement',
        value: '3.2x',
        description: 'User interaction growth'
      },
      {
        metric: 'Production Efficiency',
        value: '10x',
        description: 'Compared to traditional production'
      },
      {
        metric: 'ROI',
        value: '280%',
        description: 'Advertising return on investment'
      }
    ],
    videoUrl: 'https://example.com/case-study-2.mp4',
    thumbnail: '/cases/premium-thumbnail.jpg',
    testimonial: {
      quote: 'Our product photos instantly became eye-catching video advertisements. Customer response has been extremely positive, with significant sales growth.',
      author: 'Michael Rodriguez',
      position: 'Marketing Manager',
      avatar: '/avatars/michael-rodriguez.jpg'
    },
    tags: ['E-commerce', 'Product Ads', 'Image-to-Video', 'Conversion Optimization'],
    featured: true
  },
  {
    id: '3',
    title: 'Educational Institution Course Promotion',
    subtitle: 'Quickly creating multilingual course previews',
    company: 'SmartLearn Online',
    industry: 'Online Education',
    challenge: 'Needed to quickly create preview videos for different courses, covering multiple subjects and language versions.',
    solution: 'Used batch text-to-video to rapidly generate promotional content suited to each subject\'s characteristics.',
    results: [
      {
        metric: 'Video Output',
        value: '50+',
        description: 'Completed in one week'
      },
      {
        metric: 'Course Enrollment',
        value: '89%',
        description: 'Growth rate'
      },
      {
        metric: 'Student Satisfaction',
        value: '4.8/5',
        description: 'Video quality rating'
      },
      {
        metric: 'Production Cost',
        value: '80% savings',
        description: 'Compared to outsourced production'
      }
    ],
    videoUrl: 'https://example.com/case-study-3.mp4',
    thumbnail: '/cases/smartlearn-thumbnail.jpg',
    testimonial: {
      quote: 'AI Video Studio helped us achieve scaled video content production, with each course having its own dedicated, beautiful preview.',
      author: 'Dr. Jennifer Liu',
      position: 'Academic Director',
      avatar: '/avatars/jennifer-liu.jpg'
    },
    tags: ['Education', 'Course Promotion', 'Batch Production', 'Multilingual'],
    featured: true
  },
  {
    id: '4',
    title: 'Restaurant Food Showcase Videos',
    subtitle: 'Transforming food photos into appetizing videos',
    company: 'Culinary Impressions',
    industry: 'Food Service',
    challenge: 'Wanted to better showcase dishes on social media to attract more customers.',
    solution: 'Used image-to-video functionality to add dynamic effects and atmospheric elements to food photos.',
    results: [
      {
        metric: 'Social Media Exposure',
        value: '300%',
        description: 'Growth rate'
      },
      {
        metric: 'In-store Traffic',
        value: '65%',
        description: 'Monthly growth'
      },
      {
        metric: 'Online Orders',
        value: '120%',
        description: 'Delivery platform growth'
      },
      {
        metric: 'Brand Awareness',
        value: 'Significant boost',
        description: 'Local market'
      }
    ],
    videoUrl: 'https://example.com/case-study-4.mp4',
    thumbnail: '/cases/culinary-thumbnail.jpg',
    testimonial: {
      quote: 'Our food videos went viral on TikTok! Now people come to our restaurant specifically to try the dishes they saw in the videos.',
      author: 'Chef Marcus Thompson',
      position: 'Restaurant Owner',
      avatar: '/avatars/marcus-thompson.jpg'
    },
    tags: ['Food & Beverage', 'Food Marketing', 'Social Media', 'Local Promotion'],
    featured: false
  },
  {
    id: '5',
    title: 'Real Estate Project Promotion',
    subtitle: 'Creating promotional videos from architectural renderings',
    company: 'GreenCity Properties',
    industry: 'Real Estate',
    challenge: 'Needed to transform architectural drawings and renderings into engaging promotional videos for potential buyers.',
    solution: 'Combined image-to-video and text descriptions to create immersive project showcase experiences.',
    results: [
      {
        metric: 'Property Viewings',
        value: '200%',
        description: 'Year-over-year growth'
      },
      {
        metric: 'Sales Conversion',
        value: '35%',
        description: 'Improvement rate'
      },
      {
        metric: 'Brand Exposure',
        value: '5M+',
        description: 'Total video views'
      },
      {
        metric: 'Customer Satisfaction',
        value: '92%',
        description: 'With promotional content'
      }
    ],
    videoUrl: 'https://example.com/case-study-5.mp4',
    thumbnail: '/cases/greencity-thumbnail.jpg',
    testimonial: {
      quote: 'Through AI-generated project videos, customers have a deep impression of our projects before visiting in person, significantly improving closing efficiency.',
      author: 'David Park',
      position: 'Sales Director',
      avatar: '/avatars/david-park.jpg'
    },
    tags: ['Real Estate', 'Project Showcase', 'Architectural Visualization', 'Sales Support'],
    featured: false
  },
  {
    id: '6',
    title: 'Fitness App Feature Demo',
    subtitle: 'Dynamic app interface showcase',
    company: 'FitMax Fitness',
    industry: 'Health Technology',
    challenge: 'Needed to create app feature demo videos to improve download conversion rates in app stores.',
    solution: 'Used screen recording and AI enhancement to create smooth app functionality demonstrations.',
    results: [
      {
        metric: 'App Downloads',
        value: '180%',
        description: 'Growth rate'
      },
      {
        metric: 'User Retention',
        value: '45%',
        description: '7-day retention rate'
      },
      {
        metric: 'Paid Conversion',
        value: '38%',
        description: 'Improvement rate'
      },
      {
        metric: 'App Store Rating',
        value: '4.6/5',
        description: 'App store rating'
      }
    ],
    videoUrl: 'https://example.com/case-study-6.mp4',
    thumbnail: '/cases/fitmax-thumbnail.jpg',
    testimonial: {
      quote: 'The AI-created demo video perfectly showcases our app\'s core features. Users understand immediately, and download conversion rates have increased dramatically.',
      author: 'Lisa Wang',
      position: 'Product Manager',
      avatar: '/avatars/lisa-wang.jpg'
    },
    tags: ['Mobile App', 'App Promotion', 'Feature Demo', 'Download Conversion'],
    featured: false
  }
]

export const industries = [
  { name: 'All', value: 'all', count: caseStudies.length },
  { name: 'SaaS Software', value: 'saas', count: 1 },
  { name: 'E-commerce', value: 'ecommerce', count: 1 },
  { name: 'Online Education', value: 'education', count: 1 },
  { name: 'Food Service', value: 'food', count: 1 },
  { name: 'Real Estate', value: 'realestate', count: 1 },
  { name: 'Health Tech', value: 'healthtech', count: 1 }
]