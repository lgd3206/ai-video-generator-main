"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Eye, Heart, Share2, Clock, Copy, Check } from "lucide-react"
import { exampleVideos, categories } from "@/lib/example-videos"

interface VideoGalleryProps {
  showAll?: boolean
  maxItems?: number
}

export default function VideoGallery({ showAll = false, maxItems = 6 }: VideoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)

  const filteredVideos = exampleVideos.filter(video => {
    if (selectedCategory === 'all') return true
    return video.category.toLowerCase().includes(selectedCategory)
  })

  const displayVideos = showAll ? filteredVideos : filteredVideos.slice(0, maxItems)

  const copyPrompt = async (videoId: string, prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopiedPrompt(videoId)
      setTimeout(() => setCopiedPrompt(null), 2000)
    } catch (err) {
      console.error('Failed to copy prompt:', err)
    }
  }

  const formatDuration = (seconds: number) => {
    return `${seconds}s`
  }

  return (
    <div className="space-y-6">
      {showAll && (
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayVideos.map((video) => (
          <Card key={video.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-video bg-gray-100 overflow-hidden">
              {/* Video Preview */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center cursor-pointer"
                onClick={() => setPlayingVideo(playingVideo === video.id ? null : video.id)}
              >
                {playingVideo === video.id ? (
                  <video
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    onEnded={() => setPlayingVideo(null)}
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        size="lg"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white shadow-lg group-hover:scale-110 transition-transform"
                      >
                        <Play className="w-6 h-6 ml-1" />
                      </Button>
                    </div>

                    {/* Top badges */}
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                        {video.category}
                      </Badge>
                    </div>

                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDuration(video.duration)}
                      </Badge>
                    </div>

                    {video.featured && (
                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-yellow-500 text-white text-xs">
                          精选作品
                        </Badge>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="absolute bottom-3 right-3 flex items-center space-x-3 text-white text-xs">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{video.stats.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{video.stats.likes}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-1 group-hover:text-indigo-600 transition-colors">
                {video.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 text-sm">
                {video.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0 space-y-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {video.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {video.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{video.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Prompt section */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">AI提示词</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 text-xs hover:bg-gray-200"
                    onClick={() => copyPrompt(video.id, video.prompt)}
                  >
                    {copiedPrompt === video.id ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" />
                        复制
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-600 line-clamp-3">
                  {video.prompt}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => copyPrompt(video.id, video.prompt)}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  使用此提示词
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-3 h-3" />
                </Button>
              </div>

              {/* Stats bar */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{video.stats.views}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{video.stats.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Share2 className="w-3 h-3" />
                    <span>{video.stats.shares}</span>
                  </span>
                </div>
                <span>{formatDuration(video.duration)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!showAll && displayVideos.length >= maxItems && (
        <div className="text-center">
          <Button variant="outline" size="lg">
            查看更多示例
          </Button>
        </div>
      )}
    </div>
  )
}