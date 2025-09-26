import { pageConfigs } from "@/lib/seo"

interface SEOHeadProps {
  page: keyof typeof pageConfigs
  customTitle?: string
  customDescription?: string
  customImage?: string
}

export default function SEOHead({
  page,
  customTitle,
  customDescription,
  customImage
}: SEOHeadProps) {
  const config = pageConfigs[page]
  const title = customTitle || config.title
  const description = customDescription || config.description
  const image = customImage || '/og-image.png'
  const url = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={config.keywords?.join(', ')} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="AI Video Studio" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@aivideostudio" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="AI Video Studio" />
      <link rel="canonical" href={url} />
    </>
  )
}