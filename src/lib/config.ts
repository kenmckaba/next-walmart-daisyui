/**
 * Configuration constants for the application
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dummyjson.com',
} as const

export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  CATEGORIES: '/products/categories',
  PRODUCT_BY_CATEGORY: '/products/category',
} as const
