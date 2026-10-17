'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { translations } from '@/lib/translations'

type LinkItem = {
  label: string
  linkType: 'internal' | 'external'
  pageUrl: string
  subMenu?: {
    label: string
    pageUrl: string
  }[] | null
}

export default function HeaderClient({
  links,
  phone,
  brandColor,
}: {
  links: LinkItem[]
  phone: string
  brandColor: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'te'
  const t = translations[lang]

  const toggleLanguage = () => {
    const params = new URLSearchParams(searchParams.toString())
    const newLang = lang === 'en' ? 'te' : 'en'
    params.set('lang', newLang)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {links.map((link, idx) => {
          const hasSub = link.subMenu && link.subMenu.length > 0

          // Localize standard navigation labels dynamically if they match standard routes
          let displayLabel = link.label
          if (link.pageUrl === '/') displayLabel = t.nav.home
          else if (link.pageUrl === '/about') displayLabel = t.nav.about
          else if (link.pageUrl === '/projects') displayLabel = t.nav.projects
          else if (link.pageUrl === '/interiors') displayLabel = t.nav.interiors
          else if (link.pageUrl === '/blog') displayLabel = t.nav.blog
          else if (link.pageUrl === '/contact') displayLabel = t.nav.contact

          return (
            <div
              key={idx}
              className="relative group"
              onMouseEnter={() => hasSub && setActiveDropdown(link.label)}
              onMouseLeave={() => hasSub && setActiveDropdown(null)}
            >
              <Link
                href={`${link.pageUrl}?lang=${lang}`}
                className="flex items-center gap-1 text-sm font-medium text-muted hover:text-primary transition-colors py-2"
                target={link.linkType === 'external' ? '_blank' : undefined}
                rel={link.linkType === 'external' ? 'noopener noreferrer' : undefined}
              >
                {displayLabel}
                {hasSub && <ChevronDown className="h-4 w-4 opacity-50 group-hover:rotate-180 transition-transform duration-300" />}
              </Link>

              {/* Desktop Sub Menu Dropdown */}
              {hasSub && activeDropdown === link.label && (
                <div className="absolute left-0 top-full w-48 rounded-lg border border-border bg-card p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {link.subMenu?.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      href={`${sub.pageUrl}?lang=${lang}`}
                      className="block rounded-md px-3 py-2 text-xs font-medium text-muted hover:bg-secondary hover:text-primary transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Action Button */}
      <div className="hidden md:flex items-center gap-4">
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-xs font-medium text-primary hover:bg-secondary transition-colors"
          >
            <Phone className="h-3 w-3" />
            <span>{phone}</span>
          </a>
        )}
        <button
          onClick={toggleLanguage}
          className="rounded-full border border-primary text-primary hover:bg-primary/10 px-4 py-2 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
        >
          {lang === 'en' ? 'తెలుగు' : 'English'}
        </button>
        <Link
          href={`/contact?lang=${lang}`}
          className="rounded-full px-5 py-2 text-xs font-semibold text-background transition-colors hover:opacity-90"
          style={{ backgroundColor: brandColor }}
        >
          {t.nav.consultation}
        </Link>
      </div>

      {/* Mobile Toggle Button */}
      <div className="flex md:hidden items-center gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-muted hover:bg-secondary hover:text-primary transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-20 z-40 h-[calc(100vh-5rem)] w-full border-t border-border bg-background/95 backdrop-blur-md md:hidden animate-in slide-in-from-right duration-300">
          <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4">
              {links.map((link, idx) => {
                let displayLabel = link.label
                if (link.pageUrl === '/') displayLabel = t.nav.home
                else if (link.pageUrl === '/about') displayLabel = t.nav.about
                else if (link.pageUrl === '/projects') displayLabel = t.nav.projects
                else if (link.pageUrl === '/interiors') displayLabel = t.nav.interiors
                else if (link.pageUrl === '/blog') displayLabel = t.nav.blog
                else if (link.pageUrl === '/contact') displayLabel = t.nav.contact

                return (
                  <div key={idx} className="flex flex-col border-b border-border/50 pb-3">
                    <Link
                      href={`${link.pageUrl}?lang=${lang}`}
                      onClick={() => setIsOpen(false)}
                      className="text-base font-medium text-foreground hover:text-primary"
                    >
                      {displayLabel}
                    </Link>
                    {link.subMenu && link.subMenu.length > 0 && (
                      <div className="mt-2 ml-4 flex flex-col gap-2 border-l border-border pl-3">
                        {link.subMenu.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={`${sub.pageUrl}?lang=${lang}`}
                            onClick={() => setIsOpen(false)}
                            className="text-sm text-muted hover:text-primary"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="mt-auto flex flex-col gap-3">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-border bg-secondary py-3 text-sm font-medium text-primary"
                >
                  <Phone className="h-4 w-4" />
                  <span>{phone}</span>
                </a>
              )}
              <button
                onClick={() => {
                  toggleLanguage()
                  setIsOpen(false)
                }}
                className="w-full rounded-full border border-primary text-primary py-3 text-sm font-semibold tracking-wide transition-colors cursor-pointer text-center"
              >
                {lang === 'en' ? 'తెలుగు' : 'English'}
              </button>
              <Link
                href={`/contact?lang=${lang}`}
                onClick={() => setIsOpen(false)}
                className="flex justify-center rounded-full py-3 text-sm font-semibold text-background text-center"
                style={{ backgroundColor: brandColor }}
              >
                {t.nav.consultation}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
