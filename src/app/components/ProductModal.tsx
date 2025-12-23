'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import type { Product } from '../../lib/products'
import { useCart } from '../context/CartContext'
import { useOpenCart } from '../context/OpenCartContext'

type ProductModalProps = {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  const { addToCart } = useCart()
  const { openCartModal } = useOpenCart()

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)

      // Open cart modal instead of flying animation
      openCartModal()

      console.log(`Added ${product.title} to cart`)
    }
  }

  if (!isOpen || !product) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-transparent cursor-default"
        onClick={onClose}
        aria-label="Close modal by clicking outside"
        tabIndex={-1}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border-2 border-gray-300">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Close modal</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="flex justify-center">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={400}
                height={400}
                className="w-full max-w-md h-auto object-contain rounded-lg"
                priority
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold mb-3">{product.title}</h1>

              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {product.category}
                </span>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-green-600">
                  ${product.price.toLocaleString()}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                <button
                  type="button"
                  onClick={() => handleAddToCart()}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 hover:bg-gray-50 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
