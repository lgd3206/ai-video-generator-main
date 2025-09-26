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
        version: 'text-to-video-model-version', // Replace with actual model version
        input: {
          prompt: params.prompt,
          duration: params.duration || 3,
          fps: params.fps || 24,
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
        version: 'image-to-video-model-version', // Replace with actual model version
        input: {
          image: params.image,
          prompt: params.prompt || '',
          duration: params.duration || 3,
          fps: params.fps || 24,
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