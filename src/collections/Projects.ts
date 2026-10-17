import { CollectionConfig } from 'payload'

const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'projectType', 'status', 'startingPrice'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && data.name && !data.slug) {
          data.slug = formatSlug(data.name)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from name if left blank',
      },
    },
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'detailedDescription',
      type: 'richText',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'projectType',
          type: 'select',
          required: true,
          defaultValue: 'apartment',
          options: [
            { label: 'Apartment', value: 'apartment' },
            { label: 'Villa', value: 'villa' },
            { label: 'Penthouse', value: 'penthouse' },
            { label: 'Plot', value: 'plot' },
            { label: 'Commercial', value: 'commercial' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'under-construction',
          options: [
            { label: 'Upcoming', value: 'upcoming' },
            { label: 'Under Construction', value: 'under-construction' },
            { label: 'Ready to Move', value: 'ready-to-move' },
            { label: 'Sold Out', value: 'sold-out' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'number',
          label: 'Exact Price (Optional)',
          admin: { width: '50%' },
        },
        {
          name: 'startingPrice',
          type: 'number',
          label: 'Starting Price (e.g. 15000000)',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'propertySize',
          type: 'number',
          label: 'Size in Sq. Ft.',
          required: true,
          admin: { width: '25%' },
        },
        {
          name: 'bedrooms',
          type: 'number',
          label: 'Bedrooms',
          admin: { width: '25%' },
        },
        {
          name: 'bathrooms',
          type: 'number',
          label: 'Bathrooms',
          admin: { width: '25%' },
        },
        {
          name: 'parking',
          type: 'number',
          label: 'Parking Spaces',
          admin: { width: '25%' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Location Details',
      fields: [
        {
          name: 'location',
          type: 'text',
          label: 'Location Address Text',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'latitude',
              type: 'number',
              label: 'Latitude (for Map)',
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'longitude',
              type: 'number',
              label: 'Longitude (for Map)',
              required: true,
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'googleMapsUrl',
          type: 'text',
          label: 'External Google Maps link',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Amenities & Highlights',
      fields: [
        {
          name: 'amenities',
          type: 'array',
          label: 'Amenities List',
          fields: [{ name: 'name', type: 'text', required: true }],
        },
        {
          name: 'highlights',
          type: 'array',
          label: 'Project Highlights',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Specifications & Floor Plans',
      fields: [
        {
          name: 'specifications',
          type: 'array',
          label: 'Specifications',
          fields: [
            { name: 'category', type: 'text', required: true, label: 'e.g. Flooring, Electrical' },
            { name: 'details', type: 'textarea', required: true },
          ],
        },
        {
          name: 'floorPlans',
          type: 'array',
          label: 'Floor Plans (Images)',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Downloads & Virtual Tours',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'brochurePdf',
              type: 'upload',
              relationTo: 'media',
              label: 'Brochure PDF',
              admin: { width: '50%' },
            },
            {
              name: 'masterPlan',
              type: 'upload',
              relationTo: 'media',
              label: 'Master Plan Image',
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'videoUrl',
              type: 'text',
              label: 'YouTube or Video Direct URL',
              admin: { width: '50%' },
            },
            {
              name: 'virtualTourUrl',
              type: 'text',
              label: '3D/VR Virtual Tour Link',
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Project Gallery Images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      label: 'Project FAQ',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    {
      name: 'relatedProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: 'Related Projects',
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Fields',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'keywords', type: 'text' },
      ],
    },
  ],
}
