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
    <div className="flex items-center w-full">
      {/* All Categories Button - Fixed on the left */}
      <Link
        href="/"
        className={`flex-shrink-0 px-3 sm:px-4 py-2 sm:py-1 rounded text-sm transition-colors whitespace-nowrap mr-2 sm:mr-3 min-h-[44px] sm:min-h-auto flex items-center ${
          !selectedCategory
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <span className="hidden sm:inline">All Categories</span>
        <span className="sm:hidden">All</span>
      </Link>

      {/* Left Arrow Button */}
      <button
        type="button"
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        className={`hidden sm:flex flex-shrink-0 p-2 rounded-full mr-2 transition-colors min-h-[44px] min-w-[44px] items-center justify-center ${
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

      {/* Scrollable Container - Only category buttons */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide gap-2 flex-1"
      >
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            data-category={category.slug}
            className={`flex-shrink-0 px-3 sm:px-4 py-2 sm:py-1 rounded text-sm transition-colors whitespace-nowrap min-h-[44px] sm:min-h-auto flex items-center ${
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
        className={`hidden sm:flex flex-shrink-0 p-2 rounded-full ml-2 transition-colors min-h-[44px] min-w-[44px] items-center justify-center ${
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
