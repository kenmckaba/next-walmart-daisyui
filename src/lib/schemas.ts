import { z } from 'zod'

// Product schema
export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number().positive(),
  thumbnail: z.url(),
  category: z.string(),
})

// Products response schema
export const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

// Category schema
export const CategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  url: z.url(),
})

// Categories response schema (array of categories)
export const CategoriesResponseSchema = z.array(CategorySchema)

// Cart item schema
export const CartItemSchema = z.object({
  product: ProductSchema,
  quantity: z.number().int().positive(),
})

// Cart state schema
export const CartStateSchema = z.object({
  items: z.array(CartItemSchema),
})

// Cart action schemas for validation
export const AddToCartSchema = z.object({
  product: ProductSchema,
  quantity: z.number().int().positive().default(1),
})

export const UpdateQuantitySchema = z.object({
  productId: z.number(),
  quantity: z.number().int().min(0),
})

// Export types derived from schemas
export type Product = z.infer<typeof ProductSchema>
export type ProductsResponse = z.infer<typeof ProductsResponseSchema>
export type Category = z.infer<typeof CategorySchema>
export type CartItem = z.infer<typeof CartItemSchema>
export type CartState = z.infer<typeof CartStateSchema>
export type AddToCartInput = z.infer<typeof AddToCartSchema>
export type UpdateQuantityInput = z.infer<typeof UpdateQuantitySchema>
