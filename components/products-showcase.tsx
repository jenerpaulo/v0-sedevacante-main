"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

const products = {
  en: [
    {
      id: 1,
      name: "Sacred Heart Rosary",
      price: "$15.00",
      image: "/beautiful-catholic-rosary-with-sacred-heart-medal.jpg",
      description: "Handcrafted rosary with Sacred Heart of Jesus medal",
    },
    {
      id: 2,
      name: "Marian Prayer Book",
      price: "$12.00",
      image: "/elegant-catholic-prayer-book-with-virgin-mary-cove.jpg",
      description: "Collection of the most beautiful prayers to Our Lady",
    },
    {
      id: 3,
      name: "Carmelite Scapular",
      price: "$10.00",
      image: "/traditional-brown-scapular-of-our-lady-of-mount-ca.jpg",
      description: "Traditional scapular of Our Lady of Mount Carmel",
    },
    {
      id: 4,
      name: "St. Joseph Statue",
      price: "$22.00",
      image: "/placeholder-9he95.png",
      description: "Handcrafted statue of St. Joseph with Child Jesus",
    },
    {
      id: 5,
      name: "St. Therese Novena",
      price: "$6.00",
      image: "/delicate-prayer-booklet-with-saint-therese-of-lisi.jpg",
      description: "Complete novena of St. Therese of the Child Jesus",
    },
    {
      id: 6,
      name: "Devotional Candle",
      price: "$8.00",
      image: "/elegant-catholic-devotion-candle.jpg",
      description: "Handcrafted candle for devotions and prayer",
    },
  ],
  pt: [
    {
      id: 1,
      name: "Terço do Sagrado Coração",
      price: "R$ 45,00",
      image: "/beautiful-catholic-rosary-with-sacred-heart-medal.jpg",
      description: "Terço artesanal com medalha do Sagrado Coração de Jesus",
    },
    {
      id: 2,
      name: "Livro de Orações Marianas",
      price: "R$ 32,00",
      image: "/elegant-catholic-prayer-book-with-virgin-mary-cove.jpg",
      description: "Coletânea das mais belas orações à Nossa Senhora",
    },
    {
      id: 3,
      name: "Escapulário do Carmo",
      price: "R$ 28,00",
      image: "/traditional-brown-scapular-of-our-lady-of-mount-ca.jpg",
      description: "Escapulário tradicional de Nossa Senhora do Carmo",
    },
    {
      id: 4,
      name: "Imagem de São José",
      price: "R$ 65,00",
      image: "/placeholder-9he95.png",
      description: "Imagem artesanal de São José com o Menino Jesus",
    },
    {
      id: 5,
      name: "Novena de Santa Teresinha",
      price: "R$ 18,00",
      image: "/delicate-prayer-booklet-with-saint-therese-of-lisi.jpg",
      description: "Novena completa de Santa Teresinha do Menino Jesus",
    },
    {
      id: 6,
      name: "Vela de Devoção",
      price: "R$ 22,00",
      image: "/elegant-catholic-devotion-candle.jpg",
      description: "Vela artesanal para devoções e oração",
    },
  ],
  fr: [
    {
      id: 1,
      name: "Chapelet du Sacré-Cœur",
      price: "15,00 €",
      image: "/beautiful-catholic-rosary-with-sacred-heart-medal.jpg",
      description: "Chapelet artisanal avec médaille du Sacré-Cœur de Jésus",
    },
    {
      id: 2,
      name: "Livre de Prières Mariales",
      price: "12,00 €",
      image: "/elegant-catholic-prayer-book-with-virgin-mary-cove.jpg",
      description: "Collection des plus belles prières à Notre-Dame",
    },
    {
      id: 3,
      name: "Scapulaire du Carmel",
      price: "10,00 €",
      image: "/traditional-brown-scapular-of-our-lady-of-mount-ca.jpg",
      description: "Scapulaire traditionnel de Notre-Dame du Mont-Carmel",
    },
    {
      id: 4,
      name: "Statue de Saint Joseph",
      price: "22,00 €",
      image: "/placeholder-9he95.png",
      description: "Statue artisanale de Saint Joseph avec l'Enfant Jésus",
    },
    {
      id: 5,
      name: "Neuvaine de Sainte Thérèse",
      price: "6,00 €",
      image: "/delicate-prayer-booklet-with-saint-therese-of-lisi.jpg",
      description: "Neuvaine complète de Sainte Thérèse de l'Enfant Jésus",
    },
    {
      id: 6,
      name: "Bougie de Dévotion",
      price: "8,00 €",
      image: "/elegant-catholic-devotion-candle.jpg",
      description: "Bougie artisanale pour les dévotions et la prière",
    },
  ],
  es: [
    {
      id: 1,
      name: "Rosario del Sagrado Corazón",
      price: "15,00 €",
      image: "/beautiful-catholic-rosary-with-sacred-heart-medal.jpg",
      description: "Rosario artesanal con medalla del Sagrado Corazón de Jesús",
    },
    {
      id: 2,
      name: "Libro de Oraciones Marianas",
      price: "12,00 €",
      image: "/elegant-catholic-prayer-book-with-virgin-mary-cove.jpg",
      description: "Colección de las más bellas oraciones a Nuestra Señora",
    },
    {
      id: 3,
      name: "Escapulario del Carmen",
      price: "10,00 €",
      image: "/traditional-brown-scapular-of-our-lady-of-mount-ca.jpg",
      description: "Escapulario tradicional de Nuestra Señora del Carmen",
    },
    {
      id: 4,
      name: "Estatua de San José",
      price: "22,00 €",
      image: "/placeholder-9he95.png",
      description: "Estatua artesanal de San José con el Niño Jesús",
    },
    {
      id: 5,
      name: "Novena de Santa Teresita",
      price: "6,00 €",
      image: "/delicate-prayer-booklet-with-saint-therese-of-lisi.jpg",
      description: "Novena completa de Santa Teresita del Niño Jesús",
    },
    {
      id: 6,
      name: "Vela de Devoción",
      price: "8,00 €",
      image: "/elegant-catholic-devotion-candle.jpg",
      description: "Vela artesanal para devociones y oración",
    },
  ],
}

export function ProductsShowcase() {
  const { language, t } = useLanguage()
  const content = products[language].slice(0, 3)

  return (
    <section id="store" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-sans font-light text-foreground mb-4 text-balance">
            {t.productsTitle}
          </h2>
          <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto leading-relaxed">
            {t.productsSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 bg-card border-border/50 h-full flex flex-col"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="aspect-[3/2] relative mb-4 overflow-hidden rounded-lg bg-secondary/20">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-2">{product.name}</h3>
                  <p className="text-muted-foreground font-serif text-sm mb-4 leading-relaxed">{product.description}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-sans font-light text-accent">{product.price}</span>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif rounded-full"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {t.productBuy}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif px-8 py-3 text-lg rounded-full">
            {t.productsButton}
          </Button>
        </div>
      </div>
    </section>
  )
}
