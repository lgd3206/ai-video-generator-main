import { NextRequest, NextResponse } from "next/server"
import { replicateService } from "@/lib/ai-services"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { replicateId, generationId } = await req.json()

    if (!replicateId || !generationId) {
      return NextResponse.json(
        { error: "Both replicateId and generationId are required" },
        { status: 400 }
      )
    }

    // Get current status from Replicate
    const result = await replicateService.getGeneration(replicateId)

    // Update database based on Replicate status
    let updateData: {
      status?: 'COMPLETED' | 'FAILED' | 'PROCESSING'
      videoUrl?: string
      completedAt?: Date
      errorMessage?: string
    } = {}

    switch (result.status) {
      case 'succeeded':
        updateData = {
          status: 'COMPLETED',
          videoUrl: Array.isArray(result.output) ? result.output[0] : result.output,
          completedAt: new Date()
        }
        break
      case 'failed':
        updateData = {
          status: 'FAILED',
          errorMessage: result.error || 'Generation failed'
        }
        break
      case 'processing':
      case 'starting':
        updateData = {
          status: 'PROCESSING'
        }
        break
    }

    if (Object.keys(updateData).length > 0) {
      await prisma.videoGeneration.update({
        where: { id: generationId },
        data: updateData
      })
    }

    return NextResponse.json({
      success: true,
      status: result.status,
      videoUrl: updateData.videoUrl,
      error: updateData.errorMessage
    })

  } catch (error) {
    console.error("Check generation status error:", error)
    return NextResponse.json(
      { error: "Failed to check generation status" },
      { status: 500 }
    )
  }
}