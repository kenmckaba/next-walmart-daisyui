import type { MetadataRoute } from 'next'

type Category = {
  name: string
  slug: string
  url: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch categories for dynamic sitemap generation
  const baseUrl = 'https://your-domain.com' // Replace with your actual domain

  try {
    const response = await fetch('https://dummyjson.com/products/categories')
    const categories: Category[] = await response.json()

    const categoryUrls = categories.map((category) => ({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }))

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      ...categoryUrls,
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
