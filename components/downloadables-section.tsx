"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"

const downloadables = {
  en: [
    {
      id: 1,
      title: "Traditional Catholic Catechism",
      description: "Complete catechism based on the Council of Trent teachings",
      type: "PDF",
      size: "2.5 MB",
      pages: 156,
    },
    {
      id: 2,
      title: "Latin Mass Missal",
      description: "Complete ordinary and propers for the Traditional Latin Mass",
      type: "PDF",
      size: "4.8 MB",
      pages: 342,
    },
    {
      id: 3,
      title: "Sedevacantism Explained",
      description: "Theological treatise on the Sedevacantist position",
      type: "eBook",
      size: "1.2 MB",
      pages: 89,
    },
    {
      id: 4,
      title: "Traditional Prayer Book",
      description: "Collection of traditional Catholic prayers and devotions",
      type: "PDF",
      size: "3.1 MB",
      pages: 198,
    },
    {
      id: 5,
      title: "Lives of the Saints",
      description: "Hagiography of traditional Catholic saints",
      type: "eBook",
      size: "5.6 MB",
      pages: 423,
    },
    {
      id: 6,
      title: "Liturgical Calendar",
      description: "Traditional Roman Catholic liturgical calendar",
      type: "PDF",
      size: "0.8 MB",
      pages: 24,
    },
  ],
  pt: [
    {
      id: 1,
      title: "Catecismo Católico Tradicional",
      description: "Catecismo completo baseado nos ensinamentos do Concílio de Trento",
      type: "PDF",
      size: "2.5 MB",
      pages: 156,
    },
    {
      id: 2,
      title: "Missal da Missa Latina",
      description: "Ordinário e próprios completos para a Missa Latina Tradicional",
      type: "PDF",
      size: "4.8 MB",
      pages: 342,
    },
    {
      id: 3,
      title: "Sedevacantismo Explicado",
      description: "Tratado teológico sobre a posição sedevacantista",
      type: "eBook",
      size: "1.2 MB",
      pages: 89,
    },
    {
      id: 4,
      title: "Livro de Orações Tradicional",
      description: "Coletânea de orações e devoções católicas tradicionais",
      type: "PDF",
      size: "3.1 MB",
      pages: 198,
    },
    {
      id: 5,
      title: "Vidas dos Santos",
      description: "Hagiografia dos santos católicos tradicionais",
      type: "eBook",
      size: "5.6 MB",
      pages: 423,
    },
    {
      id: 6,
      title: "Calendário Litúrgico",
      description: "Calendário litúrgico católico romano tradicional",
      type: "PDF",
      size: "0.8 MB",
      pages: 24,
    },
  ],
  fr: [
    {
      id: 1,
      title: "Catéchisme Catholique Traditionnel",
      description: "Catéchisme complet basé sur les enseignements du Concile de Trente",
      type: "PDF",
      size: "2.5 MB",
      pages: 156,
    },
    {
      id: 2,
      title: "Missel de la Messe Latine",
      description: "Ordinaire et propres complets pour la Messe Latine Traditionnelle",
      type: "PDF",
      size: "4.8 MB",
      pages: 342,
    },
    {
      id: 3,
      title: "Le Sédévacantisme Expliqué",
      description: "Traité théologique sur la position sédévacantiste",
      type: "eBook",
      size: "1.2 MB",
      pages: 89,
    },
    {
      id: 4,
      title: "Livre de Prières Traditionnel",
      description: "Recueil de prières et dévotions catholiques traditionnelles",
      type: "PDF",
      size: "3.1 MB",
      pages: 198,
    },
    {
      id: 5,
      title: "Vies des Saints",
      description: "Hagiographie des saints catholiques traditionnels",
      type: "eBook",
      size: "5.6 MB",
      pages: 423,
    },
    {
      id: 6,
      title: "Calendrier Liturgique",
      description: "Calendrier liturgique catholique romain traditionnel",
      type: "PDF",
      size: "0.8 MB",
      pages: 24,
    },
  ],
  es: [
    {
      id: 1,
      title: "Catecismo Católico Tradicional",
      description: "Catecismo completo basado en las enseñanzas del Concilio de Trento",
      type: "PDF",
      size: "2.5 MB",
      pages: 156,
    },
    {
      id: 2,
      title: "Misal de la Misa Latina",
      description: "Ordinario y propios completos para la Misa Latina Tradicional",
      type: "PDF",
      size: "4.8 MB",
      pages: 342,
    },
    {
      id: 3,
      title: "Sedevacantismo Explicado",
      description: "Tratado teológico sobre la posición sedevacantista",
      type: "eBook",
      size: "1.2 MB",
      pages: 89,
    },
    {
      id: 4,
      title: "Libro de Oraciones Tradicional",
      description: "Colección de oraciones y devociones católicas tradicionales",
      type: "PDF",
      size: "3.1 MB",
      pages: 198,
    },
    {
      id: 5,
      title: "Vidas de los Santos",
      description: "Hagiografía de santos católicos tradicionales",
      type: "eBook",
      size: "5.6 MB",
      pages: 423,
    },
    {
      id: 6,
      title: "Calendario Litúrgico",
      description: "Calendario litúrgico católico romano tradicional",
      type: "PDF",
      size: "0.8 MB",
      pages: 24,
    },
  ],
}

export function DownloadablesSection() {
  const { language, t } = useLanguage()
  const content = downloadables[language]
  const [isMobile, setIsMobile] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? content.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === content.length - 1 ? 0 : prev + 1))
  }

  const displayContent = isMobile ? content : content

  return (
    <section id="downloadables" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-sans font-light text-foreground mb-4 text-balance">
            {t.downloadablesTitle}
          </h2>
          <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">{t.downloadablesSubtitle}</p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-sans font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground font-serif">
                      {item.type} • {item.pages} pages • {item.size}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground font-serif text-sm leading-relaxed mb-4">{item.description}</p>
                <Button

                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-serif gap-2"
                >
                  <Download className="w-4 h-4" />
                  {t.downloadButton}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {isMobile && (
          <div className="md:hidden">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handlePrev}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors flex-shrink-0"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 text-primary" />
              </button>

              <div className="flex-grow">
                <Card className="hover:shadow-lg transition-shadow bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-sans font-semibold text-foreground mb-1">
                          {displayContent[currentIndex].title}
                        </h3>
                        <p className="text-xs text-muted-foreground font-serif">
                          {displayContent[currentIndex].type} • {displayContent[currentIndex].pages} pages •{" "}
                          {displayContent[currentIndex].size}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground font-serif text-sm leading-relaxed mb-4">
                      {displayContent[currentIndex].description}
                    </p>
                    <Button
    
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-serif gap-2"
                    >
                      <Download className="w-4 h-4" />
                      {t.downloadButton}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <button
                onClick={handleNext}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors flex-shrink-0"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 text-primary" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {content.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to item ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                className="px-8 py-3 border border-primary text-primary hover:bg-primary/10 font-serif font-semibold rounded transition-colors"
              >
                {t.seeMore}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
