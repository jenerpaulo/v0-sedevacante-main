import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config })
    const db = (payload.db as any).drizzle

    // Limpar
    await db.execute(`DELETE FROM "banners_location"`)
    await db.execute(`DELETE FROM "banners"`)

    // Primeiro: upload da imagem direto via SQL + Blob
    // Usar imagem existente ou criar sem imagem
    // Por enquanto, criar banner apontando para media 42 (placeholder) - depois corrigimos
    const r = await db.execute(
      `INSERT INTO "banners" ("title", "image_id", "link", "open_in_new_tab", "status", "order", "updated_at", "created_at") VALUES ('Livro - A Crise de Autoridade na Igreja', NULL, '/store', false, 'active', 1, NOW(), NOW()) RETURNING "id"`
    )
    const bannerId = r.rows[0]?.id

    // Locations
    await db.execute(`INSERT INTO "banners_location" ("order", "parent_id", "value") VALUES (1, ${bannerId}, 'homepage')`)
    await db.execute(`INSERT INTO "banners_location" ("order", "parent_id", "value") VALUES (2, ${bannerId}, 'articles')`)
    await db.execute(`INSERT INTO "banners_location" ("order", "parent_id", "value") VALUES (3, ${bannerId}, 'article-detail')`)

    // Agora tentar upload da imagem separadamente
    let mediaId = null
    try {
      const origin = new URL(request.url).origin
      const res = await fetch(`${origin}/tmp-banner-livro.png`)
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer())
        const media = await payload.create({
          collection: "media",
          data: { alt: "A Crise de Autoridade na Igreja - Livro" },
          file: { data: buffer, mimetype: "image/png", name: "banner-livro.png", size: buffer.length },
          overrideAccess: true,
        })
        mediaId = media.id
        // Atualizar banner com a imagem
        await db.execute(`UPDATE "banners" SET "image_id" = ${mediaId} WHERE "id" = ${bannerId}`)
      }
    } catch (uploadErr: any) {
      // Banner criado sem imagem — pode ser adicionada via admin
    }

    return NextResponse.json({ success: true, bannerId, mediaId })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
