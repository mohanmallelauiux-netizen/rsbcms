import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Home, Award, Shield, ArrowRight, BedDouble, Bath, Maximize, Calendar, Sparkles, ImageIcon } from 'lucide-react'
import ScrollReveal from '@/components/custom/ScrollReveal'
import { translations } from '@/lib/translations'
import FAQAccordion from '@/components/custom/FAQAccordion'

export const revalidate = 60

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const { lang: rawLang } = await searchParams
  const lang = rawLang === 'en' ? 'en' : 'te'
  const t = translations[lang]

  const payload = await getPayload({ config })

  // Fetch Homepage, Projects, Blogs, Testimonials, and FAQs
  const homeData = await payload.findGlobal({ slug: 'home' })
  const projectsData = await payload.find({ collection: 'projects', limit: 3 })
  const blogsData = await payload.find({ collection: 'blogs', limit: 3 })
  const testimonialsData = await payload.find({ collection: 'testimonials', limit: 3 })
  const faqsData = await payload.find({
    collection: 'faqs',
    sort: 'createdAt',
    limit: 100,
  })

  // Extract Hero details
  const hero = homeData.hero || { title: 'Luxury Living', subtitle: '', ctaText: 'Explore', ctaUrl: '/projects' }
  let heroBgUrl = ''
  if (typeof hero.backgroundImage === 'object' && hero.backgroundImage && 'url' in hero.backgroundImage) {
    heroBgUrl = hero.backgroundImage.url as string
  }

  // Fallback to dictionary translations if language is Telugu
  const heroTitle = lang === 'te' ? t.hero.title : (hero.title || t.hero.title)
  const heroSubtitle = lang === 'te' ? t.hero.subtitle : (hero.subtitle || t.hero.subtitle)

  // Extract Why Choose Us
  const whyChooseUs = homeData.whyChooseUs || { heading: 'Why Choose Us', subheading: '', points: [] }
  const stats = homeData.statistics || []

  // Icon selector helper
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'award':
        return <Award className="h-6 w-6 text-primary" />
      case 'shield':
        return <Shield className="h-6 w-6 text-primary" />
      default:
        return <Home className="h-6 w-6 text-primary" />
    }
  }

  // Dynamic translate project names
  const translateProjectName = (name: string) => {
    if (lang !== 'te') return name
    if (name.includes('Skyline')) return 'స్కైలైన్ ఎలైట్ రెసిడెన్సెస్'
    if (name.includes('Aura')) return 'ఆరా ప్రీమియం విల్లాస్'
    if (name.includes('Grand')) return 'గ్రాండ్ ఓక్ పెెంట్‌హౌసెస్'
    return name
  }

  return (
    <div className="flex flex-col w-full overflow-hidden bg-background text-foreground">
      {/* 1. Hero Banner */}
      <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        {heroBgUrl ? (
          <img
            src={heroBgUrl}
            alt="Luxury Home Background"
            className="absolute inset-0 h-full w-full object-cover brightness-[0.7] transition-all duration-700"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-slate-200" />
        )}

        {/* Subtle decorative overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center flex flex-col items-center gap-6">
          <ScrollReveal direction="down">
            <span className="text-xxs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
              {lang === 'te' ? 'రమశ్రీ బిల్డర్స్ & ఇంటీరియర్స్' : 'Ramasri Builders & Interiors'}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 max-w-4xl leading-tight">
              {heroTitle}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-sm sm:text-base text-slate-800 max-w-2xl font-light">
              {heroSubtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.45}>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <Link
                href={`${hero.ctaUrl || '/projects'}?lang=${lang}`}
                className="rounded-full bg-primary hover:bg-primary/95 text-background px-8 py-3.5 text-xs font-semibold tracking-wide flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>{lang === 'te' ? t.hero.ctaProjects : (hero.ctaText || t.hero.ctaProjects)}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/interiors?lang=${lang}`}
                className="rounded-full border border-border bg-secondary/75 backdrop-blur-sm px-8 py-3.5 text-xs font-semibold tracking-wide text-primary hover:bg-secondary transition-colors"
              >
                {t.hero.ctaInteriors}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Company Statistics */}
      {stats.length > 0 && (
        <section className="relative z-20 -mt-12 mx-auto max-w-6xl w-full px-4">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 rounded-2xl border border-border bg-card/90 backdrop-blur-md p-8 shadow-xl text-center">
              {stats.map((stat, idx) => {
                let displayLabel = stat.label
                if (lang === 'te') {
                  if (stat.label.toLowerCase().includes('delivered')) displayLabel = t.stats.delivered
                  else if (stat.label.toLowerCase().includes('handover') || stat.label.toLowerCase().includes('years')) displayLabel = t.stats.handovers
                  else if (stat.label.toLowerCase().includes('award')) displayLabel = t.stats.awards
                }
                return (
                  <div key={idx} className="flex flex-col gap-2 relative after:last:hidden after:absolute after:right-0 after:top-1/4 after:h-1/2 after:w-[1px] after:bg-border/60">
                    <span className="font-serif text-3xl md:text-4xl font-bold text-primary tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-xxs font-medium text-muted uppercase tracking-wider">
                      {displayLabel}
                    </span>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* 3. Featured Projects */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xxs font-semibold uppercase tracking-widest text-primary">
                {t.projects.tag}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-2">
                {t.projects.title}
              </h2>
            </div>
            <Link
              href={`/projects?lang=${lang}`}
              className="text-xs font-semibold text-primary flex items-center gap-2 group hover:underline"
            >
              <span>{t.projects.viewAll}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.docs.map((project, idx) => {
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
                          ${project.startingPrice.toLocaleString()}
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
      </section>

      {/* 3.5. Interiors Showcase Section */}
      <section className="py-24 border-t border-border bg-secondary/10 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-xxs font-semibold uppercase tracking-widest text-primary flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  {t.interiors.tag}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-2">
                  {t.interiors.title}
                </h2>
                <p className="text-xs text-muted mt-2 max-w-xl font-light">
                  {t.interiors.subtitle}
                </p>
              </div>
              <Link
                href={`/interiors?lang=${lang}`}
                className="text-xs font-semibold text-primary flex items-center gap-2 group hover:underline"
              >
                <span>{t.interiors.explore}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1: Kitchen */}
            <ScrollReveal delay={0.1}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
                  alt="Modular Kitchen"
                  className="absolute inset-0 h-full w-full object-cover brightness-[0.7] transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 flex flex-col gap-2 z-10">
                  <span className="text-xxs uppercase tracking-wider text-primary font-semibold">{t.interiors.capabilities}</span>
                  <h3 className="font-serif text-base font-bold text-slate-900">{t.interiors.kitchenTitle}</h3>
                  <p className="text-xxs text-slate-800 line-clamp-2 font-light">
                    {t.interiors.kitchenDesc}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Wardrobe */}
            <ScrollReveal delay={0.2}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1558882224-cca166733360?auto=format&fit=crop&w=800&q=80"
                  alt="Luxury Closet"
                  className="absolute inset-0 h-full w-full object-cover brightness-[0.7] transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 flex flex-col gap-2 z-10">
                  <span className="text-xxs uppercase tracking-wider text-primary font-semibold">{t.interiors.capabilities}</span>
                  <h3 className="font-serif text-base font-bold text-slate-900">{t.interiors.closetsTitle}</h3>
                  <p className="text-xxs text-slate-800 line-clamp-2 font-light">
                    {t.interiors.closetsDesc}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3: Living Room */}
            <ScrollReveal delay={0.3}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                  alt="Living Lounge"
                  className="absolute inset-0 h-full w-full object-cover brightness-[0.7] transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 flex flex-col gap-2 z-10">
                  <span className="text-xxs uppercase tracking-wider text-primary font-semibold">{t.interiors.capabilities}</span>
                  <h3 className="font-serif text-base font-bold text-slate-900">{t.interiors.smartHomeTitle}</h3>
                  <p className="text-xxs text-slate-800 line-clamp-2 font-light">
                    {t.interiors.smartHomeDesc}
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-24 border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-xxs font-semibold uppercase tracking-widest text-primary">
                {t.usps.tag}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-2">
                {lang === 'te' ? t.usps.title : whyChooseUs.heading}
              </h2>
              <p className="text-xs text-muted mt-3">
                {lang === 'te' ? t.usps.subheading : whyChooseUs.subheading}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.points?.map((point, idx) => {
              // Localize headings
              let pointTitle = point.title
              let pointDesc = point.description
              if (lang === 'te') {
                if (point.title.toLowerCase().includes('location')) {
                  pointTitle = t.usps.locTitle
                  pointDesc = t.usps.locDesc
                } else if (point.title.toLowerCase().includes('craft')) {
                  pointTitle = t.usps.craftTitle
                  pointDesc = t.usps.craftDesc
                } else if (point.title.toLowerCase().includes('secur')) {
                  pointTitle = t.usps.secTitle
                  pointDesc = t.usps.secDesc
                }
              }
              return (
                <ScrollReveal key={idx} delay={idx * 0.15}>
                  <div className="bg-secondary/40 border border-border p-8 rounded-2xl flex flex-col gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      {renderIcon(point.icon || 'home')}
                    </div>
                    <h3 className="font-serif text-base font-bold text-foreground">
                      {pointTitle}
                    </h3>
                    <p className="text-xs text-muted/80 leading-relaxed">
                      {pointDesc}
                    </p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Client Testimonials */}
      {testimonialsData.docs.length > 0 && (
        <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/20">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xxs font-semibold uppercase tracking-widest text-primary">
                {t.reviews.tag}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-2">
                {t.reviews.title}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.docs.map((testimonial, idx) => (
              <ScrollReveal key={testimonial.id} delay={idx * 0.1}>
                <div className="bg-card border border-border p-8 rounded-2xl flex flex-col gap-6 shadow-sm">
                  <p className="text-xs text-muted/90 italic leading-relaxed">
                    "{testimonial.feedback}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="flex-grow">
                      <h4 className="text-xs font-semibold text-foreground font-serif">
                        {testimonial.clientName}
                      </h4>
                      <p className="text-xxs text-muted/70 mt-0.5">
                        {testimonial.role} {testimonial.company ? `at ${testimonial.company}` : ''}
                      </p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} className="text-primary text-xs">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* 6. Latest Blogs */}
      <section className="py-24 border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-xxs font-semibold uppercase tracking-widest text-primary">
                  {t.blogs.tag}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-2">
                  {t.blogs.title}
                </h2>
              </div>
              <Link
                href={`/blog?lang=${lang}`}
                className="text-xs font-semibold text-primary flex items-center gap-2 group hover:underline"
              >
                <span>{t.blogs.viewAll}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogsData.docs.map((blog, idx) => {
              let imgUrl = ''
              if (typeof blog.featuredImage === 'object' && blog.featuredImage && 'url' in blog.featuredImage) {
                imgUrl = blog.featuredImage.url as string
              }
              const publishDate = blog.publishDate ? new Date(blog.publishDate).toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }) : ''
              return (
                <ScrollReveal key={blog.id} delay={idx * 0.1}>
                  <div className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
                    </div>
                    <div className="p-6 flex flex-col flex-grow gap-3">
                      <div className="flex items-center gap-2 text-xxs text-muted">
                        <Calendar className="h-3 w-3 text-primary" />
                        <span>{publishDate}</span>
                      </div>
                      <h3 className="font-serif text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {blog.title}
                      </h3>
                      <Link
                        href={`/blog/${blog.slug}?lang=${lang}`}
                        className="mt-2 text-xxs font-semibold text-primary flex items-center gap-1 hover:underline"
                      >
                        {t.blogs.readFull} <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6.5. Visual Portfolio Gallery */}
      <section className="py-24 border-t border-border bg-secondary/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xxs font-semibold uppercase tracking-widest text-primary flex items-center justify-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5" />
                {t.gallery.tag}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-2">
                {t.gallery.title}
              </h2>
              <p className="text-xs text-muted mt-2 font-light">
                {t.gallery.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

            {/* Gallery Item 1 */}
            <ScrollReveal delay={0.05}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-border bg-card shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                  alt="Modern Villa Exterior"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-xxs text-primary uppercase font-bold tracking-wider">{t.projects.tag}</span>
                  <h4 className="text-xs text-slate-900 font-serif font-bold mt-1">{t.gallery.item1}</h4>
                </div>
              </div>
            </ScrollReveal>

            {/* Gallery Item 2 */}
            <ScrollReveal delay={0.1}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-border bg-card shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                  alt="Luxury Living Interiors"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-xxs text-primary uppercase font-bold tracking-wider">{t.interiors.tag}</span>
                  <h4 className="text-xs text-slate-900 font-serif font-bold mt-1">{t.gallery.item2}</h4>
                </div>
              </div>
            </ScrollReveal>

            {/* Gallery Item 3 */}
            <ScrollReveal delay={0.15}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-border bg-card shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
                  alt="Italian Modular Kitchen"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-xxs text-primary uppercase font-bold tracking-wider">{t.interiors.tag}</span>
                  <h4 className="text-xs text-slate-900 font-serif font-bold mt-1">{t.gallery.item3}</h4>
                </div>
              </div>
            </ScrollReveal>

            {/* Gallery Item 4 */}
            <ScrollReveal delay={0.2}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-border bg-card shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                  alt="Ceiling Lighting"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-xxs text-primary uppercase font-bold tracking-wider">{t.interiors.tag}</span>
                  <h4 className="text-xs text-slate-900 font-serif font-bold mt-1">{t.gallery.item4}</h4>
                </div>
              </div>
            </ScrollReveal>

            {/* Gallery Item 5 */}
            <ScrollReveal delay={0.25}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-border bg-card shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1558882224-cca166733360?auto=format&fit=crop&w=800&q=80"
                  alt="Integrated Closet System"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-xxs text-primary uppercase font-bold tracking-wider">{t.interiors.tag}</span>
                  <h4 className="text-xs text-slate-900 font-serif font-bold mt-1">{t.gallery.item5}</h4>
                </div>
              </div>
            </ScrollReveal>

            {/* Gallery Item 6 */}
            <ScrollReveal delay={0.3}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-border bg-card shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=800&q=80"
                  alt="Architectural Duplex Lounge"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-xxs text-primary uppercase font-bold tracking-wider">{t.projects.tag}</span>
                  <h4 className="text-xs text-slate-900 font-serif font-bold mt-1">{t.gallery.item6}</h4>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 6.75. FAQs Section */}
      {faqsData.docs && faqsData.docs.length > 0 && (
        <FAQAccordion faqs={faqsData.docs} t={t.faq} />
      )}

      {/* 7. Contact CTA */}
      <section className="py-24 border-t border-border bg-card text-center relative overflow-hidden">
        <ScrollReveal>
          <div className="relative z-10 mx-auto max-w-4xl px-4 flex flex-col items-center gap-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground max-w-2xl leading-snug">
              {lang === 'te' ? 'సంప్రదించడానికి సిద్ధంగా ఉన్నారా?' : 'Ready to Begin Your Private Property Acquisition?'}
            </h2>
            <p className="text-xs text-muted max-w-md">
              {lang === 'te' ? 'ఈరోజే మా ప్రతినిధితో మాట్లాడటానికి ఉచిత కాల్ షెడ్యూల్ చేయండి.' : 'Schedule a confidential consultation with one of our lead real estate portfolio managers today.'}
            </p>
            <Link
              href={`/contact?lang=${lang}`}
              className="rounded-full bg-primary hover:bg-primary/95 text-background px-8 py-3.5 text-xs font-semibold tracking-wide flex items-center gap-2 mt-2 transition-colors cursor-pointer"
            >
              <span>{t.nav.consultation}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
