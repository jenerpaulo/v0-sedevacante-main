import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const db = (payload.db as any).drizzle

    // Limpar
    await db.execute(`DELETE FROM "banners_location"`)
    await db.execute(`DELETE FROM "banners"`)

    // Usar media existente (já uploadada nas tentativas anteriores)
    // Buscar a mais recente com nome de banner
    const mediaResult = await db.execute(
      `SELECT id FROM "media" WHERE "filename" LIKE '%banner-livro%' ORDER BY id DESC LIMIT 1`
    )
    const mediaId = mediaResult.rows[0]?.id

    if (!mediaId) {
      return NextResponse.json({ error: "No banner media found. Upload manually via admin." })
    }

    // Insert banner
    const r = await db.execute(
      `INSERT INTO "banners" ("title", "image_id", "link", "open_in_new_tab", "status", "order", "updated_at", "created_at") VALUES ('Livro - A Crise de Autoridade na Igreja', ${mediaId}, '/store', false, 'active', 1, NOW(), NOW()) RETURNING "id"`
    )
    const bannerId = r.rows[0]?.id

    // Locations
    await db.execute(`INSERT INTO "banners_location" ("order", "parent_id", "value") VALUES (1, ${bannerId}, 'homepage')`)
    await db.execute(`INSERT INTO "banners_location" ("order", "parent_id", "value") VALUES (2, ${bannerId}, 'articles')`)
    await db.execute(`INSERT INTO "banners_location" ("order", "parent_id", "value") VALUES (3, ${bannerId}, 'article-detail')`)

    return NextResponse.json({ success: true, bannerId, mediaId })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
