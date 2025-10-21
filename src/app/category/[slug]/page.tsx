import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProducts } from '@/lib/products'
import { getCategories } from '../../../lib/categories'
import ServerHeader from '../../components/ServerHeader'

function slugToName(slug: string): string {
  return slug.replace('-', ' ')
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find((cat) => cat.slug === slug)
  const categoryName = category ? category.name : slugToName(slug)

  return {
    title: `${categoryName} Products - Walmart`,
    description: `Shop ${categoryName} products at Walmart. Find great deals and quality items.`,
    openGraph: {
      title: `${categoryName} Products - Walmart`,
      description: `Shop ${categoryName} products at Walmart`,
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [products, categories] = await Promise.all([
    getProducts(slug),
    getCategories(),
  ])

  const category = categories.find((cat) => cat.slug === slug)
  const categoryName = category ? category.name : slugToName(slug)

  if (!products || products.length === 0) {
    notFound()
  }

  return (
    <div className="font-sans min-h-screen">
      <ServerHeader selectedCategory={slug} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 capitalize">
          {categoryName} ({products.length} items)
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
