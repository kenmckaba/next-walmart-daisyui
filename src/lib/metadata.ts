import type { Metadata } from 'next'
import type { Product } from './schemas'

/**
 * Generate Open Graph metadata for products
 */
export function generateProductMetadata(product: Product): Metadata {
  const title = `${product.title} - Walmart`
  const description =
    product.description.length > 155
      ? `${product.description.substring(0, 152)}...`
      : product.description

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      url: `https://walmart.com/product/${product.id}`,
      siteName: 'Walmart',
      images: [
        {
          url: product.thumbnail,
          width: 800,
          height: 800,
          alt: product.title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@walmart',
      creator: '@walmart',
      title,
      description,
      images: [
        {
          url: product.thumbnail,
          alt: product.title,
        },
      ],
    },
    other: {
      'product:price:amount': product.price.toString(),
      'product:price:currency': 'USD',
      'product:availability': 'in stock',
      'product:brand': 'Walmart',
      'product:category': product.category,
    },
  }
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  }
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate structured data for products (JSON-LD)
 */
export function generateProductStructuredData(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.thumbnail,
    brand: {
      '@type': 'Brand',
      name: 'Walmart',
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Walmart',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '100',
    },
  }
}
