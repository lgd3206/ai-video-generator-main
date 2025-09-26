// API服务接口定义
export interface VideoGenerationService {
  generateFromText(params: TextToVideoParams): Promise<VideoGenerationResult>
  generateFromImage(params: ImageToVideoParams): Promise<VideoGenerationResult>
  getGenerationStatus(jobId: string): Promise<GenerationStatus>
  cancelGeneration(jobId: string): Promise<boolean>
}

// Replicate API集成
export class ReplicateService implements VideoGenerationService {
  private apiKey: string
  private baseUrl = 'https://api.replicate.com/v1'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generateFromText(params: TextToVideoParams): Promise<VideoGenerationResult> {
    const response = await fetch(`${this.baseUrl}/predictions`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: "text-to-video-model-version", // 实际的模型版本
        input: {
          prompt: params.prompt,
          duration: params.duration,
          fps: params.fps,
          resolution: params.resolution
        }
      })
    })

    const result = await response.json()
    return {
      jobId: result.id,
      status: 'processing',
      estimatedTime: result.estimated_time || 60
    }
  }

  async generateFromImage(params: ImageToVideoParams): Promise<VideoGenerationResult> {
    const response = await fetch(`${this.baseUrl}/predictions`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: "image-to-video-model-version", // 实际的模型版本
        input: {
          image: params.imageUrl,
          prompt: params.prompt,
          motion_strength: params.motionStrength
        }
      })
    })

    const result = await response.json()
    return {
      jobId: result.id,
      status: 'processing',
      estimatedTime: result.estimated_time || 30
    }
  }

  async getGenerationStatus(jobId: string): Promise<GenerationStatus> {
    const response = await fetch(`${this.baseUrl}/predictions/${jobId}`, {
      headers: {
        'Authorization': `Token ${this.apiKey}`
      }
    })

    const result = await response.json()
    return {
      status: result.status, // 'processing', 'succeeded', 'failed'
      progress: result.progress || 0,
      videoUrl: result.output?.[0],
      error: result.error
    }
  }
}

// RunwayML API集成
export class RunwayMLService implements VideoGenerationService {
  private apiKey: string
  private baseUrl = 'https://api.runwayml.com/v1'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generateFromText(params: TextToVideoParams): Promise<VideoGenerationResult> {
    const response = await fetch(`${this.baseUrl}/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gen-2',
        prompt: params.prompt,
        duration: params.duration,
        aspect_ratio: '16:9'
      })
    })

    const result = await response.json()
    return {
      jobId: result.id,
      status: 'processing',
      estimatedTime: 90
    }
  }

  // 实现其他方法...
}

// API路由实现
// pages/api/generate/text-to-video.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { ReplicateService } from '@/lib/ai-services'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const { prompt, duration = 4, fps = 24 } = req.body

    // 检查用户配额
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true }
    })

    if (!user || user.credits < 1) {
      return res.status(403).json({ error: 'Insufficient credits' })
    }

    // 调用AI服务
    const service = new ReplicateService(process.env.REPLICATE_API_TOKEN!)
    const result = await service.generateFromText({
      prompt,
      duration,
      fps,
      resolution: '1024x576'
    })

    // 保存生成记录
    const generation = await prisma.videoGeneration.create({
      data: {
        userId: user.id,
        type: 'TEXT_TO_VIDEO',
        prompt,
        status: 'PROCESSING',
        jobId: result.jobId,
        estimatedCompletionTime: new Date(Date.now() + result.estimatedTime * 1000)
      }
    })

    // 扣除积分
    await prisma.user.update({
      where: { id: user.id },
      data: { credits: user.credits - 1 }
    })

    res.status(200).json({
      generationId: generation.id,
      jobId: result.jobId,
      estimatedTime: result.estimatedTime
    })

  } catch (error) {
    console.error('Video generation error:', error)
    res.status(500).json({ error: 'Generation failed' })
  }
}