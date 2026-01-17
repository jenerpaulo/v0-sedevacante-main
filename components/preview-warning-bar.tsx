"use client"
import { useLanguage } from "@/lib/language-context"

export const PreviewWarningBar = () => {
  const { language } = useLanguage()

  const messages = {
    en: "All content is for demonstration purposes only. Please help us fund this project at",
    pt: "Todo o conteúdo é apenas para fins de demonstração. Por favor, ajude-nos a financiar este projeto em",
    fr: "Tout le contenu est à des fins de démonstration uniquement. Veuillez nous aider à financer ce projet sur",
    es: "Todo el contenido es solo para fines de demostración. Por favor, ayúdanos a financiar este proyecto en",
  }

  const ctaText = {
    en: "fund.sedevacante.online",
    pt: "fund.sedevacante.online",
    fr: "fund.sedevacante.online",
    es: "fund.sedevacante.online",
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-amber-100 border-t-2 border-amber-400 text-amber-900 py-3 px-4">
      <div className="container mx-auto text-center text-sm font-medium flex flex-wrap items-center justify-center gap-1 max-w-full">
        <span className="break-words">{messages[language]}</span>
        <a
          href="https://fund.sedevacante.online/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold hover:text-amber-950 transition-colors break-all"
        >
          {ctaText[language]}
        </a>
      </div>
    </div>
  )
}
