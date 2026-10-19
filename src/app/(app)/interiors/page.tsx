import React from 'react'
import ScrollReveal from '@/components/custom/ScrollReveal'
import InquiryForm from '@/components/custom/InquiryForm'
import { Sparkles, CheckCircle2 } from 'lucide-react'
import { translations } from '@/lib/translations'

export const revalidate = 60

export default async function InteriorsPage(props: {
  searchParams?: Promise<{ lang?: string }>
}) {
  const resolvedSearchParams = props?.searchParams ? await props.searchParams : {}
  const rawLang = resolvedSearchParams?.lang
  const lang = rawLang === 'en' ? 'en' : 'te'
  const t = translations[lang]

  const services = [
    {
      title: t.interiors.kitchenTitle,
      description: t.interiors.kitchenDesc,
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      bullets: lang === 'te'
        ? ['సాఫ్ట్-క్లోజ్ హైడ్రాలిక్ హింజెస్', 'ప్రత్యేక చిమ్నీ ప్లానింగ్', 'కస్టమ్ పుల్-అవుట్ వైర్ బాస్కెట్లు', 'ఇంటిగ్రేటెడ్ ప్రొఫైల్ హ్యాండిల్స్']
        : ['Soft-close hydraulic hinges', 'Dedicated chimney and duct planning', 'Custom pull-out wire baskets', 'Integrated profile handles'],
    },
    {
      title: t.interiors.closetsTitle,
      description: t.interiors.closetsDesc,
      image: 'https://images.unsplash.com/photo-1558882224-cca166733360?auto=format&fit=crop&w=800&q=80',
      bullets: lang === 'te'
        ? ['గ్లాస్ స్లైడింగ్ డోర్లు', 'కస్టమ్ వాలెట్ రాడ్స్ & టై రైల్స్', 'వెల్వెట్ డ్రాయర్ ఆర్గనైజర్స్', 'ఆటోమేటిక్ సెన్సార్ బ్యాక్‌లైటింగ్']
        : ['Toughened colored glass shutters', 'Integrated valet rods & tie rails', 'Velvet lined drawer dividers', 'Soft sensor backlighting'],
    },
    {
      title: t.interiors.ceilingTitle,
      description: t.interiors.ceilingDesc,
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      bullets: lang === 'te'
        ? ['జిప్సం మరియు చెక్క ప్యానెల్ సీలింగ్స్', 'అయస్కాంత ట్రాక్ లైట్లు', 'పరిధీయ Cove లైటింగ్ నమూనాలు', 'ధ్వని నిరోధక ప్లాస్టరింగ్']
        : ['Gypsum and wooden panel combinations', 'Concealed magnetic track lights', 'Peripheral ambient cove lighting', 'Acoustic thermal plastering'],
    },
    {
      title: t.interiors.smartHomeTitle,
      description: t.interiors.smartHomeDesc,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      bullets: lang === 'te'
        ? ['స్మార్ట్ వై-ఫై స్విచ్ బోర్డులు', 'వాయిస్ అసిస్టెంట్ అనుసంధానం', 'ఆటోమేటిక్ రోలర్ బ్లైండ్స్', 'కేంద్ర సెక్యూరిటీ ప్యానెల్']
        : ['Smart dimming switch panels', 'Voice assistant integrations', 'Dynamic automated roller blinds', 'Central security consoles'],
    },
  ]

  const processSteps = [
    {
      step: '01',
      title: lang === 'te' ? 'సంప్రదింపులు & ప్రాథమిక డిజైన్' : 'Consultation & Concept Design',
      description: lang === 'te'
        ? 'మేము స్థల పరిమాణం, డిజైన్ శైలి మరియు బడ్జెట్ ప్రాధాన్యతలను చర్చిస్తాము.'
        : 'We align on details, room sizes, design style, and budget preferences while formulating initial layout plans.',
    },
    {
      step: '02',
      title: lang === 'te' ? '3D డిజైన్ & మెటీరియల్స్ ఎంపిక' : '3D Render & Materials Draft',
      description: lang === 'te'
        ? 'మేము 3D ఇంటీరియర్ డిజైన్స్ తయారు చేసి వాడే మెటీరియల్స్ (లామినేట్స్, కౌంటర్‌టాప్‌లు) ఖరారు చేస్తాము.'
        : 'We generate highly accurate 3D interior renders and choose materials (veneers, laminates, fittings, countertops).',
    },
    {
      step: '03',
      title: lang === 'te' ? 'ఫ్యాక్టరీ తయారీ' : 'Modular Fabrication',
      description: lang === 'te'
        ? 'క్యాబినెట్లు, వార్డ్‌రోబ్ షట్టర్లు అన్నీ మా సొంత ఫ్యాక్టరీలో నాణ్యమైన యంత్రాలతో తయారుచేయబడతాయి.'
        : 'Cabinets, shutters, and closet boards are precision fabricated in our manufacturing facility to guarantee premium fit.',
    },
    {
      step: '04',
      title: lang === 'te' ? 'సైట్ ఫిట్టింగ్ & అప్పగింత' : 'Execution & Quality Handover',
      description: lang === 'te'
        ? 'మా డిజైన్ ఇంజనీర్లు ఇంట్లో ఇంటీరియర్స్ బిగించి నాణ్యతను పరీక్షించి మీకు అప్పగిస్తారు.'
        : 'Design engineers execute clean on-site installations, final polish checks, and transfer the spaces with a structural warranty.',
    },
  ]

  return (
    <div className="flex flex-col w-full pb-20 overflow-hidden bg-background text-foreground font-sans">
      
      {/* 1. Hero Block */}
      <section className="relative h-[55vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Interiors Hero"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center flex flex-col items-center gap-4">
          <ScrollReveal direction="down">
            <span className="text-xxs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 animate-pulse">
              {t.interiors.tag}
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.15}>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 max-w-4xl">
              {t.interiors.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-xs sm:text-sm text-slate-800 max-w-2xl font-light">
              {t.interiors.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Philosophy Block */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal direction="left">
          <div className="flex flex-col gap-6">
            <span className="text-xxs font-semibold uppercase tracking-widest text-primary">{t.interiors.philosophyTag}</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              {t.interiors.philosophyTitle}
            </h2>
            <p className="text-xs text-muted/90 leading-relaxed font-light">
              {t.interiors.philosophyP1}
            </p>
            <p className="text-xs text-muted/90 leading-relaxed font-light">
              {t.interiors.philosophyP2}
            </p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="right" delay={0.2}>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-secondary relative shadow-md">
            <img
              src="https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=1000&q=80"
              alt="Design philosophy mockup"
              className="h-full w-full object-cover"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Services Grid */}
      <section className="py-24 border-t border-border bg-secondary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-xxs font-semibold uppercase tracking-widest text-primary flex items-center justify-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                {t.interiors.capabilities}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-2">
                {t.interiors.expertise}
              </h2>
              <p className="text-xs text-muted mt-2 font-light">
                {t.interiors.expertiseSub}
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-16">
            {services.map((service, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div key={idx} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Image */}
                  <ScrollReveal direction={isEven ? 'left' : 'right'} className={isEven ? 'order-1' : 'order-1 lg:order-2'}>
                    <div className="aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-card relative shadow-sm">
                      <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
                    </div>
                  </ScrollReveal>

                  {/* Details */}
                  <ScrollReveal direction={isEven ? 'right' : 'left'} className={isEven ? 'order-2' : 'order-2 lg:order-1'} delay={0.15}>
                    <div className="flex flex-col gap-6">
                      <h3 className="font-serif text-xl font-bold text-foreground">
                        {service.title}
                      </h3>
                      <p className="text-xs text-muted/90 leading-relaxed font-light">
                        {service.description}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        {service.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-xs text-muted flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. Process Timeline */}
      <section className="py-24 border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-xxs font-semibold uppercase tracking-widest text-primary">{t.interiors.workflow}</span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-2">
                {t.interiors.workflowTitle}
              </h2>
              <p className="text-xs text-muted mt-2 font-light">
                {t.interiors.workflowSub}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative before:hidden md:before:block before:absolute before:left-0 before:right-0 before:top-8 before:h-[1px] before:bg-border/60">
            {processSteps.map((step, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15}>
                <div className="flex flex-col gap-4 bg-secondary/35 border border-border p-6 rounded-2xl relative shadow-sm">
                  <span className="font-serif text-3xl font-bold text-primary/30 font-serif">
                    {step.step}
                  </span>
                  <h4 className="font-serif text-xs font-bold text-foreground">
                    {step.title}
                  </h4>
                  <p className="text-xxs text-muted/80 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Inquiry & Forms Grid */}
      <section className="py-24 border-t border-border bg-secondary/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <ScrollReveal direction="left">
            <div className="flex flex-col gap-6">
              <span className="text-xxs font-semibold uppercase tracking-widest text-primary">{t.interiors.consultationTag}</span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                {t.interiors.consultationTitle}
              </h2>
              <p className="text-xs text-muted/90 leading-relaxed font-light">
                {t.interiors.consultationSub}
              </p>
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">✓</div>
                  <span className="text-xxs text-muted font-medium">{t.interiors.consultationBul1}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">✓</div>
                  <span className="text-xxs text-muted font-medium">{t.interiors.consultationBul2}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">✓</div>
                  <span className="text-xxs text-muted font-medium">{t.interiors.consultationBul3}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
              <InquiryForm inquiryType="interiors" />
            </div>
          </ScrollReveal>

        </div>
      </section>

    </div>
  )
}
