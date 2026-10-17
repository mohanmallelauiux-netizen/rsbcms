'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Fix for default Leaflet marker icons not displaying correctly in bundlers
import 'leaflet/dist/leaflet.css'

export default function PropertyMap({
  lat,
  lng,
  address,
}: {
  lat: number
  lng: number
  address: string
}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Fix default marker icon issues dynamically
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  if (!isMounted) {
    return (
      <div className="w-full h-[400px] bg-card border border-border rounded-xl flex items-center justify-center text-muted">
        <span className="animate-pulse">Loading location map...</span>
      </div>
    )
  }

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={14}
      scrollWheelZoom={false}
      className="w-full h-[400px] rounded-xl overflow-hidden"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>
          <div className="text-luxury-dark font-sans p-1">
            <h4 className="font-semibold text-sm">Property Location</h4>
            <p className="text-xs text-gray-600 mt-1">{address}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
