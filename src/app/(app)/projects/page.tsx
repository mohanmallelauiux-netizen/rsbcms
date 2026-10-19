import Link from 'next/link'
import { getPayload } from 'payload'
import type { Where } from 'payload'
import config from '@payload-config'
import { Search, BedDouble, Bath, Maximize, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/custom/ScrollReveal'
import { translations } from '@/lib/translations'

export const revalidate = 60

type Props = {
  searchParams?: Promise<{
    search?: string
    lang?: string
  }>
}

export default async function ProjectsPage(props: Props) {
  const resolvedSearchParams = props?.searchParams ? await props.searchParams : {}
  const search = resolvedSearchParams?.search || ''
  const lang = resolvedSearchParams?.lang === 'en' ? 'en' : 'te'
  const t = translations[lang]
  
  let projectsData: any = { docs: [] }

  try {
    const payload = await getPayload({ config })
    const whereQuery: Where | undefined = search
      ? {
          or: [
            { name: { like: search } },
            { location: { like: search } },
          ],
        }
      : undefined

    projectsData = await payload.find({
      collection: 'projects',
      where: whereQuery,
      sort: '-createdAt',
    })
  } catch (err) {
    console.error('Error fetching projects data:', err)
  }

  // Dynamic translate project names
  const translateProjectName = (name: string = '') => {
    if (lang !== 'te' || !name) return name || ''
    if (name.includes('Skyline')) return 'స్కైలైన్ ఎలైట్ రెసిడెన్సెస్'
    if (name.includes('Aura')) return 'ఆరా ప్రీమియం విల్లాస్'
    if (name.includes('Grand')) return 'గ్రాండ్ ఓక్ పెెంట్‌హౌసెస్'
    return name
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-12 bg-background text-foreground">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ScrollReveal direction="left">
          <div>
            <span className="text-xxs font-semibold uppercase tracking-widest text-primary">
              {t.projects.tag}
            </span>
            <h1 className="font-serif text-3xl font-bold text-foreground mt-2">
              {lang === 'te' ? 'మా గృహ నిర్మాణ ప్రాజెక్ట్‌లు' : 'Confidential Listings Portfolio'}
            </h1>
            <p className="text-xs text-muted mt-2 font-light">
              {lang === 'te'
                ? 'లగ్జరీ పెెంట్‌హౌస్లు, కస్టమ్ విల్లాలు మరియు గేటెడ్ కమ్యూనిటీల మా ప్రత్యేక పోర్ట్‌ఫోలియోను చూడండి.'
                : 'Browse our catalog of luxury penthouses, custom villas, and architectural estates.'}
            </p>
          </div>
        </ScrollReveal>

        {/* 2. Server-side Search Form */}
        <ScrollReveal direction="right" delay={0.15}>
          <form method="GET" className="relative flex items-center w-full max-w-xs shrink-0">
            {/* Preserve language context */}
            <input type="hidden" name="lang" value={lang} />
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder={t.projects.searchPlaceholder}
              className="w-full rounded-full border border-border bg-card px-4 py-2.5 pl-10 text-xs text-foreground placeholder:text-muted/50 focus:border-primary focus:outline-none"
            />
            <Search className="absolute left-3.5 h-4 w-4 text-muted/60" />
            <button type="submit" className="hidden">{t.projects.searchBtn}</button>
          </form>
        </ScrollReveal>
      </div>

      {/* 3. Projects Grid */}
      {projectsData.docs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.docs.map((project: any, idx: number) => {
            let imgUrl = ''
            if (typeof project.bannerImage === 'object' && project.bannerImage && 'url' in project.bannerImage) {
              imgUrl = project.bannerImage.url as string
            }
            return (
              <ScrollReveal key={project.id} delay={idx * 0.1}>
                <div className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all hover:scale-[1.01] hover:shadow-lg hover:border-primary/30">
                  <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={project.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted">No Image</div>
                    )}
                    <span className="absolute left-4 top-4 rounded-full bg-card/90 backdrop-blur-sm px-3.5 py-1.5 text-xxs font-medium text-primary uppercase tracking-wider">
                      {project.projectType}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-grow gap-4">
                    <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {translateProjectName(project.name)}
                    </h3>
                    <p className="text-xs text-muted/80 line-clamp-2">
                      {project.shortDescription}
                    </p>
                    
                    {/* Quick specs bar */}
                    <div className="flex items-center justify-between border-t border-border/60 pt-4 text-xxs text-muted">
                      <div className="flex items-center gap-1.5">
                        <BedDouble className="h-3.5 w-3.5 text-primary" />
                        <span>{project.bedrooms} {t.projects.beds}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="h-3.5 w-3.5 text-primary" />
                        <span>{project.bathrooms} {t.projects.baths}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize className="h-3.5 w-3.5 text-primary" />
                        <span>{project.propertySize} {t.projects.size}</span>
                      </div>
                    </div>

                    <div className="mt-2 border-t border-border/60 pt-4 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xxs uppercase text-muted tracking-wider">{t.projects.startingPrice}</span>
                        <span className="font-serif text-sm font-bold text-foreground">
                          ${(project.startingPrice || 0).toLocaleString()}
                        </span>
                      </div>
                      <Link
                        href={`/projects/${project.slug}?lang=${lang}`}
                        className="rounded-full border border-border bg-secondary/40 p-2.5 text-primary hover:bg-primary hover:text-background transition-all"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      ) : (
        <ScrollReveal>
          <div className="text-center py-20 bg-card border border-border rounded-2xl shadow-sm">
            <p className="text-sm text-muted">{t.projects.noProjects}</p>
            <Link href={`/projects?lang=${lang}`} className="text-xs text-primary underline mt-2 block">
              {t.projects.resetFilters}
            </Link>
          </div>
        </ScrollReveal>
      )}
    </div>
  )
}
