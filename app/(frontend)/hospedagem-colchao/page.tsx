"use client"

import { useState, useEffect, type FormEvent } from "react"

type Step = "form" | "processing" | "pix" | "confirmed"

export default function HospedagemColchaoPage() {
  const VALOR = 200
  const [form, setForm] = useState({ name: "", email: "", observation: "" })
  const [step, setStep] = useState<Step>("form")
  const [pixData, setPixData] = useState<{ brCode: string; qrCodeImage: string; correlationID: string } | null>(null)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (step !== "pix" || !pixData?.correlationID) return
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/pix-status?id=${pixData.correlationID}`)
        const data = await res.json()
        if (data.status === "COMPLETED") { setStep("confirmed"); clearInterval(interval) }
      } catch {}
    }, 3000)
    return () => clearInterval(interval)
  }, [step, pixData?.correlationID])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); setError(""); setStep("processing")
    try {
      const res = await fetch("/api/pix-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          amount: VALOR,
          observation: `Hospedagem Colchao 1-5 Abril${form.observation ? " | " + form.observation : ""}`,
        }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      if (data?.brCode) {
        setPixData({ brCode: data.brCode, qrCodeImage: data.qrCodeImage, correlationID: data.correlationID || "" })
        setStep("pix")
      } else { setError("Erro ao gerar PIX."); setStep("form") }
    } catch { setError("Erro ao processar. Tente novamente."); setStep("form") }
  }

  return (
    <div className="min-h-screen bg-[#0C0A09] flex items-start sm:items-center justify-center px-4 pt-24 pb-10 sm:py-20">
      <div className="max-w-md w-full">
        <div className="rounded-2xl bg-gradient-to-br from-[rgba(201,168,76,0.08)] to-[rgba(201,168,76,0.02)] border border-[rgba(201,168,76,0.15)] p-6 sm:p-8 text-center">
          <span className="text-[#C9A84C] text-3xl block mb-3">&#10013;</span>
          <h1 className="font-cinzel-decorative text-xl sm:text-2xl font-bold mb-1" style={{ color: "#C9A84C" }}>
            Hospedagem Colchao
          </h1>
          <p className="text-[#B8AEA2] text-sm mb-1">Semana Santa 2026 — 1 a 5 de Abril</p>
          <p className="text-[#8A8078] text-xs mb-4">Sem alimentacao</p>
          <div className="inline-block bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] rounded-xl px-6 py-3 mb-6">
            <span className="text-[#C9A84C] text-2xl font-bold">R$ {VALOR},00</span>
          </div>

          {step === "form" && (
            <form onSubmit={handleSubmit} className="text-left space-y-3">
              {error && <div className="p-3 rounded-lg bg-red-900/20 border border-red-800/30 text-red-300 text-sm">{error}</div>}
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm bg-[#1A1714] border border-[rgba(201,168,76,0.12)] text-[#E8E0D4] placeholder-[#6A6058] focus:border-[rgba(201,168,76,0.4)] focus:outline-none" placeholder="Seu nome" />
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm bg-[#1A1714] border border-[rgba(201,168,76,0.12)] text-[#E8E0D4] placeholder-[#6A6058] focus:border-[rgba(201,168,76,0.4)] focus:outline-none" placeholder="Seu e-mail" />
              <div>
                <textarea maxLength={200} value={form.observation} onChange={(e) => setForm({ ...form, observation: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-[#1A1714] border border-[rgba(201,168,76,0.12)] text-[#E8E0D4] placeholder-[#6A6058] focus:border-[rgba(201,168,76,0.4)] focus:outline-none resize-none"
                  placeholder="Observacao (opcional)" rows={2} />
                <p className="text-xs text-[#6A6058] text-right mt-1">{form.observation.length}/200</p>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl text-sm font-bold bg-[#C9A84C] hover:bg-[#b89a3e] text-[#0C0A09] transition-colors">
                Pagar R$ {VALOR},00 via PIX
              </button>
            </form>
          )}

          {step === "processing" && (
            <div className="py-8"><div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin mx-auto mb-3" /><p className="text-[#B8AEA2] text-sm">Gerando PIX...</p></div>
          )}

          {step === "pix" && pixData && (
            <div className="space-y-4 mt-4">
              <div className="inline-flex items-center gap-2 bg-[rgba(201,168,76,0.1)] text-[#C9A84C] px-4 py-2 rounded-full text-sm font-medium">Aguardando pagamento</div>
              {pixData.qrCodeImage && <div className="flex justify-center"><div className="bg-white p-3 rounded-xl"><img src={pixData.qrCodeImage} alt="QR Code PIX" className="w-40 h-40" /></div></div>}
              {pixData.brCode && (
                <div className="text-left">
                  <label className="block text-sm text-[#B8AEA2] mb-1">Codigo PIX:</label>
                  <div className="flex items-center gap-2">
                    <input type="text" readOnly value={pixData.brCode} className="flex-1 px-3 py-2 rounded-xl text-xs font-mono bg-[#1A1714] border border-[rgba(201,168,76,0.12)] text-[#E8E0D4]" />
                    <button onClick={() => { navigator.clipboard.writeText(pixData.brCode); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                      className="px-3 py-2 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] text-[#C9A84C] text-sm">{copied ? "Copiado" : "Copiar"}</button>
                  </div>
                </div>
              )}
              <p className="text-xs text-[#8A8078]">A confirmacao aparecera automaticamente apos o pagamento</p>
            </div>
          )}

          {step === "confirmed" && (
            <div className="py-6">
              <div className="text-green-400 text-4xl mb-3">&#10003;</div>
              <h3 className="text-xl font-bold text-green-400 mb-2">Pagamento Confirmado!</h3>
              <p className="text-[#B8AEA2] text-sm">Obrigado, {form.name.split(" ")[0]}! Sua hospedagem esta reservada.</p>
              <p className="text-xs text-[#8A8078] mt-2">Que Deus abencoe.</p>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <a href="/semanasanta2026" className="text-sm text-[#8A8078] hover:text-[#C9A84C] transition-colors">Ver pagina da Semana Santa →</a>
        </div>
      </div>
    </div>
  )
}
