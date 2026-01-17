"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

interface Product {
  id: number
  name: string
  nameEn: string
  price: string
  image: string
  category: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Terço de Madeira",
    nameEn: "Wooden Rosary",
    price: "R$ 45,00",
    image: "/beautiful-catholic-rosary-with-sacred-heart-medal.jpg",
    category: "rosaries",
  },
  {
    id: 2,
    name: "Missal Romano Tradicional",
    nameEn: "Traditional Roman Missal",
    price: "R$ 120,00",
    image: "/elegant-catholic-prayer-book-with-virgin-mary-cove.jpg",
    category: "books",
  },
  {
    id: 3,
    name: "Escapulário de Nossa Senhora",
    nameEn: "Scapular of Our Lady",
    price: "R$ 35,00",
    image: "/traditional-brown-scapular-of-our-lady-of-mount-ca.jpg",
    category: "accessories",
  },
  {
    id: 4,
    name: "Vela de Cera de Abelha",
    nameEn: "Beeswax Candle",
    price: "R$ 28,00",
    image: "/traditional-beeswax-candle.jpg",
    category: "candles",
  },
  {
    id: 5,
    name: "Crucifixo de Parede",
    nameEn: "Wall Crucifix",
    price: "R$ 85,00",
    image: "/traditional-wall-crucifix.jpg",
    category: "sacred-art",
  },
  {
    id: 6,
    name: "Terço de Prata",
    nameEn: "Silver Rosary",
    price: "R$ 180,00",
    image: "/silver-rosary-beads.jpg",
    category: "rosaries",
  },
  {
    id: 7,
    name: "Livro de Orações",
    nameEn: "Prayer Book",
    price: "R$ 65,00",
    image: "/traditional-catholic-prayer-book.jpg",
    category: "books",
  },
  {
    id: 8,
    name: "Medalha Milagrosa",
    nameEn: "Miraculous Medal",
    price: "R$ 25,00",
    image: "/miraculous-medal.jpg",
    category: "accessories",
  },
]

const categories = {
  all: { pt: "Todos", en: "All" },
  rosaries: { pt: "Terços", en: "Rosaries" },
  books: { pt: "Livros", en: "Books" },
  accessories: { pt: "Acessórios", en: "Accessories" },
  candles: { pt: "Velas", en: "Candles" },
  "sacred-art": { pt: "Arte Sacra", en: "Sacred Art" },
}

interface StoreProductsProps {
  language: "en" | "pt"
}

export function StoreProducts({ language }: StoreProductsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const filteredProducts = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-sans font-light text-foreground mb-4">
            {language === "en" ? "Our Products" : "Nossos Produtos"}
          </h2>
          <p className="text-lg text-muted-foreground font-serif">
            {language === "en"
              ? "Browse our collection of traditional Catholic devotional items"
              : "Navegue por nossa coleção de itens devocionais católicos tradicionais"}
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
          <TabsList className="flex flex-wrap justify-center gap-2 mb-12 bg-transparent h-auto">
            {Object.entries(categories).map(([key, value]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-serif px-6 py-2"
              >
                {value[language]}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-square relative overflow-hidden bg-stone-100">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={language === "en" ? product.nameEn : product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-serif font-semibold text-foreground">
                        {language === "en" ? product.nameEn : product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-sans font-bold text-primary">{product.price}</span>
                        <Button size="sm" className="gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          {language === "en" ? "Add" : "Adicionar"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
