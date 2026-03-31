import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config })
    const db = (payload.db as any).drizzle

    // 1. Limpar dados de teste
    await db.execute(`DELETE FROM "banners_location"`)
    await db.execute(`DELETE FROM "banners"`)

    // 2. Upload imagem
    const origin = new URL(request.url).origin
    const res = await fetch(`${origin}/tmp-banner-livro.png`)
    if (!res.ok) throw new Error("Failed to fetch image")
    const buffer = Buffer.from(await res.arrayBuffer())

    const media = await payload.create({
      collection: "media",
      data: { alt: "A Crise de Autoridade na Igreja - Livro" },
      file: { data: buffer, mimetype: "image/png", name: "banner-livro-crise-autoridade.png", size: buffer.length },
      overrideAccess: true,
    })

    // 3. Inserir banner via SQL (valores inline - sem params)
    const insertResult = await db.execute(
      `INSERT INTO "banners" ("title","image_id","link","open_in_new_tab","status","order","updated_at","created_at")
       VALUES ('Livro - A Crise de Autoridade na Igreja', ${media.id}, '/store', false, 'active', 1, NOW(), NOW()) RETURNING "id"`
    )
    const bannerId = insertResult.rows[0]?.id

    // 4. Inserir locations
    await db.execute(`INSERT INTO "banners_location" ("order","parent_id","value") VALUES (1, ${bannerId}, 'homepage')`)
    await db.execute(`INSERT INTO "banners_location" ("order","parent_id","value") VALUES (2, ${bannerId}, 'articles')`)
    await db.execute(`INSERT INTO "banners_location" ("order","parent_id","value") VALUES (3, ${bannerId}, 'article-detail')`)

    return NextResponse.json({ success: true, bannerId, mediaId: media.id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
