// Shared utility for category operations
export type Category = {
  name: string
  slug: string
  url: string
}

// Cached category fetcher - Next.js will automatically deduplicate this
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch('https://dummyjson.com/products/categories', {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    return response.json()
  } catch {
    return []
  }
}
