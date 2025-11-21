'use client'

import { useEffect, useState } from 'react'

type AddToCartConfirmationProps = {
  show: boolean
  position: { x: number; y: number }
  onComplete: () => void
}

export default function AddToCartConfirmation({
  show,
  position,
  onComplete,
}: AddToCartConfirmationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)

      // Hide after 2 seconds
      const timeout = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onComplete, 300) // Wait for fade out animation
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [show, onComplete])

  if (!show) {
    return null
  }

  return (
    <div
      className="fixed z-[110] pointer-events-none"
      style={{
        left: position.x - 60, // Center the 120px wide tooltip
        top: position.y - 50, // Position above the button
      }}
    >
      <div
        className={`
          bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium
          flex items-center gap-2 whitespace-nowrap
          transform transition-all duration-300
          ${
            isVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-2 scale-95'
          }
        `}
      >
        {/* Checkmark icon */}
        <svg
          className="w-4 h-4 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        Added to cart
        {/* Small arrow pointing down */}
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid rgb(34, 197, 94)', // green-500
          }}
        />
      </div>
    </div>
  )
}
