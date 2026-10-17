'use client'

import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() => import('./PropertyMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-card border border-border rounded-xl flex items-center justify-center text-muted">
      <span className="animate-pulse">Loading location map...</span>
    </div>
  ),
})

export default function PropertyMapWrapper({
  lat,
  lng,
  address,
}: {
  lat: number
  lng: number
  address: string
}) {
  return <DynamicMap lat={lat} lng={lng} address={address} />
}
