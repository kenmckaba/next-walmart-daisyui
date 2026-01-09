import Image from 'next/image'
import Link from 'next/link'
import { getCategories } from '../../lib/categories'
import CartDisplay from './CartDisplay'
import ScrollableNavigation from './ScrollableNavigation'

type ServerHeaderProps = {
  selectedCategory?: string
}

export default async function ServerHeader({
  selectedCategory,
}: ServerHeaderProps) {
  const categories = await getCategories()

  return (
    <header className="sticky top-0 w-full bg-white shadow-sm border-b border-gray-200 py-2 sm:py-1 z-40">
      <div className="w-full px-2 sm:px-4">
        {/* Top row with logo and cart */}
        <div className="flex items-center justify-between w-full">
          {/* Walmart Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/">
              <Image
                src="/walmart-logo.png"
                alt="Walmart Logo"
                width={180}
                height={60}
                className="h-8 sm:h-10 lg:h-12 w-auto cursor-pointer"
              />
            </Link>
          </div>

          {/* Cart Display - sticks to right */}
          <div className="flex-shrink-0">
            <CartDisplay />
          </div>
        </div>

        {/* Categories Navigation - below on narrow screens, inline on wider screens */}
        <nav className="flex items-center w-full mt-2 sm:mt-0 sm:absolute sm:inset-x-0 sm:top-1/2 sm:-translate-y-1/2 sm:px-4">
          <div className="w-full sm:max-w-md sm:mx-auto lg:max-w-2xl xl:max-w-4xl">
            <ScrollableNavigation
              categories={categories}
              selectedCategory={selectedCategory}
            />
          </div>
        </nav>
      </div>
    </header>
  )
}
