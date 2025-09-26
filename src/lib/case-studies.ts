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
    title: '科技公司产品发布视频',
    subtitle: '30秒内制作专业产品演示',
    company: 'TechFlow Solutions',
    industry: 'SaaS软件',
    challenge: '需要快速为新产品发布创建专业演示视频，传统制作方式成本高、周期长',
    solution: '使用AI Video Studio的文本转视频功能，输入详细的产品功能描述和视觉要求',
    results: [
      {
        metric: '制作时间',
        value: '30秒',
        description: '从概念到成品'
      },
      {
        metric: '成本节省',
        value: '95%',
        description: '相比传统视频制作'
      },
      {
        metric: '观看完成率',
        value: '87%',
        description: '社交媒体表现'
      },
      {
        metric: '潜在客户增长',
        value: '156%',
        description: '发布后一周内'
      }
    ],
    videoUrl: 'https://example.com/case-study-1.mp4',
    thumbnail: '/cases/techflow-thumbnail.jpg',
    testimonial: {
      quote: 'AI Video Studio让我们在产品发布当天就拥有了专业级的演示视频。这种速度和质量的结合是前所未有的。',
      author: '张明',
      position: '市场总监',
      avatar: '/avatars/zhang-ming.jpg'
    },
    tags: ['SaaS', '产品演示', '文本转视频', 'B2B营销'],
    featured: true
  },
  {
    id: '2',
    title: '电商品牌宣传片',
    subtitle: '从静态产品图创建动态广告',
    company: '优选生活',
    industry: '电商零售',
    challenge: '拥有大量高质量产品照片，但需要将其转化为吸引人的视频广告来提升转化率',
    solution: '利用图片转视频功能，为产品照片添加动态效果和背景音乐',
    results: [
      {
        metric: '转化率提升',
        value: '42%',
        description: '视频广告vs静态图片'
      },
      {
        metric: '参与度',
        value: '3.2倍',
        description: '用户互动增长'
      },
      {
        metric: '制作效率',
        value: '10倍',
        description: '相比传统制作'
      },
      {
        metric: 'ROI',
        value: '280%',
        description: '广告投资回报率'
      }
    ],
    videoUrl: 'https://example.com/case-study-2.mp4',
    thumbnail: '/cases/youxuan-thumbnail.jpg',
    testimonial: {
      quote: '我们的产品照片瞬间变成了吸引眼球的视频广告。客户反响非常积极，销量显著提升。',
      author: '李雯',
      position: '营销经理',
      avatar: '/avatars/li-wen.jpg'
    },
    tags: ['电商', '产品广告', '图片转视频', '转化优化'],
    featured: true
  },
  {
    id: '3',
    title: '教育机构课程推广',
    subtitle: '快速制作多语言课程预告',
    company: '智学在线',
    industry: '在线教育',
    challenge: '需要为不同课程快速制作预告视频，覆盖多个学科和语言版本',
    solution: '通过批量文本转视频，快速生成符合各学科特点的课程宣传内容',
    results: [
      {
        metric: '视频产出',
        value: '50+',
        description: '一周内完成'
      },
      {
        metric: '课程报名',
        value: '89%',
        description: '增长率'
      },
      {
        metric: '学员满意度',
        value: '4.8/5',
        description: '视频质量评分'
      },
      {
        metric: '制作成本',
        value: '节省80%',
        description: '相比外包制作'
      }
    ],
    videoUrl: 'https://example.com/case-study-3.mp4',
    thumbnail: '/cases/zhixue-thumbnail.jpg',
    testimonial: {
      quote: 'AI Video Studio帮助我们实现了规模化的视频内容生产，每个课程都有了专属的精美预告片。',
      author: '王教授',
      position: '教学总监',
      avatar: '/avatars/wang-professor.jpg'
    },
    tags: ['教育', '课程推广', '批量制作', '多语言'],
    featured: true
  },
  {
    id: '4',
    title: '餐厅菜品展示视频',
    subtitle: '美食照片变身诱人视频',
    company: '味蕾印象',
    industry: '餐饮服务',
    challenge: '想要在社交媒体上更好地展示菜品，吸引更多顾客',
    solution: '使用图片转视频功能，为菜品照片添加动态效果和氛围营造',
    results: [
      {
        metric: '社交媒体曝光',
        value: '300%',
        description: '增长幅度'
      },
      {
        metric: '到店客流',
        value: '65%',
        description: '月度增长'
      },
      {
        metric: '在线订单',
        value: '120%',
        description: '外卖平台增长'
      },
      {
        metric: '品牌认知',
        value: '显著提升',
        description: '本地市场'
      }
    ],
    videoUrl: 'https://example.com/case-study-4.mp4',
    thumbnail: '/cases/weilei-thumbnail.jpg',
    testimonial: {
      quote: '我们的菜品视频在抖音上爆火了！现在每天都有很多人专门来店里品尝视频里的菜。',
      author: '陈厨师',
      position: '餐厅主理人',
      avatar: '/avatars/chen-chef.jpg'
    },
    tags: ['餐饮', '美食营销', '社交媒体', '本地推广'],
    featured: false
  },
  {
    id: '5',
    title: '房地产项目宣传',
    subtitle: '建筑效果图制作宣传视频',
    company: '绿城地产',
    industry: '房地产',
    challenge: '需要将建筑设计图和效果图转化为吸引购房者的宣传视频',
    solution: '结合图片转视频和文本描述，创建沉浸式的项目展示体验',
    results: [
      {
        metric: '看房预约',
        value: '200%',
        description: '同期增长'
      },
      {
        metric: '销售转化',
        value: '35%',
        description: '提升幅度'
      },
      {
        metric: '品牌曝光',
        value: '500万+',
        description: '视频总播放量'
      },
      {
        metric: '客户满意度',
        value: '92%',
        description: '对宣传内容'
      }
    ],
    videoUrl: 'https://example.com/case-study-5.mp4',
    thumbnail: '/cases/lvcheng-thumbnail.jpg',
    testimonial: {
      quote: '通过AI生成的项目视频，客户在实地看房前就对我们的项目有了深刻印象，大大提高了成交效率。',
      author: '赵总',
      position: '销售总监',
      avatar: '/avatars/zhao-director.jpg'
    },
    tags: ['房地产', '项目展示', '建筑可视化', '销售支持'],
    featured: false
  },
  {
    id: '6',
    title: '健身APP功能演示',
    subtitle: '应用界面动态展示',
    company: 'FitMax健身',
    industry: '健康科技',
    challenge: '需要制作APP功能演示视频，提升应用商店的下载转化率',
    solution: '通过屏幕录制和AI增强，创建流畅的应用功能演示',
    results: [
      {
        metric: 'APP下载量',
        value: '180%',
        description: '增长幅度'
      },
      {
        metric: '用户留存',
        value: '45%',
        description: '7日留存率'
      },
      {
        metric: '付费转化',
        value: '38%',
        description: '提升比例'
      },
      {
        metric: '应用评分',
        value: '4.6/5',
        description: '应用商店评分'
      }
    ],
    videoUrl: 'https://example.com/case-study-6.mp4',
    thumbnail: '/cases/fitmax-thumbnail.jpg',
    testimonial: {
      quote: 'AI制作的演示视频完美展现了我们APP的核心功能，用户一看就懂，下载转化率大幅提升。',
      author: '刘产品',
      position: '产品经理',
      avatar: '/avatars/liu-pm.jpg'
    },
    tags: ['移动应用', 'APP推广', '功能演示', '下载转化'],
    featured: false
  }
]

export const industries = [
  { name: '全部', value: 'all', count: caseStudies.length },
  { name: 'SaaS软件', value: 'saas', count: 1 },
  { name: '电商零售', value: 'ecommerce', count: 1 },
  { name: '在线教育', value: 'education', count: 1 },
  { name: '餐饮服务', value: 'food', count: 1 },
  { name: '房地产', value: 'realestate', count: 1 },
  { name: '健康科技', value: 'healthtech', count: 1 }
]