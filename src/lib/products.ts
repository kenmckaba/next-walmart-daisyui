// Shared utility for category operations
export type Product = {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
  category: string
}

export type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export async function getProducts(
  category: string,
  limit: number = 0,
): Promise<Product[]> {
  try {
    const url = `https://dummyjson.com/products/category/${category}${limit > 0 ? `?limit=${limit}` : ''}`
    const response = await fetch(url, {
      // Enable ISR (Incremental Static Regeneration)
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      return []
    }

    const resp: ProductsResponse = await response.json()
    return resp.products
  } catch {
    return []
  }
}
