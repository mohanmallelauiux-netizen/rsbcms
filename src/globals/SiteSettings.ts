import { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Navigation & Settings',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Luxury Estates',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'brandColor',
      type: 'text',
      defaultValue: '#0F9F5B',
      admin: {
        description: 'Primary luxury brand color (hex value, e.g., #0F9F5B)',
      },
    },
    {
      type: 'collapsible',
      label: 'Contact Info',
      fields: [
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+1 (555) 123-4567',
        },
        {
          name: 'whatsappNumber',
          type: 'text',
          defaultValue: '15551234567',
          admin: {
            description: 'WhatsApp number in international format (numbers only, e.g., 15551234567)',
          },
        },
        {
          name: 'email',
          type: 'email',
          defaultValue: 'info@luxuryestates.com',
        },
        {
          name: 'address',
          type: 'textarea',
          defaultValue: '123 Luxury Way, Beverly Hills, CA 90210',
        },
        {
          name: 'workingHours',
          type: 'text',
          defaultValue: 'Mon - Sat: 9:00 AM - 6:00 PM',
        },
      ],
    },
    {
      name: 'defaultSeo',
      type: 'group',
      label: 'Default SEO Fallbacks',
      fields: [
        { name: 'metaTitle', type: 'text', defaultValue: 'Premium Properties & Luxury Homes' },
        { name: 'metaDescription', type: 'textarea', defaultValue: 'Discover elite properties and projects in premium locations.' },
        { name: 'keywords', type: 'text', defaultValue: 'real estate, luxury villas, apartments, properties' },
      ],
    },
  ],
}
