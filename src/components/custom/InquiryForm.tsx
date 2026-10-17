'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { submitInquiry } from '@/app/actions'
import { MessageSquare, PhoneCall, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { translations } from '@/lib/translations'

type Props = {
  inquiryType: 'general' | 'callback' | 'project-inquiry' | 'interiors'
  projectId?: string
  projectName?: string
}

function InquiryFormInner({ inquiryType, projectId, projectName }: Props) {
  const searchParams = useSearchParams()
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'te'
  const t = translations[lang]

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: false,
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const pageUrl = typeof window !== 'undefined' ? window.location.href : ''
      const res = await submitInquiry({
        ...formData,
        inquiryType,
        projectId,
        pageUrl,
      })

      if (res.success) {
        setSuccess(true)
        setFormData({ name: '', email: '', phone: '', whatsapp: false, message: '' })
      } else {
        setError(res.error || 'Failed to submit.')
      }
    } catch (err: any) {
      setError('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-secondary/35 border border-primary/20 rounded-xl max-w-md mx-auto">
        <CheckCircle2 className="h-12 w-12 text-primary animate-bounce mb-4" />
        <h4 className="font-serif text-lg font-semibold text-foreground">{t.forms.submittedTitle}</h4>
        <p className="text-xs text-muted/90 mt-2 max-w-xs">
          {t.forms.submittedDesc}
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-xs text-primary underline underline-offset-4 hover:opacity-85"
        >
          {t.forms.submitAnother}
        </button>
      </div>
    )
  }

  // Get labels based on type
  const isCallback = inquiryType === 'callback'
  const isProj = inquiryType === 'project-inquiry'
  const isInteriors = inquiryType === 'interiors'

  return (
    <div className="bg-card border border-border p-6 rounded-2xl w-full max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {isCallback ? <PhoneCall className="h-4.5 w-4.5" /> : <MessageSquare className="h-4.5 w-4.5" />}
        </div>
        <div>
          <h3 className="font-serif font-semibold text-base text-foreground">
            {isCallback ? t.forms.callbackTitle : isProj ? t.forms.projectTitle : isInteriors ? t.forms.interiorsTitle : t.forms.generalTitle}
          </h3>
          {projectName && (
            <p className="text-xxs text-primary mt-0.5">
              Regarding: {projectName}
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-950/20 border border-red-900/50 p-3 mb-4 text-xs text-red-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Hidden field for Page URL */}
        <input
          type="hidden"
          name="pageUrl"
          value={typeof window !== 'undefined' ? window.location.href : ''}
        />

        {/* Name */}
        <div>
          <label className="block text-xxs font-medium text-muted mb-1.5 uppercase tracking-wide">
            {t.forms.name}
          </label>
          <input
            type="text"
            required
            disabled={loading}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            className="w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted/40 focus:border-primary focus:outline-none"
          />
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xxs font-medium text-muted mb-1.5 uppercase tracking-wide">
              {t.forms.email}
            </label>
            <input
              type="email"
              required
              disabled={loading}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@domain.com"
              className="w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted/40 focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xxs font-medium text-muted mb-1.5 uppercase tracking-wide">
              {t.forms.phone}
            </label>
            <input
              type="tel"
              required
              disabled={loading}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted/40 focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* WhatsApp checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer mt-1 py-1">
          <input
            type="checkbox"
            disabled={loading}
            checked={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.checked })}
            className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary focus:ring-offset-background"
          />
          <span className="text-xxs font-medium text-muted/90 select-none">
            {t.forms.whatsapp}
          </span>
        </label>

        {/* Message */}
        {!isCallback && (
          <div>
            <label className="block text-xxs font-medium text-muted mb-1.5 uppercase tracking-wide">
              {t.forms.message}
            </label>
            <textarea
              rows={4}
              disabled={loading}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={t.forms.messagePlaceholder}
              className="w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted/40 focus:border-primary focus:outline-none resize-none"
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-full bg-primary hover:bg-primary/95 text-background font-semibold py-3 text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
        >
          <span>{loading ? t.forms.submitting : isCallback ? t.forms.requestCallback : t.forms.send}</span>
          {!loading && <Send className="h-3 w-3" />}
        </button>
      </form>
    </div>
  )
}

import { Suspense } from 'react'

export default function InquiryForm(props: Props) {
  return (
    <Suspense fallback={<div className="h-[350px] w-full bg-secondary/35 animate-pulse rounded-2xl border border-border" />}>
      <InquiryFormInner {...props} />
    </Suspense>
  )
}
