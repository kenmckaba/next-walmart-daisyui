import Image from 'next/image'
import Link from 'next/link'
import { getProducts } from '@/lib/products'
import { getCategories as getAllCategories } from '../lib/categories'
import ServerHeader from './components/ServerHeader'
import StructuredData from './components/StructuredData'

export const metadata = {
  title: 'Walmart - Shop Online for Great Deals',
  description:
    'Shop Walmart online for great deals on thousands of products. Browse by category and find everything you need. Free shipping and pickup available.',
  keywords: [
    'walmart',
    'online shopping',
    'great deals',
    'free shipping',
    'categories',
    'electronics',
    'groceries',
  ],
  openGraph: {
    title: 'Walmart - Shop Online for Great Deals',
    description:
      'Shop Walmart online for great deals on thousands of products. Browse by category and find everything you need.',
    type: 'website',
    locale: 'en_US',
    url: 'https://walmart.com',
    siteName: 'Walmart',
    images: [
      {
        url: '/walmart-logo.png',
        width: 1200,
        height: 630,
        alt: 'Walmart - Save Money. Live Better.',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@walmart',
    creator: '@walmart',
    title: 'Walmart - Shop Online for Great Deals',
    description:
      'Shop Walmart online for great deals on thousands of products.',
    images: [
      {
        url: '/walmart-logo.png',
        alt: 'Walmart - Save Money. Live Better.',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function HomePage() {
  const categories = await getAllCategories()
  const productImages = new Map<string, string>()

  // Structured Data for Organization and WebSite
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Walmart',
    url: 'https://walmart.com',
    logo: 'https://walmart.com/walmart-logo.png',
    description: 'Save Money. Live Better.',
    sameAs: [
      'https://www.facebook.com/walmart',
      'https://twitter.com/walmart',
      'https://www.instagram.com/walmart',
      'https://www.youtube.com/walmart',
    ],
  }

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Walmart',
    url: 'https://walmart.com',
    description:
      'Shop Walmart online for great deals on thousands of products.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://walmart.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  console.log('Fetched categories:', categories.length)
  await Promise.all(
    categories.map(async (category) => {
      // get first product image for category display
      const product = await getProducts(category.slug, 1)
      console.log(
        'Fetched product for category:',
        category.slug,
        product[0].title,
      )
      productImages.set(category.slug, product[0]?.thumbnail)
      const test = productImages.get(category.slug)
      console.log('Got:', test)
    }),
  )

  // Structured data for home page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Walmart',
    description:
      'Shop Walmart online for great deals on thousands of products. Browse by category and find everything you need.',
    url: 'https://walmart.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://walmart.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    sameAs: [
      'https://www.facebook.com/walmart',
      'https://www.twitter.com/walmart',
      'https://www.instagram.com/walmart',
      'https://www.youtube.com/walmart',
    ],
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <StructuredData data={organizationStructuredData} />
      <StructuredData data={websiteStructuredData} />
      <div className="font-sans min-h-screen">
        <ServerHeader />
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <section className="text-center mb-8 sm:mb-12 max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Welcome to Walmart
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 px-4 sm:px-0">
              Shop thousands of products across all categories with great deals
              and fast delivery
            </p>
          </section>

          <section className="max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 px-4 sm:px-0">
              Shop by Category
            </h2>
            <div className="grid gap-4 sm:gap-6 justify-items-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-lg active:scale-95 sm:active:scale-100 transition-all duration-200 p-4 sm:p-6 text-center w-full touch-manipulation"
                >
                  <div className="mb-3 sm:mb-4 relative">
                    <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={productImages.get(category.slug) || ''}
                        alt={category.name}
                        width={500}
                        height={500}
                        className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base lg:text-lg capitalize group-hover:text-blue-600 transition-colors leading-tight">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                    Shop now →
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12 sm:mt-16 bg-gray-50 rounded-lg p-6 sm:p-8 text-center max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Why Shop with Walmart?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8">
              <div>
                <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Great Prices</h3>
                <p className="text-gray-600">
                  Low prices on thousands of products every day
                </p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Quick and reliable shipping to your door
                </p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Quality Products</h3>
                <p className="text-gray-600">
                  Trusted brands and quality guaranteed
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
