import { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: {
    group: 'Navigation & Settings',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      label: 'Main Navigation Menu Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'linkType',
          type: 'select',
          required: true,
          defaultValue: 'internal',
          options: [
            { label: 'Internal Route', value: 'internal' },
            { label: 'External URL', value: 'external' },
          ],
        },
        {
          name: 'pageUrl',
          type: 'text',
          required: true,
          label: 'URL or Route Path (e.g. /projects or /about)',
        },
        {
          name: 'subMenu',
          type: 'array',
          label: 'Sub Menu Dropdown Items',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'pageUrl',
              type: 'text',
              required: true,
              label: 'Dropdown URL Path (e.g. /projects/luxury-villas)',
            },
          ],
        },
      ],
    },
  ],
}
