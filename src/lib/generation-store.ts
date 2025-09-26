"use client"

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export interface GenerationTask {
  id: string
  replicateId?: string
  type: 'TEXT_TO_VIDEO' | 'IMAGE_TO_VIDEO'
  prompt: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  videoUrl?: string
  error?: string
  createdAt: Date
  estimatedTime?: number
}

interface GenerationStore {
  tasks: GenerationTask[]
  activeTask: string | null

  // Actions
  addTask: (task: Omit<GenerationTask, 'createdAt'>) => void
  updateTask: (id: string, updates: Partial<GenerationTask>) => void
  removeTask: (id: string) => void
  setActiveTask: (id: string | null) => void
  pollTaskStatus: (id: string, replicateId: string) => Promise<void>
}

export const useGenerationStore = create<GenerationStore>()(
  subscribeWithSelector((set, get) => ({
    tasks: [],
    activeTask: null,

    addTask: (task) => set((state) => ({
      tasks: [...state.tasks, { ...task, createdAt: new Date() }]
    })),

    updateTask: (id, updates) => set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    })),

    removeTask: (id) => set((state) => ({
      tasks: state.tasks.filter(task => task.id !== id),
      activeTask: state.activeTask === id ? null : state.activeTask
    })),

    setActiveTask: (id) => set({ activeTask: id }),

    pollTaskStatus: async (id: string, replicateId: string) => {
      const pollInterval = setInterval(async () => {
        try {
          const response = await fetch('/api/generate/status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ replicateId, generationId: id }),
          })

          if (response.ok) {
            const data = await response.json()
            const { updateTask } = get()

            switch (data.status) {
              case 'succeeded':
                updateTask(id, {
                  status: 'completed',
                  progress: 100,
                  videoUrl: data.videoUrl
                })
                clearInterval(pollInterval)
                break
              case 'failed':
                updateTask(id, {
                  status: 'failed',
                  error: data.error || 'Generation failed'
                })
                clearInterval(pollInterval)
                break
              case 'processing':
                updateTask(id, {
                  status: 'processing',
                  progress: Math.min(get().tasks.find(t => t.id === id)?.progress || 0 + 10, 90)
                })
                break
            }
          }
        } catch (error) {
          console.error('Failed to poll status:', error)
          // Don't clear interval on network errors, keep trying
        }
      }, 3000) // Poll every 3 seconds

      // Set timeout to stop polling after 10 minutes
      setTimeout(() => {
        clearInterval(pollInterval)
      }, 600000)
    }
  }))
)

// Hook to use generation queue functionality
export const useGenerationQueue = () => {
  const tasks = useGenerationStore(state => state.tasks)
  const activeTask = useGenerationStore(state => state.activeTask)

  const pendingTasks = tasks.filter(task => task.status === 'pending')
  const processingTasks = tasks.filter(task => task.status === 'processing')
  const completedTasks = tasks.filter(task => task.status === 'completed')
  const failedTasks = tasks.filter(task => task.status === 'failed')

  const queuePosition = (taskId: string) => {
    const index = pendingTasks.findIndex(task => task.id === taskId)
    return index >= 0 ? index + 1 : null
  }

  const estimatedWaitTime = (taskId: string) => {
    const position = queuePosition(taskId)
    if (!position) return null

    // Estimate 30 seconds per task ahead in queue
    return position * 30
  }

  return {
    tasks,
    activeTask: tasks.find(task => task.id === activeTask),
    pendingTasks,
    processingTasks,
    completedTasks,
    failedTasks,
    queuePosition,
    estimatedWaitTime,
    totalTasks: tasks.length,
    queueSize: pendingTasks.length + processingTasks.length
  }
}