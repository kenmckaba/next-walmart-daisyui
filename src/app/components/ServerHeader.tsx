import Image from 'next/image'
import Link from 'next/link'

type Category = {
  name: string
  slug: string
  url: string
}

type ServerHeaderProps = {
  selectedCategory?: string
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch('https://dummyjson.com/products/categories', {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    return response.json()
  } catch {
    return []
  }
}

export default async function ServerHeader({
  selectedCategory,
}: ServerHeaderProps) {
  const categories = await getCategories()

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Walmart Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/walmart-logo.png"
              alt="Walmart Logo"
              width={120}
              height={40}
              className="h-8 w-auto cursor-pointer"
            />
          </Link>
        </div>

        {/* Categories Navigation */}
        <nav className="flex items-center">
          <div className="flex flex-wrap gap-2 mr-4">
            <Link
              href="/"
              className={`px-3 py-1 rounded text-sm transition-colors ${
                !selectedCategory
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
