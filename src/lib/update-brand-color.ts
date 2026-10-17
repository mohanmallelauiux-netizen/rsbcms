import { getPayload } from 'payload'
import config from '@payload-config'

async function run() {
  console.log('Connecting to database and updating branding globals...')
  const payload = await getPayload({ config })

  // Update site settings
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Ramasri Builders & Interiors',
      brandColor: '#0F9F5B',
      email: 'info@ramasribuilders.com',
      phone: '+91 (555) 123-4567',
      address: 'Ramasri Builders Headquarters, Hyderabad, India',
      workingHours: 'Mon - Sat: 9:00 AM - 6:30 PM',
    },
  })

  // Update navigation links
  const nav = await payload.findGlobal({ slug: 'navigation' })
  const links = nav.links || []
  if (!links.some(l => l.pageUrl === '/interiors')) {
    const updatedLinks = [...links]
    // Insert interiors menu option
    updatedLinks.splice(3, 0, {
      label: 'Interiors',
      linkType: 'internal',
      pageUrl: '/interiors',
    } as any)
    await payload.updateGlobal({
      slug: 'navigation',
      data: {
        links: updatedLinks,
      },
    })
  }

  // Update footer copyright and descriptions
  const footer = await payload.findGlobal({ slug: 'footer' })
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      ...footer,
      copyright: `© ${new Date().getFullYear()} Ramasri Builders & Interiors. All rights reserved.`,
    }
  })

  console.log('Globals updated successfully!')
  process.exit(0)
}

run().catch(err => {
  console.error('Failed to update brand color globals:', err)
  process.exit(1)
})
