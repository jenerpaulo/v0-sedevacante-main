"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { X } from "lucide-react"
import { useEffect } from "react"

interface DevModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DevModal({ isOpen, onClose }: DevModalProps) {
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#82071B]">{t.modalTitle}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={t.modalClose}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed mb-6">{t.modalMessage}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://fund.sedevacante.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#82071B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6a0516] transition-colors text-center"
            >
              {t.modalButton}
            </a>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              {t.modalClose}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
