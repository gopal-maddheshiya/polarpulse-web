import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

const DEFAULT_ORIGIN = 'https://polaris-sih2026.vercel.app'
const DEFAULT_TITLE = "POLARIS · India's Polar Knowledge & Outreach Platform"
const DEFAULT_DESC =
  "India's sovereign polar archive connecting 44 years of Antarctic, Arctic, and Southern Ocean expeditions, open cryospheric data, and AI-assisted scientific dissemination."
const DEFAULT_IMAGE = `${DEFAULT_ORIGIN}/og-image.jpg`

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string[] | string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  schema?: Record<string, any> | Record<string, any>[]
  breadcrumbs?: BreadcrumbItem[]
  speakableSelectors?: string[]
}

function updateMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name'
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function updateLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function updateHreflang(hreflang: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'alternate')
    el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  schema,
  breadcrumbs,
  speakableSelectors,
}: SEOProps) {
  const { isHindi } = useLanguage()

  useEffect(() => {
    // 1. Title
    const fullTitle = title
      ? `${title} · POLARIS | India's Polar Gateway`
      : DEFAULT_TITLE
    document.title = fullTitle

    // 2. Lang sync
    document.documentElement.lang = isHindi ? 'hi' : 'en'

    // 3. Meta Description & Keywords
    const metaDesc = description || DEFAULT_DESC
    updateMeta('description', metaDesc)

    if (keywords) {
      const kw = Array.isArray(keywords) ? keywords.join(', ') : keywords
      updateMeta('keywords', kw)
    }

    // 4. Canonical URL & Multilingual hreflang tags
    const canonicalUrl = canonical
      ? canonical.startsWith('http')
        ? canonical
        : `${DEFAULT_ORIGIN}${canonical}`
      : window.location.href
    updateLink('canonical', canonicalUrl)

    const rawPath = canonical
      ? canonical.startsWith('http')
        ? new URL(canonical).pathname
        : canonical
      : window.location.pathname
    const cleanPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`
    updateHreflang('en', `${DEFAULT_ORIGIN}${cleanPath}?lang=en`)
    updateHreflang('hi', `${DEFAULT_ORIGIN}${cleanPath}?lang=hi`)
    updateHreflang('x-default', `${DEFAULT_ORIGIN}${cleanPath}`)

    // 5. Open Graph tags
    updateMeta('og:title', fullTitle, true)
    updateMeta('og:description', metaDesc, true)
    updateMeta('og:url', canonicalUrl, true)
    updateMeta('og:image', ogImage, true)
    updateMeta('og:image:secure_url', ogImage, true)
    updateMeta('og:type', ogType, true)
    updateMeta('og:site_name', "POLARIS · India's Sovereign Polar Science Gateway", true)

    // 6. Twitter / X Cards
    updateMeta('twitter:card', 'summary_large_image')
    updateMeta('twitter:title', fullTitle)
    updateMeta('twitter:description', metaDesc)
    updateMeta('twitter:image', ogImage)

    // 7. Dynamic JSON-LD Structured Data
    const schemasToInject: Record<string, any>[] = []

    if (schema) {
      if (Array.isArray(schema)) {
        schemasToInject.push(...schema)
      } else {
        schemasToInject.push(schema)
      }
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url.startsWith('http') ? crumb.url : `${DEFAULT_ORIGIN}${crumb.url}`,
        })),
      }
      schemasToInject.push(breadcrumbSchema)
    }

    if (speakableSelectors && speakableSelectors.length > 0) {
      const speakableSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: fullTitle,
        url: canonicalUrl,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: speakableSelectors,
        },
      }
      schemasToInject.push(speakableSchema)
    }

    let scriptTag = document.getElementById('polaris-page-schema') as HTMLScriptElement | null
    if (schemasToInject.length > 0) {
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.id = 'polaris-page-schema'
        scriptTag.type = 'application/ld+json'
        document.head.appendChild(scriptTag)
      }
      scriptTag.textContent = JSON.stringify(
        schemasToInject.length === 1 ? schemasToInject[0] : schemasToInject
      )
    } else if (scriptTag) {
      scriptTag.remove()
    }

    // Cleanup on unmount or page change
    return () => {
      const tag = document.getElementById('polaris-page-schema')
      if (tag) tag.remove()
    }
  }, [title, description, keywords, canonical, ogImage, ogType, schema, breadcrumbs, speakableSelectors, isHindi])

  return null
}
