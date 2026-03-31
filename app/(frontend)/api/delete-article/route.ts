import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await getPayload({ config })
    await payload.delete({
      collection: "articles",
      id: 2,
      overrideAccess: true,
    })
    return NextResponse.json({ success: true, message: "Article ID 2 deleted" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
