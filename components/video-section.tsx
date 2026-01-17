"use client"

import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"

const videos = {
  en: [
    {
      id: 1,
      title: "Sedevacantist - Message of Faith",
      src: "https://www.youtube.com/embed/Nm6onv77qOE?si=F9i8SPPBregMuw8d",
    },
    {
      id: 2,
      title: "Our Global Mission",
      src: "https://www.youtube.com/embed/_urhsh_MUh0?si=dcnQQpV5NcVBkbws",
    },
    {
      id: 3,
      title: "Tradition and Continuity",
      src: "https://www.youtube.com/embed/JbjVSLNVMPM?si=6694_wtqwWzVqJWV",
    },
  ],
  pt: [
    {
      id: 1,
      title: "Sedevacante - Mensagem de Fé",
      src: "https://www.youtube.com/embed/Nm6onv77qOE?si=F9i8SPPBregMuw8d",
    },
    {
      id: 2,
      title: "Nossa Missão Global",
      src: "https://www.youtube.com/embed/_urhsh_MUh0?si=dcnQQpV5NcVBkbws",
    },
    {
      id: 3,
      title: "Tradição e Continuidade",
      src: "https://www.youtube.com/embed/JbjVSLNVMPM?si=6694_wtqwWzVqJWV",
    },
  ],
  fr: [
    {
      id: 1,
      title: "Sédévacantiste - Message de Foi",
      src: "https://www.youtube.com/embed/Nm6onv77qOE?si=F9i8SPPBregMuw8d",
    },
    {
      id: 2,
      title: "Notre Mission Mondiale",
      src: "https://www.youtube.com/embed/_urhsh_MUh0?si=dcnQQpV5NcVBkbws",
    },
    {
      id: 3,
      title: "Tradition et Continuité",
      src: "https://www.youtube.com/embed/JbjVSLNVMPM?si=6694_wtqwWzVqJWV",
    },
  ],
  es: [
    {
      id: 1,
      title: "Sedevacantista - Mensaje de Fe",
      src: "https://www.youtube.com/embed/Nm6onv77qOE?si=F9i8SPPBregMuw8d",
    },
    {
      id: 2,
      title: "Nuestra Misión Global",
      src: "https://www.youtube.com/embed/_urhsh_MUh0?si=dcnQQpV5NcVBkbws",
    },
    {
      id: 3,
      title: "Tradición y Continuidad",
      src: "https://www.youtube.com/embed/JbjVSLNVMPM?si=6694_wtqwWzVqJWV",
    },
  ],
}

export function VideoSection() {
  const { language, t } = useLanguage()
  const content = videos[language]
  const [isMobile, setIsMobile] = useState(false)
  const displayContent = isMobile ? content.slice(0, 1) : content

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <section id="videos" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-sans font-light text-foreground text-balance">{t.videosTitle}</h2>
            <p className="text-lg text-muted-foreground font-serif">{t.videosSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {displayContent.map((video) => (
              <div key={video.id} className="space-y-4">
                <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={video.src}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <h3 className="text-center font-serif text-foreground text-base">{video.title}</h3>
              </div>
            ))}
          </div>

          {isMobile && (
            <div className="flex justify-center">
              <button className="px-8 py-3 border border-primary text-primary hover:bg-primary/10 font-serif font-semibold rounded transition-colors">
                {t.seeMore}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
