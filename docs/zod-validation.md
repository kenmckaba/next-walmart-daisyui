# API Validation with Zod

This project now uses [Zod](https://zod.dev) for runtime schema validation of API responses and internal data structures.

## Overview

All API calls are now validated using Zod schemas to ensure data integrity and catch potential issues early. This helps with:

- **Type Safety**: Runtime validation matches TypeScript types
- **Error Handling**: Clear error messages for invalid data
- **Data Integrity**: Ensures API responses match expected structure
- **Debugging**: Better error reporting for data issues

## Key Files

### `/src/lib/schemas.ts`
Defines all Zod schemas and derives TypeScript types:
- `ProductSchema` - Individual product validation
- `ProductsResponseSchema` - DummyJSON products API response
- `CategorySchema` - Product category validation
- `CategoriesResponseSchema` - DummyJSON categories API response
- `CartItemSchema` - Shopping cart item validation
- `CartStateSchema` - Complete cart state validation

### `/src/lib/api-validation.ts`
Utility functions for API validation:
- `validateAPIResponse()` - Validates data against a schema
- `fetchAndValidate()` - Fetches and validates API responses
- `APIValidationError` - Custom error for validation failures
- `APIFetchError` - Custom error for fetch failures

### Updated API Functions

#### `/src/lib/products.ts`
- `getProducts()` now validates the DummyJSON API response
- Returns empty array on validation errors (graceful degradation)
- Logs detailed error information for debugging

#### `/src/lib/categories.ts`
- `getCategories()` now validates the DummyJSON API response
- Returns empty array on validation errors (graceful degradation)
- Logs detailed error information for debugging

#### `/src/app/context/CartContext.tsx`
- `addToCart()` validates product data before adding to cart
- `updateQuantity()` validates input parameters
- Prevents invalid data from corrupting cart state

## Usage Examples

### Basic Schema Validation
```typescript
import { ProductSchema } from '../lib/schemas'

const rawProduct = await fetch('/api/product/1').then(r => r.json())
const validatedProduct = ProductSchema.parse(rawProduct) // Throws on invalid data
```

### Safe Validation
```typescript
import { validateAPIResponse } from '../lib/api-validation'

try {
  const product = validateAPIResponse(ProductSchema, rawData, 'product API')
  // Use validated product
} catch (error) {
  // Handle validation error
  console.error('Invalid product data:', error)
}
```

### Fetch and Validate
```typescript
import { fetchAndValidate } from '../lib/api-validation'

try {
  const products = await fetchAndValidate(
    'https://api.example.com/products',
    ProductsResponseSchema
  )
  // Use validated products
} catch (error) {
  // Handle fetch or validation error
}
```

## Error Handling

The validation system provides three types of errors:

1. **APIFetchError** - Network or HTTP errors
2. **APIValidationError** - Data doesn't match expected schema
3. **Generic Error** - Other unexpected errors (JSON parsing, etc.)

All API functions gracefully handle errors by:
- Logging detailed error information
- Returning sensible defaults (empty arrays)
- Not crashing the application

## Benefits

1. **Runtime Safety**: Catches data structure changes in external APIs
2. **Better Debugging**: Clear error messages show exactly what's wrong
3. **Type Consistency**: Generated TypeScript types match runtime validation
4. **Graceful Degradation**: App continues working even with API issues
5. **Developer Experience**: IntelliSense works with validated data structures

## Testing

Run the schema validation test:
```bash
# In browser console or Node.js
npm run test:schemas  # (if you add this script)
```

Or import the test file to verify schemas are working correctly.