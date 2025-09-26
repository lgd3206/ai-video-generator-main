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

    // 模拟生成过程
    for (let progress = 0; progress <= 100; progress += 5) {
      await new Promise(resolve => setTimeout(resolve, 100))
      setGenerationProgress(progress)
    }

    // 模拟视频生成完成
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
                免费试用
              </Badge>
              <Link href="/auth/signup">
                <Button size="sm">注册获取更多</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>限时免费体验</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              30秒免费制作
              <span className="text-indigo-600 block">AI专业视频</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              无需注册，无需付费。立即体验AI视频生成的神奇效果，看看AI如何将你的文字描述转化为精美视频。
            </p>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-green-600" />
                <span>30秒快速生成</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-600" />
                <span>专业级质量</span>
              </div>
              <div className="flex items-center space-x-1">
                <Gift className="w-4 h-4 text-purple-600" />
                <span>完全免费</span>
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
                    <span>描述你想要的视频</span>
                  </CardTitle>
                  <CardDescription>
                    详细描述你的想法，AI会根据你的描述生成专业视频
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="prompt" className="text-sm font-medium">
                      视频描述 {!trialUsed && <span className="text-green-600">(免费试用一次)</span>}
                    </label>
                    <Textarea
                      id="prompt"
                      placeholder="请描述你想要创建的视频内容..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={6}
                      disabled={isGenerating || trialUsed}
                      className="resize-none"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{prompt.length}/500 字符</span>
                      <span>越详细效果越好</span>
                    </div>
                  </div>

                  {/* Progress */}
                  {isGenerating && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">AI正在生成视频...</span>
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
                        生成中...
                      </>
                    ) : trialUsed ? (
                      "试用已完成"
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        免费生成视频
                      </>
                    )}
                  </Button>

                  {trialUsed && (
                    <div className="text-center p-4 bg-indigo-50 rounded-lg">
                      <p className="text-sm text-indigo-800 mb-3">
                        🎉 免费试用已完成！想要生成更多视频？
                      </p>
                      <Link href="/auth/signup">
                        <Button size="sm" className="mr-2">
                          注册获取免费额度
                        </Button>
                      </Link>
                      <Link href="/blog">
                        <Button size="sm" variant="outline">
                          查看更多教程
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
                    <span>视频预览</span>
                  </CardTitle>
                  <CardDescription>
                    生成的视频将在这里显示
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
                          您的浏览器不支持视频播放。
                        </video>
                      </div>

                      <div className="flex space-x-2">
                        <Button className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          下载视频
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          注册制作更多
                        </Button>
                      </div>

                      <div className="text-center text-sm text-gray-500">
                        免费版本带有水印，注册后可下载无水印版本
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium mb-2">视频将在这里显示</p>
                        <p className="text-sm text-gray-400">
                          输入描述并点击生成按钮
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
              不知道如何描述？试试这些示例
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              点击下方示例，一键填入描述框
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
                      点击使用此描述 →
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
              为什么选择我们的AI视频生成器？
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">极速生成</h3>
                <p className="text-gray-600">
                  从文字描述到完成视频，仅需30秒。比传统视频制作快100倍。
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">专业品质</h3>
                <p className="text-gray-600">
                  AI生成的视频具有专业级的视觉效果和流畅的动画表现。
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">简单易用</h3>
                <p className="text-gray-600">
                  无需专业知识，只要能描述想法，就能制作出精美的视频内容。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upgrade CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              体验满意？获取完整版本
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              注册账户，享受无限制视频生成、无水印下载、高清输出等专业功能
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">免费版</h3>
                <div className="text-2xl font-bold text-white mb-4">¥0</div>
                <ul className="text-indigo-100 text-sm space-y-2">
                  <li>• 每日1次免费生成</li>
                  <li>• 标清视频质量</li>
                  <li>• 带水印</li>
                  <li>• 基础客服支持</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 transform scale-105">
                <div className="text-center mb-4">
                  <Badge className="bg-yellow-500 text-white">推荐</Badge>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">专业版</h3>
                <div className="text-2xl font-bold text-gray-900 mb-4">¥99<span className="text-sm font-normal">/月</span></div>
                <ul className="text-gray-700 text-sm space-y-2 mb-6">
                  <li>• 无限视频生成</li>
                  <li>• 4K高清输出</li>
                  <li>• 无水印</li>
                  <li>• 优先客服支持</li>
                </ul>
                <Button className="w-full">立即升级</Button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">企业版</h3>
                <div className="text-2xl font-bold text-white mb-4">定制</div>
                <ul className="text-indigo-100 text-sm space-y-2">
                  <li>• 批量视频生成</li>
                  <li>• API接口集成</li>
                  <li>• 定制化功能</li>
                  <li>• 专属客户经理</li>
                </ul>
              </div>
            </div>

            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="px-8">
                立即注册，获取免费额度
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}