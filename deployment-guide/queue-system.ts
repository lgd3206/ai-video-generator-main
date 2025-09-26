// 队列系统实现
// lib/queue.ts

import Bull from 'bull'
import { ReplicateService, RunwayMLService } from './ai-services'
import { prisma } from './prisma'
import { StorageService } from './storage'

// 创建任务队列
const videoQueue = new Bull('video generation', process.env.REDIS_URL || 'redis://localhost:6379')

export interface VideoJobData {
  generationId: string
  userId: string
  type: 'TEXT_TO_VIDEO' | 'IMAGE_TO_VIDEO'
  prompt: string
  imageUrl?: string
  duration?: number
  fps?: number
}

// 定义队列处理器
videoQueue.process('generate-video', async (job, done) => {
  const { generationId, userId, type, prompt, imageUrl, duration, fps } = job.data as VideoJobData

  try {
    // 更新任务状态为处理中
    await prisma.videoGeneration.update({
      where: { id: generationId },
      data: { status: 'PROCESSING' }
    })

    // 选择AI服务（根据配置或负载均衡）
    const aiService = new ReplicateService(process.env.REPLICATE_API_TOKEN!)
    const storageService = new StorageService()

    let result
    if (type === 'TEXT_TO_VIDEO') {
      result = await aiService.generateFromText({
        prompt,
        duration: duration || 4,
        fps: fps || 24,
        resolution: '1024x576'
      })
    } else {
      result = await aiService.generateFromImage({
        imageUrl: imageUrl!,
        prompt,
        motionStrength: 0.7
      })
    }

    // 轮询检查生成状态
    let status = await aiService.getGenerationStatus(result.jobId)

    while (status.status === 'processing') {
      await new Promise(resolve => setTimeout(resolve, 10000)) // 等待10秒
      status = await aiService.getGenerationStatus(result.jobId)

      // 更新进度
      if (status.progress) {
        job.progress(status.progress)
      }
    }

    if (status.status === 'succeeded' && status.videoUrl) {
      // 下载并存储视频
      const videoResponse = await fetch(status.videoUrl)
      const videoBuffer = Buffer.from(await videoResponse.arrayBuffer())

      // 上传到云存储
      const uploadResult = await storageService.uploadVideoToCloudinary(
        videoBuffer,
        `${generationId}.mp4`
      )

      // 更新数据库
      await prisma.videoGeneration.update({
        where: { id: generationId },
        data: {
          status: 'COMPLETED',
          videoUrl: uploadResult.url,
          completedAt: new Date()
        }
      })

      // 发送完成通知
      await sendCompletionEmail(userId, generationId, uploadResult.url)

      done(null, { videoUrl: uploadResult.url })
    } else {
      throw new Error(status.error || 'Generation failed')
    }

  } catch (error) {
    console.error('Video generation job failed:', error)

    // 更新失败状态
    await prisma.videoGeneration.update({
      where: { id: generationId },
      data: {
        status: 'FAILED',
        errorMessage: error.message
      }
    })

    // 退还积分
    await prisma.user.update({
      where: { id: userId },
      data: {
        credits: { increment: 1 }
      }
    })

    done(new Error(error.message))
  }
})

// 添加任务到队列
export async function addVideoGenerationJob(data: VideoJobData): Promise<Bull.Job<VideoJobData>> {
  return videoQueue.add('generate-video', data, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    },
    removeOnComplete: 100,
    removeOnFail: 50
  })
}

// 队列监控
videoQueue.on('completed', (job, result) => {
  console.log(`Video generation job ${job.id} completed:`, result)
})

videoQueue.on('failed', (job, err) => {
  console.error(`Video generation job ${job.id} failed:`, err.message)
})

videoQueue.on('progress', (job, progress) => {
  console.log(`Video generation job ${job.id} progress: ${progress}%`)
})

// 清理任务
export async function cleanupCompletedJobs() {
  await videoQueue.clean(24 * 60 * 60 * 1000, 'completed') // 清理24小时前完成的任务
  await videoQueue.clean(7 * 24 * 60 * 60 * 1000, 'failed') // 清理7天前失败的任务
}

// 获取队列状态
export async function getQueueStats() {
  const waiting = await videoQueue.getWaiting()
  const active = await videoQueue.getActive()
  const completed = await videoQueue.getCompleted()
  const failed = await videoQueue.getFailed()

  return {
    waiting: waiting.length,
    active: active.length,
    completed: completed.length,
    failed: failed.length
  }
}

// 邮件通知函数
async function sendCompletionEmail(userId: string, generationId: string, videoUrl: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user?.email) return

  // 使用邮件服务发送通知
  // 这里需要集成邮件服务（见下一个文件）
}