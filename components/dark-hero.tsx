"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
]

export function DarkHero() {
  const { t, language, setLanguage } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href")
    if (href?.startsWith("#")) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
    // Links sem # (ex: /store) navegam normalmente
  }

  return (
    <section id="home" className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image src="/images/bishops-02.jpg" alt="Traditional Catholic Mass" fill className="object-cover" priority />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="absolute top-0 left-0 z-20 p-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/sedevacante-logo.png" alt="Sedevacante Logo" width={120} height={40} className="h-12 w-auto" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="absolute top-0 right-0 z-20 p-8 hidden lg:block">
        <ul className="flex gap-8 text-white/80 font-serif text-sm">
          <li>
            <a
              href="#home"
              onClick={handleNavClick}
              className="hover:text-accent transition-colors uppercase tracking-widest"
            >
              {t.navHome}
            </a>
          </li>
          <li>
            <a
              href="#updates"
              onClick={handleNavClick}
              className="hover:text-accent transition-colors uppercase tracking-widest"
            >
              {t.navUpdates}
            </a>
          </li>
          <li>
            <a
              href="#articles"
              onClick={handleNavClick}
              className="hover:text-accent transition-colors uppercase tracking-widest"
            >
              {t.navArticles}
            </a>
          </li>
          <li>
            <a
              href="#communities"
              onClick={handleNavClick}
              className="hover:text-accent transition-colors uppercase tracking-widest"
            >
              {t.navCommunities}
            </a>
          </li>
          <li>
            <a
              href="#videos"
              onClick={handleNavClick}
              className="hover:text-accent transition-colors uppercase tracking-widest"
            >
              {t.navVideos}
            </a>
          </li>
          <li>
            <a
              href="#downloadables"
              onClick={handleNavClick}
              className="hover:text-accent transition-colors uppercase tracking-widest"
            >
              {t.navDownloadables}
            </a>
          </li>
          <li>
            <a
              href="/store"
              onClick={handleNavClick}
              className="hover:text-accent transition-colors uppercase tracking-widest font-bold"
            >
              {t.navStore}
            </a>
          </li>
        </ul>
      </nav>

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="absolute top-0 right-0 z-20 p-8 lg:hidden text-white"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="absolute top-20 right-8 z-20 lg:hidden flex flex-col gap-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              language === lang.code
                ? "bg-red-900 text-white border border-gold-500"
                : "bg-red-950 text-gray-300 border border-red-800 hover:bg-red-900"
            }`}
          >
            <span>
              {lang.flag} {lang.code.toUpperCase()}
            </span>
          </button>
        ))}
      </div>

      {mobileMenuOpen && (
        <nav className="absolute top-20 right-0 z-20 w-full bg-black/95 p-6 lg:hidden border-b border-accent/30">
          <ul className="flex flex-col gap-4 text-white/80 font-serif text-sm">
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  setMobileMenuOpen(false)
                  handleNavClick(e)
                }}
                className="hover:text-accent transition-colors uppercase tracking-widest block py-2"
              >
                {t.navHome}
              </a>
            </li>
            <li>
              <a
                href="#updates"
                onClick={(e) => {
                  setMobileMenuOpen(false)
                  handleNavClick(e)
                }}
                className="hover:text-accent transition-colors uppercase tracking-widest block py-2"
              >
                {t.navUpdates}
              </a>
            </li>
            <li>
              <a
                href="#articles"
                onClick={(e) => {
                  setMobileMenuOpen(false)
                  handleNavClick(e)
                }}
                className="hover:text-accent transition-colors uppercase tracking-widest block py-2"
              >
                {t.navArticles}
              </a>
            </li>
            <li>
              <a
                href="#communities"
                onClick={(e) => {
                  setMobileMenuOpen(false)
                  handleNavClick(e)
                }}
                className="hover:text-accent transition-colors uppercase tracking-widest block py-2"
              >
                {t.navCommunities}
              </a>
            </li>
            <li>
              <a
                href="#videos"
                onClick={(e) => {
                  setMobileMenuOpen(false)
                  handleNavClick(e)
                }}
                className="hover:text-accent transition-colors uppercase tracking-widest block py-2"
              >
                {t.navVideos}
              </a>
            </li>
            <li>
              <a
                href="#downloadables"
                onClick={(e) => {
                  setMobileMenuOpen(false)
                  handleNavClick(e)
                }}
                className="hover:text-accent transition-colors uppercase tracking-widest block py-2"
              >
                {t.navDownloadables}
              </a>
            </li>
            <li>
              <a
                href="/store"
                onClick={(e) => {
                  setMobileMenuOpen(false)
                  handleNavClick(e)
                }}
                className="hover:text-accent transition-colors uppercase tracking-widest font-bold block py-2 text-accent"
              >
                {t.navStore}
              </a>
            </li>
          </ul>
        </nav>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 flex items-center justify-center">
        <div className="text-center max-w-3xl space-y-8">
          {/* Cross symbol */}
          <div className="flex justify-center mb-6">
            <div className="text-6xl text-accent">✝</div>
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl lg:text-8xl font-sans font-light text-white leading-tight text-balance">
              {t.heroTitle}
            </h1>
            <p className="text-2xl lg:text-3xl text-amber-100 font-serif leading-relaxed">{t.heroTagline}</p>
          </div>

          <div className="space-y-6">
            <p className="text-lg lg:text-xl text-gray-200 font-serif leading-relaxed max-w-2xl mx-auto">
              {t.heroDescription}
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="https://fund.sedevacante.online/">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-black font-serif px-8 py-3 rounded-lg text-base font-semibold"
                >
                  {t.heroButton1}
                </Button>
              </Link>
            </div>

            <div className="text-white text-sm font-serif pt-4">{t.heroScroll}</div>
            <div className="text-white">↓</div>
          </div>
        </div>
      </div>
    </section>
  )
}
