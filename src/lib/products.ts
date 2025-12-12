import {
  APIFetchError,
  APIValidationError,
  fetchAndValidate,
} from './api-validation'
import { API_CONFIG, API_ENDPOINTS } from './config'
import { type Product, ProductsResponseSchema } from './schemas'

export type { Product }

export async function getProducts(
  category: string,
  limit: number = 0,
): Promise<Product[]> {
  try {
    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.PRODUCT_BY_CATEGORY}/${category}${limit > 0 ? `?limit=${limit}` : ''}`

    console.log('@ken getProducts', url)
    const validatedResponse = await fetchAndValidate(
      url,
      ProductsResponseSchema,
      {
        // Enable ISR (Incremental Static Regeneration)
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    )

    return validatedResponse.products
  } catch (error) {
    if (error instanceof APIValidationError) {
      console.error(
        `Products API returned invalid data for category "${category}":`,
        error.issues,
      )
    } else if (error instanceof APIFetchError) {
      console.error(
        `Failed to fetch products for category "${category}": ${error.message}`,
      )
    } else {
      console.error(
        `Unexpected error fetching products for category "${category}":`,
        error,
      )
    }
    return []
  }
}
