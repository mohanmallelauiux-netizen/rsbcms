import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Calendar, User, ArrowRight } from 'lucide-react'

export const revalidate = 60

export default async function BlogArchivePage() {
  const payload = await getPayload({ config })

  // Fetch blogs sorted by publish date
  const blogsData = await payload.find({
    collection: 'blogs',
    sort: '-publishDate',
  })

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-12">
      {/* Header */}
      <div>
        <span className="text-xxs font-semibold uppercase tracking-widest text-primary">
          Press & News
        </span>
        <h1 className="font-serif text-3xl font-bold text-foreground mt-2">
          Latest Publications & Market Insights
        </h1>
        <p className="text-xs text-muted mt-2 font-light">
          Read guides, market valuations, and design trends compiled by our research editors.
        </p>
      </div>

      {/* Grid */}
      {blogsData.docs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsData.docs.map((blog) => {
            let imgUrl = ''
            if (typeof blog.featuredImage === 'object' && blog.featuredImage && 'url' in blog.featuredImage) {
              imgUrl = blog.featuredImage.url as string
            }
            
            const categoryName = typeof blog.category === 'object' && blog.category && 'name' in blog.category
              ? (blog.category.name as string)
              : 'Article'

            const authorName = typeof blog.author === 'object' && blog.author && 'name' in blog.author
              ? (blog.author.name as string)
              : 'Admin'

            const publishDate = blog.publishDate
              ? new Date(blog.publishDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : ''

            return (
              <div key={blog.id} className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={blog.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-muted">No Image</div>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-background/80 backdrop-blur-sm px-3.5 py-1.5 text-xxs font-medium text-primary uppercase tracking-wider">
                    {categoryName}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow gap-4">
                  {/* Meta data row */}
                  <div className="flex items-center gap-4 text-xxs text-muted">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>{publishDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-primary" />
                      <span>{authorName}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  {/* Basic extract / short text */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {blog.tags.map((t, tIdx) => (
                        <span key={tIdx} className="text-xxs px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                          #{t.tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="mt-auto border-t border-border/60 pt-4 text-xxs font-semibold text-primary flex items-center gap-1 hover:underline"
                  >
                    Read Full Article <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-card border border-border rounded-2xl">
          <p className="text-sm text-muted">No blog posts found.</p>
        </div>
      )}
    </div>
  )
}
