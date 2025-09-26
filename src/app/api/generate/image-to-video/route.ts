import { NextRequest, NextResponse } from "next/server"
import { replicateService } from "@/lib/ai-services"
import { prisma } from "@/lib/prisma"

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

    // Convert image to base64 or upload to storage
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = `data:${image.type};base64,${buffer.toString('base64')}`

    // Create database record
    const videoGeneration = await prisma.videoGeneration.create({
      data: {
        userId,
        type: 'IMAGE_TO_VIDEO',
        prompt: prompt || 'Animate this image',
        imageUrl: base64Image, // In production, you'd upload to cloud storage
        status: 'PENDING'
      }
    })

    try {
      // Start video generation with Replicate
      const replicateResult = await replicateService.createImageToVideo({
        image: base64Image,
        prompt,
        duration: 3,
        fps: 24
      })

      // Update database with processing status
      await prisma.videoGeneration.update({
        where: { id: videoGeneration.id },
        data: {
          status: 'PROCESSING'
        }
      })

      return NextResponse.json({
        success: true,
        generationId: videoGeneration.id,
        replicateId: replicateResult.id,
        status: replicateResult.status
      })

    } catch (apiError) {
      // Update database with error
      await prisma.videoGeneration.update({
        where: { id: videoGeneration.id },
        data: {
          status: 'FAILED',
          errorMessage: apiError instanceof Error ? apiError.message : 'Unknown error'
        }
      })

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

    const videoGeneration = await prisma.videoGeneration.findUnique({
      where: { id: generationId }
    })

    if (!videoGeneration) {
      return NextResponse.json(
        { error: "Generation not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: videoGeneration.id,
      status: videoGeneration.status.toLowerCase(),
      videoUrl: videoGeneration.videoUrl,
      imageUrl: videoGeneration.imageUrl,
      error: videoGeneration.errorMessage
    })

  } catch (error) {
    console.error("Get generation status error:", error)
    return NextResponse.json(
      { error: "Failed to get generation status" },
      { status: 500 }
    )
  }
}