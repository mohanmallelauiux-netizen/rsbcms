import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import HeaderClient from '@/components/layout/HeaderClient'
import { Suspense } from 'react'

export default async function Header() {
  const payload = await getPayload({ config })

  // Fetch Navigation and SiteSettings globals
  const navData = await payload.findGlobal({
    slug: 'navigation',
  })
  const settingsData = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Format links for visual layout
  const rawLinks = navData.links || []
  let links = [...rawLinks]
  if (links.length > 0 && !links.some(l => l.pageUrl === '/interiors')) {
    links.splice(3, 0, { label: 'Interiors', linkType: 'internal', pageUrl: '/interiors', subMenu: null } as any)
  }

  const siteName = settingsData.siteName && settingsData.siteName !== 'Ramasri Builders & Interiors'
    ? settingsData.siteName
    : 'Ramasri Builders & Interiors'
  const brandColor = settingsData.brandColor || '#0F9F5B'
  const phone = settingsData.phone || ''

  // Logo handling - get URL of uploaded media dynamically from CMS
  let logoUrl = ''
  if (typeof settingsData.logo === 'object' && settingsData.logo && 'url' in settingsData.logo) {
    logoUrl = settingsData.logo.url as string
  }
  if (!logoUrl) {
    logoUrl = '/RamaSriBuildersLogoEn.png'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center group">
            <img
              src={logoUrl}
              alt={siteName}
              className="h-14 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Client-Side Menu & Navigation */}
          <Suspense fallback={<div className="h-10 w-32 bg-secondary/50 animate-pulse rounded-full" />}>
            <HeaderClient links={links} phone={phone} brandColor={brandColor} />
          </Suspense>
        </div>
      </div>
    </header>
  )
}
