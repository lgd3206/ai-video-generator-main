"use client"

import { useGenerationQueue } from "@/lib/generation-store"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { Download, Clock, Video, Image as ImageIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function GenerationMonitor() {
  const { tasks, queuePosition, estimatedWaitTime } = useGenerationQueue()

  // Only show tasks that are pending or processing
  const activeTasks = tasks.filter(
    task => task.status === 'pending' || task.status === 'processing'
  )

  if (activeTasks.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {activeTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/95 backdrop-blur-sm shadow-lg border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2 flex-1">
                    {task.type === 'TEXT_TO_VIDEO' ? (
                      <Video className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        {task.type === 'TEXT_TO_VIDEO' ? 'Text to Video' : 'Image to Video'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {task.prompt}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">
                      {task.status === 'pending' ? 'In Queue' : 'Processing...'}
                    </span>
                    <span className="text-gray-500">
                      {Math.round(task.progress)}%
                    </span>
                  </div>

                  <Progress value={task.progress} className="h-2" />

                  {task.status === 'pending' && (
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          Position: {queuePosition(task.id) || 'N/A'}
                        </span>
                      </div>
                      <span>
                        ~{estimatedWaitTime(task.id)}s wait
                      </span>
                    </div>
                  )}

                  {task.status === 'processing' && (
                    <div className="flex items-center justify-center">
                      <LoadingSpinner size="sm" className="mr-2" />
                      <span className="text-xs text-gray-600">Generating video...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Completed task notifications
export function CompletedTaskNotification() {
  const { completedTasks, failedTasks } = useGenerationQueue()

  // Get recently completed tasks (last 5 minutes)
  const recentlyCompleted = completedTasks.filter(
    task => Date.now() - task.createdAt.getTime() < 300000 // 5 minutes
  )

  const recentlyFailed = failedTasks.filter(
    task => Date.now() - task.createdAt.getTime() < 300000 // 5 minutes
  )

  const allRecentTasks = [...recentlyCompleted, ...recentlyFailed]

  if (allRecentTasks.length === 0) {
    return null
  }

  const handleDownload = (videoUrl: string, taskId: string) => {
    const link = document.createElement('a')
    link.href = videoUrl
    link.download = `video-${taskId}.mp4`
    link.click()
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {allRecentTasks.map((task) => (
          <motion.div
            key={`notification-${task.id}`}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.5 }}
          >
            <Card className={`bg-white/95 backdrop-blur-sm shadow-lg border ${
              task.status === 'completed'
                ? 'border-green-200'
                : 'border-red-200'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {task.type === 'TEXT_TO_VIDEO' ? (
                      <Video className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-purple-600" />
                    )}
                    <span className="text-sm font-medium">
                      {task.status === 'completed' ? 'Video Ready!' : 'Generation Failed'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-3 truncate">
                  {task.prompt}
                </p>

                {task.status === 'completed' && task.videoUrl && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(task.videoUrl, '_blank')}
                      className="flex-1"
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDownload(task.videoUrl!, task.id)}
                      className="flex-1"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                )}

                {task.status === 'failed' && (
                  <div className="text-xs text-red-600">
                    {task.error || 'Generation failed. Please try again.'}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}