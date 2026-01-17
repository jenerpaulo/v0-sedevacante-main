"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    window.open("http://wa.me/5512988406441", "_blank")
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
    </button>
  )
}
