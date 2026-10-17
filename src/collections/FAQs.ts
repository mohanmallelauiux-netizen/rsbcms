import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  defaultSort: 'createdAt', // ascending — oldest (first-created) shows first
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Buying', value: 'buying' },
        { label: 'Selling', value: 'selling' },
        { label: 'Legal & Taxes', value: 'legal' },
      ],
    },
  ],
}