import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Blogs } from './collections/Blogs'
import { Categories } from './collections/Categories'
import { Team } from './collections/Team'
import { Testimonials } from './collections/Testimonials'
import { FAQs } from './collections/FAQs'
import { Inquiries } from './collections/Inquiries'

import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { Footer } from './globals/Footer'
import { Home } from './globals/Home'
import { About } from './globals/About'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Projects,
    Blogs,
    Categories,
    Team,
    Testimonials,
    FAQs,
    Inquiries,
  ],
  globals: [
    SiteSettings,
    Navigation,
    Footer,
    Home,
    About,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '7f5df84b2c159ec11c216260a92cd3484fcf122a7f5c5b16',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://postgres:postgres@127.0.0.1:5432/rsbi',
    },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
