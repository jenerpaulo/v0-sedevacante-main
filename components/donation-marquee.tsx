"use client"

export function DonationMarquee() {
  const items = Array(8).fill("✦ Ajude o Site — Clique e Doe ✦")

  return (
    <a
      href="https://fund.sedevacante.online/"
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gradient-to-r from-[#82071B] via-[#A0091F] to-[#82071B] py-3 overflow-hidden cursor-pointer hover:brightness-110 transition-all group"
    >
      <div className="donation-marquee-track flex whitespace-nowrap">
        {items.map((text, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-8 text-sm sm:text-base font-bold tracking-widest uppercase text-[#D4AF37] group-hover:text-[#F0D060] transition-colors"
            style={{ fontFamily: "var(--font-cinzel-decorative), serif" }}
          >
            {text}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((text, i) => (
          <span
            key={`dup-${i}`}
            className="inline-flex items-center gap-2 px-8 text-sm sm:text-base font-bold tracking-widest uppercase text-[#D4AF37] group-hover:text-[#F0D060] transition-colors"
            style={{ fontFamily: "var(--font-cinzel-decorative), serif" }}
          >
            {text}
          </span>
        ))}
      </div>

      <style jsx>{`
        .donation-marquee-track {
          animation: marquee-scroll 30s linear infinite;
        }

        .donation-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </a>
  )
}
