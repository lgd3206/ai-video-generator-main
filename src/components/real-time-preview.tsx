"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Play, RotateCcw, Download, Settings, Sparkles, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface PreviewFrame {
  timestamp: number
  description: string
  imageUrl?: string
}

interface RealTimePreviewProps {
  initialPrompt?: string
  onPromptChange?: (prompt: string) => void
  className?: string
}

export default function RealTimePreview({
  initialPrompt = "",
  onPromptChange,
  className
}: RealTimePreviewProps) {
  const [prompt, setPrompt] = useState(initialPrompt)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [frames, setFrames] = useState<PreviewFrame[]>([])
  const [previewQuality, setPreviewQuality] = useState<'fast' | 'balanced' | 'quality'>('fast')
  const [autoPreview, setAutoPreview] = useState(false)
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)

  // 模拟关键帧生成
  const generatePreviewFrames = useCallback(async (inputPrompt: string) => {
    if (!inputPrompt.trim()) return []

    setIsGenerating(true)

    // 模拟AI分析提示词并生成关键帧描述
    const mockFrames: PreviewFrame[] = [
      {
        timestamp: 0,
        description: "开场：" + inputPrompt.split('。')[0] || inputPrompt.substring(0, 50),
        imageUrl: `/preview/frame-1.jpg`
      },
      {
        timestamp: 2000,
        description: "发展：场景细节展现，" + (inputPrompt.split('。')[1] || "动态效果开始"),
        imageUrl: `/preview/frame-2.jpg`
      },
      {
        timestamp: 4000,
        description: "高潮：主要内容呈现，" + (inputPrompt.split('。')[2] || "核心元素突出"),
        imageUrl: `/preview/frame-3.jpg`
      },
      {
        timestamp: 6000,
        description: "结尾：" + (inputPrompt.includes('结束') || inputPrompt.includes('收尾')
          ? inputPrompt.split('。').pop()
          : "画面渐变收尾"),
        imageUrl: `/preview/frame-4.jpg`
      }
    ]

    // 模拟生成延迟
    const delay = previewQuality === 'fast' ? 500 : previewQuality === 'balanced' ? 1000 : 2000
    await new Promise(resolve => setTimeout(resolve, delay))

    setIsGenerating(false)
    return mockFrames
  }, [previewQuality])

  // 防抖处理自动预览
  useEffect(() => {
    if (autoPreview && prompt.trim() && prompt.length > 10) {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }

      const timer = setTimeout(async () => {
        const newFrames = await generatePreviewFrames(prompt)
        setFrames(newFrames)
        if (newFrames.length > 0) {
          setIsPreviewMode(true)
          setCurrentFrame(0)
        }
      }, 1500)

      setDebounceTimer(timer)
    }

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
    }
  }, [prompt, autoPreview, generatePreviewFrames, debounceTimer])

  const handlePromptChange = (value: string) => {
    setPrompt(value)
    onPromptChange?.(value)
  }

  const handleGeneratePreview = async () => {
    if (!prompt.trim()) return

    const newFrames = await generatePreviewFrames(prompt)
    setFrames(newFrames)
    if (newFrames.length > 0) {
      setIsPreviewMode(true)
      setCurrentFrame(0)
    }
  }

  const playPreview = () => {
    if (frames.length === 0) return

    let frameIndex = 0
    const interval = setInterval(() => {
      setCurrentFrame(frameIndex)
      frameIndex = (frameIndex + 1) % frames.length
    }, 1500)

    setTimeout(() => clearInterval(interval), frames.length * 1500)
  }

  const formatTime = (ms: number) => {
    return `${(ms / 1000).toFixed(1)}s`
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* 控制面板 */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-indigo-600" />
                <span>实时预览</span>
              </CardTitle>
              <CardDescription>
                输入提示词，实时查看AI视频的关键帧预览
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={autoPreview ? "default" : "outline"} className="cursor-pointer"
                     onClick={() => setAutoPreview(!autoPreview)}>
                {autoPreview ? "自动预览" : "手动预览"}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 提示词输入 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">视频描述提示词</label>
            <Textarea
              placeholder="详细描述你想要的视频内容，越具体预览效果越准确..."
              value={prompt}
              onChange={(e) => handlePromptChange(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{prompt.length}/500 字符</span>
              <div className="flex items-center space-x-4">
                <span>预览质量:</span>
                <select
                  value={previewQuality}
                  onChange={(e) => setPreviewQuality(e.target.value as 'fast' | 'balanced' | 'quality')}
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="fast">快速 (0.5s)</option>
                  <option value="balanced">均衡 (1s)</option>
                  <option value="quality">高质量 (2s)</option>
                </select>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleGeneratePreview}
              disabled={!prompt.trim() || isGenerating}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  生成预览中...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  生成预览
                </>
              )}
            </Button>
            {frames.length > 0 && (
              <>
                <Button variant="outline" onClick={playPreview}>
                  <Play className="w-4 h-4 mr-1" />
                  播放
                </Button>
                <Button variant="outline" onClick={() => setCurrentFrame(0)}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>

          {/* 预览提示 */}
          {!autoPreview && prompt.length > 10 && frames.length === 0 && (
            <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
              💡 提示：启用&ldquo;自动预览&rdquo;可在输入时实时生成预览效果
            </div>
          )}
        </CardContent>
      </Card>

      {/* 预览展示区域 */}
      {isPreviewMode && frames.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-4">
          {/* 当前帧预览 */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">当前帧预览</CardTitle>
              <CardDescription>
                时间点：{formatTime(frames[currentFrame]?.timestamp || 0)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* 模拟预览图 */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"></div>
                <div className="text-center z-10">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center mb-4">
                    <Play className="w-8 h-8 text-indigo-600" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium px-4">
                    {frames[currentFrame]?.description}
                  </p>
                </div>

                {/* 时间轴指示器 */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs">
                    帧 {currentFrame + 1} / {frames.length}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 关键帧时间轴 */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">关键帧时间轴</CardTitle>
              <CardDescription>
                点击任意帧快速预览
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {frames.map((frame, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-all",
                      currentFrame === index
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                    )}
                    onClick={() => setCurrentFrame(index)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {formatTime(frame.timestamp)}
                      </Badge>
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        currentFrame === index ? "bg-indigo-600" : "bg-gray-300"
                      )} />
                    </div>
                    <p className="text-sm text-gray-700">
                      {frame.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* 生成完整视频按钮 */}
              <div className="mt-4 pt-4 border-t">
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  基于此预览生成完整视频
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 预览为空时的提示 */}
      {isPreviewMode && frames.length === 0 && !isGenerating && (
        <Card className="border-dashed">
          <CardContent className="text-center py-12">
            <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              开始预览你的创意
            </h3>
            <p className="text-gray-600 mb-6">
              输入详细的视频描述，查看AI如何理解和展现你的想法
            </p>
            <Button onClick={handleGeneratePreview} disabled={!prompt.trim()}>
              <Sparkles className="w-4 h-4 mr-2" />
              生成第一个预览
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}