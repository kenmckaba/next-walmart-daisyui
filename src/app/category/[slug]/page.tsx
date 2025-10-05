import Image from 'next/image'
import { notFound } from 'next/navigation'
import ServerHeader from '../../components/ServerHeader'

type Product = {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
  category: string
}

type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

// Generate static params for known categories
type Category = {
  name: string
  slug: string
  url: string
}

export async function generateStaticParams() {
  try {
    const response = await fetch('https://dummyjson.com/products/categories')
    const categories: Category[] = await response.json()

    return categories.map((category) => ({
      slug: category.slug,
    }))
  } catch {
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const categoryName = params.slug.replace('-', ' ')

  return {
    title: `${categoryName} Products - Walmart`,
    description: `Shop ${categoryName} products at Walmart. Find great deals and quality items.`,
    openGraph: {
      title: `${categoryName} Products - Walmart`,
      description: `Shop ${categoryName} products at Walmart`,
    },
  }
}

async function getProducts(category: string): Promise<ProductsResponse | null> {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`,
      {
        // Enable ISR (Incremental Static Regeneration)
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    )

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch {
    return null
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const productsData = await getProducts(params.slug)

  if (!productsData || productsData.products.length === 0) {
    notFound()
  }

  const { products } = productsData

  return (
    <div className="font-sans min-h-screen">
      <ServerHeader selectedCategory={params.slug} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 capitalize">
          {params.slug.replace('-', ' ')} Products ({products.length} items)
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <article
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
                <h2 className="font-semibold text-lg mb-2 line-clamp-2">
                  {product.title}
                </h2>
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
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
