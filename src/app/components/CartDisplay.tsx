'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useOpenCart } from '../context/OpenCartContext'

export default function CartDisplay() {
  const {
    items,
    getTotalItems,
    getTotalPrice,
    removeFromCart,
    updateQuantity,
    isCartModalOpen,
    openCartModal,
    closeCartModal,
  } = useCart()
  const { setCartButtonRef } = useOpenCart()
  const containerRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const cartButtonRef = useRef<HTMLButtonElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  // Handle animation states when modal opens/closes
  useEffect(() => {
    if (isCartModalOpen) {
      setShouldRender(true)
      // Start animation after render
      const timer = setTimeout(() => setIsAnimating(true), 10)
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
      // Remove from DOM after animation completes
      const timer = setTimeout(() => setShouldRender(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isCartModalOpen])

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeCartModal()
      }
    }

    if (isCartModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isCartModalOpen, closeCartModal])

  // Close cart when pressing Escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCartModal()
      }
    }

    if (isCartModalOpen) {
      document.addEventListener('keydown', handleEscapeKey)
      return () => {
        document.removeEventListener('keydown', handleEscapeKey)
      }
    }
  }, [isCartModalOpen, closeCartModal])

  // Register cart button position for flying animation
  useEffect(() => {
    if (cartButtonRef.current) {
      setCartButtonRef(cartButtonRef.current)
    }
  }, [setCartButtonRef])

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={cartButtonRef}
        type="button"
        onClick={() => openCartModal()}
        className="flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 min-h-[44px] sm:min-h-auto touch-manipulation transition-colors"
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

      {shouldRender && (
        <>
          {/* Invisible overlay to capture clicks outside cart */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-10 sm:bg-transparent"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              closeCartModal()
            }}
            aria-hidden="true"
          />
          <div
            ref={modalRef}
            className={`fixed sm:absolute inset-0 sm:inset-auto sm:right-0 sm:top-full w-full sm:w-80 bg-white sm:rounded-lg shadow-lg border-0 sm:border border-gray-200 z-50
              transition-all duration-500 ease-out transform-gpu sm:origin-top
              ${
                isAnimating
                  ? 'translate-y-0 sm:scale-y-100'
                  : 'translate-y-full sm:translate-y-0 sm:scale-y-0'
              }
            `}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">Shopping Cart</h3>
                <button
                  type="button"
                  onClick={() => closeCartModal()}
                  className="text-gray-400 hover:text-gray-600 p-2 -m-2 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                  aria-label="Close cart"
                >
                  <svg
                    role="img"
                    aria-label="Close cart"
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {getTotalItems() === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <svg
                    className="w-12 h-12 mx-auto mb-3 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-8 8m8-8v8a2 2 0 01-2 2H9m8 0V9a2 2 0 00-2-2H9m8 4h6"
                    />
                  </svg>
                  <p className="text-lg font-medium">No items in cart</p>
                  <p className="text-sm mt-1">Add products to get started</p>
                </div>
              ) : (
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
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-sm hover:bg-gray-200 touch-manipulation"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-sm w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-sm hover:bg-gray-200 touch-manipulation"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-2 text-red-500 hover:text-red-700 text-xs px-2 py-1 hover:bg-red-50 rounded touch-manipulation"
                          aria-label="Remove item"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {getTotalItems() > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0">
                    <span className="font-semibold text-lg text-center sm:text-left">
                      Total: ${getTotalPrice().toLocaleString()}
                    </span>
                    <button
                      type="button"
                      className="bg-green-500 text-white px-6 py-3 sm:px-4 sm:py-2 rounded text-sm font-medium hover:bg-green-600 active:bg-green-700 min-h-[44px] sm:min-h-auto touch-manipulation transition-colors"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
