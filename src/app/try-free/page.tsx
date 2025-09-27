"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Play, Download, Star, Clock, Zap, Gift, ArrowRight } from "lucide-react"
import Link from "next/link"
import Head from "next/head"
import SEOHead from "@/components/seo-head"

export default function FreeTrial() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null)
  const [trialUsed, setTrialUsed] = useState(false)

  const handleFreeTrial = async () => {
    if (!prompt.trim() || trialUsed) return

    setIsGenerating(true)
    setGenerationProgress(0)
    setGeneratedVideoUrl(null)

    // Simulate generation process
    for (let progress = 0; progress <= 100; progress += 5) {
      await new Promise(resolve => setTimeout(resolve, 100))
      setGenerationProgress(progress)
    }

    // Simulate video generation completion
    setGeneratedVideoUrl("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")
    setIsGenerating(false)
    setTrialUsed(true)
  }

  const samplePrompts = [
    {
      title: "Tech Product Launch",
      prompt: "A modern minimalist tech product launch video showcasing a new smartphone. Background is pure white, product rotates 360 degrees with elegant lighting effects. Professional modern style conveying innovation and technology.",
      category: "Business"
    },
    {
      title: "Food Presentation",
      prompt: "Create an appetizing pizza making process video. Starting from kneading dough, adding tomato sauce, cheese and toppings, finally placing in oven. Background is warm kitchen environment with natural soft lighting, creating cozy home cooking atmosphere.",
      category: "Food"
    },
    {
      title: "Nature Landscape",
      prompt: "Create a serene lake sunrise video. Clear lake water reflects golden sky, distant mountain silhouettes are clear, gentle breeze creates ripples on water surface. Several birds fly across the sky, entire scene conveys peaceful and harmonious atmosphere.",
      category: "Nature"
    }
  ]

  return (
    <>
      <Head>
        <SEOHead
          page="home"
          customTitle="Free AI Video Generator Trial | No Credit Card Required | AI Video Studio"
          customDescription="Try our AI video generator for free! Create professional videos from text or images in 30 seconds. No registration or credit card required."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">AI Video Studio</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Gift className="w-3 h-3 mr-1" />
                Free Trial
              </Badge>
              <Link href="/auth/signup">
                <Button size="sm">Sign Up for More</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Limited Time Free Experience</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Create Professional Videos in 30 Seconds
              <span className="text-indigo-600 block">with AI Technology</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              No registration required, no payment needed. Experience the magic of AI video generation instantly and see how AI transforms your text descriptions into beautiful videos.
            </p>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-green-600" />
                <span>30-Second Generation</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-600" />
                <span>Professional Quality</span>
              </div>
              <div className="flex items-center space-x-1">
                <Gift className="w-4 h-4 text-purple-600" />
                <span>Completely Free</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Trial Section */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <span>Describe Your Video</span>
                  </CardTitle>
                  <CardDescription>
                    Describe your ideas in detail, AI will generate professional videos based on your description
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="prompt" className="text-sm font-medium">
                      Video Description {!trialUsed && <span className="text-green-600">(Free Trial Once)</span>}
                    </label>
                    <Textarea
                      id="prompt"
                      placeholder="Describe the video content you want to create..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={6}
                      disabled={isGenerating || trialUsed}
                      className="resize-none"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{prompt.length}/500 characters</span>
                      <span>More details, better results</span>
                    </div>
                  </div>

                  {/* Progress */}
                  {isGenerating && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">AI is generating video...</span>
                        <span className="text-sm text-gray-500">{Math.round(generationProgress)}%</span>
                      </div>
                      <Progress value={generationProgress} className="w-full" />
                    </div>
                  )}

                  <Button
                    onClick={handleFreeTrial}
                    disabled={!prompt.trim() || isGenerating || trialUsed}
                    className="w-full"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Generating...
                      </>
                    ) : trialUsed ? (
                      "Trial Completed"
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Free Video
                      </>
                    )}
                  </Button>

                  {trialUsed && (
                    <div className="text-center p-4 bg-indigo-50 rounded-lg">
                      <p className="text-sm text-indigo-800 mb-3">
                        🎉 Free trial completed! Want to generate more videos?
                      </p>
                      <Link href="/auth/signup">
                        <Button size="sm" className="mr-2">
                          Sign Up for Free Credits
                        </Button>
                      </Link>
                      <Link href="/blog">
                        <Button size="sm" variant="outline">
                          View More Tutorials
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Preview Section */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Play className="w-5 h-5 text-purple-600" />
                    <span>Video Preview</span>
                  </CardTitle>
                  <CardDescription>
                    Generated videos will be displayed here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedVideoUrl ? (
                    <div className="space-y-4">
                      <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <video
                          className="w-full h-full object-cover"
                          controls
                          autoPlay
                          muted
                          poster="/api/placeholder/600/400"
                        >
                          <source src={generatedVideoUrl} type="video/mp4" />
                          Your browser does not support video playback.
                        </video>
                      </div>

                      <div className="flex space-x-2">
                        <Button className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Download Video
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Sign Up for More
                        </Button>
                      </div>

                      <div className="text-center text-sm text-gray-500">
                        Free version includes watermark, sign up to download watermark-free version
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium mb-2">Video will be displayed here</p>
                        <p className="text-sm text-gray-400">
                          Enter description and click generate button
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Sample Prompts */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Don&apos;t know how to describe? Try these examples
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Click the examples below to fill in the description box with one click
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {samplePrompts.map((sample, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => !trialUsed && setPrompt(sample.prompt)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{sample.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {sample.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-4">
                      {sample.prompt}
                    </p>
                    <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto text-indigo-600"
                            disabled={trialUsed}>
                      Click to use this description →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Why choose our AI video generator?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Ultra-Fast Generation</h3>
                <p className="text-gray-600">
                  From text description to finished video in just 30 seconds. 100x faster than traditional video production.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Professional Quality</h3>
                <p className="text-gray-600">
                  AI-generated videos feature professional-grade visual effects and smooth animation performance.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Easy to Use</h3>
                <p className="text-gray-600">
                  No professional knowledge required, just describe your ideas to create beautiful video content.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upgrade CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Satisfied with the experience? Get the full version
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Register for unlimited video generation, watermark-free downloads, HD output and other professional features
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Free Plan</h3>
                <div className="text-2xl font-bold text-white mb-4">$0</div>
                <ul className="text-indigo-100 text-sm space-y-2">
                  <li>• 1 free generation per day</li>
                  <li>• Standard video quality</li>
                  <li>• With watermark</li>
                  <li>• Basic customer support</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 transform scale-105">
                <div className="text-center mb-4">
                  <Badge className="bg-yellow-500 text-white">Recommended</Badge>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro Plan</h3>
                <div className="text-2xl font-bold text-gray-900 mb-4">$19<span className="text-sm font-normal">/month</span></div>
                <ul className="text-gray-700 text-sm space-y-2 mb-6">
                  <li>• Unlimited video generation</li>
                  <li>• 4K HD output</li>
                  <li>• No watermark</li>
                  <li>• Priority customer support</li>
                </ul>
                <Button className="w-full">Upgrade Now</Button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Enterprise</h3>
                <div className="text-2xl font-bold text-white mb-4">Custom</div>
                <ul className="text-indigo-100 text-sm space-y-2">
                  <li>• Batch video generation</li>
                  <li>• API integration</li>
                  <li>• Custom features</li>
                  <li>• Dedicated account manager</li>
                </ul>
              </div>
            </div>

            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="px-8">
                Sign Up Now, Get Free Credits
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}