import type { z } from 'zod'

export class APIValidationError extends Error {
  constructor(
    message: string,
    public issues: z.core.$ZodIssue[],
    public url?: string,
  ) {
    super(message)
    this.name = 'APIValidationError'
  }
}

export class APIFetchError extends Error {
  constructor(
    message: string,
    public status: number,
    public url: string,
  ) {
    super(message)
    this.name = 'APIFetchError'
  }
}

/**
 * Safely validates API response data using a Zod schema
 * @param schema - Zod schema to validate against
 * @param data - Raw data to validate
 * @param context - Context string for error logging
 * @returns Validated data or throws APIValidationError
 */
export function validateAPIResponse<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context: string,
): T {
  const result = schema.safeParse(data)

  if (!result.success) {
    const errorMessage = `Validation failed for ${context}`
    console.error(errorMessage, {
      issues: result.error.issues,
      data: JSON.stringify(data, null, 2),
    })
    throw new APIValidationError(errorMessage, result.error.issues)
  }

  return result.data
}

/**
 * Safely fetches and validates API data
 * @param url - API endpoint URL
 * @param schema - Zod schema to validate response
 * @param options - Fetch options
 * @returns Promise of validated data
 */
export async function fetchAndValidate<T>(
  url: string,
  schema: z.ZodSchema<T>,
  options?: RequestInit,
): Promise<T> {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new APIFetchError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        url,
      )
    }

    const rawData = await response.json()
    return validateAPIResponse(schema, rawData, `API response from ${url}`)
  } catch (error) {
    if (error instanceof APIValidationError || error instanceof APIFetchError) {
      throw error
    }

    // Handle network errors, JSON parsing errors, etc.
    console.error(`Failed to fetch from ${url}:`, error)
    throw new Error(`Network or parsing error while fetching from ${url}`)
  }
}
