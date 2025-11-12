import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { CartProvider } from './context/CartContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Walmart',
    default: 'Walmart - Save Money. Live Better.',
  },
  description:
    'Shop Walmart for everyday low prices on groceries, electronics, home goods, and more. Free shipping and pickup available.',
  keywords: [
    'walmart',
    'shopping',
    'groceries',
    'electronics',
    'home goods',
    'deals',
    'low prices',
  ],
  authors: [{ name: 'Walmart' }],
  creator: 'Walmart',
  publisher: 'Walmart',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://walmart.com',
    title: 'Walmart - Save Money. Live Better.',
    description:
      'Shop Walmart for everyday low prices on groceries, electronics, home goods, and more.',
    siteName: 'Walmart',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Walmart - Save Money. Live Better.',
    description:
      'Shop Walmart for everyday low prices on groceries, electronics, home goods, and more.',
    creator: '@walmart',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
