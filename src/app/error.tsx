'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error occurred:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-red-400 mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-8">
            We're sorry, but something unexpected happened. Please try again or
            return to the homepage.
          </p>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={reset}
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Return to Homepage
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">Error ID: {error.digest}</p>
      </div>
    </div>
  )
}
