import { getPayload } from 'payload'
import config from '@payload-config'
import InquiryForm from '@/components/custom/InquiryForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import ScrollReveal from '@/components/custom/ScrollReveal'
import { translations } from '@/lib/translations'

export const revalidate = 60

type Props = {
  searchParams?: Promise<{
    lang?: string
  }>
}

export default async function ContactPage(props: Props) {
  const resolvedSearchParams = props?.searchParams ? await props.searchParams : {}
  const lang = resolvedSearchParams?.lang === 'en' ? 'en' : 'te'
  const t = translations[lang]

  const payload = await getPayload({ config })
  
  // Fetch SiteSettings to display configured details
  const settingsData = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Dynamic localization of seeded parameters
  const address = lang === 'te' 
    ? 'రమశ్రీ బిల్డర్స్ ప్రధాన కార్యాలయం, హైదరాబాద్, ఇండియా' 
    : (settingsData.address || 'Ramasri Builders Headquarters, Hyderabad, India')
  
  const workingHours = lang === 'te'
    ? 'సోమ - శని: ఉదయం 9:00 - సాయంత్రం 6:30'
    : (settingsData.workingHours || 'Mon - Sat: 9:00 AM - 6:30 PM')

  const email = settingsData.email || 'info@ramasribuilders.com'
  const phone = settingsData.phone || '+91 (555) 123-4567'

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-16 bg-background text-foreground font-sans">
      
      {/* 1. Header */}
      <div className="text-center max-w-2xl mx-auto">
        <ScrollReveal direction="down">
          <span className="text-xxs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full">
            {t.contact.tag}
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <h1 className="font-serif text-3xl font-bold text-slate-900 mt-5">
            {t.contact.title}
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="text-xs text-muted mt-3 font-light leading-relaxed">
            {t.contact.subtitle}
          </p>
        </ScrollReveal>
      </div>

      {/* 2. Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Contact Cards */}
        <div className="flex flex-col gap-6">
          <ScrollReveal direction="left">
            <h2 className="font-serif text-xl font-bold text-foreground mb-2">
              {t.contact.officeTitle}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Address */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="bg-card border border-border p-6 rounded-2xl flex items-start gap-4 shadow-sm">
                <div className="h-9 w-9 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs font-semibold text-foreground font-serif">{t.contact.headquarters}</h4>
                  <p className="text-xxs text-muted/80 leading-relaxed font-light">{address}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Hours */}
            <ScrollReveal direction="left" delay={0.15}>
              <div className="bg-card border border-border p-6 rounded-2xl flex items-start gap-4 shadow-sm">
                <div className="h-9 w-9 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs font-semibold text-foreground font-serif">{t.contact.hours}</h4>
                  <p className="text-xxs text-muted/80 leading-relaxed font-light">{workingHours}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Phone */}
            <ScrollReveal direction="left" delay={0.2}>
              <div className="bg-card border border-border p-6 rounded-2xl flex items-start gap-4 shadow-sm">
                <div className="h-9 w-9 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs font-semibold text-foreground font-serif">{t.contact.directLine}</h4>
                  <p className="text-xxs text-muted/80 leading-relaxed font-light">
                    <a href={`tel:${phone}`} className="hover:text-primary transition-colors">{phone}</a>
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Email */}
            <ScrollReveal direction="left" delay={0.25}>
              <div className="bg-card border border-border p-6 rounded-2xl flex items-start gap-4 shadow-sm">
                <div className="h-9 w-9 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xs font-semibold text-foreground font-serif">{t.contact.generalInquiry}</h4>
                  <p className="text-xxs text-muted/80 leading-relaxed font-light">
                    <a href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</a>
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Confidentiality Guarantee */}
          <ScrollReveal direction="left" delay={0.3}>
            <div className="mt-4 bg-secondary/35 border border-border/80 p-6 rounded-2xl shadow-sm">
              <h4 className="text-xs font-semibold text-foreground font-serif">{t.contact.guaranteeTitle}</h4>
              <p className="text-xxs text-muted/80 leading-relaxed font-light mt-1.5">
                {t.contact.guaranteeDesc}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side: Interactive Forms */}
        <ScrollReveal direction="right" delay={0.2}>
          <div className="flex flex-col gap-6 bg-card border border-border p-6 rounded-2xl shadow-sm">
            <InquiryForm inquiryType="general" />
          </div>
        </ScrollReveal>

      </div>
    </div>
  )
}
