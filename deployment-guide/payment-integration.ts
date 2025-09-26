// Stripe支付集成
// lib/stripe.ts

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export const PLANS = {
  free: {
    name: 'Free',
    credits: 3,
    price: 0,
    stripePriceId: null
  },
  pro: {
    name: 'Pro',
    credits: 100,
    price: 29,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID!
  },
  enterprise: {
    name: 'Enterprise',
    credits: 500,
    price: 99,
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID!
  }
}

export class PaymentService {
  // 创建结账会话
  async createCheckoutSession(
    userId: string,
    plan: keyof typeof PLANS,
    successUrl: string,
    cancelUrl: string
  ): Promise<string> {
    const planConfig = PLANS[plan]

    const session = await stripe.checkout.sessions.create({
      customer_email: undefined, // 用户邮箱
      metadata: {
        userId,
        plan
      },
      line_items: [
        {
          price: planConfig.stripePriceId,
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      billing_address_collection: 'required',
      automatic_tax: {
        enabled: true
      }
    })

    return session.url!
  }

  // 创建客户门户会话（管理订阅）
  async createPortalSession(customerId: string, returnUrl: string): Promise<string> {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl
    })

    return session.url
  }

  // 处理webhook事件
  async handleWebhook(body: string, signature: string): Promise<void> {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
    } catch (err) {
      throw new Error(`Webhook signature verification failed`)
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object)
        break
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object)
        break
      case 'customer.subscription.deleted':
        await this.handleSubscriptionCanceled(event.data.object)
        break
      case 'invoice.payment_succeeded':
        await this.handlePaymentSucceeded(event.data.object)
        break
      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object)
        break
    }
  }

  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const { userId, plan } = session.metadata!

    // 更新用户订阅信息
    await prisma.subscription.upsert({
      where: { userId },
      create: {
        userId,
        plan,
        status: 'active',
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: session.subscription as string,
        monthlyCredits: PLANS[plan as keyof typeof PLANS].credits
      },
      update: {
        plan,
        status: 'active',
        stripeSubscriptionId: session.subscription as string,
        monthlyCredits: PLANS[plan as keyof typeof PLANS].credits
      }
    })

    // 给用户添加积分
    await prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          increment: PLANS[plan as keyof typeof PLANS].credits
        }
      }
    })
  }
}

// API路由：pages/api/stripe/create-checkout.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { PaymentService } from '@/lib/stripe'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const { plan } = req.body
    const paymentService = new PaymentService()

    const checkoutUrl = await paymentService.createCheckoutSession(
      session.user.id,
      plan,
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`
    )

    res.status(200).json({ url: checkoutUrl })
  } catch (error) {
    console.error('Checkout creation error:', error)
    res.status(500).json({ error: 'Failed to create checkout session' })
  }
}

// Webhook处理：pages/api/stripe/webhook.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { PaymentService } from '@/lib/stripe'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const signature = req.headers['stripe-signature'] as string
  const body = JSON.stringify(req.body)

  try {
    const paymentService = new PaymentService()
    await paymentService.handleWebhook(body, signature)
    res.status(200).json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    res.status(400).json({ error: 'Webhook error' })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}