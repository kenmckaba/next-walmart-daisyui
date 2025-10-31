import { notFound } from 'next/navigation'
import { getProducts } from '@/lib/products'
import { getCategories } from '../../../lib/categories'
import ProductListing from '../../components/ProductListing'
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

        <ProductListing products={products} />
      </div>
    </div>
  )
}
