import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Image as ImageIcon, Video, Sparkles, Users, Clock, Zap, Gift } from "lucide-react"
import Link from "next/link"
import Head from "next/head"
import SEOHead from "@/components/seo-head"
import StructuredData from "@/components/structured-data"
import VideoGallery from "@/components/video-gallery"

export default function HomePage() {
  return (
    <>
      <Head>
        <SEOHead page="home" />
        <StructuredData type="WebApplication" />
        <StructuredData type="Service" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">AI Video Studio</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/examples" className="text-gray-700 hover:text-indigo-600">
              Examples
            </Link>
            <Link href="/cases" className="text-gray-700 hover:text-indigo-600">
              Case Studies
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-indigo-600">
              Blog
            </Link>
            <Link href="/try-free">
              <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                <Gift className="w-4 h-4 mr-1" />
                Free Trial
              </Button>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Stunning AI Videos in
              <span className="text-indigo-600 block">Seconds</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your text prompts and images into captivating videos using cutting-edge AI technology.
              No video editing experience required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/try-free">
                <Button size="lg" className="px-8 py-3">
                  <Gift className="mr-2 w-5 h-5" />
                  Try Free Now <Play className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" className="px-8 py-3">
                  Get Started <Zap className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Two Powerful AI Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our advanced AI video generation tools to bring your ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Text to Video */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                  <Sparkles className="w-8 h-8 text-indigo-600" />
                </div>
                <CardTitle className="text-2xl">Text to Video</CardTitle>
                <CardDescription className="text-base">
                  Transform your written descriptions into dynamic video content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                    Write detailed prompts
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                    AI generates scenes
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                    High-quality output
                  </li>
                </ul>
                <Link href="/generate/text-to-video">
                  <Button className="w-full">
                    Try Text to Video
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Image to Video */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <ImageIcon className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">Image to Video</CardTitle>
                <CardDescription className="text-base">
                  Animate your static images with realistic motion and effects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    Upload any image
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    AI adds motion
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    Seamless animation
                  </li>
                </ul>
                <Link href="/generate/image-to-video">
                  <Button className="w-full" variant="outline">
                    Try Image to Video
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Example Videos Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI Video Showcase
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Explore amazing video content created by our users with AI Video Studio. Get inspired and learn from excellent prompts.
            </p>
            <Link href="/examples">
              <Button variant="outline">
                View Complete Gallery
              </Button>
            </Link>
          </div>

          <VideoGallery maxItems={6} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10K+</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Video className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50K+</h3>
              <p className="text-gray-600">Videos Generated</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">&lt; 30s</h3>
              <p className="text-gray-600">Average Generation Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Amazing Videos?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using AI to bring their ideas to life.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="outline" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-300">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <span className="text-lg font-bold text-white">AI Video Studio</span>
          </div>
          <p className="text-sm">
            © 2024 AI Video Studio. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
    </>
  )
}
