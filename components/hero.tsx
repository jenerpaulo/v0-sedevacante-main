import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  return (
    <section className="min-h-screen bg-background flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-sans font-light text-foreground leading-tight text-balance">
                Devoções Católicas.
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground font-serif leading-relaxed">
                Um caminho para o céu
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground font-serif leading-relaxed max-w-md">
                Descubra as mais belas tradições católicas e encontre inspiração para sua jornada espiritual através de
                devoções que tocam o coração.
              </p>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif px-8 py-3 rounded-full"
                >
                  Explorar Devoções
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border hover:bg-secondary font-serif px-8 py-3 rounded-full bg-transparent"
                >
                  Saiba Mais
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            <div className="aspect-square relative overflow-hidden rounded-2xl bg-secondary/30">
              <Image
                src="/beautiful-catholic-church-interior-with-warm-golde.jpg"
                alt="Interior de igreja católica com luz dourada"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
