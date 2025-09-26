interface ReplicateResponse {
  id: string
  status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled'
  output?: string | string[]
  error?: string
  urls?: {
    get: string
    cancel: string
  }
}

interface TextToVideoParams {
  prompt: string
  duration?: number
  fps?: number
  width?: number
  height?: number
}

interface ImageToVideoParams {
  image: string
  prompt?: string
  duration?: number
  fps?: number
}

class ReplicateService {
  private apiKey: string
  private baseUrl = 'https://api.replicate.com/v1'

  constructor() {
    this.apiKey = process.env.REPLICATE_API_TOKEN || ''
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Token ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Replicate API error: ${error.detail || response.statusText}`)
    }

    return response.json()
  }

  async createTextToVideo(params: TextToVideoParams): Promise<ReplicateResponse> {
    return this.makeRequest('/predictions', {
      method: 'POST',
      body: JSON.stringify({
        // Using Zeroscope v2 XL for text-to-video generation
        version: 'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
        input: {
          prompt: params.prompt,
          num_frames: (params.duration || 3) * (params.fps || 8), // Convert duration to frames
          width: params.width || 1024,
          height: params.height || 576,
        },
      }),
    })
  }

  async createImageToVideo(params: ImageToVideoParams): Promise<ReplicateResponse> {
    return this.makeRequest('/predictions', {
      method: 'POST',
      body: JSON.stringify({
        // Using Stable Video Diffusion for image-to-video generation
        version: 'stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb1a4919c746e16d22e3dd4ef8c725f5a2010c6ea4',
        input: {
          input_image: params.image,
          motion_prompt: params.prompt || 'smooth motion',
          frames_per_second: params.fps || 6,
          num_frames: (params.duration || 3) * (params.fps || 6),
        },
      }),
    })
  }

  async getGeneration(id: string): Promise<ReplicateResponse> {
    return this.makeRequest(`/predictions/${id}`)
  }

  async cancelGeneration(id: string): Promise<ReplicateResponse> {
    return this.makeRequest(`/predictions/${id}/cancel`, {
      method: 'POST',
    })
  }

  async waitForCompletion(id: string, maxWaitTime = 300000): Promise<ReplicateResponse> {
    const startTime = Date.now()

    while (Date.now() - startTime < maxWaitTime) {
      const result = await this.getGeneration(id)

      if (result.status === 'succeeded' || result.status === 'failed') {
        return result
      }

      // Wait 2 seconds before checking again
      await new Promise(resolve => setTimeout(resolve, 2000))
    }

    throw new Error('Generation timed out')
  }
}

// Alternative service for RunwayML (placeholder)
class RunwayService {
  private apiKey: string
  private baseUrl = 'https://api.runwayml.com/v1'

  constructor() {
    this.apiKey = process.env.RUNWAY_API_KEY || ''
  }

  async createTextToVideo(_prompt: string): Promise<{ status: string; id: string; error?: string }> {
    // Placeholder implementation
    // Actual RunwayML API integration would go here
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const prompt = _prompt
    throw new Error('RunwayML integration not implemented yet')
  }

  async createImageToVideo(_imageUrl: string): Promise<{ status: string; id: string; error?: string }> {
    // Placeholder implementation
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const imageUrl = _imageUrl
    throw new Error('RunwayML integration not implemented yet')
  }
}

export const replicateService = new ReplicateService()
export const runwayService = new RunwayService()

export type { ReplicateResponse, TextToVideoParams, ImageToVideoParams }