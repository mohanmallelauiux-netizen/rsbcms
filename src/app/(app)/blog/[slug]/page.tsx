import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import RichText from '@/components/custom/RichText'
import InquiryForm from '@/components/custom/InquiryForm'
import { Calendar, User, ArrowLeft, HelpCircle } from 'lucide-react'
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
    collection: 'blogs',
    where: { slug: { equals: slug } },
  })

  const blog = res.docs[0]
  if (!blog) return { title: 'Article Not Found' }

  return {
    title: blog.seo?.title || `${blog.title} | Luxury Insights`,
    description: blog.seo?.description || 'Real estate article',
    keywords: blog.seo?.keywords || 'real estate insights, guides',
  }
}

// Pre-generate static routes for all seeded articles at build time
export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'blogs',
    limit: 100,
  })
  return res.docs.map((doc) => ({
    slug: doc.slug,
  }))
}

export default async function BlogLandingPage({ params }: Props) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const payload = await getPayload({ config })

  const res = await payload.find({
    collection: 'blogs',
    where: { slug: { equals: slug } },
  })

  const blog = res.docs[0]
  if (!blog) {
    return notFound()
  }

  // Resolve URLs and relation details
  let imgUrl = ''
  if (typeof blog.featuredImage === 'object' && blog.featuredImage && 'url' in blog.featuredImage) {
    imgUrl = blog.featuredImage.url as string
  }

  const categoryName = typeof blog.category === 'object' && blog.category && 'name' in blog.category
    ? (blog.category.name as string)
    : 'Insight'

  const authorName = typeof blog.author === 'object' && blog.author && 'name' in blog.author
    ? (blog.author.name as string)
    : 'Admin'

  const publishDate = blog.publishDate
    ? new Date(blog.publishDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  const tags = blog.tags || []
  const faq = blog.faq || []

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-12">
      {/* Back button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xxs text-primary hover:underline"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Insights
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left 2 Cols: Blog Article */}
        <article className="lg:col-span-2 flex flex-col gap-8">
          {/* Featured Image */}
          <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden bg-secondary border border-border">
            {imgUrl ? (
              <img src={imgUrl} alt={blog.title} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted">No Image</div>
            )}
          </div>

          {/* Heading and Meta data */}
          <div className="flex flex-col gap-4 border-b border-border/60 pb-6">
            <span className="text-xxs font-semibold uppercase tracking-widest text-primary">
              {categoryName}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-snug">
              {blog.title}
            </h1>
            
            <div className="flex items-center gap-6 text-xxs text-muted mt-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                <span>{publishDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-primary" />
                <span>By {authorName}</span>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-invert max-w-none">
            <RichText content={blog.content} />
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-border/60 pt-6 mt-4">
              {tags.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xxs px-3 py-1 rounded-full bg-secondary border border-border text-muted-foreground"
                >
                  #{t.tag}
                </span>
              ))}
            </div>
          )}

          {/* Blog FAQs */}
          {faq.length > 0 && (
            <div className="flex flex-col gap-4 border-t border-border/60 pt-8 mt-4">
              <h2 className="font-serif text-lg font-bold text-foreground">
                Article Frequently Asked Questions
              </h2>
              <div className="flex flex-col gap-4 mt-2">
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
        </article>

        {/* Right 1 Col: Sidebar Inquiry Form */}
        <div className="flex flex-col gap-8 lg:sticky lg:top-24 h-fit">
          <InquiryForm inquiryType="callback" />
        </div>

      </div>
    </div>
  )
}
