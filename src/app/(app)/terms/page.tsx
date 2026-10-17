import React from 'react'

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 flex flex-col gap-8 font-sans">
      <h1 className="font-serif text-3xl font-bold text-foreground">Terms & Conditions</h1>
      <p className="text-xxs text-muted">Last updated: August 1, 2026</p>
      
      <div className="flex flex-col gap-6 text-xs text-muted/90 leading-relaxed font-light">
        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-base font-bold text-foreground mt-4">1. Agreement to Terms</h2>
          <p>
            By accessing this website, you agree to comply with and be bound by these terms. If you do not agree with any of these terms, you are prohibited from utilizing or accessing this interface.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-base font-bold text-foreground mt-4">2. Property Listing Information</h2>
          <p>
            Property pricing, layouts, specifications, parameters, and availability indices displayed on this website are dynamically loaded from our CMS database. While we aim for perfect accuracy, listings do not constitute binding financial contracts and are subject to confirmation with designated portfolio representatives.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-base font-bold text-foreground mt-4">3. Lead Submissions</h2>
          <p>
            When submitting callback requests or inquiries, you agree to provide accurate, non-falsified contact credentials. Falsified phone numbers or spam submissions will be deleted from the database.
          </p>
        </section>
      </div>
    </div>
  )
}
