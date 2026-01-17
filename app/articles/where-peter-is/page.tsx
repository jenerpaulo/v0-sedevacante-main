"use client"

import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function WherePeterIsArticle() {
  const { language } = useLanguage()
  const [articleContent, setArticleContent] = useState("")

  useEffect(() => {
    // Map language codes to file names
    const fileMap = {
      en: "/Where_Peter_Is_Translation.md",
      pt: "/Onde_esta_Pedro_Traducao.md",
      fr: "/La_ou_est_Pierre_Original.md",
      es: "/Donde_esta_Pedro_Traduccion.md",
    }

    const fileName = fileMap[language as keyof typeof fileMap] || fileMap.en

    fetch(fileName)
      .then((res) => res.text())
      .then((text) => setArticleContent(text))
      .catch((err) => console.error("Error loading article:", err))
  }, [language])

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation with Donation Link */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-primary hover:text-primary/80 font-serif">
            ← {language === "en" ? "Back to Home" : language === "pt" ? "Voltar ao Início" : language === "fr" ? "Retour à l'Accueil" : "Volver al Inicio"}
          </Link>
          <a
            href="https://fund.sedevacante.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-500 hover:text-gold-400 font-serif text-sm md:text-base transition-colors"
          >
            {language === "en" && "Support our mission to preserve traditional Catholic faith →"}
            {language === "pt" && "Apoie nossa missão de preservar a fé católica tradicional →"}
            {language === "fr" && "Soutenez notre mission de préserver la foi catholique traditionnelle →"}
            {language === "es" && "Apoya nuestra misión de preservar la fe católica tradicional →"}
          </a>
        </div>
      </header>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <div
          className="article-content"
          dangerouslySetInnerHTML={{
            __html: convertMarkdownToHtml(articleContent),
          }}
        />
      </article>

      {/* Bottom Donation Section */}
      <div className="bg-secondary/20 border-t border-border py-12 mt-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h3 className="text-2xl font-sans font-light text-foreground mb-4">
            {language === "en" && "Help Us Continue This Work"}
            {language === "pt" && "Ajude-nos a Continuar Este Trabalho"}
            {language === "fr" && "Aidez-nous à Poursuivre Ce Travail"}
            {language === "es" && "Ayúdanos a Continuar Este Trabajo"}
          </h3>
          <p className="text-lg font-serif text-muted-foreground mb-6">
            {language === "en" && "Your support helps us maintain traditional Catholic communities and spread the true faith around the world."}
            {language === "pt" && "Seu apoio nos ajuda a manter comunidades católicas tradicionais e espalhar a verdadeira fé ao redor do mundo."}
            {language === "fr" && "Votre soutien nous aide à maintenir les communautés catholiques traditionnelles et à répandre la vraie foi dans le monde entier."}
            {language === "es" && "Tu apoyo nos ayuda a mantener comunidades católicas tradicionales y difundir la verdadera fe en todo el mundo."}
          </p>
          <a
            href="https://fund.sedevacante.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-primary text-white hover:bg-primary/90 font-serif font-semibold text-lg rounded transition-colors"
          >
            {language === "en" && "Visit Our Funding Page"}
            {language === "pt" && "Visite Nossa Página de Financiamento"}
            {language === "fr" && "Visitez Notre Page de Financement"}
            {language === "es" && "Visita Nuestra Página de Financiamiento"}
          </a>
        </div>
      </div>
    </div>
  )
}

// Markdown to HTML converter with proper formatting
function convertMarkdownToHtml(markdown: string): string {
  if (!markdown) return ""

  // Split into lines for processing
  const lines = markdown.split('\n')
  const result: string[] = []
  let inParagraph = false
  let isFirstH2 = true

  // Bishop image HTML to insert after the homily subtitle
  const bishopImage = `<div class="bishop-image-container"><img src="/images/bishop.png" alt="Bishop Roy" class="bishop-image" /></div>`

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // Check for headers (must be at start of line)
    if (line.startsWith('#### ')) {
      if (inParagraph) { result.push('</p>'); inParagraph = false }
      result.push(`<h4>${line.slice(5)}</h4>`)
      continue
    }
    if (line.startsWith('### ')) {
      if (inParagraph) { result.push('</p>'); inParagraph = false }
      result.push(`<h3>${line.slice(4)}</h3>`)
      continue
    }
    if (line.startsWith('## ')) {
      if (inParagraph) { result.push('</p>'); inParagraph = false }
      const h2Content = line.slice(3)
      result.push(`<h2>${h2Content}</h2>`)
      // Insert bishop image after the first h2 (homily subtitle)
      if (isFirstH2) {
        result.push(bishopImage)
        isFirstH2 = false
      }
      continue
    }
    if (line.startsWith('# ')) {
      if (inParagraph) { result.push('</p>'); inParagraph = false }
      result.push(`<h1>${line.slice(2)}</h1>`)
      continue
    }

    // Empty line = paragraph break
    if (line.trim() === '') {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      continue
    }

    // Regular text line
    // Apply inline formatting
    line = line.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    line = line.replace(/\*(.*?)\*/g, '<em>$1</em>')
    line = line.replace(/«(.*?)»/g, '«<em>$1</em>»')

    if (!inParagraph) {
      result.push('<p>')
      inParagraph = true
    } else {
      result.push(' ')
    }
    result.push(line)
  }

  // Close any open paragraph
  if (inParagraph) {
    result.push('</p>')
  }

  return result.join('')
}
