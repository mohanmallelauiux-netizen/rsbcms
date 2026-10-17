import { getPayload } from 'payload'
import config from '@payload-config'

// A small 1x1 transparent PNG pixel buffer
const dummyImageBuffer = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
)

// A small dummy PDF buffer
const dummyPdfBuffer = Buffer.from(
  '%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << >> /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 12 >>\nstream\nBT /F1 12 Tf ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000009 00000 n\n0000000056 00000 n\n0000000111 00000 n\n0000000212 00000 n\ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n274\n%%EOF',
  'ascii'
)

// Basic Lexical JSON content template
const createLexicalContent = (text: string): any => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            text: text,
            version: 1,
          },
        ],
      },
    ],
  },
})

async function seed() {
  console.log('Initializing Payload for seeding...')
  const payload = await getPayload({ config })

  console.log('Seeding administrative users...')
  // Check if admin user exists
  const existingUsers = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@rsbi.com' } },
  })

  let adminUser: any
  if (existingUsers.totalDocs === 0) {
    adminUser = await payload.create({
      collection: 'users',
      data: {
        name: 'Super Admin',
        email: 'admin@rsbi.com',
        password: 'password123',
        role: 'admin',
      },
    })
    console.log('Created admin account: admin@rsbi.com / password123')
  } else {
    adminUser = existingUsers.docs[0]
    console.log('Admin account already exists.')
  }

  console.log('Uploading placeholder media files...')
  // Upload a dummy project image
  const bannerDoc = await payload.create({
    collection: 'media',
    data: { alt: 'Luxury Real Estate Placeholder Banner' },
    file: {
      data: dummyImageBuffer,
      name: 'banner_placeholder.png',
      mimetype: 'image/png',
      size: dummyImageBuffer.length,
    },
  })

  // Upload a dummy brochure PDF
  const brochureDoc = await payload.create({
    collection: 'media',
    data: { alt: 'Project Brochure Document' },
    file: {
      data: dummyPdfBuffer,
      name: 'project_brochure.pdf',
      mimetype: 'application/pdf',
      size: dummyPdfBuffer.length,
    },
  })

  console.log('Media files uploaded successfully.')

  console.log('Seeding project types/listings...')
  const p1 = await payload.create({
    collection: 'projects',
    data: {
      name: 'Aura Premium Villas',
      slug: 'aura-premium-villas',
      shortDescription: 'Bespoke architectural marvels featuring direct lakefront views and state of the art custom designs.',
      detailedDescription: createLexicalContent(
        'Aura Premium Villas represents the peak of modern elegance. Each villa has been crafted with materials sourced from Italy, high thermal insulation, floor-to-ceiling double-glazed panels, and fully customized landscaping. Nestled in Beverly Hills, these properties offer privacy and unparalleled luxury.'
      ),
      projectType: 'villa',
      status: 'under-construction',
      startingPrice: 85000000,
      propertySize: 5400,
      bedrooms: 5,
      bathrooms: 6,
      parking: 3,
      location: '1004 Crestview Drive, Beverly Hills, CA',
      latitude: 34.0954,
      longitude: -118.4118,
      googleMapsUrl: 'https://maps.google.com',
      bannerImage: bannerDoc.id,
      brochurePdf: brochureDoc.id,
      amenities: [
        { name: 'Private Infinity Pool' },
        { name: 'Home Theatre Room' },
        { name: 'Smart Automated Systems' },
        { name: 'Private Elevator' },
      ],
      highlights: [
        { text: 'Ultra-exclusive gated enclave' },
        { text: 'Zero Carbon emission design rating' },
        { text: 'Italian marble flooring throughout' },
      ],
      specifications: [
        { category: 'Structure', details: 'R.C.C. framed earthquake resistant design structure.' },
        { category: 'Electrical', details: 'Premium copper wiring with modular automation switches.' },
      ],
      floorPlans: [
        { title: 'Ground Floor Plan', image: bannerDoc.id },
        { title: 'First Floor Plan', image: bannerDoc.id },
      ],
      gallery: [{ image: bannerDoc.id }, { image: bannerDoc.id }],
      faq: [
        { question: 'When is completion expected?', answer: 'Phase 1 is expected to be delivered by Q3 2027.' },
        { question: 'Can I customize the kitchen layout?', answer: 'Yes, early stage buyers have options to customize layouts.' },
      ],
    },
  })

  const p2 = await payload.create({
    collection: 'projects',
    data: {
      name: 'Skyline Elite Residences',
      slug: 'skyline-elite-residences',
      shortDescription: 'High-rise residential apartments with a panoramic view of the metropolitan cityscape.',
      detailedDescription: createLexicalContent(
        'Skyline Elite Residences redefines urban living. Located in the heart of downtown, these premium apartments feature sound-isolated walls, dedicated workspace niches, premium high-speed elevators, and access to an exclusive rooftop club house.'
      ),
      projectType: 'apartment',
      status: 'ready-to-move',
      startingPrice: 32000000,
      propertySize: 1850,
      bedrooms: 3,
      bathrooms: 3,
      parking: 2,
      location: 'Plot 45, Sector 56, Downtown Metropolitan',
      latitude: 40.7128,
      longitude: -74.006,
      googleMapsUrl: 'https://maps.google.com',
      bannerImage: bannerDoc.id,
      brochurePdf: brochureDoc.id,
      amenities: [
        { name: 'Rooftop Clubhouse' },
        { name: '24/7 Concierge Services' },
        { name: 'EV Charging Station' },
        { name: 'Equipped Gymnasium' },
      ],
      highlights: [
        { text: 'Located in high-growth commercial node' },
        { text: 'Double glazed energy efficient building' },
        { text: 'Walkable distance to central transit stations' },
      ],
      specifications: [
        { category: 'HVAC', details: 'Centralized VRV heating and cooling units.' },
        { category: 'Flooring', details: 'Laminated wooden floors in bedrooms, vitrified tiles in hall.' },
      ],
      gallery: [{ image: bannerDoc.id }],
    },
  })

  const p3 = await payload.create({
    collection: 'projects',
    data: {
      name: 'Grand Oak Penthouses',
      slug: 'grand-oak-penthouses',
      shortDescription: 'Lavish duplex penthouses situated atop the city highest structural towers.',
      detailedDescription: createLexicalContent(
        'Grand Oak Penthouses features the ultimate luxury. Over 9,000 square feet of private space spread across two levels, including a private rooftop helipad accessibility, custom wine cellars, and panoramic terraces.'
      ),
      projectType: 'penthouse',
      status: 'upcoming',
      startingPrice: 120000000,
      propertySize: 9200,
      bedrooms: 6,
      bathrooms: 7,
      parking: 4,
      location: '12 Oak Ridge Boulevard, Sky Heights Tower',
      latitude: 28.6139,
      longitude: 77.209,
      googleMapsUrl: 'https://maps.google.com',
      bannerImage: bannerDoc.id,
      brochurePdf: brochureDoc.id,
      amenities: [
        { name: 'Helipad Access' },
        { name: 'Temperature Controlled Wine Cellar' },
        { name: 'Private Sky Garden' },
        { name: 'Dedicated Butler Rooms' },
      ],
      highlights: [
        { text: 'Single unit per floor layout' },
        { text: 'Panoramic 360-degree glass exterior' },
        { text: 'Bespoke custom leather interior packages' },
      ],
      specifications: [
        { category: 'Exterior', details: 'Full custom tempered structural glass panels.' },
        { category: 'Security', details: 'Biometric locks and security scans at lobby elevator.' },
      ],
      gallery: [{ image: bannerDoc.id }],
    },
  })

  console.log('Seeded projects successfully.')

  console.log('Seeding blog categories...')
  const categoryDoc = await payload.create({
    collection: 'categories',
    data: { name: 'Market Insights', slug: 'market-insights' },
  })

  console.log('Seeding blog posts...')
  await payload.create({
    collection: 'blogs',
    data: {
      title: 'Guide to Buying Your First Luxury Villa',
      slug: 'guide-to-buying-your-first-luxury-villa',
      featuredImage: bannerDoc.id,
      category: categoryDoc.id,
      author: adminUser.id,
      publishDate: new Date().toISOString(),
      content: createLexicalContent(
        'Purchasing a premium villa is a unique process. In this guide, we review structural safety checks, legal title confirmation, selecting customization plans during the under-construction phase, and aligning expectations on finishing dates.'
      ),
      tags: [{ tag: 'Villas' }, { tag: 'First-time Buyer' }, { tag: 'Luxury Guide' }],
      faq: [
        { question: 'What is the most important legal check?', answer: 'Always verify title deed clearances and local authority approvals.' },
      ],
    },
  })

  await payload.create({
    collection: 'blogs',
    data: {
      title: 'Top Architectural Trends in 2026',
      slug: 'top-architectural-trends-in-2026',
      featuredImage: bannerDoc.id,
      category: categoryDoc.id,
      author: adminUser.id,
      publishDate: new Date().toISOString(),
      content: createLexicalContent(
        'Architectural design is changing rapidly in 2026. Minimalist structural facades, custom eco-compatible energy automation systems, glass curtains, and flexible indoor-outdoor hybrid zones are taking center stage in high-end developments.'
      ),
      tags: [{ tag: 'Design' }, { tag: 'Trends' }, { tag: '2026' }],
    },
  })

  await payload.create({
    collection: 'blogs',
    data: {
      title: 'Understanding Real Estate Valuation',
      slug: 'understanding-real-estate-valuation',
      featuredImage: bannerDoc.id,
      category: categoryDoc.id,
      author: adminUser.id,
      publishDate: new Date().toISOString(),
      content: createLexicalContent(
        'Valuing high-end properties involves more than just calculating square footage cost. Land scarcity, architectural exclusivity, luxury material selections, and neighborhood zoning laws heavily dictate final values.'
      ),
      tags: [{ tag: 'Finance' }, { tag: 'Valuation' }, { tag: 'Investment' }],
    },
  })

  console.log('Seeded blogs successfully.')

  console.log('Seeding Globals (Home, About, Navigation, Footer, SiteSettings)...')
  
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Luxury Estates',
      logo: bannerDoc.id,
      brandColor: '#C5A880',
    },
  })

  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      links: [
        { label: 'Home', linkType: 'internal', pageUrl: '/' },
        { label: 'About Us', linkType: 'internal', pageUrl: '/about' },
        { label: 'Projects', linkType: 'internal', pageUrl: '/projects' },
        { label: 'Blog', linkType: 'internal', pageUrl: '/blog' },
        { label: 'Contact', linkType: 'internal', pageUrl: '/contact' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      copyright: '© 2026 Luxury Estates. All rights reserved.',
      socialLinks: [
        { platform: 'linkedin', url: 'https://linkedin.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
      ],
      columns: [
        {
          title: 'Properties',
          links: [
            { label: 'Villas', url: '/projects?type=villa' },
            { label: 'Apartments', url: '/projects?type=apartment' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About Us', url: '/about' },
            { label: 'Blog', url: '/blog' },
            { label: 'Contact', url: '/contact' },
          ],
        },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'home',
    data: {
      hero: {
        title: 'Crafting Legacies In Luxury Living',
        subtitle: 'Explore our curated portfolio of ultra-premium estates, custom villas, and high-rise residences.',
        backgroundImage: bannerDoc.id,
      },
      whyChooseUs: {
        heading: 'Crafted For The Discerning Few',
        subheading: 'We construct architectural statements using finest materials and structural standards.',
        points: [
          { title: 'Exquisite Locations', description: 'Selected for absolute privacy and strong capital appreciation.', icon: 'home' },
          { title: 'Master Craftsmanship', description: 'Materials sourced globally and styled by top designers.', icon: 'award' },
          { title: 'Secured Enclaves', description: 'Advanced electronic systems and 24/7 security control.', icon: 'shield' },
        ],
      },
      statistics: [
        { value: '$1.2B+', label: 'Delivered Assets' },
        { value: '450+', label: 'Luxury Handovers' },
        { value: '15+', label: 'Design Awards' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'about',
    data: {
      storyHeading: 'Our Design Legacy',
      storyDescription: 'Established in 2012, we have spent over a decade constructing high-end custom residences that combine fine engineering with visual elegance.',
      storyImage: bannerDoc.id,
      founderMessage: {
        name: 'Arthur Pendelton',
        role: 'CEO & Founder',
        quote: 'A home is not just space; it is a canvas of legacy. We build monuments that define premium lifestyles.',
        image: bannerDoc.id,
      },
      timeline: [
        { year: '2012', title: 'Company Founding', description: 'Launched with a team of two architects in Beverly Hills.' },
        { year: '2018', title: 'Expansion to High-rises', description: 'Delivered our first 40-story luxury apartment tower.' },
        { year: '2024', title: 'Carbon Neutral Standard', description: 'Committed to building 100% green-efficient developments.' },
      ],
    },
  })

  console.log('Seeding completed successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding failed with error:', err)
  process.exit(1)
})
