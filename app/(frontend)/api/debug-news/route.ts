import { getPayload } from "payload"
import config from "@payload-config"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: "news",
      limit: 1,
      overrideAccess: true,
    })
    return NextResponse.json({ success: true, totalDocs: result.totalDocs })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack?.split("\n").slice(0, 5),
    })
  }
}
