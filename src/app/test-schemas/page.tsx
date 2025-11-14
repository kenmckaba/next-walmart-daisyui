'use client'
/**
 * Schema Validation Test Page
 *
 * This is a Next.js page that runs Zod schema validation tests
 * Access it at: http://localhost:3000/test-schemas
 */

import {
  CartItemSchema,
  CategorySchema,
  ProductSchema,
} from '../../lib/schemas'

export default function SchemaTestPage() {
  // Run tests when component mounts
  const runTests = () => {
    const results: string[] = []

    results.push('🧪 Testing Zod schemas...\n')

    // Test valid product data
    const validProduct = {
      id: 1,
      title: 'Test Product',
      description: 'A test product',
      price: 29.99,
      thumbnail: 'https://example.com/image.jpg',
      category: 'electronics',
    }

    try {
      const parsedProduct = ProductSchema.parse(validProduct)
      results.push(`✅ Valid product parsed: ${parsedProduct.title}`)
    } catch (error) {
      results.push(`❌ Valid product failed: ${error}`)
    }

    // Test invalid product (missing description)
    const invalidProduct = {
      id: 1,
      title: 'Test Product',
      // description missing
      price: 29.99,
      thumbnail: 'https://example.com/image.jpg',
      category: 'electronics',
    }

    try {
      ProductSchema.parse(invalidProduct)
      results.push('❌ Invalid product should have failed')
    } catch (_error) {
      results.push('✅ Invalid product correctly rejected')
    }

    // Test invalid price (negative)
    const invalidPriceProduct = {
      id: 1,
      title: 'Test Product',
      description: 'A test product',
      price: -10,
      thumbnail: 'https://example.com/image.jpg',
      category: 'electronics',
    }

    try {
      ProductSchema.parse(invalidPriceProduct)
      results.push('❌ Negative price should have failed')
    } catch (_error) {
      results.push('✅ Negative price correctly rejected')
    }

    // Test invalid URL
    const invalidUrlProduct = {
      id: 1,
      title: 'Test Product',
      description: 'A test product',
      price: 29.99,
      thumbnail: 'not-a-valid-url',
      category: 'electronics',
    }

    try {
      ProductSchema.parse(invalidUrlProduct)
      results.push('❌ Invalid URL should have failed')
    } catch (_error) {
      results.push('✅ Invalid URL correctly rejected')
    }

    // Test valid category
    const validCategory = {
      name: 'Electronics',
      slug: 'electronics',
      url: 'https://example.com/electronics',
    }

    try {
      const parsedCategory = CategorySchema.parse(validCategory)
      results.push(`✅ Valid category parsed: ${parsedCategory.name}`)
    } catch (error) {
      results.push(`❌ Valid category failed: ${error}`)
    }

    // Test valid cart item
    const validCartItem = {
      product: validProduct,
      quantity: 2,
    }

    try {
      const parsedCartItem = CartItemSchema.parse(validCartItem)
      results.push(
        `✅ Valid cart item parsed, quantity: ${parsedCartItem.quantity}`,
      )
    } catch (error) {
      results.push(`❌ Valid cart item failed: ${error}`)
    }

    // Test invalid cart item (zero quantity)
    const invalidCartItem = {
      product: validProduct,
      quantity: 0,
    }

    try {
      CartItemSchema.parse(invalidCartItem)
      results.push('❌ Zero quantity should have failed')
    } catch (_error) {
      results.push('✅ Zero quantity correctly rejected')
    }

    results.push('\n🎉 Schema validation tests completed!')
    return results
  }

  const testResults = runTests()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Zod Schema Validation Tests</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results:</h2>
          <div className="font-mono text-sm space-y-1 bg-gray-100 p-4 rounded">
            {testResults.map((result) => (
              <div
                key={result}
                className={
                  result.includes('✅')
                    ? 'text-green-600'
                    : result.includes('❌')
                      ? 'text-red-600'
                      : 'text-gray-800'
                }
              >
                {result}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">
            How to run tests:
          </h3>
          <div className="text-blue-700 space-y-1 text-sm">
            <div>
              <strong>Method 1 (Browser):</strong> Visit this page at{' '}
              <code>/test-schemas</code>
            </div>
            <div>
              <strong>Method 2 (Console):</strong> Open browser dev tools and
              check console output
            </div>
            <div>
              <strong>Method 3 (CLI):</strong> Use{' '}
              <code>npm run test:schemas:dev</code> (coming soon)
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Rerun Tests
          </button>
          <a
            href="/"
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 inline-block"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
