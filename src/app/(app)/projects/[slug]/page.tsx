import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import RichText from '@/components/custom/RichText'
import InquiryForm from '@/components/custom/InquiryForm'
import PropertyMapWrapper from '@/components/custom/PropertyMapWrapper'
import { BedDouble, Bath, Maximize, Car, MapPin, Download, ExternalLink, HelpCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 60

type Props = {
  params: Promise<{
    slug: string
  }>
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const payload = await getPayload({ config })
  
  const res = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
  })

  const project = res.docs[0]
  if (!project) return { title: 'Project Not Found' }

  return {
    title: project.seo?.title || `${project.name} | Luxury Estates`,
    description: project.seo?.description || project.shortDescription,
    keywords: project.seo?.keywords || 'luxury villa, premium real estate',
  }
}

// Pre-generate static routes for all seeded projects at build time
export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'projects',
    limit: 100,
  })
  return res.docs.map((doc) => ({
    slug: doc.slug,
  }))
}

export default async function ProjectLandingPage({ params }: Props) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const payload = await getPayload({ config })

  const res = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
  })

  const project = res.docs[0]
  if (!project) {
    return notFound()
  }

  // Media URLs handling
  let bannerUrl = ''
  if (typeof project.bannerImage === 'object' && project.bannerImage && 'url' in project.bannerImage) {
    bannerUrl = project.bannerImage.url as string
  }

  let brochureUrl = ''
  if (typeof project.brochurePdf === 'object' && project.brochurePdf && 'url' in project.brochurePdf) {
    brochureUrl = project.brochurePdf.url as string
  }

  let masterPlanUrl = ''
  if (typeof project.masterPlan === 'object' && project.masterPlan && 'url' in project.masterPlan) {
    masterPlanUrl = project.masterPlan.url as string
  }

  const gallery = project.gallery || []
  const amenities = project.amenities || []
  const highlights = project.highlights || []
  const specifications = project.specifications || []
  const floorPlans = project.floorPlans || []
  const faq = project.faq || []

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* 1. Hero Block */}
      <section className="relative h-[60vh] min-h-[450px] w-full flex items-end overflow-hidden pb-12">
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt={project.name}
            className="absolute inset-0 h-full w-full object-cover brightness-[0.45]"
          />
        ) : (
          <div className="absolute inset-0 bg-secondary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary/20 border border-primary/30 px-3.5 py-1.5 text-xxs font-semibold text-primary uppercase tracking-wider">
              {project.projectType}
            </span>
            <span className="rounded-full bg-secondary/80 border border-border px-3.5 py-1.5 text-xxs font-semibold text-muted uppercase tracking-wider">
              {project.status.replace('-', ' ')}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mt-4 max-w-3xl">
            {project.name}
          </h1>
          <div className="flex items-center gap-2 text-xs text-muted/95 mt-3">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <span>{project.location}</span>
          </div>
        </div>
      </section>

      {/* 2. Content Layout Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left 2 Cols: Details */}
        <div className="lg:col-span-2 flex flex-col gap-16">
          
          {/* Key Parameters Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-border/60 pb-8">
            <div className="bg-card border border-border p-4 rounded-xl text-center">
              <span className="text-xxs uppercase tracking-wider text-muted">Starting Price</span>
              <h4 className="font-serif text-sm font-bold text-foreground mt-1">
                ${project.startingPrice.toLocaleString()}
              </h4>
            </div>
            <div className="bg-card border border-border p-4 rounded-xl text-center">
              <span className="text-xxs uppercase tracking-wider text-muted">Property Size</span>
              <h4 className="font-serif text-sm font-bold text-foreground mt-1">
                {project.propertySize} sqft
              </h4>
            </div>
            <div className="bg-card border border-border p-4 rounded-xl text-center">
              <span className="text-xxs uppercase tracking-wider text-muted">Beds & Baths</span>
              <h4 className="font-serif text-sm font-bold text-foreground mt-1">
                {project.bedrooms}b / {project.bathrooms}b
              </h4>
            </div>
            <div className="bg-card border border-border p-4 rounded-xl text-center">
              <span className="text-xxs uppercase tracking-wider text-muted">Parking Spaces</span>
              <h4 className="font-serif text-sm font-bold text-foreground mt-1">
                {project.parking || 0} Car(s)
              </h4>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-xl font-bold text-foreground">
              About The Property
            </h2>
            <div className="border-t border-border/60 pt-4">
              <RichText content={project.detailedDescription} />
            </div>
          </div>

          {/* Highlights Checklist */}
          {highlights.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Project Highlights
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-border/60 pt-6">
                {highlights.map((item, idx) => (
                  <li key={idx} className="text-xs text-muted flex items-start gap-2.5">
                    <span className="text-primary text-base font-bold select-none mt-0.5">✓</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Amenities Grid */}
          {amenities.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Premium Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-border/60 pt-6">
                {amenities.map((item, idx) => (
                  <div key={idx} className="bg-secondary/20 border border-border p-4 rounded-xl flex items-center justify-center text-center">
                    <span className="text-xs font-semibold text-primary">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specifications Accordion */}
          {specifications.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Detailed Specifications
              </h2>
              <div className="flex flex-col border-t border-border/60 pt-6 gap-4">
                {specifications.map((spec, idx) => (
                  <div key={idx} className="bg-card border border-border p-5 rounded-xl">
                    <h4 className="font-serif text-xs font-bold text-primary mb-2 uppercase tracking-wide">
                      {spec.category}
                    </h4>
                    <p className="text-xs text-muted/80 leading-relaxed font-light">
                      {spec.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Floor Plans Display */}
          {floorPlans.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Architectural Floor Plans
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-border/60 pt-6">
                {floorPlans.map((plan, idx) => {
                  let fUrl = ''
                  if (typeof plan.image === 'object' && plan.image && 'url' in plan.image) {
                    fUrl = plan.image.url as string
                  }
                  return (
                    <div key={idx} className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
                      <h4 className="text-xs font-semibold text-foreground font-serif">{plan.title}</h4>
                      <div className="aspect-video bg-secondary rounded-lg overflow-hidden border border-border">
                        {fUrl ? (
                          <img src={fUrl} alt={plan.title} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-muted text-xxs">No Plan Image</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Geolocation Map */}
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-xl font-bold text-foreground">
              Location Map
            </h2>
            <div className="border-t border-border/60 pt-6">
              <PropertyMapWrapper lat={project.latitude} lng={project.longitude} address={project.location} />
              
              {project.googleMapsUrl && (
                <a
                  href={project.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xxs text-primary hover:underline mt-4"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          {/* Project specific FAQ */}
          {faq.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <div className="flex flex-col border-t border-border/60 pt-6 gap-4">
                {faq.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-5 rounded-xl border border-border bg-card">
                    <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1.5">
                      <h4 className="text-xs font-semibold text-foreground">{item.question}</h4>
                      <p className="text-xs text-muted/80 leading-relaxed font-light">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right 1 Col: Downloads & Inquiry Form Sticky Sidebar */}
        <div className="flex flex-col gap-8 lg:sticky lg:top-24 h-fit">
          {/* Download brochure */}
          {(brochureUrl || masterPlanUrl) && (
            <div className="bg-card border border-border p-6 rounded-2xl flex flex-col gap-4">
              <h3 className="font-serif font-semibold text-sm text-foreground">
                Downloads & Plans
              </h3>
              <div className="flex flex-col gap-2.5">
                {brochureUrl && (
                  <a
                    href={brochureUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-4 py-3 text-xs font-medium text-primary hover:bg-secondary transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Project Brochure
                    </span>
                    <span className="text-xxs text-muted uppercase">PDF</span>
                  </a>
                )}
                {masterPlanUrl && (
                  <a
                    href={masterPlanUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-4 py-3 text-xs font-medium text-primary hover:bg-secondary transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View Master Plan
                    </span>
                    <span className="text-xxs text-muted uppercase">IMG</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Sticky Inquiry Form */}
          <InquiryForm inquiryType="project-inquiry" projectId={String(project.id)} projectName={project.name} />
        </div>

      </section>
    </div>
  )
}
