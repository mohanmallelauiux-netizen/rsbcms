import { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  admin: {
    group: 'Pages content',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Banner Section',
      fields: [
        { name: 'title', type: 'text', required: true, defaultValue: 'Elevate Your Living Standard' },
        { name: 'subtitle', type: 'text', required: true, defaultValue: 'Explore premium residential developments in elite locations.' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
        { name: 'ctaText', type: 'text', defaultValue: 'Explore Projects' },
        { name: 'ctaUrl', type: 'text', defaultValue: '/projects' },
      ],
    },
    {
      name: 'whyChooseUs',
      type: 'group',
      label: 'Why Choose Us Section',
      fields: [
        { name: 'heading', type: 'text', required: true, defaultValue: 'Why Choose Us' },
        { name: 'subheading', type: 'textarea', defaultValue: 'Crafting luxury living spaces with attention to architectural details.' },
        {
          name: 'points',
          type: 'array',
          label: 'USPs',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            {
              name: 'icon',
              type: 'select',
              defaultValue: 'home',
              options: [
                { label: 'Home/Building', value: 'home' },
                { label: 'Shield/Security', value: 'shield' },
                { label: 'Award/Ribbon', value: 'award' },
                { label: 'Dollar/Value', value: 'dollar' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'statistics',
      type: 'array',
      label: 'Company Statistics',
      fields: [
        { name: 'value', type: 'text', required: true, label: 'e.g. 500+ or 15+' },
        { name: 'label', type: 'text', required: true, label: 'e.g. Happy Families' },
      ],
    },
    {
      name: 'faqSection',
      type: 'group',
      label: 'FAQ Section',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Frequently Asked Questions' },
        { name: 'subheading', type: 'textarea', defaultValue: 'Everything you need to know about properties and buying procedures.' },
        {
          name: 'faqs',
          type: 'relationship',
          relationTo: 'faqs',
          hasMany: true,
          label: 'Selected FAQs',
        },
      ],
    },
  ],
}
