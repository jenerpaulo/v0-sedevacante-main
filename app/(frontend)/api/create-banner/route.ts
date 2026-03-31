import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const action = url.searchParams.get("action") || "check"

  try {
    const payload = await getPayload({ config })
    const db = (payload.db as any).drizzle

    if (action === "check") {
      const tables = await db.execute(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'banners%'`
      )
      const cols = await db.execute(
        `SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'banners' ORDER BY ordinal_position`
      )
      return NextResponse.json({ tables: tables.rows, columns: cols.rows })
    }

    if (action === "drop") {
      await db.execute(`DROP TABLE IF EXISTS "banners_location" CASCADE`)
      await db.execute(`DROP TABLE IF EXISTS "banners_rels" CASCADE`)
      await db.execute(`DROP TABLE IF EXISTS "banners" CASCADE`)
      return NextResponse.json({ success: true, message: "All banners tables dropped. Next request will trigger push:true to recreate." })
    }

    if (action === "push") {
      // Force Drizzle to push schema — getPayload already ran above, so tables should exist now
      const tables = await db.execute(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'banners%'`
      )
      const cols = await db.execute(
        `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'banners' ORDER BY ordinal_position`
      )
      return NextResponse.json({ tables: tables.rows, columns: cols.rows })
    }

    if (action === "raw-insert") {
      // Test raw SQL insert without media upload
      const insertResult = await db.execute(
        `INSERT INTO "banners" ("title", "image_id", "link", "open_in_new_tab", "status", "order", "updated_at", "created_at")
         VALUES ('Test Banner', NULL, '/test', true, 'inactive', 99, NOW(), NOW()) RETURNING *`
      )
      return NextResponse.json({ success: true, row: insertResult.rows[0] })
    }

    if (action === "create-banner") {
      const origin = new URL(request.url).origin
      const res = await fetch(`${origin}/tmp-banner-livro.png`)
      if (!res.ok) throw new Error("Failed to fetch banner image")
      const buffer = Buffer.from(await res.arrayBuffer())

      const media = await payload.create({
        collection: "media",
        data: { alt: "A Crise de Autoridade na Igreja - Livro" },
        file: {
          data: buffer,
          mimetype: "image/png",
          name: "banner-livro-crise-autoridade.png",
          size: buffer.length,
        },
        overrideAccess: true,
      })

      // Insert via raw SQL to bypass Drizzle
      const insertResult = await db.execute(
        `INSERT INTO "banners" ("title", "image_id", "link", "open_in_new_tab", "status", "order", "updated_at", "created_at")
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING "id"`,
        ["Livro - A Crise de Autoridade na Igreja", media.id, "/store", false, "active", 1]
      )
      const bannerId = insertResult.rows[0]?.id

      // Insert location values
      const locations = ["homepage", "articles", "article-detail"]
      for (let i = 0; i < locations.length; i++) {
        await db.execute(
          `INSERT INTO "banners_location" ("order", "parent_id", "value") VALUES ($1, $2, $3)`,
          [i + 1, bannerId, locations[i]]
        )
      }

      return NextResponse.json({ success: true, mediaId: media.id, bannerId })
    }

    return NextResponse.json({ usage: "?action=check|drop|push|raw-insert|create-banner" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, stack: error.stack?.split("\n").slice(0, 8) }, { status: 500 })
  }
}
