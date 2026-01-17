import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "A Devoção ao Sagrado Coração de Jesus",
    excerpt:
      "Descubra a profundidade desta devoção milenar e como ela pode transformar sua vida espiritual através do amor infinito de Cristo.",
    image: "/sacred-heart-of-jesus-devotion-with-warm-golden-li.jpg",
    date: "15 de Janeiro, 2024",
    readTime: "5 min de leitura",
  },
  {
    id: 2,
    title: "O Poder do Terço na Vida Cristã",
    excerpt:
      "Explore os mistérios do Rosário e compreenda como esta oração pode ser um caminho de contemplação e paz interior.",
    image: "/beautiful-rosary-beads-with-soft-lighting-and-flow.jpg",
    date: "12 de Janeiro, 2024",
    readTime: "7 min de leitura",
  },
  {
    id: 3,
    title: "Santos Padroeiros: Intercessores do Céu",
    excerpt: "Conheça a vida dos santos e como suas intercessões podem nos guiar em momentos de dificuldade e alegria.",
    image: "/beautiful-catholic-saints-icons-with-golden-halos.jpg",
    date: "10 de Janeiro, 2024",
    readTime: "6 min de leitura",
  },
]

export function BlogSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-sans font-light text-foreground mb-4 text-balance">
            Reflexões Espirituais
          </h2>
          <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto leading-relaxed">
            Artigos e reflexões para nutrir sua alma e aprofundar sua fé católica
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="group hover:shadow-lg transition-all duration-300 bg-card border-border/50 overflow-hidden"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-serif mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3 leading-tight">{post.title}</h3>
                <p className="text-muted-foreground font-serif text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <Button variant="ghost" className="p-0 h-auto font-serif text-primary hover:text-primary/80 group">
                  Ler mais
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:bg-secondary font-serif px-8 py-3 rounded-full bg-transparent"
          >
            Ver Todos os Artigos
          </Button>
        </div>
      </div>
    </section>
  )
}
