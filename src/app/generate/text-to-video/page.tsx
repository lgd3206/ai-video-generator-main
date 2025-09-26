"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ArrowLeft, Sparkles, Download, Play, RefreshCw } from "lucide-react"
import Link from "next/link"

interface GenerationStep {
  id: number
  title: string
  description: string
  completed: boolean
  active: boolean
}

export default function TextToVideoPage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null)
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([
    { id: 1, title: "Analyzing Prompt", description: "Understanding your description", completed: false, active: false },
    { id: 2, title: "Generating Scenes", description: "Creating visual content", completed: false, active: false },
    { id: 3, title: "Adding Motion", description: "Animating the scenes", completed: false, active: false },
    { id: 4, title: "Final Rendering", description: "Processing final video", completed: false, active: false }
  ])

  const handleGenerate = async () => {
    if (!prompt.trim()) return

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
        await new Promise(resolve => setTimeout(resolve, 200))
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
    setGeneratedVideoUrl("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")
    setIsGenerating(false)
  }

  const handleDownload = () => {
    if (generatedVideoUrl) {
      const link = document.createElement('a')
      link.href = generatedVideoUrl
      link.download = 'generated-video.mp4'
      link.click()
    }
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
              <Sparkles className="w-6 h-6 text-indigo-600" />
              <span className="text-lg font-semibold text-gray-900">Text to Video</span>
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
              Create Videos from Text
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Describe your vision and watch AI transform your words into stunning video content
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle>Describe Your Video</CardTitle>
                <CardDescription>
                  Be detailed and specific to get the best results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="prompt" className="text-sm font-medium">
                    Video Description
                  </label>
                  <Textarea
                    id="prompt"
                    placeholder="A serene lake surrounded by mountains at sunset, with gentle waves reflecting the golden light. Birds fly across the sky as mist rises from the water..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    disabled={isGenerating}
                  />
                  <p className="text-sm text-muted-foreground">
                    {prompt.length}/500 characters
                  </p>
                </div>

                {/* Generation Progress */}
                {isGenerating && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Generating Video</span>
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
                              ? "bg-indigo-100 text-indigo-600"
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
                              step.active ? "text-indigo-600" :
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
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Generating Video...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Video
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <Card>
              <CardHeader>
                <CardTitle>Video Preview</CardTitle>
                <CardDescription>
                  Your generated video will appear here
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
                        Enter a description and click generate
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
              <CardTitle>Tips for Better Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">✨ Be Descriptive</h4>
                  <p className="text-sm text-gray-600">
                    Include details about lighting, mood, colors, and movement
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🎬 Set the Scene</h4>
                  <p className="text-sm text-gray-600">
                    Describe the environment, weather, and time of day
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🎭 Add Action</h4>
                  <p className="text-sm text-gray-600">
                    Mention specific movements or actions happening in the scene
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🎨 Specify Style</h4>
                  <p className="text-sm text-gray-600">
                    Include artistic style preferences like &quot;cinematic&quot; or &quot;realistic&quot;
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