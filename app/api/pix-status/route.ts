import { NextRequest, NextResponse } from "next/server"

const OPENPIX_API = "https://api.openpix.com.br/api/v1/charge"
const OPENPIX_KEY = "Q2xpZW50X0lkXzU3ZmVkNmYyLTkwOGYtNDliZi1hODgyLTY5YzcyNmJhMjUzMTpDbGllbnRfU2VjcmV0X2pSZmR6LzFUUFJRazFScGJHWW55V1VTclpMd0Z6U293VjZUdCtndXcyc2c9"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID obrigatório" }, { status: 400 })
    }

    const res = await fetch(`${OPENPIX_API}/${id}`, {
      method: "GET",
      headers: {
        Authorization: OPENPIX_KEY,
        "Content-Type": "application/json",
      },
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: "Erro ao consultar status" }, { status: 502 })
    }

    // OpenPix statuses: ACTIVE (pending), COMPLETED (paid), EXPIRED
    const status = data.charge?.status || "UNKNOWN"
    const paidAt = data.charge?.paidAt || null
    const value = data.charge?.value || 0

    return NextResponse.json({ status, paidAt, value })
  } catch (err) {
    console.error("PIX status error:", err)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
