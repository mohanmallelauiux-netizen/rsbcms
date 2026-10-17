import { RootPage } from '@payloadcms/next/views'
import React from 'react'
import config from '@payload-config'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{
    segments?: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

const Page = ({ params, searchParams }: Args) => {
  return (
    <RootPage
      config={config}
      importMap={importMap}
      params={params as any}
      searchParams={searchParams as any}
    />
  )
}

export default Page
