"use client"
import { useLanguage } from "@/lib/language-context"

const languages = [
  { code: "en", name: "EN", flag: "🇺🇸" },
  { code: "pt", name: "PT", flag: "🇧🇷" },
  { code: "fr", name: "FR", flag: "🇫🇷" },
  { code: "es", name: "ES", flag: "🇪🇸" },
]

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="fixed right-8 bottom-20 z-50 hidden lg:flex flex-col gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as any)}
          className={`px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 ${
            language === lang.code
              ? "bg-red-900 text-white border-2 border-gold-500"
              : "bg-red-950 text-gray-300 border-2 border-red-800 hover:bg-red-900"
          }`}
        >
          <span>{lang.flag}</span>
          <span>{lang.name}</span>
        </button>
      ))}
    </div>
  )
}
