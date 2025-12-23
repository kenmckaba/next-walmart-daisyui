'use client'

import { createContext, type ReactNode, useContext, useState } from 'react'
import AddToCartConfirmation from '../components/AddToCartConfirmation'
import { useCart } from './CartContext'

type ConfirmationModal = {
  id: string
  position: { x: number; y: number }
}

type OpenCartContextType = {
  openCartModal: () => void
  getCartButtonPosition: () => { x: number; y: number } | null
  setCartButtonRef: (element: HTMLElement | null) => void
  showConfirmation: (position: { x: number; y: number }) => void
}

const OpenCartContext = createContext<OpenCartContextType | undefined>(
  undefined,
)

export function OpenCartProvider({ children }: { children: ReactNode }) {
  const [confirmations, setConfirmations] = useState<ConfirmationModal[]>([])
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

  const showConfirmation = (position: { x: number; y: number }) => {
    const id = `confirmation-${Date.now()}-${Math.random()}`
    const newConfirmation: ConfirmationModal = {
      id,
      position,
    }

    setConfirmations((prev) => [...prev, newConfirmation])
  }

  const removeConfirmation = (id: string) => {
    setConfirmations((prev) => prev.filter((conf) => conf.id !== id))
  }

  return (
    <OpenCartContext.Provider
      value={{
        openCartModal,
        getCartButtonPosition,
        setCartButtonRef,
        showConfirmation,
      }}
    >
      {children}

      {/* Render all active confirmation modals */}
      {confirmations.map((confirmation) => (
        <AddToCartConfirmation
          key={confirmation.id}
          show={true}
          position={confirmation.position}
          onComplete={() => removeConfirmation(confirmation.id)}
        />
      ))}
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
