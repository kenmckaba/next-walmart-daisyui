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

export async function getAllProducts(): Promise<Product[]> {
  console.log('Fetching all products from API')
  try {
    const response = await fetch('https://dummyjson.com/products', {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    const prods = await response.json()
    console.log('returning all products from API', prods.products.length)
    return prods.products
  } catch {
    return []
  }
}

export async function getProducts(category: string, limit: number = 0): Promise<Product[] | null> {
  const url = `https://dummyjson.com/products/category/${category}${limit > 0 ? `?limit=${limit}` : ''}`

  try {
    const response = await fetch(
      url,
      {
        // Enable ISR (Incremental Static Regeneration)
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    )

    if (!response.ok) {
      return null
    }

    const resp: ProductsResponse = await response.json()
    return resp.products
  } catch {
    return null
  }
}

