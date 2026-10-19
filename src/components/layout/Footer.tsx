import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Mail } from 'lucide-react'

export default async function Footer() {
  let footerData: any = {}
  let settingsData: any = {}
  try {
    const payload = await getPayload({ config })
    const [f, s] = await Promise.all([
      payload.findGlobal({ slug: 'footer' }).catch(() => ({})),
      payload.findGlobal({ slug: 'site-settings' }).catch(() => ({})),
    ])
    footerData = f || {}
    settingsData = s || {}
  } catch (err) {
    console.error('Footer fetch error:', err)
  }

  const copyright = footerData.copyright && footerData.copyright !== '© 2026 Luxury Estates. All rights reserved.'
    ? footerData.copyright 
    : `© ${new Date().getFullYear()} Ramasri Builders & Interiors. All rights reserved.`
  const socialLinks = footerData.socialLinks || []
  const rawColumns = footerData.columns || []
  let columns = [...rawColumns]
  columns = columns.map((col: any) => {
    if (col.title === 'Company' && col.links && !col.links.some((l: any) => l.url === '/interiors')) {
      const updatedLinks = [...col.links]
      updatedLinks.splice(1, 0, { label: 'Interiors', url: '/interiors' })
      return { ...col, links: updatedLinks }
    }
    return col
  })
  const newsletter = (footerData as any).newsletter || { heading: 'Stay Updated', description: '' }
  const siteName = settingsData.siteName && settingsData.siteName !== 'Luxury Estates'
    ? settingsData.siteName 
    : 'Ramasri Builders & Interiors'
  const brandColor = settingsData.brandColor || '#0F9F5B'
  const email = settingsData.email || 'info@ramasribuilders.com'
  const phone = settingsData.phone || ''
  const address = settingsData.address || ''

  // Logo handling - get URL of uploaded media dynamically from CMS
  let logoUrl = ''
  if (typeof settingsData.logo === 'object' && settingsData.logo && 'url' in settingsData.logo) {
    logoUrl = settingsData.logo.url as string
  }
  if (!logoUrl) {
    logoUrl = '/RamaSriBuildersLogoTe.png'
  }

  return (
    <footer className="border-t border-border bg-card text-muted py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/">
              <img src={logoUrl} alt={siteName} className="h-14 w-auto object-contain" />
            </Link>
            
            <p className="text-xs max-w-sm text-muted/80 leading-relaxed">
              Trust in Every Square Foot. Leading builders of premium residential developments, custom homes, and bespoke interior designs.
            </p>

            <div className="text-xs flex flex-col gap-2 text-muted/70">
              {address && <p>{address}</p>}
              {phone && <p>T: <a href={`tel:${phone}`} className="hover:text-primary transition-colors">{phone}</a></p>}
              {email && <p>E: <a href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</a></p>}
            </div>
          </div>

          {/* Links Cols */}
          {columns.map((col: any, idx: number) => (
            <div key={idx} className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold tracking-wide text-foreground font-serif">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2 text-xs">
                {col.links?.map((link: any, lIdx: number) => (
                  <li key={lIdx}>
                    <Link href={link.url} className="hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Col */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold tracking-wide text-foreground font-serif">
              {newsletter.heading}
            </h4>
            <p className="text-xs text-muted/80">
              {newsletter.description || 'Subscribe to receive the latest updates, launches, and property details.'}
            </p>
            
            <form className="relative flex items-center mt-2 max-w-sm">
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full rounded-full border border-border bg-background px-4 py-2.5 pr-12 text-xs text-foreground placeholder:text-muted/50 focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-1.5 rounded-full p-2 text-background transition-opacity hover:opacity-90"
                style={{ backgroundColor: brandColor }}
                aria-label="Subscribe"
              >
                <Mail className="h-3 w-3" />
              </button>
            </form>

            {/* Social icons */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3 mt-4">
                {socialLinks.map((social: any, sIdx: number) => (
                  <a
                    key={sIdx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs capitalize text-muted/60 hover:text-primary transition-colors"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted/60">
          <p>{copyright}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
