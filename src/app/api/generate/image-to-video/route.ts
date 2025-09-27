import { NextRequest, NextResponse } from "next/server"
import { replicateService } from "@/lib/ai-services"

// Simple in-memory store for demo purposes
const generations = new Map<string, {
  id: string
  userId: string
  type: string
  prompt: string
  imageUrl?: string
  status: string
  videoUrl?: string
  errorMessage?: string
  replicateId?: string
  createdAt: Date
}>()

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const image = formData.get('image') as File
    const userId = formData.get('userId') as string
    const prompt = formData.get('prompt') as string || ''

    if (!image || !userId) {
      return NextResponse.json(
        { error: "Image and userId are required" },
        { status: 400 }
      )
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = `data:${image.type};base64,${buffer.toString('base64')}`

    // Create generation record
    const generationId = `gen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const generation = {
      id: generationId,
      userId,
      type: 'IMAGE_TO_VIDEO',
      prompt: prompt || 'Animate this image',
      imageUrl: base64Image,
      status: 'PENDING',
      createdAt: new Date()
    }

    generations.set(generationId, generation)

    try {
      // Start video generation with Replicate
      const replicateResult = await replicateService.createImageToVideo({
        image: base64Image,
        prompt,
        duration: 3,
        fps: 24
      })

      // Update generation with processing status
      const updatedGeneration = {
        ...generation,
        status: 'PROCESSING',
        replicateId: replicateResult.id
      }
      generations.set(generationId, updatedGeneration)

      return NextResponse.json({
        success: true,
        generationId: generationId,
        replicateId: replicateResult.id,
        status: replicateResult.status
      })

    } catch (apiError) {
      // Update generation with error
      const errorGeneration = {
        ...generation,
        status: 'FAILED',
        errorMessage: apiError instanceof Error ? apiError.message : 'Unknown error'
      }
      generations.set(generationId, errorGeneration)

      throw apiError
    }

  } catch (error) {
    console.error("Image-to-video generation error:", error)
    return NextResponse.json(
      { error: "Failed to start video generation" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const generationId = searchParams.get('id')

    if (!generationId) {
      return NextResponse.json(
        { error: "Generation ID is required" },
        { status: 400 }
      )
    }

    const generation = generations.get(generationId)

    if (!generation) {
      return NextResponse.json(
        { error: "Generation not found" },
        { status: 404 }
      )
    }

    // If we have a Replicate ID and status is processing, check Replicate
    if (generation.replicateId && generation.status === 'PROCESSING') {
      try {
        const replicateResult = await replicateService.getGeneration(generation.replicateId)

        if (replicateResult.status === 'succeeded' && replicateResult.output) {
          const completedGeneration = {
            ...generation,
            status: 'COMPLETED',
            videoUrl: Array.isArray(replicateResult.output)
              ? replicateResult.output[0]
              : replicateResult.output
          }
          generations.set(generationId, completedGeneration)
        } else if (replicateResult.status === 'failed') {
          const failedGeneration = {
            ...generation,
            status: 'FAILED',
            errorMessage: replicateResult.error || 'Generation failed'
          }
          generations.set(generationId, failedGeneration)
        }
      } catch (error) {
        console.error("Error checking Replicate status:", error)
      }
    }

    return NextResponse.json({
      id: generation.id,
      status: generation.status.toLowerCase(),
      videoUrl: generation.videoUrl,
      imageUrl: generation.imageUrl,
      error: generation.errorMessage
    })

  } catch (error) {
    console.error("Get generation status error:", error)
    return NextResponse.json(
      { error: "Failed to get generation status" },
      { status: 500 }
    )
  }
}