"use client"
import Image from "next/image"
import { ProductSlideshow } from "@/components/product-slideshow"
import { StoreProducts } from "@/components/store-products"
import { useLanguage } from "@/lib/language-context"

const Page = () => {
  const { language } = useLanguage()

  const aboutText = {
    en: {
      title: "About Traditional Devotional Arts",
      description:
        "We are dedicated to preserving and sharing authentic Catholic devotional items. Each product is carefully selected to support your spiritual journey and connection to the Church.",
    },
    pt: {
      title: "Sobre Devotional Arts Tradicional",
      description:
        "Somos dedicados a preservar e compartilhar itens devocionais católicos autênticos. Cada produto é cuidadosamente selecionado para apoiar sua jornada espiritual e conexão com a Igreja.",
    },
  }

  return (
    <div>
      <header className="bg-[#82071B] text-white py-4 border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <a href="/">
            <Image
              src="/images/store-sedevacante.png"
              alt="Sedevacante Store"
              width={200}
              height={60}
              className="h-12 w-auto hover:opacity-80 transition"
            />
          </a>
          <nav className="hidden md:flex gap-8 text-sm">
            <a href="/" className="hover:text-yellow-200 transition">
              {language === "en" ? "Home" : "Início"}
            </a>
            <a href="/" className="hover:text-yellow-200 transition">
              {language === "en" ? "Updates" : "Atualizações"}
            </a>
            <a href="/" className="hover:text-yellow-200 transition">
              {language === "en" ? "Articles" : "Artigos"}
            </a>
            <a href="/store" className="hover:text-yellow-200 transition">
              {language === "en" ? "Store" : "Loja"}
            </a>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-b from-stone-900 to-stone-800 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-light mb-4 text-white">Traditional</h1>
              <h2 className="text-3xl md:text-4xl font-serif italic mb-6 text-yellow-100">Devotional Arts</h2>
              <p className="text-lg text-gray-200 font-serif leading-relaxed">
                {language === "en"
                  ? "Every item is selected to support your spiritual life and the mission of the Church."
                  : "Cada item é selecionado para apoiar sua vida espiritual e a missão da Igreja."}
              </p>
            </div>
            <div className="flex justify-center">
              <ProductSlideshow />
            </div>
          </div>
        </div>
      </section>

      <StoreProducts language={language} />

      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-light mb-6 text-stone-900">{aboutText[language].title}</h2>
            <p className="text-lg text-stone-600 font-serif leading-relaxed mb-8">{aboutText[language].description}</p>
            <p className="text-sm text-stone-500 italic">
              {language === "en"
                ? "Shop with us to support the traditional Catholic faith."
                : "Compre conosco para apoiar a fé católica tradicional."}
            </p>
          </div>
        </div>
      </section>

      {/* <PreviewWarningBar /> */}
    </div>
  )
}

export default Page
