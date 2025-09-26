// 邮件服务集成
// lib/email.ts

import nodemailer from 'nodemailer'
import { Resend } from 'resend'

// Resend邮件服务（推荐）
const resend = new Resend(process.env.RESEND_API_KEY!)

// SMTP配置（备选方案）
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export class EmailService {
  // 发送视频生成完成通知
  async sendVideoCompletionEmail(
    userEmail: string,
    userName: string,
    videoUrl: string,
    generationId: string
  ) {
    const emailContent = {
      from: 'AI Video Studio <noreply@yourdomain.com>',
      to: userEmail,
      subject: '🎬 您的AI视频已生成完成！',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h2 style="color: #4f46e5;">视频生成完成！</h2>
          <p>嗨 ${userName},</p>
          <p>您的AI视频已经生成完成，可以查看和下载了。</p>

          <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #4f46e5;">视频详情</h3>
            <p><strong>生成ID:</strong> ${generationId}</p>
            <p><strong>生成时间:</strong> ${new Date().toLocaleString('zh-CN')}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${videoUrl}"
               style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              查看视频
            </a>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
               style="background: #6b7280; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
              前往控制台
            </a>
          </div>

          <p style="font-size: 14px; color: #6b7280; margin-top: 40px;">
            如果您没有请求生成此视频，请联系我们的客服。
          </p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

          <p style="font-size: 12px; color: #9ca3af;">
            此邮件由 AI Video Studio 自动发送，请勿回复。
            <br>如需帮助，请访问 <a href="${process.env.NEXT_PUBLIC_APP_URL}/support">帮助中心</a>
          </p>
        </div>
      `
    }

    try {
      // 使用Resend发送（推荐）
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send(emailContent)
      } else {
        // 使用SMTP发送
        await transporter.sendMail(emailContent)
      }
      console.log('Video completion email sent to:', userEmail)
    } catch (error) {
      console.error('Failed to send completion email:', error)
    }
  }

  // 发送欢迎邮件
  async sendWelcomeEmail(userEmail: string, userName: string) {
    const emailContent = {
      from: 'AI Video Studio <welcome@yourdomain.com>',
      to: userEmail,
      subject: '🚀 欢迎加入AI Video Studio！',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h2 style="color: #4f46e5;">欢迎加入AI Video Studio！</h2>
          <p>嗨 ${userName},</p>
          <p>感谢您注册AI Video Studio！您现在可以开始用AI创造令人惊艳的视频内容了。</p>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
            <h3 style="margin-top: 0; color: #0ea5e9;">🎁 欢迎礼包</h3>
            <ul style="margin: 10px 0;">
              <li>3个免费视频生成积分</li>
              <li>访问所有基础功能</li>
              <li>7x24小时客服支持</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/generate/text-to-video"
               style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              开始创作第一个视频
            </a>
          </div>

          <div style="background: #fefce8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #a16207;">💡 快速上手指南</h4>
            <ol>
              <li><a href="${process.env.NEXT_PUBLIC_APP_URL}/blog/create-professional-promo-video-in-30-seconds">阅读新手教程</a></li>
              <li><a href="${process.env.NEXT_PUBLIC_APP_URL}/examples">查看示例作品</a></li>
              <li><a href="${process.env.NEXT_PUBLIC_APP_URL}/try-free">免费体验功能</a></li>
            </ol>
          </div>

          <p>如果您有任何问题，随时联系我们的支持团队。</p>

          <p>祝您创作愉快！<br>AI Video Studio 团队</p>
        </div>
      `
    }

    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send(emailContent)
      } else {
        await transporter.sendMail(emailContent)
      }
      console.log('Welcome email sent to:', userEmail)
    } catch (error) {
      console.error('Failed to send welcome email:', error)
    }
  }

  // 发送订阅确认邮件
  async sendSubscriptionConfirmationEmail(
    userEmail: string,
    userName: string,
    plan: string,
    credits: number
  ) {
    const emailContent = {
      from: 'AI Video Studio <billing@yourdomain.com>',
      to: userEmail,
      subject: '✅ 订阅确认 - 开始享受专业功能！',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h2 style="color: #059669;">订阅成功确认！</h2>
          <p>嗨 ${userName},</p>
          <p>感谢您升级到 <strong>${plan}</strong> 计划！您的订阅已经激活。</p>

          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
            <h3 style="margin-top: 0; color: #059669;">您的新权益</h3>
            <ul style="margin: 10px 0;">
              <li>每月 ${credits} 个视频生成积分</li>
              <li>高清视频输出</li>
              <li>无水印下载</li>
              <li>优先处理队列</li>
              <li>高级功能访问权限</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
               style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              前往控制台
            </a>
          </div>

          <p style="font-size: 14px; color: #6b7280;">
            您可以随时在账户设置中管理您的订阅。
          </p>
        </div>
      `
    }

    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send(emailContent)
      } else {
        await transporter.sendMail(emailContent)
      }
      console.log('Subscription confirmation email sent to:', userEmail)
    } catch (error) {
      console.error('Failed to send subscription email:', error)
    }
  }
}

// 环境变量配置
const emailEnvConfig = `
# Resend邮件服务（推荐）
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx

# 或者使用SMTP
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# 发送域名
EMAIL_FROM=noreply@yourdomain.com
`