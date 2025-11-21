'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

type FlyingItemProps = {
  startPosition: { x: number; y: number }
  endPosition: { x: number; y: number }
  productImage: string
  onComplete: () => void
}

export default function FlyingItem({
  startPosition,
  endPosition,
  productImage,
  onComplete,
}: FlyingItemProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Start animation after a brief delay
    const startTimeout = setTimeout(() => {
      setIsAnimating(true)
    }, 50)

    // Complete animation after duration
    const completeTimeout = setTimeout(() => {
      onComplete()
    }, 800) // Animation duration

    return () => {
      clearTimeout(startTimeout)
      clearTimeout(completeTimeout)
    }
  }, [onComplete])

  const deltaX = endPosition.x - startPosition.x
  const deltaY = endPosition.y - startPosition.y

  return (
    <div
      className="fixed pointer-events-none z-[100]"
      style={{
        left: startPosition.x - 20, // Center the 40px item
        top: startPosition.y - 20,
        transform: isAnimating
          ? `translate(${deltaX}px, ${deltaY}px) scale(0.3)`
          : 'translate(0, 0) scale(1)',
        transition: isAnimating
          ? 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease-out'
          : 'none',
        opacity: isAnimating ? 0 : 1,
      }}
    >
      <div className="w-10 h-10 bg-white rounded-full shadow-lg border-2 border-blue-500 flex items-center justify-center">
        <Image
          src={productImage}
          alt="Flying product"
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
        />
      </div>
    </div>
  )
}
