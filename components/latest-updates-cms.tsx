"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { useState } from "react"

interface NewsItem {
  id: string
  title: string
  description: string
  label: string
  date: string
  featured: boolean
  image?: { url: string; alt?: string }
}

const labelMap: Record<string, string> = {
  news: "Notícia",
  highlight: "Destaque",
  featured: "Especial",
}

export function LatestUpdatesCMS({ news }: { news: NewsItem[] }) {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % news.length)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + news.length) % news.length)

  return (
    <section id="updates" className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-sans font-light text-foreground mb-4 text-balance">
            {t.latestUpdatesTitle}
          </h2>
          <p className="text-lg text-muted-foreground font-serif">{t.latestUpdatesSubtitle}</p>
        </div>

        {/* Desktop: 3 cards em grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {news.slice(0, 3).map((item) => (
            <Card key={item.id} className="hover:shadow-xl transition-shadow bg-card border-border flex flex-col">
              <CardContent className="p-0 flex flex-col h-full">
                {item.image?.url && (
                  <div className="relative aspect-video overflow-hidden rounded-t-lg flex-shrink-0">
                    <Image
                      src={item.image.url}
                      alt={item.image.alt || item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <Badge
                    className="w-fit mb-3 font-serif"
                    variant={item.label === "highlight" || item.label === "featured" ? "default" : "secondary"}
                  >
                    {labelMap[item.label] || item.label}
                  </Badge>
                  <h3 className="text-xl font-sans font-semibold text-foreground mb-3 text-balance">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground font-serif text-sm leading-relaxed mb-4 flex-grow">
                    {item.description}
                  </p>
                  <span className="text-sm text-muted-foreground font-serif mt-auto">
                    {formatDate(item.date)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile: carrossel */}
        <div className="lg:hidden">
          <div className="relative">
            <Card className="hover:shadow-xl transition-shadow bg-card border-border">
              <CardContent className="p-0 flex flex-col">
                {news[currentIndex].image?.url && (
                  <div className="relative aspect-video overflow-hidden rounded-t-lg flex-shrink-0">
                    <Image
                      src={news[currentIndex].image.url}
                      alt={news[currentIndex].image.alt || news[currentIndex].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col">
                  <Badge
                    className="w-fit mb-3 font-serif"
                    variant={news[currentIndex].label === "highlight" || news[currentIndex].label === "featured" ? "default" : "secondary"}
                  >
                    {labelMap[news[currentIndex].label] || news[currentIndex].label}
                  </Badge>
                  <h3 className="text-xl font-sans font-semibold text-foreground mb-3 text-balance">
                    {news[currentIndex].title}
                  </h3>
                  <p className="text-muted-foreground font-serif text-sm leading-relaxed mb-4">
                    {news[currentIndex].description}
                  </p>
                  <span className="text-sm text-muted-foreground font-serif">
                    {formatDate(news[currentIndex].date)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {news.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute -left-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center hover:bg-primary/80 transition-colors shadow-md"
                >
                  ←
                </button>
                <button
                  onClick={handleNext}
                  className="absolute -right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center hover:bg-primary/80 transition-colors shadow-md"
                >
                  →
                </button>
              </>
            )}
          </div>

          {news.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {news.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
