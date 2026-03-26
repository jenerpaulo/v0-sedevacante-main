import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.update({
      collection: "news",
      id: 1,
      data: { title: "Dom Rodrigo em Brasília-DF" },
      overrideAccess: true,
    })
    return NextResponse.json({ success: true, id: result.id })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack?.split("\n").slice(0, 8),
    })
  }
}
