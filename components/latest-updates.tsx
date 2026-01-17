"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { useDevModal } from "@/lib/dev-modal-context"
import { useState } from "react"

const updates = {
  en: {
    featured: {
      label: "Featured",
      title: "Priestly Ordination",
      description:
        "On December 20, our dearly beloved Brother, Reverend Friar João Maria Vianney, Conventual Vicar, was ordained to the priesthood.",
      date: "December 23, 2025",
      image: "/images/celebracao.jpeg",
    },
    side: [
      {
        label: "News",
        title: "Arrival of Rev. Fr. Leonardo Holtz and Rev. Fr. Gabriel Spínola",
        description:
          "Fathers Leonardo Holtz and Gabriel Spínola arrived on the occasion of the ordinations that will soon take place among us.",
        date: "December 18, 2025",
        image: "/images/encontro-bispo.jpeg",
      },
      {
        label: "Highlight",
        title: "A Bishop in the Kitchen!",
        description: "The Most Reverend Bishop Dom Rodrigo da Silva kindly agreed to prepare lunch for the community.",
        date: "December 17, 2025",
        image: "/images/bispocoz.webp",
      },
      {
        label: "News",
        title: "Two Additional Minor Orders",
        description:
          "On December 17, 2025, our dearly beloved Brothers — Friar Pacífico Maria, Friar João Maria Vianney, and Friar Dimas Maria — received the Minor Orders of Exorcist and Acolyte.",
        date: "December 18, 2025",
        image: "/images/bispo-celeb.webp",
      },
    ],
  },
  pt: {
    featured: {
      label: "Especial",
      title: "Ordenação Sacerdotal",
      description:
        "No dia 20 de dezembro, nosso caríssimo Irmão Reverendo Frei João Maria Vianney, Vigário Conventual, foi ordenado sacerdote",
      date: "23 de Dezembro de 2025",
      image: "/images/celebracao.jpeg",
    },
    side: [
      {
        label: "Notícias",
        title: "Chegada do Rev. Pe. Leonardo Holtz e do Rev. Pe. Gabriel Spínola.",
        description:
          "Padres Leonardo Holtz e Gabriel Spínola vieram por ocasião das Ordenações que em breve acontecerão entre nós",
        date: "18 de Dezembro de 2025",
        image: "/images/encontro-bispo.jpeg",
      },
      {
        label: "Destaque",
        title: "Um Bispo na Cozinha!",
        description: "O Excelentíssimo Senhor Bispo Dom Rodrigo da Silva aceitou preparar o almoço para a comunidade.",
        date: "17 de Dezembro de 2025",
        image: "/images/bispocoz.webp",
      },
      {
        label: "Notícias",
        title: "Outras Duas Ordens Menores",
        description:
          "No dia 17 de dezembro de 2025, nossos caríssimos Irmãos — Frei Pacífico Maria, Frei João Maria Vianney e Frei Dimas Maria — receberam as Ordens Menores de Exorcista e Acólito.",
        date: "18 de Dezembro de 2025",
        image: "/images/bispo-celeb.webp",
      },
    ],
  },
  fr: {
    featured: {
      label: "À la Une",
      title: "Ordination Sacerdotale",
      description:
        "Le 20 décembre, notre très cher Frère, le Révérend Frère João Maria Vianney, Vicaire Conventuel, a été ordonné prêtre.",
      date: "23 décembre 2025",
      image: "/images/celebracao.jpeg",
    },
    side: [
      {
        label: "Nouvelles",
        title: "Arrivée du Rév. P. Leonardo Holtz et du Rév. P. Gabriel Spínola",
        description:
          "Les Pères Leonardo Holtz et Gabriel Spínola sont arrivés à l'occasion des ordinations qui auront bientôt lieu parmi nous.",
        date: "18 décembre 2025",
        image: "/images/encontro-bispo.jpeg",
      },
      {
        label: "Point Fort",
        title: "Un Évêque aux Fourneaux!",
        description:
          "Son Excellence Monseigneur Dom Rodrigo da Silva a gentiment accepté de préparer le déjeuner pour la communauté.",
        date: "17 décembre 2025",
        image: "/images/bispocoz.webp",
      },
      {
        label: "Nouvelles",
        title: "Deux Ordres Mineurs Supplémentaires",
        description:
          "Le 17 décembre 2025, nos très chers Frères — Frère Pacífico Maria, Frère João Maria Vianney et Frère Dimas Maria — ont reçu les Ordres Mineurs d'Exorciste et d'Acolyte.",
        date: "18 décembre 2025",
        image: "/images/bispo-celeb.webp",
      },
    ],
  },
  es: {
    featured: {
      label: "Destacado",
      title: "Ordenación Sacerdotal",
      description:
        "El 20 de diciembre, nuestro querido Hermano, el Reverendo Fray João Maria Vianney, Vicario Conventual, fue ordenado sacerdote.",
      date: "23 de diciembre de 2025",
      image: "/images/celebracao.jpeg",
    },
    side: [
      {
        label: "Noticias",
        title: "Llegada del Rev. P. Leonardo Holtz y del Rev. P. Gabriel Spínola",
        description:
          "Los Padres Leonardo Holtz y Gabriel Spínola llegaron con motivo de las ordenaciones que pronto tendrán lugar entre nosotros.",
        date: "18 de diciembre de 2025",
        image: "/images/encontro-bispo.jpeg",
      },
      {
        label: "Destacado",
        title: "¡Un Obispo en la Cocina!",
        description:
          "El Excelentísimo Señor Obispo Dom Rodrigo da Silva amablemente aceptó preparar el almuerzo para la comunidad.",
        date: "17 de diciembre de 2025",
        image: "/images/bispocoz.webp",
      },
      {
        label: "Noticias",
        title: "Dos Órdenes Menores Adicionales",
        description:
          "El 17 de diciembre de 2025, nuestros queridos Hermanos — Fray Pacífico Maria, Fray João Maria Vianney y Fray Dimas Maria — recibieron las Órdenes Menores de Exorcista y Acólito.",
        date: "18 de diciembre de 2025",
        image: "/images/bispo-celeb.webp",
      },
    ],
  },
}

