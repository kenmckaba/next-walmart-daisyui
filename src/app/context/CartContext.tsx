'use client'

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import { validateAPIResponse } from '../../lib/api-validation'
import type { Product } from '../../lib/products'
import {
  AddToCartSchema,
  type CartItem,
  UpdateQuantitySchema,
} from '../../lib/schemas'

export type { CartItem }

type CartContextType = {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  isCartModalOpen: boolean
  openCartModal: () => void
  closeCartModal: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)

  const openCartModal = useCallback(() => {
    setIsCartModalOpen(true)
  }, [])

  const closeCartModal = useCallback(() => {
    setIsCartModalOpen(false)
  }, [])

  const addToCart = useCallback((product: Product) => {
    try {
      // Validate the input using Zod schema
      const validatedInput = validateAPIResponse(
        AddToCartSchema,
        { product, quantity: 1 },
        'addToCart input',
      )

      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (item) => item.product.id === validatedInput.product.id,
        )

        if (existingItem) {
          return currentItems.map((item) =>
            item.product.id === validatedInput.product.id
              ? { ...item, quantity: item.quantity + validatedInput.quantity }
              : item,
          )
        } else {
          return [
            ...currentItems,
            {
              product: validatedInput.product,
              quantity: validatedInput.quantity,
            },
          ]
        }
      })
    } catch (error) {
      console.error('Failed to add item to cart:', error)
    }
  }, [])

  const removeFromCart = useCallback((productId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    )
  }, [])

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      try {
        // Validate the input using Zod schema
        const validatedInput = validateAPIResponse(
          UpdateQuantitySchema,
          { productId, quantity },
          'updateQuantity input',
        )

        if (validatedInput.quantity <= 0) {
          removeFromCart(validatedInput.productId)
          return
        }

        setItems((currentItems) =>
          currentItems.map((item) =>
            item.product.id === validatedInput.productId
              ? { ...item, quantity: validatedInput.quantity }
              : item,
          ),
        )
      } catch (error) {
        console.error('Failed to update quantity:', error)
      }
    },
    [removeFromCart],
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }, [items])

  const getTotalPrice = useCallback(() => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    )
  }, [items])

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isCartModalOpen,
    openCartModal,
    closeCartModal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
