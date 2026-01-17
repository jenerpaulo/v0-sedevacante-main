"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

const products = {
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
  ],
  en: [
    {
      id: 1,
      name: "Sacred Heart Rosary",
      price: "$25.00",
      image: "/beautiful-catholic-rosary-with-sacred-heart-medal.jpg",
      description: "Handcrafted rosary with Sacred Heart of Jesus medal",
    },
    {
      id: 2,
      name: "Marian Prayer Book",
      price: "$18.00",
      image: "/elegant-catholic-prayer-book-with-virgin-mary-cove.jpg",
      description: "Collection of beautiful prayers to Our Lady",
    },
    {
      id: 3,
      name: "Scapular of Mount Carmel",
      price: "$15.00",
      image: "/traditional-brown-scapular-of-our-lady-of-mount-ca.jpg",
      description: "Traditional scapular of Our Lady of Mount Carmel",
    },
    {
      id: 4,
      name: "Saint Joseph Image",
      price: "$36.00",
      image: "/placeholder-9he95.png",
      description: "Handcrafted image of Saint Joseph with the Christ Child",
    },
    {
      id: 5,
      name: "Saint Thérèse Novena",
      price: "$10.00",
      image: "/delicate-prayer-booklet-with-saint-therese-of-lisi.jpg",
      description: "Complete novena to Saint Thérèse of the Child Jesus",
    },
  ],
}

export function ProductSlideshow() {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products[language].length)
    }, 4000)

    return () => clearInterval(timer)
  }, [language])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products[language].length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products[language].length) % products[language].length)
  }

  const currentProduct = products[language][currentIndex]

  return (
    <div className="w-full">
      <div className="relative flex flex-col items-center">
        <Card className="w-full max-w-sm group hover:shadow-lg transition-all duration-300 bg-card border-border/50">
          <CardContent className="p-6">
            <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-secondary/20">
              <Image
                src={currentProduct.image || "/placeholder.svg"}
                alt={currentProduct.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-serif font-semibold text-foreground mb-2">{currentProduct.name}</h3>
            <p className="text-muted-foreground font-serif text-sm mb-4 leading-relaxed">
              {currentProduct.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-sans font-light text-accent">{currentProduct.price}</span>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif rounded-full"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {language === "en" ? "Buy" : "Comprar"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full border-border hover:bg-secondary bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full border-border hover:bg-secondary bg-transparent"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {products[language].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
