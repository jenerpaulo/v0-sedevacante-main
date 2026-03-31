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
      const result = await db.execute(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'banners%'`
      )
      return NextResponse.json({ tables: result.rows })
    }

    if (action === "migrate") {
      // Create banners table
      await db.execute(`
        CREATE TABLE IF NOT EXISTS "banners" (
          "id" serial PRIMARY KEY,
          "title" varchar NOT NULL,
          "image_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
          "link" varchar,
          "open_in_new_tab" boolean DEFAULT true,
          "status" varchar DEFAULT 'active',
          "order" integer DEFAULT 1,
          "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
          "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
        )
      `)

      // Create banners_location (hasMany select field)
      await db.execute(`
        CREATE TABLE IF NOT EXISTS "banners_rels" (
          "id" serial PRIMARY KEY,
          "parent_id" integer NOT NULL REFERENCES "banners"("id") ON DELETE CASCADE,
          "path" varchar NOT NULL,
          "order" integer
        )
      `)

      // Actually Payload stores hasMany selects differently — as a separate table with _order, _parent_id
      await db.execute(`
        CREATE TABLE IF NOT EXISTS "banners_location" (
          "order" integer NOT NULL,
          "parent_id" integer NOT NULL REFERENCES "banners"("id") ON DELETE CASCADE,
          "value" varchar,
          "id" serial PRIMARY KEY
        )
      `)
      await db.execute(`CREATE INDEX IF NOT EXISTS "banners_location_order_idx" ON "banners_location" USING btree ("order")`)
      await db.execute(`CREATE INDEX IF NOT EXISTS "banners_location_parent_idx" ON "banners_location" USING btree ("parent_id")`)

      // Indexes for banners
      await db.execute(`CREATE INDEX IF NOT EXISTS "banners_image_idx" ON "banners" USING btree ("image_id")`)
      await db.execute(`CREATE INDEX IF NOT EXISTS "banners_created_at_idx" ON "banners" USING btree ("created_at")`)

      // Verify
      const result = await db.execute(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'banners%'`
      )
      return NextResponse.json({ success: true, tables: result.rows })
    }

    if (action === "create-banner") {
      const origin = new URL(request.url).origin
      const res = await fetch(`${origin}/tmp-banner-livro.png`)
      if (!res.ok) throw new Error("Failed to fetch banner image")
      const buffer = Buffer.from(await res.arrayBuffer())

      // Upload media via Payload (media table works fine)
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

      // Insert banner via raw SQL (bypass Drizzle schema mismatch)
      const insertResult = await db.execute(
        `INSERT INTO "banners" ("title", "image_id", "link", "open_in_new_tab", "status", "order", "updated_at", "created_at")
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING "id"`,
        [
          "Livro - A Crise de Autoridade na Igreja",
          media.id,
          "/store",
          false,
          "active",
          1,
        ]
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

    if (action === "debug") {
      const cols = await db.execute(
        `SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'banners' ORDER BY ordinal_position`
      )
      // Also check what Drizzle thinks
      const tables = (payload.db as any).tables
      const drizzleCols = tables?.banners ? Object.keys(tables.banners) : "not found"
      return NextResponse.json({ dbColumns: cols.rows, drizzleColumns: drizzleCols })
    }

    return NextResponse.json({ usage: "?action=check|migrate|debug|create-banner" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, stack: error.stack?.split("\n").slice(0, 5) }, { status: 500 })
  }
}
