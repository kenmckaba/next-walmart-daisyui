import Image from 'next/image'
import Link from 'next/link'
import ServerHeader from './components/ServerHeader'

export const metadata = {
  title: '404 - Page Not Found | Walmart',
  description:
    'Sorry, the page you are looking for could not be found. Browse our categories or return to the homepage.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: '404 - Page Not Found | Walmart',
    description: 'Sorry, the page you are looking for could not be found.',
    type: 'website',
    locale: 'en_US',
    url: 'https://walmart.com/404',
    siteName: 'Walmart',
    images: [
      {
        url: '/walmart-logo.png',
        width: 1200,
        height: 630,
        alt: 'Walmart - Page Not Found',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@walmart',
    creator: '@walmart',
    title: '404 - Page Not Found | Walmart',
    description: 'Sorry, the page you are looking for could not be found.',
    images: [
      {
        url: '/walmart-logo.png',
        alt: 'Walmart - Page Not Found',
      },
    ],
  },
}

export default function NotFound() {
  return (
    <div>
      <ServerHeader />

      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <Image
              src="/walmart-logo.png"
              alt="Walmart Logo"
              width={200}
              height={80}
              className="mx-auto mb-6"
            />
            <div className="text-6xl font-bold text-gray-400 mb-4">404</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Page Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn't find the page you're looking for. It might have
              been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Return to Homepage
            </Link>

            <Link
              href="/category/electronics"
              className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Browse Electronics
            </Link>

            <Link
              href="/category/groceries"
              className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Shop Groceries
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-sm text-gray-500 mt-8">
            Need help?{' '}
            <Link href="/" className="text-blue-600 hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
