"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ArrowLeft, Download, Play, Video, Image as ImageIcon, Calendar, Clock, User, Mail, CreditCard } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface VideoGeneration {
  id: string
  type: 'TEXT_TO_VIDEO' | 'IMAGE_TO_VIDEO'
  prompt: string
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  videoUrl?: string
  imageUrl?: string
  createdAt: string
  duration?: number
  fileSize?: number
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [generations, setGenerations] = useState<VideoGeneration[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchGenerations = useCallback(async () => {
    try {
      const response = await fetch(`/api/user/generations?userId=${session?.user?.id}`)
      if (response.ok) {
        const data = await response.json()
        setGenerations(data.generations)
      }
    } catch (error) {
      console.error('Failed to fetch generations:', error)
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.id])

  useEffect(() => {
    if (session?.user?.id) {
      fetchGenerations()
    }
  }, [session, fetchGenerations])

  const handleDownload = (videoUrl: string, filename: string) => {
    const link = document.createElement('a')
    link.href = videoUrl
    link.download = filename
    link.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600 bg-green-50'
      case 'PROCESSING':
        return 'text-blue-600 bg-blue-50'
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-50'
      case 'FAILED':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Sign in required</h2>
              <p className="text-gray-600 mb-6">Please sign in to access your dashboard</p>
              <Link href="/auth/signin">
                <Button>Sign In</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <User className="w-6 h-6 text-indigo-600" />
              <span className="text-lg font-semibold text-gray-900">Dashboard</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/generate/text-to-video">
              <Button variant="outline" size="sm">New Video</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {session.user?.name || 'User'}!
            </h1>
            <p className="text-gray-600">
              Manage your AI video generations and account settings
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar - User Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{session.user?.name}</div>
                      <div className="text-sm text-gray-500">Name</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{session.user?.email}</div>
                      <div className="text-sm text-gray-500">Email</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">Free Plan</div>
                      <div className="text-sm text-gray-500">Subscription</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/generate/text-to-video">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Video className="w-4 h-4 mr-2" />
                      Text to Video
                    </Button>
                  </Link>
                  <Link href="/generate/image-to-video">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Image to Video
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Main Content - Generation History */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Your Video Generations</CardTitle>
                  <CardDescription>
                    View and manage all your AI-generated videos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <LoadingSpinner size="lg" />
                    </div>
                  ) : generations.length === 0 ? (
                    <div className="text-center py-12">
                      <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No videos generated yet
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Start creating your first AI video
                      </p>
                      <Link href="/generate/text-to-video">
                        <Button>Create Your First Video</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {generations.map((generation) => (
                        <div
                          key={generation.id}
                          className="border rounded-lg p-4 hover:border-gray-300 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                {generation.type === 'TEXT_TO_VIDEO' ? (
                                  <Video className="w-4 h-4 text-indigo-600" />
                                ) : (
                                  <ImageIcon className="w-4 h-4 text-purple-600" />
                                )}
                                <span className="font-medium">
                                  {generation.type === 'TEXT_TO_VIDEO' ? 'Text to Video' : 'Image to Video'}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(generation.status)}`}>
                                  {generation.status}
                                </span>
                              </div>
                              <p className="text-gray-700 mb-2 line-clamp-2">
                                {generation.prompt}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{format(new Date(generation.createdAt), 'MMM dd, yyyy')}</span>
                                </div>
                                {generation.duration && (
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{generation.duration}s</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              {generation.status === 'COMPLETED' && generation.videoUrl && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(generation.videoUrl, '_blank')}
                                  >
                                    <Play className="w-4 h-4 mr-1" />
                                    View
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDownload(
                                      generation.videoUrl!,
                                      `video-${generation.id}.mp4`
                                    )}
                                  >
                                    <Download className="w-4 h-4 mr-1" />
                                    Download
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}