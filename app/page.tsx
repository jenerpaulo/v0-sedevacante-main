import { DarkHero } from "@/components/dark-hero"
import { LatestUpdates } from "@/components/latest-updates"
import { PostsSlider } from "@/components/posts-slider"
import { LocationsSection } from "@/components/locations-section"
import { VideoSection } from "@/components/video-section"
import { ProductsShowcase } from "@/components/products-showcase"
import { DownloadablesSection } from "@/components/downloadables-section"
import { Footer } from "@/components/footer"
import { LanguageToggle } from "@/components/language-toggle"
import { PreviewWarningBar } from "@/components/preview-warning-bar"

export default function Home() {
  return (
    <main className="min-h-screen">
      <LanguageToggle />
      <DarkHero />
      <LatestUpdates />
      <PostsSlider />
      <LocationsSection />
      <VideoSection />
      <DownloadablesSection />
      <ProductsShowcase />
      <Footer />
      {/* <WhatsAppFloat /> */}
      <PreviewWarningBar />
    </main>
  )
}
