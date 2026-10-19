import { getPayload } from 'payload'
import config from '@payload-config'
import ScrollReveal from '@/components/custom/ScrollReveal'

export const revalidate = 60

export default async function AboutPage(props: {
  searchParams?: Promise<{ lang?: string }>
}) {
  const resolvedSearchParams = props?.searchParams ? await props.searchParams : {}
  const rawLang = resolvedSearchParams?.lang
  const lang = rawLang === 'en' ? 'en' : 'te'

  const payload = await getPayload({ config })

  // Fetch About Page Global and Team members
  const aboutData = await payload.findGlobal({ slug: 'about' })
  const teamData = await payload.find({
    collection: 'team',
    sort: 'order',
  })

  // Story details
  const storyHeading = aboutData.storyHeading || 'Our Story'
  const storyDescription = aboutData.storyDescription || ''
  let storyImgUrl = ''
  if (typeof aboutData.storyImage === 'object' && aboutData.storyImage && 'url' in aboutData.storyImage) {
    storyImgUrl = aboutData.storyImage.url as string
  }

  // Vision & Mission
  const visionHeading = aboutData.visionHeading || 'Our Vision'
  const visionDescription = aboutData.visionDescription || ''
  const missionHeading = aboutData.missionHeading || 'Our Mission'
  const missionDescription = aboutData.missionDescription || ''

  // Founder Message
  const founder = aboutData.founderMessage || { name: 'Arthur Pendelton', role: '', quote: '' }
  let founderImgUrl = ''
  if (typeof founder.image === 'object' && founder.image && 'url' in founder.image) {
    founderImgUrl = founder.image.url as string
  }

  // Timeline
  const timeline = aboutData.timeline || []

  // Localized Overrides
  const storyHeadingTranslated = lang === 'te' ? 'మా ప్రస్థానం' : storyHeading
  const storyDescTranslated = lang === 'te' 
    ? 'రమశ్రీ బిల్డర్స్ & ఇంటీరియర్స్ సుదీర్ఘ కాలంగా అత్యున్నత నాణ్యతతో కూడిన గృహ నిర్మాణాలను విజయవంతంగా పూర్తి చేసింది. ప్రతి ఇటుకలోనూ నమ్మకాన్ని, ప్రతి నిర్మాణంలోనూ నాణ్యతను చూపడమే మా ధ్యేయం. వేలాది కస్టమర్ల నమ్మకమే మా విజయానికి నిదర్శనం.' 
    : storyDescription

  const visionHeadingTranslated = lang === 'te' ? 'మా సిద్ధాంతం (Vision)' : visionHeading
  const visionDescTranslated = lang === 'te' 
    ? 'నాణ్యత గల ఇళ్లను సామాన్యులకు సైతం అందుబాటులో ఉంచడమే మా అంతిమ లక్ష్యం. ప్రతి నిర్మాణాన్ని ఒక అద్భుతంగా తీర్చిదిద్దడమే మా స్వప్నం.' 
    : visionDescription

  const missionHeadingTranslated = lang === 'te' ? 'మా కర్తవ్యం (Mission)' : missionHeading
  const missionDescTranslated = lang === 'te' 
    ? 'శక్తివంతమైన మెటీరియల్స్, ఖచ్చితమైన ప్లానింగ్ మరియు అనుభవజ్ఞులైన ఇంజనీర్లతో ప్రతి ప్రాజెక్ట్‌ను నిర్ణీత గడువులోగా పూర్తి చేయడం.' 
    : missionDescription

  const founderQuoteTranslated = lang === 'te'
    ? 'మా కస్టమర్లకు నమ్మకమైన సేవలు అందించడమే మా విజయరహస్యం. మేము కేవలం ఇళ్లను నిర్మించము, మీ కుటుంబానికి భద్రత మరియు సంతోషాలను చేకూరుస్తాము.'
    : founder.quote

  const founderRoleTranslated = lang === 'te' ? 'వ్యవస్థాపకుడు & సీఈఓ' : founder.role
  const founderNameTranslated = lang === 'te' ? 'రామశ్రీ గారు' : founder.name

  // Translate milestone items
  const translateMilestoneTitle = (title: string) => {
    if (lang !== 'te') return title
    if (title.toLowerCase().includes('foundation')) return 'సంస్థ స్థాపన'
    if (title.toLowerCase().includes('luxury') || title.toLowerCase().includes('project')) return 'లగ్జరీ గృహ ప్రాజెక్ట్ పూర్తి'
    if (title.toLowerCase().includes('interior')) return 'ఇంటీరియర్ డిజైన్స్ విభాగం ప్రారంభం'
    return title
  }

  const translateMilestoneDesc = (desc: string, year: string) => {
    if (lang !== 'te') return desc
    if (year === '2015') return 'రమశ్రీ బిల్డర్స్ విశ్వసనీయ గృహ నిర్మాణాల సంస్థగా ప్రయాణాన్ని ప్రారంభించింది.'
    if (year === '2018') return 'పది లగ్జరీ నివాస గృహ సముదాయాలను విజయవంతంగా పూర్తి చేసి కస్టమర్ల చేతికి అప్పగించాము.'
    if (year === '2022') return 'నైపుణ్యం కలిగిన ఇంజనీర్లతో కిచెన్స్, వార్డ్‌రోబ్ డిజైన్స్ కోసం ప్రత్యేక విభాగాన్ని ఏర్పాటు చేసాము.'
    return desc
  }

  // Translate team roles
  const translateTeamRole = (role: string) => {
    if (lang !== 'te') return role
    if (role.toLowerCase().includes('developer')) return 'ప్రధాన డెవలపర్ & మేనేజర్'
    if (role.toLowerCase().includes('director') || role.toLowerCase().includes('sales')) return 'సేల్స్ డైరెక్టర్'
    if (role.toLowerCase().includes('ceo') || role.toLowerCase().includes('founder')) return 'వ్యవస్థాపకుడు'
    return role
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-24 bg-background text-foreground">
      {/* 1. Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <ScrollReveal direction="down">
          <span className="text-xxs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full">
            {lang === 'te' ? 'మా గురించి' : 'Who We Are'}
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mt-5">
            {lang === 'te' ? 'లగ్జరీ రియల్ ఎస్టేట్ రంగంలో విశ్వసనీయ సంస్థ' : 'Forging Luxury Real Estate Legacies'}
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="text-xs text-muted mt-4 font-light leading-relaxed max-w-2xl mx-auto">
            {lang === 'te'
              ? 'మేము మీ నివాసాన్ని అత్యున్నత ప్రమాణాలు మరియు అధునాతన నిర్మాణ విధానంతో నిర్మిస్తాము.'
              : 'We combine cutting-edge architectural philosophy with generational design standards to build premier spaces.'}
          </p>
        </ScrollReveal>
      </div>

      {/* 2. Story Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal direction="left">
          <div className="flex flex-col gap-6">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              {storyHeadingTranslated}
            </h2>
            <p className="text-xs text-muted/90 leading-relaxed font-light">
              {storyDescTranslated}
            </p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right" delay={0.2}>
          <div className="aspect-[4/3] rounded-2xl border border-border overflow-hidden bg-secondary shadow-md">
            {storyImgUrl ? (
              <img src={storyImgUrl} alt="Story Image" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted text-xs">No Image</div>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Vision & Mission Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ScrollReveal direction="up" delay={0.05}>
          <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
            <h3 className="font-serif text-lg font-bold text-primary">
              {visionHeadingTranslated}
            </h3>
            <p className="text-xs text-muted mt-3 leading-relaxed font-light">
              {visionDescTranslated}
            </p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={0.2}>
          <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
            <h3 className="font-serif text-lg font-bold text-primary">
              {missionHeadingTranslated}
            </h3>
            <p className="text-xs text-muted mt-3 leading-relaxed font-light">
              {missionDescTranslated}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. Founder Message */}
      {founder.quote && (
        <section className="bg-card border border-border rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-4xl mx-auto shadow-sm">
          <ScrollReveal className="md:col-span-2 flex flex-col gap-4" direction="left">
            <div>
              <span className="text-xxs uppercase tracking-wider text-primary font-semibold">
                {lang === 'te' ? 'వ్యవస్థాపకుని సందేశం' : 'CEO & Founder Message'}
              </span>
              <blockquote className="font-serif text-sm md:text-base italic text-foreground leading-relaxed mt-3">
                "{founderQuoteTranslated}"
              </blockquote>
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-foreground font-serif">{founderNameTranslated}</h4>
                <p className="text-xxs text-muted/70 mt-0.5">{founderRoleTranslated}</p>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal className="aspect-square rounded-full border-2 border-primary/20 overflow-hidden bg-secondary max-w-[200px] mx-auto md:max-w-none shadow-sm" direction="right" delay={0.2}>
            {founderImgUrl ? (
              <img src={founderImgUrl} alt={founder.name || 'Founder'} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted text-xs">Profile</div>
            )}
          </ScrollReveal>
        </section>
      )}

      {/* 5. Company Timeline */}
      {timeline.length > 0 && (
        <section className="flex flex-col gap-12">
          <ScrollReveal>
            <h2 className="font-serif text-2xl font-bold text-foreground text-center">
              {lang === 'te' ? 'కంపెనీ మైలురాళ్ళు' : 'Company Milestones'}
            </h2>
          </ScrollReveal>
          
          <div className="flex flex-col gap-8 max-w-3xl mx-auto w-full relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-border/60">
            {timeline.map((event, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15} className="flex gap-8 relative">
                <div>
                  <div className="absolute left-[11px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background" />
                  <div className="pl-8 flex flex-col gap-1">
                    <span className="font-serif text-base font-bold text-primary font-serif">
                      {event.year}
                    </span>
                    <h4 className="text-xs font-semibold text-foreground font-serif">
                      {translateMilestoneTitle(event.title)}
                    </h4>
                    <p className="text-xs text-muted/80 leading-relaxed font-light mt-1">
                      {translateMilestoneDesc(event.description, event.year)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* 6. Executive Team Listing */}
      {teamData.docs.length > 0 && (
        <section className="flex flex-col gap-12">
          <ScrollReveal>
            <h2 className="font-serif text-2xl font-bold text-foreground text-center">
              {lang === 'te' ? 'మా లీడర్‌షిప్ బృందం' : 'Our Elite Leadership'}
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamData.docs.map((member, idx) => {
              let mImgUrl = ''
              if (typeof member.avatar === 'object' && member.avatar && 'url' in member.avatar) {
                mImgUrl = member.avatar.url as string
              }
              return (
                <ScrollReveal key={member.id} delay={idx * 0.1}>
                  <div className="group flex flex-col border border-border bg-card p-6 rounded-2xl hover:border-primary/25 shadow-sm hover:shadow-md transition-all">
                    <div className="aspect-[4/5] rounded-xl overflow-hidden bg-secondary mb-4 relative">
                      {mImgUrl ? (
                        <img src={mImgUrl} alt={member.name || 'Team Member'} className="h-full w-full object-cover transition-transform group-hover:scale-103" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted text-xs">No Avatar</div>
                      )}
                    </div>
                    <h4 className="font-serif text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {lang === 'te' && member.name.includes('Arthur') ? 'రామారావు' : member.name}
                    </h4>
                    <p className="text-xxs text-primary font-medium mt-0.5 font-sans">
                      {translateTeamRole(member.role)}
                    </p>
                    {member.bio && (
                      <p className="text-xxs text-muted/80 leading-normal mt-3 font-light">
                        {lang === 'te' && member.bio.includes('decade') ? 'గృహ నిర్మాణ రంగంలో సుదీర్ఘ అనుభవం మరియు అంకితభావం కలిగిన వారు.' : member.bio}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
