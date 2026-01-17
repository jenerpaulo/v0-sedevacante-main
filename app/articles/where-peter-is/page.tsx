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
      {/* Header/Navigation */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-primary hover:text-primary/80 font-serif">
            ← {language === "en" ? "Back to Home" : language === "pt" ? "Voltar ao Início" : language === "fr" ? "Retour à l'Accueil" : "Volver al Inicio"}
          </Link>
        </div>
      </header>

      {/* Donation Banner */}
      <div className="bg-gold-500/10 border-y border-gold-500/20 py-4 mt-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-serif text-foreground mb-3">
            {language === "en" && "Support our mission to preserve traditional Catholic faith"}
            {language === "pt" && "Apoie nossa missão de preservar a fé católica tradicional"}
            {language === "fr" && "Soutenez notre mission de préserver la foi catholique traditionnelle"}
            {language === "es" && "Apoya nuestra misión de preservar la fe católica tradicional"}
          </p>
          <a
            href="https://fund.sedevacante.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gold-500 text-white hover:bg-gold-600 font-serif font-semibold rounded transition-colors"
          >
            {language === "en" && "Donate Now"}
            {language === "pt" && "Doe Agora"}
            {language === "fr" && "Faire un Don"}
            {language === "es" && "Donar Ahora"}
          </a>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-sans prose-headings:font-light
            prose-h1:text-4xl prose-h1:mb-2
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-2
            prose-p:font-serif prose-p:text-base prose-p:leading-relaxed
            prose-strong:font-semibold
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
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

// Simple markdown to HTML converter
function convertMarkdownToHtml(markdown: string): string {
  if (!markdown) return ""

  let html = markdown

  // Headers
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>")
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>")
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>")

  // Bold and Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>")

  // Paragraphs
  html = html.replace(/\n\n/g, "</p><p>")
  html = "<p>" + html + "</p>"

  // Clean up headers in paragraphs
  html = html.replace(/<p><h/g, "<h")
  html = html.replace(/<\/h([1-6])><\/p>/g, "</h$1>")
  html = html.replace(/<p><\/p>/g, "")

  return html
}
