'use client'

import { motion } from 'framer-motion'
import React from 'react'

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}) {
  const getVariants = () => {
    if (direction === 'none') {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, delay } },
      }
    }
    const offset = 30
    const x = direction === 'left' ? offset : direction === 'right' ? -offset : 0
    const y = direction === 'up' ? offset : direction === 'down' ? -offset : 0
    return {
      hidden: { opacity: 0, x, y },
      visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const, delay } },
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  )
}
