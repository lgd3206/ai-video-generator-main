// 监控和分析服务
// lib/analytics.ts

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

// Google Analytics配置
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// 事件跟踪
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    })
  }
}

// 页面浏览跟踪
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url
    })
  }
}

// 用户行为分析
export class UserAnalytics {
  // 跟踪视频生成
  static trackVideoGeneration(type: 'TEXT_TO_VIDEO' | 'IMAGE_TO_VIDEO', userId?: string) {
    trackEvent('video_generation_started', 'engagement', type)

    // 发送到后端进行详细记录
    if (typeof window !== 'undefined') {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'video_generation_started',
          properties: {
            type,
            userId,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer
          }
        })
      }).catch(console.error)
    }
  }

  // 跟踪用户注册
  static trackUserSignup(method: 'email' | 'google', userId: string) {
    trackEvent('sign_up', 'user', method)

    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'user_signup',
        properties: {
          method,
          userId,
          timestamp: new Date().toISOString()
        }
      })
    }).catch(console.error)
  }

  // 跟踪支付转化
  static trackPurchase(plan: string, amount: number, userId: string) {
    trackEvent('purchase', 'conversion', plan, amount)

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: Date.now().toString(),
        value: amount,
        currency: 'USD',
        items: [{
          item_id: plan,
          item_name: `${plan} Plan`,
          category: 'subscription',
          quantity: 1,
          price: amount
        }]
      })
    }
  }
}

// 性能监控
export class PerformanceMonitor {
  // 监控API响应时间
  static async monitorAPICall<T>(
    apiName: string,
    apiCall: () => Promise<T>
  ): Promise<T> {
    const startTime = Date.now()

    try {
      const result = await apiCall()
      const duration = Date.now() - startTime

      // 记录成功的API调用
      this.recordAPIMetric(apiName, duration, 'success')
      return result

    } catch (error) {
      const duration = Date.now() - startTime

      // 记录失败的API调用
      this.recordAPIMetric(apiName, duration, 'error')
      throw error
    }
  }

  private static recordAPIMetric(apiName: string, duration: number, status: string) {
    // 发送到监控服务
    fetch('/api/metrics/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric: 'api_call_duration',
        value: duration,
        tags: {
          api_name: apiName,
          status
        },
        timestamp: Date.now()
      })
    }).catch(console.error)
  }

  // 监控视频生成成功率
  static recordVideoGenerationResult(
    generationId: string,
    status: 'success' | 'failed',
    duration: number,
    provider: string
  ) {
    fetch('/api/metrics/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric: 'video_generation_result',
        value: status === 'success' ? 1 : 0,
        tags: {
          provider,
          status
        },
        metadata: {
          generation_id: generationId,
          duration
        },
        timestamp: Date.now()
      })
    }).catch(console.error)
  }
}

// Sentry错误监控配置
// next.config.js
const { withSentryConfig } = require('@sentry/nextjs')

const nextConfig = {
  // 现有配置...

  // Sentry配置
  sentry: {
    hideSourceMaps: true,
    widenClientFileUpload: true
  }
}

const sentryWebpackPluginOptions = {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)

// 错误边界组件
// components/error-boundary.tsx
import { Component, ReactNode } from 'react'
import * as Sentry from '@sentry/nextjs'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    Sentry.captureException(error, {
      contexts: {
        react: errorInfo
      }
    })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null // JSX removed for TS compatibility
      /*
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              哎呀，出了点问题
            </h2>
            <p className="text-gray-600 mb-6">
              我们已经记录了这个错误，会尽快修复
            </p>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded"
              onClick={() => this.setState({ hasError: false })}
            >
              重试
            </button>
          </div>
        </div>
      */
    }

    return this.props.children
  }
}

// 环境变量配置
const monitoringEnvConfig = `
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry错误监控
SENTRY_ORG=your-org
SENTRY_PROJECT=ai-video-studio
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx

# Vercel Analytics（自动启用）
# 无需配置

# Uptime Robot API（可选）
UPTIME_ROBOT_API_KEY=ur-xxxxxxxxxxxxxxxx
`