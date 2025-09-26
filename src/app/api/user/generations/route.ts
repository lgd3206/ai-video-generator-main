import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    const generations = await prisma.videoGeneration.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50 // Limit to last 50 generations
    })

    return NextResponse.json({
      success: true,
      generations: generations.map(gen => ({
        id: gen.id,
        type: gen.type,
        prompt: gen.prompt,
        status: gen.status,
        videoUrl: gen.videoUrl,
        imageUrl: gen.imageUrl,
        createdAt: gen.createdAt.toISOString(),
        completedAt: gen.completedAt?.toISOString(),
        duration: gen.duration,
        fileSize: gen.fileSize
      }))
    })

  } catch (error) {
    console.error("Get user generations error:", error)
    return NextResponse.json(
      { error: "Failed to fetch generations" },
      { status: 500 }
    )
  }
}