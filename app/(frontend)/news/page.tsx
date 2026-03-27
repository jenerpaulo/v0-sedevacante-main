import Link from "next/link"
import Image from "next/image"
import { getPayload } from "payload"
import config from "@payload-config"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Notícias | Sedevacante",
  description: "Últimas notícias e atualizações da comunidade católica tradicional.",
}

const labelMap: Record<string, string> = {
  news: "Notícia",
  highlight: "Destaque",
  featured: "Especial",
}

export default async function NewsPage() {
  let allNews: any[] = []

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: "news",
      where: { status: { equals: "published" } },
      sort: "-date",
      limit: 50,
      depth: 2,
    })
    allNews = result.docs
  } catch (e) {
    console.error("Error fetching news:", e)
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/#updates" className="text-primary hover:text-primary/80 font-serif">
            ← Voltar ao Início
          </Link>
          <h1 className="text-lg font-sans font-semibold text-foreground">Notícias</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-4xl font-sans font-light text-foreground mb-2 text-center">
          Todas as Notícias
        </h2>
        <p className="text-muted-foreground font-serif text-center mb-12">
          Atualizações e acontecimentos da comunidade
        </p>

        {allNews.length === 0 ? (
          <p className="text-center text-muted-foreground font-serif py-20">
            Nenhuma notícia publicada ainda.
          </p>
        ) : (
          <div className="grid gap-8">
            {allNews.map((item: any) => {
              const galleryCount = (item.gallery?.length || 0) + (item.image?.url ? 1 : 0)
              return (
                <article
                  key={item.id}
                  className="border border-border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow"
                >
                  <div className="grid md:grid-cols-3 gap-0">
                    {item.image?.url && (
                      <div className="relative aspect-video md:aspect-square overflow-hidden">
                        <Image
                          src={item.image.url}
                          alt={item.image.alt || item.title}
                          fill
                          className="object-cover"
                        />
                        {galleryCount > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded font-serif">
                            {galleryCount} fotos
                          </div>
                        )}
                      </div>
                    )}
                    <div className={`p-6 flex flex-col justify-between ${item.image?.url ? "md:col-span-2" : "md:col-span-3"}`}>
                      <div>
                        <Badge
                          className="w-fit mb-3 font-serif"
                          variant={item.label === "highlight" || item.label === "featured" ? "default" : "secondary"}
                        >
                          {labelMap[item.label] || item.label}
                        </Badge>
                        <h3 className="text-2xl font-sans font-semibold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground font-serif leading-relaxed mb-4 line-clamp-3">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground font-serif">
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
