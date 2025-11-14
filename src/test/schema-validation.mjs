// Simple Node.js test runner for Zod schemas
// Run with: node src/test/schema-validation.mjs

import {
  CartItemSchema,
  CategorySchema,
  ProductSchema,
} from '../lib/schemas.js'

// Example test data - you could extend this with a proper testing framework
console.log('🧪 Testing Zod schemas...\n')

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
  console.log('✅ Valid product parsed successfully:', parsedProduct.title)
} catch (error) {
  console.error('❌ Valid product failed validation:', error)
}

// Test invalid product data (missing required field)
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
  console.log('❌ Invalid product should have failed validation')
} catch (_error) {
  console.log('✅ Invalid product correctly rejected')
}

// Test invalid product data (negative price)
const invalidPriceProduct = {
  id: 1,
  title: 'Test Product',
  description: 'A test product',
  price: -10, // Invalid negative price
  thumbnail: 'https://example.com/image.jpg',
  category: 'electronics',
}

try {
  ProductSchema.parse(invalidPriceProduct)
  console.log('❌ Negative price should have failed validation')
} catch (_error) {
  console.log('✅ Negative price correctly rejected')
}

// Test invalid URL
const invalidUrlProduct = {
  id: 1,
  title: 'Test Product',
  description: 'A test product',
  price: 29.99,
  thumbnail: 'not-a-valid-url', // Invalid URL
  category: 'electronics',
}

try {
  ProductSchema.parse(invalidUrlProduct)
  console.log('❌ Invalid URL should have failed validation')
} catch (_error) {
  console.log('✅ Invalid URL correctly rejected')
}

// Test valid category
const validCategory = {
  name: 'Electronics',
  slug: 'electronics',
  url: 'https://example.com/electronics',
}

try {
  const parsedCategory = CategorySchema.parse(validCategory)
  console.log('✅ Valid category parsed successfully:', parsedCategory.name)
} catch (error) {
  console.error('❌ Valid category failed validation:', error)
}

// Test cart item
const validCartItem = {
  product: validProduct,
  quantity: 2,
}

try {
  const parsedCartItem = CartItemSchema.parse(validCartItem)
  console.log(
    '✅ Valid cart item parsed successfully, quantity:',
    parsedCartItem.quantity,
  )
} catch (error) {
  console.error('❌ Valid cart item failed validation:', error)
}

// Test invalid cart item (zero quantity)
const invalidCartItem = {
  product: validProduct,
  quantity: 0, // Should be positive
}

try {
  CartItemSchema.parse(invalidCartItem)
  console.log('❌ Zero quantity should have failed validation')
} catch (_error) {
  console.log('✅ Zero quantity correctly rejected')
}

console.log('\n🎉 Schema validation tests completed!')
