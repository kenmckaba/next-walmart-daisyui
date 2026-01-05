import { notFound } from 'next/navigation'
import { getProducts } from '@/lib/products'
import { getCategories } from '../../../lib/categories'
import ProductListing from '../../components/ProductListing'
import ServerHeader from '../../components/ServerHeader'
import StructuredData from '../../components/StructuredData'

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
    keywords: [
      categoryName.toLowerCase(),
      'walmart',
      'products',
      'deals',
      'shopping',
    ],
    openGraph: {
      title: `${categoryName} Products - Walmart`,
      description: `Shop ${categoryName} products at Walmart. Find great deals and quality items.`,
      type: 'website',
      locale: 'en_US',
      url: `https://walmart.com/category/${slug}`,
      siteName: 'Walmart',
      images: [
        {
          url: '/walmart-logo.png',
          width: 1200,
          height: 630,
          alt: `${categoryName} Products at Walmart`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@walmart',
      creator: '@walmart',
      title: `${categoryName} Products - Walmart`,
      description: `Shop ${categoryName} products at Walmart. Find great deals and quality items.`,
      images: [
        {
          url: '/walmart-logo.png',
          alt: `${categoryName} Products at Walmart`,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
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

  // Structured data for category page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryName} Products`,
    description: `Shop ${categoryName} products at Walmart. Find great deals and quality items.`,
    url: `https://walmart.com/category/${slug}`,
    mainEntity: {
      '@type': 'ItemList',
      name: `${categoryName} Products`,
      numberOfItems: products.length,
      itemListElement: products.slice(0, 10).map((product, index) => ({
        '@type': 'Product',
        position: index + 1,
        name: product.title,
        description: product.description,
        image: product.thumbnail,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      })),
    },
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="font-sans min-h-screen">
        <ServerHeader selectedCategory={slug} />
        <div className="w-full px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 capitalize max-w-7xl mx-auto">
            {categoryName} ({products.length} items)
          </h1>

          <ProductListing products={products} />
        </div>
      </div>
    </>
  )
}
