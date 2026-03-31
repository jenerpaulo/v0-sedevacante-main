import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Download image
    const imageUrl =
      "https://mule-router-assets.muleusercontent.com/public/production/ephemeral/e99aac81-0be9-48df-8821-cdce823ad3fc/result_00.png"
    const res = await fetch(imageUrl)
    if (!res.ok) throw new Error("Failed to download image")
    const buffer = Buffer.from(await res.arrayBuffer())

    // Upload to Payload media
    const media = await payload.create({
      collection: "media",
      data: {
        alt: "Exposição Escolástica do Sedevacantismo - manuscrito medieval",
      },
      file: {
        data: buffer,
        mimetype: "image/png",
        name: "exposicao-escolastica-sedevacantismo.png",
        size: buffer.length,
      },
      overrideAccess: true,
    })

    // Associate with article ID 17
    const article = await payload.update({
      collection: "articles",
      id: 17,
      data: {
        featuredImage: media.id,
      },
      overrideAccess: true,
    })

    return NextResponse.json({
      success: true,
      mediaId: media.id,
      articleId: article.id,
      articleTitle: (article as any).title,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
