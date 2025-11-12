'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useCart } from '../context/CartContext'

export default function CartDisplay() {
  const {
    items,
    getTotalItems,
    getTotalPrice,
    removeFromCart,
    updateQuantity,
  } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const cartRef = useRef<HTMLDivElement>(null)

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen])

  if (getTotalItems() === 0) {
    return (
      <div ref={cartRef} className="relative">
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-500 rounded"
          disabled
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-8 8m8-8v8a2 2 0 01-2 2H9m8 0V9a2 2 0 00-2-2H9m8 4h6"
            />
          </svg>
          Cart (0)
        </button>
      </div>
    )
  }

  return (
    <div ref={cartRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-8 8m8-8v8a2 2 0 01-2 2H9m8 0V9a2 2 0 00-2-2H9m8 4h6"
          />
        </svg>
        Cart ({getTotalItems()})
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-3">Shopping Cart</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 pb-3 border-b border-gray-100"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0">
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${item.product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded text-xs hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="text-sm w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded text-xs hover:bg-gray-200"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="ml-2 text-red-500 hover:text-red-700 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center font-semibold">
                <span>Total: ${getTotalPrice().toLocaleString()}</span>
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
