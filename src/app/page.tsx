import Link from 'next/link'
import ServerHeader from './components/ServerHeader'

type Category = {
  name: string
  slug: string
  url: string
}

export const metadata = {
  title: 'Walmart - Shop Online for Great Deals',
  description: 'Shop Walmart online for great deals on thousands of products. Browse by category and find everything you need.',
  openGraph: {
    title: 'Walmart - Shop Online for Great Deals',
    description: 'Shop Walmart online for great deals on thousands of products.',
  },
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch('https://dummyjson.com/products/categories', {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    return response.json()
  } catch {
    return []
  }
}

export default async function HomePage() {
  const categories = await getCategories()

  return (
    <div className="font-sans min-h-screen">
      <ServerHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Walmart</h1>
          <p className="text-xl text-gray-600 mb-8">
            Shop thousands of products across all categories with great deals and fast delivery
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 text-center"
              >
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-lg capitalize group-hover:text-blue-600 transition-colors">
                  {category.name.replace('-', ' ')}
                </h3>
                <p className="text-sm text-gray-500 mt-2">Shop now →</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Why Shop with Walmart?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Great Prices</h3>
              <p className="text-gray-600">Low prices on thousands of products every day</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping to your door</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Products</h3>
              <p className="text-gray-600">Trusted brands and quality guaranteed</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}