'use client'

import { createContext, type ReactNode, useContext, useState } from 'react'
import FlyingItem from '../components/FlyingItem'

type FlyingAnimation = {
  id: string
  startPosition: { x: number; y: number }
  endPosition: { x: number; y: number }
  productImage: string
}

type FlyingAnimationContextType = {
  startFlyingAnimation: (
    startPos: { x: number; y: number },
    endPos: { x: number; y: number },
    productImage: string,
  ) => void
  getCartButtonPosition: () => { x: number; y: number } | null
  setCartButtonRef: (element: HTMLElement | null) => void
}

const FlyingAnimationContext = createContext<
  FlyingAnimationContextType | undefined
>(undefined)

export function FlyingAnimationProvider({ children }: { children: ReactNode }) {
  const [animations, setAnimations] = useState<FlyingAnimation[]>([])
  const [cartButtonElement, setCartButtonElement] =
    useState<HTMLElement | null>(null)

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

  const startFlyingAnimation = (
    startPos: { x: number; y: number },
    endPos: { x: number; y: number },
    productImage: string,
  ) => {
    const id = `flying-${Date.now()}-${Math.random()}`
    const newAnimation: FlyingAnimation = {
      id,
      startPosition: startPos,
      endPosition: endPos,
      productImage,
    }

    setAnimations((prev) => [...prev, newAnimation])
  }

  const removeAnimation = (id: string) => {
    setAnimations((prev) => prev.filter((anim) => anim.id !== id))
  }

  return (
    <FlyingAnimationContext.Provider
      value={{
        startFlyingAnimation,
        getCartButtonPosition,
        setCartButtonRef,
      }}
    >
      {children}

      {/* Render all active flying animations */}
      {animations.map((animation) => (
        <FlyingItem
          key={animation.id}
          startPosition={animation.startPosition}
          endPosition={animation.endPosition}
          productImage={animation.productImage}
          onComplete={() => removeAnimation(animation.id)}
        />
      ))}
    </FlyingAnimationContext.Provider>
  )
}

export function useFlyingAnimation() {
  const context = useContext(FlyingAnimationContext)
  if (context === undefined) {
    throw new Error(
      'useFlyingAnimation must be used within a FlyingAnimationProvider',
    )
  }
  return context
}
