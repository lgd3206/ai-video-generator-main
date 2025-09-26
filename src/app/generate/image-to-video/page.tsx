"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ArrowLeft, ImageIcon, Upload, Download, Play, RefreshCw, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface GenerationStep {
  id: number
  title: string
  description: string
  completed: boolean
  active: boolean
}

export default function ImageToVideoPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null) // Keep for future use
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([
    { id: 1, title: "Analyzing Image", description: "Understanding image content", completed: false, active: false },
    { id: 2, title: "Depth Estimation", description: "Creating depth map", completed: false, active: false },
    { id: 3, title: "Motion Planning", description: "Planning camera movement", completed: false, active: false },
    { id: 4, title: "Video Generation", description: "Creating animated video", completed: false, active: false }
  ])

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImageFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleGenerate = async () => {
    if (!selectedImage) return

    // Log file info for debugging (this uses imageFile)
    if (imageFile) {
      console.log('Processing file:', imageFile.name, imageFile.size)
    }

    setIsGenerating(true)
    setGenerationProgress(0)
    setGeneratedVideoUrl(null)

    // Reset steps
    setGenerationSteps(prev => prev.map(step => ({ ...step, completed: false, active: false })))

    // Simulate generation process
    for (let i = 0; i < generationSteps.length; i++) {
      // Activate current step
      setGenerationSteps(prev => prev.map((step, index) => ({
        ...step,
        active: index === i,
        completed: index < i
      })))

      // Simulate processing time for each step
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 300))
        setGenerationProgress(((i * 100) + progress) / generationSteps.length)
      }

      // Mark current step as completed
      setGenerationSteps(prev => prev.map((step, index) => ({
        ...step,
        active: false,
        completed: index <= i
      })))
    }

    // Simulate video generation completion
    setGeneratedVideoUrl("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4")
    setIsGenerating(false)
  }

  const handleDownload = () => {
    if (generatedVideoUrl) {
      const link = document.createElement('a')
      link.href = generatedVideoUrl
      link.download = 'animated-video.mp4'
      link.click()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
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
              <ImageIcon className="w-6 h-6 text-purple-600" />
              <span className="text-lg font-semibold text-gray-900">Image to Video</span>
            </div>
          </div>
          <Link href="/auth/signin">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Animate Your Images
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload any image and watch AI bring it to life with realistic motion and camera effects
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Image</CardTitle>
                <CardDescription>
                  Support formats: JPG, PNG, WebP (max 10MB)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!selectedImage ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      isDragging
                        ? 'border-purple-400 bg-purple-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium mb-2">
                      Drop your image here or click to browse
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Best results with clear, well-lit images
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose File
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={selectedImage}
                        alt="Selected image"
                        fill
                        className="object-contain"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Generation Progress */}
                {isGenerating && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Animating Image</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(generationProgress)}%
                        </span>
                      </div>
                      <Progress value={generationProgress} className="w-full" />
                    </div>

                    {/* Generation Steps */}
                    <div className="space-y-2">
                      {generationSteps.map((step) => (
                        <div key={step.id} className="flex items-center space-x-3 p-2 rounded-lg">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            step.completed
                              ? "bg-green-100 text-green-600"
                              : step.active
                              ? "bg-purple-100 text-purple-600"
                              : "bg-gray-100 text-gray-400"
                          }`}>
                            {step.completed ? (
                              "✓"
                            ) : step.active ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              step.id
                            )}
                          </div>
                          <div>
                            <div className={`font-medium ${
                              step.active ? "text-purple-600" :
                              step.completed ? "text-green-600" : "text-gray-500"
                            }`}>
                              {step.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {step.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleGenerate}
                  disabled={!selectedImage || isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Animating Image...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Animate Image
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <Card>
              <CardHeader>
                <CardTitle>Animated Video</CardTitle>
                <CardDescription>
                  Your animated video will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedVideoUrl ? (
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <video
                        className="w-full h-full object-cover"
                        controls
                        poster="/api/placeholder/600/400"
                      >
                        <source src={generatedVideoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleDownload} className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download Video
                      </Button>
                      <Button variant="outline" onClick={() => setGeneratedVideoUrl(null)}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Generate New
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">No video generated yet</p>
                      <p className="text-sm text-gray-400">
                        Upload an image and click animate
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tips Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Tips for Best Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">📸 Image Quality</h4>
                  <p className="text-sm text-gray-600">
                    Use high-resolution images with good lighting and contrast
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🎯 Clear Subjects</h4>
                  <p className="text-sm text-gray-600">
                    Images with distinct foreground and background work best
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🌅 Landscapes</h4>
                  <p className="text-sm text-gray-600">
                    Landscape photos create stunning parallax effects
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">👤 Portraits</h4>
                  <p className="text-sm text-gray-600">
                    Portrait photos can have subtle breathing and blinking effects
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}