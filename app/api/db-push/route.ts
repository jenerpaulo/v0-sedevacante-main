import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export async function GET(request: Request) {
  // Simple auth check via query param
  const { searchParams } = new URL(request.url)
  const key = searchParams.get("key")
  if (key !== "sdv-migrate-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config })

    // Access the db adapter directly to push schema
    const db = payload.db as any

    if (typeof db.push === "undefined" || db.push === false) {
      db.push = true
    }

    // Import pushDevSchema from drizzle
    const { pushDevSchema } = await import("@payloadcms/drizzle")
    await pushDevSchema(db)

    return NextResponse.json({
      status: "ok",
      message: "Schema pushed successfully",
    })
  } catch (e: any) {
    return NextResponse.json({
      status: "error",
      message: e.message,
      stack: e.stack?.split("\n").slice(0, 10),
    }, { status: 500 })
  }
}
