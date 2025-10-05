'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Header from './components/Header'

type Product = {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
  category: string
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true)
      fetch(`https://dummyjson.com/products/category/${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products || [])
          setLoading(false)
        })
        .catch(() => {
          setProducts([])
          setLoading(false)
        })
    } else {
      setProducts([])
    }
  }, [selectedCategory])

  return (
    <div className="font-sans min-h-screen">
      <Header
        onCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[calc(100vh-80px)] p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-6xl">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="text-lg">Loading products...</div>
            </div>
          ) : selectedCategory ? (
            <div>
              <h2 className="text-2xl font-bold mb-6 capitalize">
                {selectedCategory} Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-green-600">
                          ${product.price}
                        </span>
                        <button
                          type="button"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {products.length === 0 && (
                <div className="text-center p-8 text-gray-500">
                  No products found in this category.
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-8 text-gray-500">
              <h2 className="text-2xl font-bold mb-4">Welcome to Walmart!</h2>
              <p>Select a category from the dropdown above to view products.</p>
            </div>
          )}
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </div>
  )
}
