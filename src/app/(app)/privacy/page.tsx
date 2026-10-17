import React from 'react'

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 flex flex-col gap-8 font-sans">
      <h1 className="font-serif text-3xl font-bold text-foreground">Privacy Policy</h1>
      <p className="text-xxs text-muted">Last updated: August 1, 2026</p>
      
      <div className="flex flex-col gap-6 text-xs text-muted/90 leading-relaxed font-light">
        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-base font-bold text-foreground mt-4">1. Information We Collect</h2>
          <p>
            We collect information that you submit directly via our Inquiry, Callback, and Project forms. This includes your name, email address, phone number, WhatsApp preferences, and custom message details.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-base font-bold text-foreground mt-4">2. How We Use Your Information</h2>
          <p>
            Your information is stored inside our secure Payload CMS database. We use this data strictly to:
          </p>
          <ul className="list-disc ml-6 flex flex-col gap-1.5">
            <li>Process your property purchase inquiries.</li>
            <li>Connect you with designated real estate agents.</li>
            <li>Send email confirmations regarding form submissions.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-serif text-base font-bold text-foreground mt-4">3. Data Security & Storage</h2>
          <p>
            We deploy secure database infrastructure and connection channels to safeguard lead submissions. Only authorized administration representatives have credentials to view collected leads inside our database interface.
          </p>
        </section>
      </div>
    </div>
  )
}
