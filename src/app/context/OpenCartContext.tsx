'use client'

import { createContext, type ReactNode, useContext, useState } from 'react'
import { useCart } from './CartContext'

type OpenCartContextType = {
  openCartModal: () => void
  getCartButtonPosition: () => { x: number; y: number } | null
  setCartButtonRef: (element: HTMLElement | null) => void
}

const OpenCartContext = createContext<OpenCartContextType | undefined>(
  undefined,
)

export function OpenCartProvider({ children }: { children: ReactNode }) {
  const [cartButtonElement, setCartButtonElement] =
    useState<HTMLElement | null>(null)
  const { openCartModal: openCart } = useCart()

  const setCartButtonRef = (element: HTMLElement | null) => {
    setCartButtonElement(element)
  }

  const getCartButtonPosition = () => {
    if (!cartButtonElement) return null

    const rect = cartButtonElement.getBoundingClientRect()
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
  }

  const openCartModal = () => {
    openCart()
  }

  return (
    <OpenCartContext.Provider
      value={{
        openCartModal,
        getCartButtonPosition,
        setCartButtonRef,
      }}
    >
      {children}
    </OpenCartContext.Provider>
  )
}

export function useOpenCart() {
  const context = useContext(OpenCartContext)
  if (context === undefined) {
    throw new Error('useOpenCart must be used within a OpenCartProvider')
  }
  return context
}
