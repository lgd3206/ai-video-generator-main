"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Head from "next/head"
import SEOHead from "@/components/seo-head"
import VideoGallery from "@/components/video-gallery"

export default function ExamplesPage() {
  return (
    <>
      <Head>
        <SEOHead
          page="home"
          customTitle="AI Video Gallery | Featured Cases and Prompts | AI Video Studio"
          customDescription="Browse a collection of stunning AI-generated videos for creative inspiration. Includes detailed prompts and creation techniques to help you create better AI videos."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">AI Video Studio</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/try-free">
                <Button size="sm">Try Free</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI Video Gallery
              <span className="text-indigo-600 block">Showcase</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore amazing video creations made by users with AI Video Studio, learn excellent prompt techniques, and get creative inspiration
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/try-free">
                <Button size="lg">
                  立即免费试用
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="outline">
                  查看制作教程
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Video Gallery */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <VideoGallery showAll={true} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 mt-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              创作属于你的AI视频作品
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              现在就开始使用AI创造令人惊艳的视频内容，将你的创意变成现实
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/try-free">
                <Button size="lg" variant="secondary" className="px-8">
                  免费开始创作
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600 px-8">
                  注册获取更多功能
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}