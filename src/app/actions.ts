'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export type ActionResponse = {
  success: boolean
  error?: string
}

export async function submitInquiry(formData: {
  name: string
  email: string
  phone: string
  whatsapp: boolean
  inquiryType: 'general' | 'callback' | 'project-inquiry' | 'interiors'
  message?: string
  projectId?: string
  pageUrl?: string
}): Promise<ActionResponse> {
  const { name, email, phone, whatsapp, inquiryType, message, projectId, pageUrl } = formData

  if (!name || !email || !phone) {
    return { success: false, error: 'Name, email, and phone are required.' }
  }

  try {
    const payload = await getPayload({ config })
    
    // Create lead record inside Payload database
    await payload.create({
      collection: 'inquiries',
      data: {
        name,
        email,
        phone,
        whatsapp,
        inquiryType,
        message,
        project: projectId ? Number(projectId) : undefined,
        pageUrl,
        status: 'new',
      },
    })

    return { success: true }
  } catch (err: any) {
    console.error('Error submitting lead inquiry:', err)
    return { success: false, error: err.message || 'Something went wrong. Please try again.' }
  }
}
