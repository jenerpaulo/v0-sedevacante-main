"use client"

import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const locations = {
  en: [
    {
      id: 1,
      name: "Chapelle Saint Pie V",
      country: "France",
      address: "14 Rue du Pré du Bois, 35000 Rennes",
      email: "info@chapelle-saint-pie-v.fr",
      phone: "",
      priest: "Fr. Chaplain",
      image: "/images/chapelle-saint-pie-v.webp",
      website: "https://www.chapelle-saint-pie-v.fr",
    },
    {
      id: 2,
      name: "Mission Saint Benoît",
      country: "France",
      address: "Chapelle du Sacré-Cœur, La Houssière, 37600 Varennes",
      email: "guillaume.hecquard@laposte.net",
      phone: "33626541978",
      priest: "Fr. Guillaume Hecquard",
      image: "/images/mission-saint-benoit.png",
      website: "",
    },
    {
      id: 3,
      name: "Mission Benoît",
      country: "France",
      address: "Prieuré Notre-Dame de Vignemont, 7 chemin de la chapelle de Vignemont, 37600 Loches",
      email: "guillaume.hecquard@laposte.net",
      phone: "33626541978",
      priest: "Fr. Guillaume Hecquard",
      image: "/images/mission-benoit.png",
      website: "",
    },
    {
      id: 4,
      name: "Our Lady of Joy Mission",
      country: "Canada",
      address: "1270 Gorge Rd. Stilesville, New Brunswick E1G 3E5",
      email: "site.latinmassmaritimes@gmail.com",
      phone: "15062271571",
      priest: "Fr. Chaplain",
      image: "/images/our-lady-of-joy-mission.webp",
      website: "https://www.latinmassmaritimes.org/accueil",
    },
    {
      id: 5,
      name: "Mexico City",
      country: "Mexico",
      address: "654 Sacred Avenue - CDMX",
      email: "mexico@sedevacante.com",
      whatsapp: "525512345678",
      priest: "Fr. Miguel Ángel García",
      image: "/mexican-colonial-catholic-church.jpg",
    },
    {
      id: 6,
      name: "Paris",
      country: "France",
      address: "987 Cathedral Street - Paris",
      email: "paris@sedevacante.com",
      whatsapp: "33123456789",
      priest: "Fr. François Dupont",
      image: "/french-gothic-catholic-cathedral-paris.jpg",
    },
    {
      id: 7,
      name: "Warsaw",
      country: "Poland",
      address: "147 Faith Street - Warsaw",
      email: "varsovia@sedevacante.com",
      whatsapp: "48223456789",
      priest: "Fr. Stanisław Kowalski",
      image: "/polish-catholic-basilica-church.jpg",
    },
    {
      id: 8,
      name: "Madrid",
      country: "Spain",
      address: "258 Apostle Street - Madrid",
      email: "madrid@sedevacante.com",
      whatsapp: "34912345678",
      priest: "Fr. Javier Ruiz",
      image: "/spanish-catholic-church-madrid.jpg",
    },
    {
      id: 9,
      name: "Vienna",
      country: "Austria",
      address: "369 Faith Street - Vienna",
      email: "vienna@sedevacante.com",
      whatsapp: "43123456789",
      priest: "Fr. Joseph Müller",
      image: "/austrian-gothic-catholic-cathedral.jpg",
    },
    {
      id: 10,
      name: "Singapore",
      country: "Singapore",
      address: "741 Catholic Street - Singapore",
      email: "singapore@sedevacante.com",
      whatsapp: "6581234567",
      priest: "Fr. Thomas Tan",
      image: "/modern-catholic-church-singapore.jpg",
    },
  ],
  pt: [
    {
      id: 1,
      name: "Chapelle Saint Pie V",
      country: "França",
      address: "14 Rue du Pré du Bois, 35000 Rennes",
      email: "info@chapelle-saint-pie-v.fr",
      phone: "",
      priest: "Pe. Capelão",
      image: "/images/chapelle-saint-pie-v.webp",
      website: "https://www.chapelle-saint-pie-v.fr",
    },
    {
      id: 2,
      name: "Mission Saint Benoît",
      country: "França",
      address: "Chapelle du Sacré-Cœur, La Houssière, 37600 Varennes",
      email: "guillaume.hecquard@laposte.net",
      phone: "33626541978",
      priest: "Pe. Guillaume Hecquard",
      image: "/images/mission-saint-benoit.png",
      website: "",
    },
    {
      id: 3,
      name: "Mission Benoît",
      country: "França",
      address: "Prieuré Notre-Dame de Vignemont, 7 chemin de la chapelle de Vignemont, 37600 Loches",
      email: "guillaume.hecquard@laposte.net",
      phone: "33626541978",
      priest: "Pe. Guillaume Hecquard",
      image: "/images/mission-benoit.png",
      website: "",
    },
    {
      id: 4,
      name: "Nossa Senhora da Alegria - Missão",
      country: "Canadá",
      address: "1270 Gorge Rd. Stilesville, New Brunswick E1G 3E5",
      email: "site.latinmassmaritimes@gmail.com",
      phone: "15062271571",
      priest: "Pe. Capelão",
      image: "/images/our-lady-of-joy-mission.webp",
      website: "https://www.latinmassmaritimes.org/accueil",
    },
    {
      id: 5,
      name: "México City",
      country: "México",
      address: "Avenida Sagrada, 654 - CDMX",
      email: "mexico@sedevacante.com",
      whatsapp: "525512345678",
      priest: "Pe. Miguel Ángel García",
      image: "/mexican-colonial-catholic-church.jpg",
    },
    {
      id: 6,
      name: "Paris",
      country: "França",
      address: "Rue de la Cathédrale, 987 - Paris",
      email: "paris@sedevacante.com",
      whatsapp: "33123456789",
      priest: "Pe. François Dupont",
      image: "/french-gothic-catholic-cathedral-paris.jpg",
    },
    {
      id: 7,
      name: "Varsóvia",
      country: "Polônia",
      address: "Ulica Wiary, 147 - Varsóvia",
      email: "varsovia@sedevacante.com",
      whatsapp: "48223456789",
      priest: "Pe. Stanisław Kowalski",
      image: "/polish-catholic-basilica-church.jpg",
    },
    {
      id: 8,
      name: "Madrid",
      country: "Espanha",
      address: "Calle del Apostol, 258 - Madrid",
      email: "madrid@sedevacante.com",
      whatsapp: "34912345678",
      priest: "Pe. Javier Ruiz",
      image: "/spanish-catholic-church-madrid.jpg",
    },
    {
      id: 9,
      name: "Viena",
      country: "Áustria",
      address: "Straße des Glaubens, 369 - Viena",
      email: "vienna@sedevacante.com",
      whatsapp: "43123456789",
      priest: "Pe. Joseph Müller",
      image: "/austrian-gothic-catholic-cathedral.jpg",
    },
    {
      id: 10,
      name: "Singapura",
      country: "Singapura",
      address: "Catholic Street, 741 - Singapura",
      email: "singapore@sedevacante.com",
      whatsapp: "6581234567",
      priest: "Pe. Thomas Tan",
      image: "/modern-catholic-church-singapore.jpg",
    },
  ],
  fr: [
    {
      id: 1,
      name: "Chapelle Saint Pie V",
      country: "France",
      address: "14 Rue du Pré du Bois, 35000 Rennes",
      email: "info@chapelle-saint-pie-v.fr",
      phone: "",
      priest: "P. Chapelain",
      image: "/images/chapelle-saint-pie-v.webp",
      website: "https://www.chapelle-saint-pie-v.fr",
    },
    {
      id: 2,
      name: "Mission Saint Benoît",
      country: "France",
      address: "Chapelle du Sacré-Cœur, La Houssière, 37600 Varennes",
      email: "guillaume.hecquard@laposte.net",
      phone: "33626541978",
      priest: "P. Guillaume Hecquard",
      image: "/images/mission-saint-benoit.png",
      website: "",
    },
    {
      id: 3,
      name: "Mission Benoît",
      country: "France",
      address: "Prieuré Notre-Dame de Vignemont, 7 chemin de la chapelle de Vignemont, 37600 Loches",
      email: "guillaume.hecquard@laposte.net",
      phone: "33626541978",
      priest: "P. Guillaume Hecquard",
      image: "/images/mission-benoit.png",
      website: "",
    },
    {
      id: 4,
      name: "Mission Notre-Dame de Joie",
      country: "Canada",
      address: "1270 Gorge Rd. Stilesville, Nouveau-Brunswick E1G 3E5",
      email: "site.latinmassmaritimes@gmail.com",
      phone: "15062271571",
      priest: "P. Chapelain",
      image: "/images/our-lady-of-joy-mission.webp",
      website: "https://www.latinmassmaritimes.org/accueil",
    },
    {
      id: 5,
      name: "Mexico",
      country: "Mexique",
      address: "654 Avenue Sacrée - CDMX",
      email: "mexico@sedevacante.com",
      whatsapp: "525512345678",
      priest: "P. Miguel Ángel García",
      image: "/mexican-colonial-catholic-church.jpg",
    },
    {
      id: 6,
      name: "Paris",
      country: "France",
      address: "987 Rue de la Cathédrale - Paris",
      email: "paris@sedevacante.com",
      whatsapp: "33123456789",
      priest: "P. François Dupont",
      image: "/french-gothic-catholic-cathedral-paris.jpg",
    },
    {
      id: 7,
      name: "Varsovie",
      country: "Pologne",
      address: "147 Rue de la Foi - Varsovie",
      email: "varsovia@sedevacante.com",
      whatsapp: "48223456789",
      priest: "P. Stanisław Kowalski",
      image: "/polish-catholic-basilica-church.jpg",
    },
    {
      id: 8,
      name: "Madrid",
      country: "Espagne",
      address: "258 Rue de l'Apôtre - Madrid",
      email: "madrid@sedevacante.com",
      whatsapp: "34912345678",
      priest: "P. Javier Ruiz",
      image: "/spanish-catholic-church-madrid.jpg",
    },
    {
      id: 9,
      name: "Vienne",
      country: "Autriche",
      address: "369 Rue de la Foi - Vienne",
      email: "vienna@sedevacante.com",
      whatsapp: "43123456789",
      priest: "P. Joseph Müller",
      image: "/austrian-gothic-catholic-cathedral.jpg",
    },
    {
      id: 10,
      name: "Singapour",
      country: "Singapour",
      address: "741 Rue Catholique - Singapour",
      email: "singapore@sedevacante.com",
      whatsapp: "6581234567",
      priest: "P. Thomas Tan",
      image: "/modern-catholic-church-singapore.jpg",
    },
  ],
  es: [
    {
      id: 1,
      name: "Chapelle Saint Pie V",
      country: "Francia",
      address: "14 Rue du Pré du Bois, 35000 Rennes",
      email: "info@chapelle-saint-pie-v.fr",
      phone: "",
      priest: "P. Capellán",
      image: "/images/chapelle-saint-pie-v.webp",
      website: "https://www.chapelle-saint-pie-v.fr",
    },
    {
      id: 2,
      name: "Mission Saint Benoît",
      country: "Francia",
      address: "Chapelle du Sacré-Cœur, La Houssière, 37600 Varennes",
      email: "guillaume.hecquard@laposte.net",
      phone: "33626541978",
      priest: "P. Guillaume Hecquard",
      image: "/images/mission-saint-benoit.png",
      website: "",
    },
    {
      id: 3,
      name: "Mission Benoît",
      country: "Francia",
      address: "Prieuré Notre-Dame de Vignemont, 7 chemin de la chapelle de Vignemont, 37600 Loches",
      email: "guillaume.hecquard@laposte.net",
      phone: "33626541978",
      priest: "P. Guillaume Hecquard",
      image: "/images/mission-benoit.png",
      website: "",
    },
    {
      id: 4,
      name: "Misión Nuestra Señora de la Alegría",
      country: "Canadá",
      address: "1270 Gorge Rd. Stilesville, Nuevo Brunswick E1G 3E5",
      email: "site.latinmassmaritimes@gmail.com",
      phone: "15062271571",
      priest: "P. Capellán",
      image: "/images/our-lady-of-joy-mission.webp",
      website: "https://www.latinmassmaritimes.org/accueil",
    },
    {
      id: 5,
      name: "Ciudad de México",
      country: "México",
      address: "Avenida Sagrada, 654 - CDMX",
      email: "mexico@sedevacante.com",
      whatsapp: "525512345678",
      priest: "P. Miguel Ángel García",
      image: "/mexican-colonial-catholic-church.jpg",
    },
    {
      id: 6,
      name: "París",
      country: "Francia",
      address: "987 Calle de la Catedral - París",
      email: "paris@sedevacante.com",
      whatsapp: "33123456789",
      priest: "P. François Dupont",
      image: "/french-gothic-catholic-cathedral-paris.jpg",
    },
    {
      id: 7,
      name: "Varsovia",
      country: "Polonia",
      address: "147 Calle de la Fe - Varsovia",
      email: "varsovia@sedevacante.com",
      whatsapp: "48223456789",
      priest: "P. Stanisław Kowalski",
      image: "/polish-catholic-basilica-church.jpg",
    },
    {
      id: 8,
      name: "Madrid",
      country: "España",
      address: "258 Calle del Apóstol - Madrid",
      email: "madrid@sedevacante.com",
      whatsapp: "34912345678",
      priest: "P. Javier Ruiz",
      image: "/spanish-catholic-church-madrid.jpg",
    },
    {
      id: 9,
      name: "Viena",
      country: "Austria",
      address: "369 Calle de la Fe - Viena",
      email: "vienna@sedevacante.com",
      whatsapp: "43123456789",
      priest: "P. Joseph Müller",
      image: "/austrian-gothic-catholic-cathedral.jpg",
    },
    {
      id: 10,
      name: "Singapur",
      country: "Singapur",
      address: "741 Calle Católica - Singapur",
      email: "singapore@sedevacante.com",
      whatsapp: "6581234567",
      priest: "P. Thomas Tan",
      image: "/modern-catholic-church-singapore.jpg",
    },
  ],
}

