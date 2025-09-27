import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, User, ArrowLeft, Share2, BookOpen, Play, CheckCircle } from "lucide-react"
import Link from "next/link"
import Head from "next/head"
import SEOHead from "@/components/seo-head"
import StructuredData from "@/components/structured-data"

export default function BlogPostPage() {
  return (
    <>
      <Head>
        <SEOHead
          page="home"
          customTitle="How to Create Professional Promotional Videos with AI in 30 Seconds | AI Video Studio Tutorial"
          customDescription="Detailed tutorial: From text description to finished video, let AI help you quickly create high-quality commercial promotional videos. Includes real cases and best practices."
        />
        <StructuredData type="Article" data={{
          title: "How to Create Professional Promotional Videos with AI in 30 Seconds",
          description: "Detailed tutorial: From text description to finished video, let AI help you quickly create high-quality commercial promotional videos",
          publishedDate: "2024-01-15T00:00:00.000Z",
          modifiedDate: "2024-01-15T00:00:00.000Z",
          image: "/blog/professional-promo-video.jpg"
        }} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">AI Video Studio</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/blog">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </header>

        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-indigo-600 mb-4">
              <BookOpen className="w-4 h-4" />
              <span>AI Video Tutorial</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How to Create Professional Promotional Videos with AI in 30 Seconds
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              Detailed tutorial: From text description to finished video, let AI help you quickly create high-quality commercial promotional videos
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>AI Video Studio Team</span>
              </div>
              <div className="flex items-center space-x-1">
                <CalendarDays className="w-4 h-4" />
                <span>January 15, 2024</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Tutorial', 'Text-to-Video', 'Business Video', 'Quick Creation'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg mb-8 flex items-center justify-center">
            <Play className="w-16 h-16 text-indigo-600" />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
              <p className="text-blue-800 font-medium">
                💡 <strong>Quick Guide:</strong> This tutorial will teach you how to create professional promotional videos using AI in 30 seconds, including practical steps and optimization tips.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose AI for Promotional Videos?</h2>
            <p className="text-gray-700 mb-6">
              Traditional video production requires professional equipment, complex software, and significant time investment. AI video generation technology enables everyone to create professional-quality video content in seconds. Whether you&apos;re a marketer, small business owner, or content creator, AI can help you quickly realize your creative vision.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Production Process Overview</h2>
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <Card>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-indigo-600 font-bold text-lg">1</span>
                  </div>
                  <CardTitle className="text-lg">Write Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Describe in detail the video content, style, and key information you want
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-600 font-bold text-lg">2</span>
                  </div>
                  <CardTitle className="text-lg">AI Generates Video</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    AI algorithm analyzes your description and generates video content that meets your requirements
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 font-bold text-lg">3</span>
                  </div>
                  <CardTitle className="text-lg">Download and Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Preview and download the video when satisfied, ready for immediate use
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Operation Steps</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1: Prepare Your Prompt</h3>
            <p className="text-gray-700 mb-4">
              The key to success lies in writing clear, specific descriptions. A good prompt should include the following elements:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Product or Service Description:</strong> Clearly explain what you want to promote</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Visual Style:</strong> Modern minimalist, business professional, energetic dynamic, etc.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Color Preferences:</strong> Specify main colors or tones</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Scene Setting:</strong> Office, outdoor, abstract background, etc.</span>
              </li>
            </ul>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Example Prompt:</h4>
              <p className="text-gray-700 italic border-l-4 border-indigo-400 pl-4">
                &ldquo;Create a 30-second tech company promotional video showcasing cloud computing services. Modern minimalist style, primarily blue and white tones.
                Scenes include: data center servers, cloud animations, network connection visualizations, business people using laptops.
                Overall feel: professional and trustworthy, conveying a secure and reliable corporate image.&rdquo;
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2: Use AI Video Studio to Generate</h3>
            <p className="text-gray-700 mb-4">
              Enter your prompt into our text-to-video tool:
            </p>
            <ol className="space-y-3 mb-6 pl-6">
              <li className="text-gray-700">Visit the text-to-video page</li>
              <li className="text-gray-700">在文本框中粘贴你的详细描述</li>
              <li className="text-gray-700">点击&ldquo;生成视频&rdquo;按钮</li>
              <li className="text-gray-700">等待AI处理（通常需要20-30秒）</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">步骤3: 优化和调整</h3>
            <p className="text-gray-700 mb-4">
              如果首次生成的结果不够理想，你可以：
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>调整提示词的具体程度</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>添加更多风格描述</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>重新生成获得不同版本</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">专业提示和最佳实践</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800">✅ 推荐做法</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-green-700">
                  <p>• 使用具体而非抽象的描述</p>
                  <p>• 指定视频时长和节奏</p>
                  <p>• 包含品牌元素描述</p>
                  <p>• 考虑目标受众特点</p>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800">❌ 避免事项</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-red-700">
                  <p>• 描述过于简单模糊</p>
                  <p>• 要求冲突的视觉效果</p>
                  <p>• 忽略品牌一致性</p>
                  <p>• 期望过于复杂的场景</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">实际案例分析</h2>
            <p className="text-gray-700 mb-4">
              让我们看一个实际的成功案例。一家SaaS公司使用以下描述创建了一个高转化率的宣传视频：
            </p>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-indigo-900 mb-3">成功案例描述：</h4>
              <p className="text-indigo-800 italic">
                &ldquo;创建一个25秒的项目管理软件宣传视频。场景：现代办公室环境，团队协作画面。
                视觉元素包括：看板界面、任务拖拽动画、团队成员头像、进度图表、移动设备同步。
                配色：清新的蓝绿色系，传达效率和协作的感觉。整体节奏轻快，突出简化工作流程的价值。&rdquo;
              </p>
            </div>

            <p className="text-gray-700 mb-6">
              <strong>结果：</strong>这个视频在社交媒体上获得了85%的完播率，并带来了40%的试用注册增长。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">立即开始制作</h2>
            <p className="text-gray-700 mb-6">
              现在你已经掌握了AI视频制作的核心技巧，是时候创作你的第一个专业宣传视频了。记住，最好的学习方法就是实践！
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center my-8">
              <Link href="/generate/text-to-video">
                <Button size="lg" className="px-8">
                  开始制作视频
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="outline" className="px-8">
                  浏览更多教程
                </Button>
              </Link>
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-12">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Video Studio Team</h3>
                <p className="text-gray-600 mb-4">
                  我们是一支专注于AI视频技术的专业团队，致力于让每个人都能轻松创作专业级视频内容。
                  我们定期分享最新的AI视频制作技巧和行业洞察。
                </p>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">关注我们</Button>
                  <Button variant="ghost" size="sm">更多文章</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">相关文章</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">图片动画化：让静态照片瞬间活起来</CardTitle>
                  <CardDescription>
                    探索AI图片动画技术，学会如何将任何静态图片转换成动态视频内容
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/blog/animate-static-photos-with-ai">
                    <Button variant="ghost" className="p-0 h-auto">
                      阅读更多 →
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">2024年AI视频生成技术发展趋势</CardTitle>
                  <CardDescription>
                    深度分析AI视频生成技术在2024年的发展方向和市场机会
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/blog/ai-video-generation-trends-2024">
                    <Button variant="ghost" className="p-0 h-auto">
                      阅读更多 →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}