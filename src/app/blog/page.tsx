import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, Tag, User, ArrowRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { blogCategories, featuredPosts } from "@/lib/blog-data"
import SEOHead from "@/components/seo-head"
import StructuredData from "@/components/structured-data"
import Head from "next/head"

export default function BlogPage() {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  return (
    <>
      <Head>
        <SEOHead
          page="blog"
          customTitle="AI Video Creation Tutorials & Case Studies | AI Video Studio Blog"
          customDescription="Learn AI video generation techniques, get professional tutorials, case studies and industry insights. Enhance your AI video creation skills."
        />
        <StructuredData type="Article" data={{
          title: "AI Video Creation Tutorials & Case Studies",
          description: "Professional blog for learning AI video generation technology",
          publishedDate: new Date().toISOString()
        }} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">AI Video Studio</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/blog" className="text-indigo-600 font-medium">Blog</Link>
              <Link href="/generate/text-to-video" className="text-gray-700 hover:text-indigo-600">Text to Video</Link>
              <Link href="/generate/image-to-video" className="text-gray-700 hover:text-indigo-600">Image to Video</Link>
              <Link href="/auth/signin">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI Video Creation
              <span className="text-indigo-600 block">Tutorials & Cases</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore the endless possibilities of AI video generation, learn professional techniques, gain industry insights, and enhance your creative skills
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search tutorials and cases..."
                className="pl-10 py-3 text-lg"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Content Categories</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {blogCategories.map((category) => (
                <Link key={category.id} href={`/blog/category/${category.slug}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <span className="text-2xl font-bold text-indigo-600">{category.postCount}</span>
                        <p className="text-sm text-gray-500">Articles</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Articles</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2 text-sm">
                        <Tag className="w-4 h-4" />
                        <span>{post.category}</span>
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {post.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CalendarDays className="w-4 h-4" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <Button className="w-full group">
                                                Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Subscribe to AI Video Weekly
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Get the latest AI video creation tutorials, tips, and industry updates delivered to your inbox weekly
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <Input
                placeholder="Enter your email address"
                className="flex-1 bg-white"
              />
              <Button variant="outline" className="bg-white text-indigo-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-indigo-200 mt-4">
              We promise not to send spam and you can unsubscribe at any time
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Start Creating?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Apply what you&rsquo;ve just learned and start creating your first AI video right away
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/generate/text-to-video">
                <Button size="lg" className="px-8">
                  Text to Video
                </Button>
              </Link>
              <Link href="/generate/image-to-video">
                <Button size="lg" variant="outline" className="px-8">
                  Image to Video
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}