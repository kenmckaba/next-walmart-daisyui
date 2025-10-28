import Image from 'next/image'
import Link from 'next/link'
import { getCategories } from '../../lib/categories'
import ScrollableNavigation from './ScrollableNavigation'

type ServerHeaderProps = {
  selectedCategory?: string
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
        <nav className="flex items-center flex-1 max-w-4xl">
          <ScrollableNavigation
            categories={categories}
            selectedCategory={selectedCategory}
          />
        </nav>
      </div>
    </header>
  )
}
