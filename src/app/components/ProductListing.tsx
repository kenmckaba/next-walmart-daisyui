'use client'

import Image from 'next/image'
import type { Product } from '../../lib/products'
import { useCart } from '../context/CartContext'

type ProductListingProps = {
  products: Product[]
}

export default function ProductListing({ products }: ProductListingProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    // Optional: Show a brief feedback message
    console.log(`Added ${product.title} to cart`)
  }

  return (
    <div
      className="grid gap-3 justify-items-center"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
    >
      {products.map((product) => (
        <article
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:bg-blue-50 transition-shadow w-full max-w-sm flex flex-col"
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
            <div className="mb-3 h-[4.5rem] overflow-y-auto bg-gray-50">
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-xl font-bold text-green-600">
                ${product.price.toLocaleString()}
              </span>
              <button
                type="button"
                onClick={() => handleAddToCart(product)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
