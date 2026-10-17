import React from 'react'
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=917799545453&text=Hi+Ramasri+Builders%2C+I%E2%80%99m+interested+in+a+construction+quote.&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group hover:bg-[#20ba5a]"
      aria-label="Contact us on WhatsApp"
    ><FaWhatsapp className='h-7 w-7 transition-transform duration-300 group-hover:rotate-12' />

    </a>
  )
}
