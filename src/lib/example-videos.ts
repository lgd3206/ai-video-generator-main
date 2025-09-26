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
    title: '科技产品发布会',
    description: '现代简约风格的智能手机产品展示，专业的灯光效果和流畅的产品旋转动画',
    category: '商业产品',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: '/examples/tech-product.jpg',
    prompt: '一个现代简约的科技产品发布视频，展示新款智能手机。背景是纯净的白色，产品以360度旋转展示，配有优雅的光影效果。整体风格专业现代，传达创新科技的感觉。',
    duration: 25,
    tags: ['产品展示', '科技', '商业', '现代简约'],
    featured: true,
    stats: {
      views: '12.5K',
      likes: '956',
      shares: '234'
    }
  },
  {
    id: '2',
    title: '美食制作过程',
    description: '温馨厨房环境中的披萨制作全过程，从揉面到烘烤的完整流程展示',
    category: '美食餐饮',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: '/examples/food-making.jpg',
    prompt: '制作一个诱人的披萨制作过程视频。从揉面团开始，到添加番茄酱、芝士和配菜，最后放入烤箱。背景是温暖的厨房环境，光线自然柔和，营造家庭烹饪的温馨氛围。',
    duration: 30,
    tags: ['美食制作', '餐饮', '烹饪过程', '温馨'],
    featured: true,
    stats: {
      views: '8.3K',
      likes: '742',
      shares: '189'
    }
  },
  {
    id: '3',
    title: '自然风景延时',
    description: '宁静湖泊的日出时光，金色天空倒映在清澈湖水中，鸟儿飞过天际',
    category: '自然风景',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: '/examples/nature-sunrise.jpg',
    prompt: '创建一个宁静的湖泊日出视频。清澈的湖水倒映着金色的天空，远山轮廓清晰，微风轻抚水面产生涟漪。几只鸟儿在天空飞过，整个画面传达宁静祥和的氛围。',
    duration: 35,
    tags: ['自然风景', '日出', '湖泊', '宁静'],
    featured: true,
    stats: {
      views: '15.2K',
      likes: '1.2K',
      shares: '456'
    }
  },
  {
    id: '4',
    title: '时尚品牌广告',
    description: '高端时尚品牌宣传片，优雅模特展示最新服装系列，配以动感音乐',
    category: '时尚品牌',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: '/examples/fashion-brand.jpg',
    prompt: '制作一个高端时尚品牌宣传视频。优雅的模特穿着最新季度的服装，在简约现代的工作室中走秀。柔和的灯光突出服装的质感和色彩，整体氛围高雅时尚。',
    duration: 28,
    tags: ['时尚', '品牌宣传', '服装', '高端'],
    featured: false,
    stats: {
      views: '9.7K',
      likes: '834',
      shares: '267'
    }
  },
  {
    id: '5',
    title: '企业办公环境',
    description: '现代化办公室的一天，团队协作和高效工作的场景展示',
    category: '企业商务',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: '/examples/office-work.jpg',
    prompt: '展示现代化办公室的一天。员工在开放式办公区域协作工作，会议室里进行头脑风暴，咖啡区域的轻松交流。整个环境现代、明亮，体现高效专业的工作氛围。',
    duration: 32,
    tags: ['企业文化', '办公环境', '团队合作', '现代'],
    featured: false,
    stats: {
      views: '6.8K',
      likes: '521',
      shares: '143'
    }
  },
  {
    id: '6',
    title: '抽象艺术动画',
    description: '色彩流动的抽象艺术动画，几何形状的变化和色彩的渐变过渡',
    category: '艺术创意',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnailUrl: '/examples/abstract-art.jpg',
    prompt: '创建一个抽象艺术动画视频。彩色的几何形状在画面中流动变化，色彩从蓝色渐变到紫色再到金色。形状包括圆形、三角形和不规则图形，整体感觉现代且富有创意。',
    duration: 20,
    tags: ['抽象艺术', '创意动画', '色彩', '几何'],
    featured: false,
    stats: {
      views: '4.5K',
      likes: '389',
      shares: '97'
    }
  }
]

export const categories = [
  { name: '全部', value: 'all' },
  { name: '商业产品', value: 'business' },
  { name: '美食餐饮', value: 'food' },
  { name: '自然风景', value: 'nature' },
  { name: '时尚品牌', value: 'fashion' },
  { name: '企业商务', value: 'corporate' },
  { name: '艺术创意', value: 'art' }
]