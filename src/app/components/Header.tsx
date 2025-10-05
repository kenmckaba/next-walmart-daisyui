import Image from 'next/image'

type Category = {
  name: string
  slug: string
  url: string
}

export default async function Header() {
  const response = await fetch('https://dummyjson.com/products/categories')
  const categories: Category[] = await response.json()

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Walmart Logo */}
        <div className="flex items-center">
          <Image
            src="/walmart-logo.png"
            alt="Walmart Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </div>

        {/* Categories Select */}
        <div className="flex items-center">
          <select className="bg-gray-50 border w-48 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option disabled selected hidden>
              Select Category
            </option>
            {categories?.map((cat: Category) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  )
}
