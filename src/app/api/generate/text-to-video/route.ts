import { NextRequest, NextResponse } from "next/server"
import { replicateService } from "@/lib/ai-services"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { prompt, userId } = await req.json()

    if (!prompt || !userId) {
      return NextResponse.json(
        { error: "Prompt and userId are required" },
        { status: 400 }
      )
    }

    // Create database record
    const videoGeneration = await prisma.videoGeneration.create({
      data: {
        userId,
        type: 'TEXT_TO_VIDEO',
        prompt,
        status: 'PENDING'
      }
    })

    try {
      // Start video generation with Replicate
      const replicateResult = await replicateService.createTextToVideo({
        prompt,
        duration: 3,
        fps: 8,
        width: 1024,
        height: 576
      })

      // Update database with Replicate ID
      await prisma.videoGeneration.update({
        where: { id: videoGeneration.id },
        data: {
          status: 'PROCESSING',
          // Store the Replicate prediction ID in a metadata field
          // You might need to add this field to your schema
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
    console.error("Text-to-video generation error:", error)
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

    // If we have a Replicate ID, check status
    // This would require storing the Replicate ID in the database
    // For now, return the database status

    return NextResponse.json({
      id: videoGeneration.id,
      status: videoGeneration.status.toLowerCase(),
      videoUrl: videoGeneration.videoUrl,
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