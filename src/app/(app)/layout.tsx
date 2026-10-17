import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScrollProvider from '@/components/custom/SmoothScrollProvider'
import WhatsAppFloat from '@/components/custom/WhatsAppFloat'
import React from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </SmoothScrollProvider>
  )
}
