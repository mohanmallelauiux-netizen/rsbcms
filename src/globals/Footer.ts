import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Navigation & Settings',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'copyright',
      type: 'text',
      required: true,
      defaultValue: '© 2026 Luxury Estates. All rights reserved.',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Channels',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'X (Twitter)', value: 'x' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Links Columns',
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    // {
    //   name: 'newsletter',
    //   type: 'group',
    //   label: 'Newsletter Section',
    //   fields: [
    //     { name: 'heading', type: 'text', defaultValue: 'Stay Updated' },
    //     { name: 'description', type: 'textarea', defaultValue: 'Subscribe to receive the latest updates, launches, and property details.' },
    //   ],
    // },
  ],
}
