import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const article = await payload.find({
      collection: "articles",
      where: { slug: { equals: "where-peter-is" } },
      limit: 1,
      overrideAccess: true,
    })

    if (article.docs.length === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    const updated = await payload.update({
      collection: "articles",
      id: article.docs[0].id,
      overrideAccess: true,
      data: {
        excerpt:
          "Homilia de Dom Roy sobre a crise na Igreja e a necessidade de permanecer onde está Pedro — o verdadeiro Papa — para estar na verdadeira Igreja.",
      },
    })

    return NextResponse.json({
      success: true,
      author: updated.author,
      excerpt: updated.excerpt,
      featuredImage: (updated.featuredImage as any)?.url || updated.featuredImage,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
