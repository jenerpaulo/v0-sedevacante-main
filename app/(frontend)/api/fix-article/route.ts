import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"
import fs from "fs/promises"
import path from "path"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const results: string[] = []

    // 1. Upload saint-peter-pope.jpg as media
    const imagePath = path.join(process.cwd(), "public/images/saint-peter-pope.jpg")
    const imageBuffer = await fs.readFile(imagePath)

    // Check if already uploaded
    const existingMedia = await payload.find({
      collection: "media",
      where: { filename: { equals: "saint-peter-pope.jpg" } },
      limit: 1,
      overrideAccess: true,
    })

    let mediaId: number | string
    if (existingMedia.docs.length > 0) {
      mediaId = existingMedia.docs[0].id
      results.push(`Media already exists (id=${mediaId})`)
    } else {
      const file = {
        data: imageBuffer,
        mimetype: "image/jpeg",
        name: "saint-peter-pope.jpg",
        size: imageBuffer.length,
      }
      const media = await payload.create({
        collection: "media",
        overrideAccess: true,
        data: {
          alt: "São Pedro, primeiro Papa, com as chaves do Reino",
        },
        file,
      })
      mediaId = media.id
      results.push(`Uploaded media (id=${mediaId})`)
    }

    // 2. Find the Where Peter Is article and update author + featuredImage
    const article = await payload.find({
      collection: "articles",
      where: { slug: { equals: "where-peter-is" } },
      limit: 1,
      overrideAccess: true,
    })

    if (article.docs.length > 0) {
      await payload.update({
        collection: "articles",
        id: article.docs[0].id,
        overrideAccess: true,
        data: {
          author: "Dom Roy",
          featuredImage: mediaId as number,
        },
      })
      results.push(`Updated article: author="Dom Roy", featuredImage=${mediaId}`)
    } else {
      results.push("Article where-peter-is not found")
    }

    return NextResponse.json({ success: true, results })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, stack: error.stack?.split("\n").slice(0, 8) },
      { status: 500 }
    )
  }
}
