const languages = [
  { code: 'en' },
  { code: 'es' },
  { code: 'fr' },
  { code: 'de' }
]

export default async function sitemap() {
  const baseUrl = 'https://vladkuzmenko.com'
  
  // Generate URLs for each language
  const languageUrls = languages.map((lang) => ({
    url: `${baseUrl}/${lang.code}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }))

  // Add other important pages
  const routes = [
    '',
    '/blog',
    '/pricing',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  return [...languageUrls, ...routes]
}