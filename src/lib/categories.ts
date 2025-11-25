import {
  APIFetchError,
  APIValidationError,
  fetchAndValidate,
} from './api-validation'
import { API_CONFIG, API_ENDPOINTS } from './config'
import { CategoriesResponseSchema, type Category } from './schemas'

export type { Category }

// Cached category fetcher - Next.js will automatically deduplicate this
export async function getCategories(): Promise<Category[]> {
  try {
    const validatedResponse = await fetchAndValidate(
      `${API_CONFIG.BASE_URL}${API_ENDPOINTS.CATEGORIES}`,
      CategoriesResponseSchema,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    )

    return validatedResponse
  } catch (error) {
    if (error instanceof APIValidationError) {
      console.error('Categories API returned invalid data:', error.issues)
    } else if (error instanceof APIFetchError) {
      console.error(`Failed to fetch categories: ${error.message}`)
    } else {
      console.error('Unexpected error fetching categories:', error)
    }
    return []
  }
}