export function LatestUpdates() {
  const { language, t } = useLanguage()
  const { showModal } = useDevModal()
  const content = updates[language]
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % content.side.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + content.side.length) % content.side.length)
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index)
  }

  return (
    <section id="updates" className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-sans font-light text-foreground mb-4 text-balance">
            {t.latestUpdatesTitle}
          </h2>
          <p className="text-lg text-muted-foreground font-serif">{t.latestUpdatesSubtitle}</p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {/* Featured Update - Large Card */}
          <Card className="lg:row-span-3 hover:shadow-xl transition-shadow bg-card border-border h-fit">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="relative h-48 overflow-hidden rounded-t-lg flex-shrink-0">
                <Image
                  src={content.featured.image || "/placeholder.svg"}
                  alt={content.featured.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <Badge className="w-fit mb-3 bg-accent text-accent-foreground font-serif">
                  {content.featured.label}
                </Badge>
                <h3 className="text-2xl font-sans font-semibold text-foreground mb-3 text-balance">
                  {content.featured.title}
                </h3>
                <p className="text-muted-foreground font-serif leading-relaxed mb-4 flex-grow">
                  {content.featured.description}
                </p>
                <p className="text-muted-foreground font-serif leading-relaxed mb-6 text-sm">
                  {language === "en"
                    ? "This sacred moment marks a significant milestone in our community's spiritual journey, bringing us closer to fulfilling our mission in the traditional Catholic faith."
                    : language === "pt"
                      ? "Este momento sagrado marca um marco significativo na jornada espiritual de nossa comunidade, nos aproximando do cumprimento de nossa missão na fé católica tradicional."
                      : language === "fr"
                        ? "Ce moment sacré marque un jalon significatif dans le parcours spirituel de notre communauté, nous rapprochant davantage de la réalisation de notre mission dans la foi catholique traditionnelle."
                        : "Este momento sagrado marca un hito significativo en el viaje espiritual de nuestra comunidad, acercándonos más al cumplimiento de nuestra misión en la fe católica tradicional."}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-muted-foreground font-serif">{content.featured.date}</span>
                  <button
                    onClick={showModal}
                    className="text-primary hover:text-primary/80 font-serif text-sm font-semibold"
                  >
                    {t.readMore} →
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {content.side.slice(0, 2).map((update, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow bg-card border-border flex-shrink-0">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Badge
                        className="w-fit mb-2 font-serif"
                        variant={
                          update.label === "Highlight" ||
                          update.label === "Destaque" ||
                          update.label === "Point Fort" ||
                          update.label === "Destacado"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {update.label}
                      </Badge>
                      <h3 className="text-lg font-sans font-semibold text-foreground mb-2">{update.title}</h3>
                      <p className="text-muted-foreground font-serif text-sm leading-relaxed mb-3">
                        {update.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-serif">{update.date}</span>
                        <button
                          onClick={showModal}
                          className="text-primary hover:text-primary/80 font-serif text-xs font-semibold"
                        >
                          {t.readMore} →
                        </button>
                      </div>
                    </div>
                    {update.image && (
                      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={update.image || "/placeholder.svg"}
                          alt={update.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Featured Update - Large Card */}
          <Card className="hover:shadow-xl transition-shadow bg-card border-border">
            <CardContent className="p-0 flex flex-col">
              <div className="relative h-48 overflow-hidden rounded-t-lg flex-shrink-0">
                <Image
                  src={content.featured.image || "/placeholder.svg"}
                  alt={content.featured.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <Badge className="w-fit mb-3 bg-accent text-accent-foreground font-serif">
                  {content.featured.label}
                </Badge>
                <h3 className="text-2xl font-sans font-semibold text-foreground mb-3 text-balance">
                  {content.featured.title}
                </h3>
                <p className="text-muted-foreground font-serif leading-relaxed mb-4 flex-grow">
                  {content.featured.description}
                </p>
                <p className="text-muted-foreground font-serif leading-relaxed mb-6 text-sm">
                  {language === "en"
                    ? "This sacred moment marks a significant milestone in our community's spiritual journey, bringing us closer to fulfilling our mission in the traditional Catholic faith."
                    : language === "pt"
                      ? "Este momento sagrado marca um marco significativo na jornada espiritual de nossa comunidade, nos aproximando do cumprimento de nossa missão na fé católica tradicional."
                      : language === "fr"
                        ? "Ce moment sacré marque un jalon significatif dans le parcours spirituel de notre communauté, nous rapprochant davantage de la réalisation de notre mission dans la foi catholique traditionnelle."
                        : "Este momento sagrado marca un hito significativo en el viaje espiritual de nuestra comunidad, acercándonos más al cumplimiento de nuestra misión en la fe católica tradicional."}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-muted-foreground font-serif">{content.featured.date}</span>
                  <button
                    onClick={showModal}
                    className="text-primary hover:text-primary/80 font-serif text-sm font-semibold"
                  >
                    {t.readMore} →
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="relative">
              <Card className="hover:shadow-lg transition-shadow bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex gap-4 flex-col">
                    <div className="flex-1">
                      <Badge
                        className="w-fit mb-2 font-serif"
                        variant={
                          content.side[currentIndex].label === "Highlight" ||
                          content.side[currentIndex].label === "Destaque" ||
                          content.side[currentIndex].label === "Point Fort" ||
                          content.side[currentIndex].label === "Destacado"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {content.side[currentIndex].label}
                      </Badge>
                      <h3 className="text-lg font-sans font-semibold text-foreground mb-2">
                        {content.side[currentIndex].title}
                      </h3>
                      <p className="text-muted-foreground font-serif text-sm leading-relaxed mb-3">
                        {content.side[currentIndex].description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-serif">
                          {content.side[currentIndex].date}
                        </span>
                        <button
                          onClick={showModal}
                          className="text-primary hover:text-primary/80 font-serif text-xs font-semibold"
                        >
                          {t.readMore} →
                        </button>
                      </div>
                    </div>
                    {content.side[currentIndex].image && (
                      <div className="relative w-full h-32 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={content.side[currentIndex].image || "/placeholder.svg"}
                          alt={content.side[currentIndex].title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute -left-4 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/80 transition-colors"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="absolute -right-4 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/80 transition-colors"
              >
                →
              </button>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2">
              {content.side.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
