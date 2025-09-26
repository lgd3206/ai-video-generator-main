"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Share2, Twitter, Facebook, Linkedin, Instagram, Copy, Check,
  MessageCircle, Mail, QrCode, Download, Heart, Eye
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SocialShareProps {
  title?: string
  description?: string
  url?: string
  imageUrl?: string
  hashtags?: string[]
  className?: string
  showStats?: boolean
  stats?: {
    views?: number
    likes?: number
    shares?: number
  }
}

export default function SocialShare({
  title = "I created this amazing video with AI!",
  description = "Create professional-grade video content effortlessly with AI Video Studio. Try it now!",
  url = "",
  imageUrl: _imageUrl = "", // Mark as unused but keep for API compatibility
  hashtags = ["AIVideo", "VideoMaking", "AI", "CreativeTools"],
  className,
  showStats = false,
  stats = { views: 0, likes: 0, shares: 0 }
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [customMessage, setCustomMessage] = useState("")
  // Remove unused selectedPlatforms state

  const currentUrl = url || (typeof window !== "undefined" ? window.location.href : "")
  const shareText = customMessage || description
  const hashtagString = hashtags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ')

  // Use imageUrl for future social sharing features
  const hasImage = Boolean(_imageUrl)

  const platforms = [
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-blue-500 hover:bg-blue-600',
      getUrl: () => {
        const text = `${shareText} ${hashtagString}`
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`
      }
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      getUrl: () => {
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`
      }
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      getUrl: () => {
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(shareText)}`
      }
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      getUrl: () => {
        // Instagram doesn't support direct URL sharing, so we'll copy the content
        return '#copy-for-instagram'
      }
    },
    {
      id: 'wechat',
      name: 'WeChat',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      getUrl: () => '#copy-for-wechat'
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-500 hover:bg-gray-600',
      getUrl: () => {
        return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${currentUrl}`)}`
      }
    }
  ]

  const handleShare = async (platform: { id: string; name: string; icon: React.ComponentType<{ className?: string }>; color: string; getUrl: () => string }) => {
    if (platform.id === 'instagram' || platform.id === 'wechat') {
      // For platforms that don't support direct URL sharing
      const textToCopy = platform.id === 'instagram'
        ? `${shareText}\n\n${hashtagString}\n\nView more:${currentUrl}`
        : `${title}\n\n${shareText}\n\n${currentUrl}`

      try {
        await navigator.clipboard.writeText(textToCopy)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy to clipboard:', err)
      }
    } else {
      window.open(platform.getUrl(), '_blank', 'width=600,height=400')
    }

    // Record share statistics
    recordShare(platform.id)
  }

  const recordShare = (platform: string) => {
    // Send share statistics to backend
    console.log(`Shared to ${platform}`)
  }

  const copyToClipboard = async () => {
    const textToCopy = `${title}\n\n${shareText}\n\n${currentUrl}\n\n${hashtagString}`
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const generateQRCode = () => {
    // QR code generation library can be integrated here
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`
    window.open(qrUrl, '_blank')
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Share Statistics */}
      {showStats && (
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{stats.views?.toLocaleString() || 0} views</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span>{stats.likes?.toLocaleString() || 0} likes</span>
          </div>
          <div className="flex items-center space-x-1">
            <Share2 className="w-4 h-4" />
            <span>{stats.shares?.toLocaleString() || 0} shares</span>
          </div>
        </div>
      )}

      {/* Custom Share Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-indigo-600" />
            <span>Share to Social Media</span>
          </CardTitle>
          <CardDescription>
            Customize share content to let more people see your work {hasImage ? '(with image)' : '(text only)'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Custom Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Share Title</label>
            <Input
              placeholder="Enter an attractive title..."
              defaultValue={title}
            />
          </div>

          {/* Custom Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Share Description</label>
            <Textarea
              placeholder="Describe the highlights of your work..."
              value={customMessage || description}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <Badge key={index} variant="outline" className="cursor-pointer">
                  #{tag}
                </Badge>
              ))}
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                + Add Tag
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Share Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Share</CardTitle>
          <CardDescription>
            Click icons to quickly share to various platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {platforms.map((platform) => {
              const Icon = platform.icon
              return (
                <Button
                  key={platform.id}
                  variant="outline"
                  className={cn(
                    "h-12 flex items-center justify-center space-x-2 text-white border-0",
                    platform.color
                  )}
                  onClick={() => handleShare(platform)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{platform.name}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Other Share Options */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Copy Link */}
        <Card>
          <CardContent className="p-4 text-center">
            <Button
              variant="outline"
              className="w-full mb-3"
              onClick={copyToClipboard}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>
            <p className="text-xs text-gray-500">
              Copy link to clipboard
            </p>
          </CardContent>
        </Card>

        {/* 二维码分享 */}
        <Card>
          <CardContent className="p-4 text-center">
            <Button
              variant="outline"
              className="w-full mb-3"
              onClick={generateQRCode}
            >
              <QrCode className="w-4 h-4 mr-2" />
              生成二维码
            </Button>
            <p className="text-xs text-gray-500">
              生成二维码供扫描
            </p>
          </CardContent>
        </Card>

        {/* 下载分享图 */}
        <Card>
          <CardContent className="p-4 text-center">
            <Button
              variant="outline"
              className="w-full mb-3"
            >
              <Download className="w-4 h-4 mr-2" />
              下载分享图
            </Button>
            <p className="text-xs text-gray-500">
              带水印的分享图片
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 嵌入代码 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">嵌入网站</CardTitle>
          <CardDescription>
            将视频嵌入到你的网站或博客中
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm overflow-x-auto">
              <code>{`<iframe src="${currentUrl}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`}</code>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const embedCode = `<iframe src="${currentUrl}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`
                navigator.clipboard.writeText(embedCode)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
            >
              <Copy className="w-4 h-4 mr-1" />
              复制嵌入代码
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 分享提示 */}
      <Card className="border-indigo-200 bg-indigo-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Share2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-indigo-900 mb-1">分享小贴士</h4>
              <ul className="text-sm text-indigo-800 space-y-1">
                <li>• 在社交媒体分享可以获得更多曝光</li>
                <li>• 使用相关标签增加被发现的机会</li>
                <li>• 鼓励观众点赞和评论提高互动率</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}