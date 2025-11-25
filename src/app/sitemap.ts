import type { MetadataRoute } from 'next'
import { API_CONFIG, API_ENDPOINTS } from '../lib/config'

type Category = {
  name: string
  slug: string
  url: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch categories for dynamic sitemap generation
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://walmart.com'

  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_ENDPOINTS.CATEGORIES}`,
    )
    const categories: Category[] = await response.json()

    const categoryUrls = categories.map((category) => ({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }))

    return [
      // Homepage - highest priority
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      // Category pages - high priority
      ...categoryUrls,
      // Static pages (if you add them later)
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
    ]
  } catch {
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ]
  }
}
