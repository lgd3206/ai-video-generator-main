"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Building2, TrendingUp, Users, Star, Quote, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Head from "next/head"
import SEOHead from "@/components/seo-head"
import StructuredData from "@/components/structured-data"
import { caseStudies, industries } from "@/lib/case-studies"

export default function CaseStudiesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCaseStudies = caseStudies.filter(caseStudy => {
    const matchesIndustry = selectedIndustry === 'all' ||
      caseStudy.industry.toLowerCase().includes(selectedIndustry) ||
      caseStudy.tags.some(tag => tag.toLowerCase().includes(selectedIndustry))

    const matchesSearch = searchQuery === '' ||
      caseStudy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseStudy.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseStudy.industry.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesIndustry && matchesSearch
  })

  const featuredCases = caseStudies.filter(c => c.featured)

  return (
    <>
      <Head>
        <SEOHead
          page="cases"
          customTitle="AI Video Success Stories | Real Customer Case Studies | AI Video Studio"
          customDescription="Explore successful AI video applications across different industries. Detailed data analysis and customer feedback to understand the business value of AI video."
        />
        <StructuredData type="Service" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">AI Video Studio</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/blog" className="text-gray-700 hover:text-indigo-600">Blog</Link>
              <Link href="/cases" className="text-indigo-600 font-medium">Case Studies</Link>
              <Link href="/generate/text-to-video" className="text-gray-700 hover:text-indigo-600">Start Creating</Link>
              <Link href="/auth/signin">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories
              <span className="text-indigo-600 block">Real Results Showcase</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              See how businesses across industries use AI Video Studio to create commercial value and achieve breakthrough marketing goals
            </p>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">1000+</div>
                <div className="text-gray-600">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">20+</div>
                <div className="text-gray-600">Industries Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                <div className="text-gray-600">Avg. Conversion Boost</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">90%</div>
                <div className="text-gray-600">Cost Savings</div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 px-4 bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search cases or companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Industry Filter */}
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <Button
                    key={industry.value}
                    variant={selectedIndustry === industry.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedIndustry(industry.value)}
                    className="text-sm"
                  >
                    <Filter className="w-4 h-4 mr-1" />
                    {industry.name} ({industry.count})
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cases */}
        {selectedIndustry === 'all' && searchQuery === '' && (
          <section className="py-12 px-4">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Cases</h2>
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                {featuredCases.map((caseStudy) => (
                  <Card key={caseStudy.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="lg" variant="secondary" className="bg-white/90 hover:bg-white">
                          <Play className="w-6 h-6 mr-2" />
                                                    Watch Case Study
                        </Button>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-indigo-600 text-white">
                          {caseStudy.industry}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="group-hover:text-indigo-600 transition-colors">
                            {caseStudy.title}
                          </CardTitle>
                          <CardDescription className="text-base mt-1">
                            {caseStudy.company} • {caseStudy.subtitle}
                          </CardDescription>
                        </div>
                        <Building2 className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {caseStudy.results.slice(0, 2).map((result, index) => (
                          <div key={index} className="text-center">
                            <div className="text-2xl font-bold text-indigo-600 mb-1">
                              {result.value}
                            </div>
                            <div className="text-sm text-gray-600">
                              {result.metric}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <Quote className="w-4 h-4 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-700 italic mb-2">
                          &ldquo;{caseStudy.testimonial.quote.substring(0, 80)}...&rdquo;
                        </p>
                        <div className="text-xs text-gray-500">
                          {caseStudy.testimonial.author} • {caseStudy.testimonial.position}
                        </div>
                      </div>

                      <Link href={`/cases/${caseStudy.id}`}>
                        <Button className="w-full">
                          View Full Case Study
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Cases */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                All Cases ({filteredCaseStudies.length})
              </h2>
              <div className="text-sm text-gray-500">
                Sorted by effectiveness
              </div>
            </div>

            <div className="space-y-8">
              {filteredCaseStudies.map((caseStudy) => (
                <Card key={caseStudy.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="lg:flex">
                    {/* Video Preview */}
                    <div className="lg:w-1/3">
                      <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button variant="secondary" className="bg-white/90 hover:bg-white">
                            <Play className="w-5 h-5 mr-2" />
                                                        Play
                          </Button>
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-indigo-600 text-white">
                            {caseStudy.industry}
                          </Badge>
                        </div>
                        {caseStudy.featured && (
                          <div className="absolute top-4 right-4">
                            <Badge variant="secondary" className="bg-yellow-500 text-white">
                              <Star className="w-3 h-3 mr-1" />
                                                            Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {caseStudy.title}
                          </h3>
                          <p className="text-lg text-gray-600 mb-4">
                            {caseStudy.company} • {caseStudy.subtitle}
                          </p>
                        </div>
                        <Building2 className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 mb-6">
                        {caseStudy.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="text-center">
                            <div className="text-xl font-bold text-indigo-600 mb-1">
                              {result.value}
                            </div>
                            <div className="text-sm text-gray-600 mb-1">
                              {result.metric}
                            </div>
                            <div className="text-xs text-gray-500">
                              {result.description}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex items-start space-x-3">
                          <Quote className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-gray-700 italic mb-2">
                              &ldquo;{caseStudy.testimonial.quote}&rdquo;
                            </p>
                            <div className="text-sm text-gray-600">
                              — {caseStudy.testimonial.author}, {caseStudy.testimonial.position}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {caseStudy.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Link href={`/cases/${caseStudy.id}`}>
                          <Button>
                            Detailed Analysis
                            <TrendingUp className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredCaseStudies.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No matching cases found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or selecting other industry categories
                </p>
                <Button onClick={() => {
                  setSearchQuery('')
                  setSelectedIndustry('all')
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Create Your Success Story
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join 1000+ successful companies and drive your marketing growth with AI video technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/generate/text-to-video">
                <Button size="lg" variant="secondary" className="px-8">
                  Start Creating Free
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600 px-8">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Want Custom Enterprise Solutions?
            </h2>
            <p className="text-gray-600 mb-6">
              We provide dedicated AI video solutions and technical support for large enterprises
            </p>
            <Button size="lg" variant="outline">
              Contact Sales Team
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}