export function LocationsSection() {
  const { language, t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const content = locations[language].slice(0, 6)
  const firstFourLocations = content.slice(0, 4)
  const displayContent = isMobile ? [firstFourLocations[currentIndex]] : content

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + firstFourLocations.length) % firstFourLocations.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % firstFourLocations.length)
  }

  return (
    <section id="communities" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-sans font-light text-foreground text-balance">{t.locationsTitle}</h2>
          <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">{t.locationsSubtitle}</p>
        </div>

        {isMobile ? (
          <div className="space-y-6">
            <div className="relative">
              <div className="grid grid-cols-1 gap-8">
                {displayContent.map((location) => (
                  <div
                    key={location.id}
                    className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video bg-secondary/30 overflow-hidden relative">
                      <img
                        src={location.image || "/placeholder.svg"}
                        alt={location.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="text-lg font-sans font-semibold text-foreground">{location.name}</h3>
                        <p className="text-sm text-muted-foreground font-serif">{location.country}</p>
                      </div>

                      <div className="space-y-2 text-sm font-serif text-muted-foreground">
                        <p className="line-clamp-2">{location.address}</p>
                        <p className="font-semibold text-foreground">{location.priest}</p>
                      </div>

                      <div className="flex gap-2 pt-2">
                        {location.email && (
                          <a
                            href={`mailto:${location.email}`}
                            className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-serif rounded transition-colors"
                          >
                            Email
                          </a>
                        )}
                        {location.phone && (
                          <a
                            href={`tel:${location.phone}`}
                            className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-serif rounded transition-colors"
                          >
                            Phone
                          </a>
                        )}
                        {location.whatsapp && (
                          <a
                            href={`https://wa.me/${location.whatsapp.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 text-xs font-serif rounded transition-colors"
                          >
                            WhatsApp
                          </a>
                        )}
                        {location.website && (
                          <a
                            href={location.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs font-serif rounded transition-colors"
                          >
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
                  aria-label="Previous location"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {firstFourLocations.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? "bg-primary" : "bg-border"
                      }`}
                      aria-label={`Go to location ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
                  aria-label="Next location"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-center mt-6">
                <button className="px-8 py-3 border border-primary text-primary hover:bg-primary/10 font-serif font-semibold rounded transition-colors">
                  {t.seeAll}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayContent.map((location) => (
              <div
                key={location.id}
                className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-secondary/30 overflow-hidden relative">
                  <img
                    src={location.image || "/placeholder.svg"}
                    alt={location.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-lg font-sans font-semibold text-foreground">{location.name}</h3>
                    <p className="text-sm text-muted-foreground font-serif">{location.country}</p>
                  </div>

                  <div className="space-y-2 text-sm font-serif text-muted-foreground">
                    <p className="line-clamp-2">{location.address}</p>
                    <p className="font-semibold text-foreground">{location.priest}</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {location.email && (
                      <a
                        href={`mailto:${location.email}`}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-serif rounded transition-colors"
                      >
                        Email
                      </a>
                    )}
                    {location.phone && (
                      <a
                        href={`tel:${location.phone}`}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-serif rounded transition-colors"
                      >
                        Phone
                      </a>
                    )}
                    {location.whatsapp && (
                      <a
                        href={`https://wa.me/${location.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 text-xs font-serif rounded transition-colors"
                      >
                        WhatsApp
                      </a>
                    )}
                    {location.website && (
                      <a
                        href={location.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs font-serif rounded transition-colors"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
