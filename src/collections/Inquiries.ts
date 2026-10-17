import { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'inquiryType', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true, // Anyone can submit inquiries
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'whatsapp',
      type: 'checkbox',
      label: 'Is this number available on WhatsApp?',
      defaultValue: false,
    },
    {
      name: 'inquiryType',
      type: 'select',
      required: true,
      defaultValue: 'general',
      options: [
        { label: 'General Inquiry', value: 'general' },
        { label: 'Callback Request', value: 'callback' },
        { label: 'Project Inquiry', value: 'project-inquiry' },
        { label: 'Interior Design Inquiry', value: 'interiors' },
      ],
    },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      label: 'Related Project (if applicable)',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'pageUrl',
      type: 'text',
      label: 'Submission Page URL',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Spam', value: 'spam' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create') {
          const resendKey = process.env.RESEND_API_KEY
          if (!resendKey || resendKey.startsWith('re_dummy')) {
            console.log('Skipping email notification: Resend API key is not configured.')
            return
          }

          try {
            console.log(`Sending Resend notification for inquiry from ${doc.email}...`)
            const body = {
              from: 'Real Estate Leads <onboarding@resend.dev>', // Resend sandbox fallback
              to: 'ramasribuilders@gmail.com',
              subject: `New Lead Inquiry: ${doc.name} (${doc.inquiryType})`,
              html: `
                <h3>New Lead Submission</h3>
                <p>A new lead has submitted an inquiry on the Ramasri Builders & Interiors portal:</p>
                <ul>
                  <li><strong>Name:</strong> ${doc.name}</li>
                  <li><strong>Email:</strong> ${doc.email}</li>
                  <li><strong>Phone:</strong> ${doc.phone} ${doc.whatsapp ? '(WhatsApp active)' : ''}</li>
                  <li><strong>Inquiry Type:</strong> ${doc.inquiryType}</li>
                  ${doc.pageUrl ? `<li><strong>Page URL:</strong> <a href="${doc.pageUrl}">${doc.pageUrl}</a></li>` : ''}
                  ${doc.message ? `<li><strong>Message:</strong> ${doc.message}</li>` : ''}
                </ul>
                <p>Please follow up with the lead shortly.</p>
              `,
            }

            const response = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${resendKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
            })

            if (!response.ok) {
              const errorText = await response.text()
              console.error('Failed to send email via Resend:', errorText)
            } else {
              console.log('Resend email notification sent successfully.')
            }
          } catch (err) {
            console.error('Error during Resend email webhook execution:', err)
          }
        }
      },
    ],
  },
}
