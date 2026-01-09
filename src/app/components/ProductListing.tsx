'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Product } from '../../lib/products'
import { useCart } from '../context/CartContext'
import { useOpenCart } from '../context/OpenCartContext'
import ProductModal from './ProductModal'

type ProductListingProps = {
  products: Product[]
}

export default function ProductListing({ products }: ProductListingProps) {
  const { addToCart } = useCart()
  const { openCartModal } = useOpenCart()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddToCart = (product: Product) => {
    addToCart(product)

    // Open cart modal instead of flying animation
    openCartModal()

    console.log(`Added ${product.title} to cart`)
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="mx-auto px-4">
      <div className="grid gap-4 sm:gap-6 justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-fit mx-auto">
        {products.map((product) => (
          <article
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:bg-blue-50 transition-shadow w-full max-w-sm flex flex-col cursor-pointer active:scale-95 sm:active:scale-100 touch-manipulation"
            onClick={() => handleProductClick(product)}
            onKeyDown={() => handleProductClick(product)}
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={300}
              height={200}
              className="w-full h-48 object-contain"
            />
            <div className="p-4 flex flex-col flex-1">
              <h2 className="font-semibold text-lg mb-2 line-clamp-2">
                {product.title}
              </h2>
              <div className="mb-3 overflow-y-auto bg-gray-50 rounded p-2 h-[5.5rem]">
                <p className="text-gray-600 text-sm leading-6">
                  {product.description}
                </p>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xl font-bold text-green-600">
                  ${product.price.toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToCart(product)
                  }}
                  className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-3 sm:py-2 rounded text-sm min-h-[44px] sm:min-h-auto touch-manipulation transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}

        {/* Product Modal */}
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  )
}
