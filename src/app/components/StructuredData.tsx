type StructuredDataProps = {
  data: Record<string, unknown>
}

export default function StructuredData({ data }: StructuredDataProps) {
  const jsonLdString = JSON.stringify(data)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
      suppressHydrationWarning
    />
  )
}
