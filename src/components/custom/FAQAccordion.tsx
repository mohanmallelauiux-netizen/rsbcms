'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { Faq } from '@/payload-types'
import ScrollReveal from './ScrollReveal'


interface FAQAccordionProps {
  faqs: Faq[]
  t: {
    tag: string
    title: string
    subtitle: string
    categories: {
      all: string
      general: string
      buying: string
      selling: string
      legal: string
    }
  }
}

export default function FAQAccordion({ faqs, t }: FAQAccordionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [openId, setOpenId] = useState<number | null>(null)

  // Map category values to translation keys
  const categoryMap: Record<string, string> = {
    all: t.categories.all,
    general: t.categories.general,
    buying: t.categories.buying,
    selling: t.categories.selling,
    legal: t.categories.legal,
  }

  // Filter FAQs based on selected category
  const filteredFaqs = useMemo(() => {
    if (activeCategory === 'all') {
      return faqs
    }
    return faqs.filter((faq) => faq.category === activeCategory)
  }, [faqs, activeCategory])

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  // List of unique categories that have at least one FAQ, plus 'all'
  const categoriesList = useMemo(() => {
    const presentCategories = new Set(faqs.map((faq) => faq.category))
    return ['all', ...Array.from(presentCategories)].filter(cat => categoryMap[cat] !== undefined)
  }, [faqs])

  return (
    <section className="py-24 border-t border-border bg-card">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xxs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
              {t.tag}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-4">
              {t.title}
            </h2>
            <p className="text-xs text-muted mt-3">
              {t.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Categories Tabs */}
        {categoriesList.length > 1 && (
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
              {categoriesList.map((cat) => {
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat)
                      setOpenId(null) // Reset open FAQ on category change
                    }}
                    className={`px-5 py-2 text-xxs font-semibold uppercase tracking-wider rounded-full border transition-all duration-300 cursor-pointer ${isActive
                      ? 'bg-primary text-background border-primary shadow-sm shadow-primary/20 scale-[1.02]'
                      : 'bg-secondary/40 border-border text-muted hover:text-foreground hover:bg-secondary/80'
                      }`}
                  >
                    {categoryMap[cat]}
                  </button>
                )
              })}
            </div>
          </ScrollReveal>
        )}

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openId === faq.id
              return (
                <ScrollReveal key={faq.id} delay={idx * 0.05}>
                  <div
                    className={`border transition-all duration-300 rounded-2xl overflow-hidden bg-card/60 backdrop-blur-sm ${isOpen
                      ? 'border-primary/40 shadow-sm shadow-primary/5'
                      : 'border-border hover:border-primary/20 hover:bg-card'
                      }`}
                  >
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full text-left p-5 sm:p-6 font-serif font-bold text-sm sm:text-base text-foreground flex items-center justify-between gap-4 cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <span className="flex items-start gap-3">
                        <HelpCircle className={`h-5 w-5 mt-0.5 shrink-0 transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-muted/60 group-hover:text-primary/70'
                          }`} />
                        <span>{faq.question}</span>
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform duration-300 text-muted/80 ${isOpen ? 'rotate-180 text-primary' : 'group-hover:text-foreground'
                          }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-muted/80 leading-relaxed font-light border-t border-border/40 whitespace-pre-line ml-8">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              )
            })
          ) : (
            <ScrollReveal>
              <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-secondary/10">
                <p className="text-xs text-muted">No questions found in this category.</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  )
}
