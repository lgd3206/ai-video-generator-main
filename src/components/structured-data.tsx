
interface StructuredDataProps {
  type: 'WebApplication' | 'VideoObject' | 'Article' | 'Service'
  data?: Record<string, unknown>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'

  const getStructuredData = () => {
    switch (type) {
      case 'WebApplication':
        return {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Video Studio",
          "description": "Create stunning AI videos from text prompts and images using advanced artificial intelligence technology",
          "url": baseUrl,
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "featureList": [
            "Text to Video Generation",
            "Image to Video Animation",
            "AI Video Creation",
            "Real-time Progress Tracking",
            "Video Download and Sharing"
          ],
          "creator": {
            "@type": "Organization",
            "name": "AI Video Studio",
            "url": baseUrl
          }
        }

      case 'VideoObject':
        return {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": data?.title || "AI Generated Video",
          "description": data?.description || "Video created using AI technology",
          "thumbnailUrl": data?.thumbnail || `${baseUrl}/og-image.png`,
          "uploadDate": data?.uploadDate || new Date().toISOString(),
          "contentUrl": data?.videoUrl,
          "embedUrl": data?.embedUrl,
          "duration": data?.duration || "PT30S",
          "width": "1280",
          "height": "720",
          "creator": {
            "@type": "Organization",
            "name": "AI Video Studio"
          }
        }

      case 'Service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "AI Video Generation Service",
          "description": "Professional AI-powered video creation from text descriptions and images",
          "provider": {
            "@type": "Organization",
            "name": "AI Video Studio",
            "url": baseUrl
          },
          "serviceType": "Video Production",
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": baseUrl,
            "serviceSupportedCountry": "US"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        }

      case 'Article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data?.title || "AI Video Generation Guide",
          "description": data?.description || "Learn how to create amazing videos with AI",
          "author": {
            "@type": "Organization",
            "name": "AI Video Studio"
          },
          "publisher": {
            "@type": "Organization",
            "name": "AI Video Studio",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.png`
            }
          },
          "datePublished": data?.publishedDate || new Date().toISOString(),
          "dateModified": data?.modifiedDate || new Date().toISOString(),
          "image": data?.image || `${baseUrl}/og-image.png`
        }

      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}