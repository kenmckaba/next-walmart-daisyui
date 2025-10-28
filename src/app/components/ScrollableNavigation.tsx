'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Category } from '../../lib/categories'

type ScrollableNavigationProps = {
  categories: Category[]
  selectedCategory?: string
}

export default function ScrollableNavigation({
  categories,
  selectedCategory,
}: ScrollableNavigationProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
    }
  }, [])

  useEffect(() => {
    checkScrollButtons()
    const container = scrollContainerRef.current
    if (container) {
      // Restore scroll position from sessionStorage
      const savedScrollPosition = sessionStorage.getItem('nav-scroll-position')
      if (savedScrollPosition) {
        container.scrollLeft = parseInt(savedScrollPosition, 10)
      }

      const handleScroll = () => {
        checkScrollButtons()
        // Save scroll position to sessionStorage
        sessionStorage.setItem(
          'nav-scroll-position',
          container.scrollLeft.toString(),
        )
      }

      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [checkScrollButtons])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  return (
    <div className="flex items-center max-w-2xl">
      {/* Left Arrow Button */}
      <button
        type="button"
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        className={`flex-shrink-0 p-1 rounded-full mr-2 transition-colors ${
          canScrollLeft
            ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
        aria-label="Scroll left"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide gap-2 flex-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <Link
          href="/"
          className={`flex-shrink-0 px-3 py-1 rounded text-sm transition-colors whitespace-nowrap ${
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
            className={`flex-shrink-0 px-3 py-1 rounded text-sm transition-colors whitespace-nowrap ${
              selectedCategory === category.slug
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Right Arrow Button */}
      <button
        type="button"
        onClick={scrollRight}
        disabled={!canScrollRight}
        className={`flex-shrink-0 p-1 rounded-full ml-2 transition-colors ${
          canScrollRight
            ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
        aria-label="Scroll right"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  )
}
