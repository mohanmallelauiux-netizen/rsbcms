import { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  admin: {
    group: 'Pages content',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'storyHeading',
      type: 'text',
      required: true,
      defaultValue: 'Our Story',
    },
    {
      name: 'storyDescription',
      type: 'textarea',
      required: true,
      defaultValue: 'We build legacy spaces designed for modern luxury, combining fine materials and structural perfection.',
    },
    {
      name: 'storyImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'visionHeading',
          type: 'text',
          defaultValue: 'Our Vision',
          admin: { width: '50%' },
        },
        {
          name: 'missionHeading',
          type: 'text',
          defaultValue: 'Our Mission',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'visionDescription',
          type: 'textarea',
          defaultValue: 'To shape the skyline of luxury by introducing premium materials and modern architecture.',
          admin: { width: '50%' },
        },
        {
          name: 'missionDescription',
          type: 'textarea',
          defaultValue: 'To exceed buyer expectations through build quality, schedule commitment, and transparency.',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'founderMessage',
      type: 'group',
      label: 'Founder Message',
      fields: [
        { name: 'name', type: 'text', defaultValue: 'Arthur Pendelton' },
        { name: 'role', type: 'text', defaultValue: 'Founder & CEO' },
        { name: 'quote', type: 'textarea', defaultValue: 'Building is not just about concrete; it is about creating spaces where legacies live.' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'timeline',
      type: 'array',
      label: 'Timeline Events',
      fields: [
        { name: 'year', type: 'text', required: true, label: 'e.g. 2018' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}
