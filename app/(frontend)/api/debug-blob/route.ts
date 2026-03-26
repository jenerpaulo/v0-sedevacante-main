import { NextResponse } from "next/server"
import { list } from "@vercel/blob"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const action = url.searchParams.get("action")
  const token = process.env.BLOB_READ_WRITE_TOKEN || ""

  try {
    if (action === "fix-urls") {
      const payload = await getPayload({ config })
      const db = (payload.db as any).drizzle
      const blobs = await list({ token })
      const blobMap = new Map(blobs.blobs.map((b: any) => [b.pathname.split("/").pop(), b.url]))

      const existing = await payload.find({ collection: "media", limit: 100, overrideAccess: true })
      const fixed: string[] = []
      for (const doc of existing.docs as any[]) {
        const blobUrl = blobMap.get(doc.filename)
        if (blobUrl && doc.url !== blobUrl) {
          await db.execute(`UPDATE "media" SET "url" = '${blobUrl}' WHERE "id" = ${doc.id}`)
          fixed.push(doc.filename)
        }
      }
      // Delete test files from DB
      await db.execute(`DELETE FROM "media" WHERE "filename" IN ('test-blob.png', 'test-upload.png')`)
      return NextResponse.json({ fixed, deletedTestFiles: true })
    }

    if (action === "schema") {
      const payload = await getPayload({ config })
      const db = (payload.db as any).drizzle
      const result = await db.execute(
        `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'media' ORDER BY ordinal_position`
      )
      return NextResponse.json({ columns: result })
    }

    if (action === "list-all") {
      const blobs = await list({ token })
      return NextResponse.json({
        count: blobs.blobs.length,
        blobs: blobs.blobs.map((b: any) => ({
          pathname: b.pathname,
          url: b.url,
          size: b.size,
          uploadedAt: b.uploadedAt,
        })),
      })
    }

    if (action === "sync") {
      const payload = await getPayload({ config })
      const blobs = await list({ token })

      // Get existing media
      const existing = await payload.find({
        collection: "media",
        limit: 100,
        overrideAccess: true,
      })
      const existingFilenames = new Set(existing.docs.map((d: any) => d.filename))

      const synced: string[] = []
      const skipped: string[] = []
      const errors: string[] = []

      for (const blob of blobs.blobs) {
        // Skip test files
        if (blob.pathname.startsWith("test/")) continue

        const filename = blob.pathname.split("/").pop() || blob.pathname
        if (existingFilenames.has(filename)) {
          skipped.push(filename)
          continue
        }

        // Determine mime type
        let mimeType = "image/jpeg"
        if (filename.endsWith(".png")) mimeType = "image/png"
        else if (filename.endsWith(".webp")) mimeType = "image/webp"
        else if (filename.endsWith(".gif")) mimeType = "image/gif"
        else if (filename.endsWith(".pdf")) mimeType = "application/pdf"

        try {
          const db = (payload.db as any).drizzle
          const alt = filename.replace(/\.[^.]+$/, "").replace(/[_-]/g, " ")
          await db.execute(
            `INSERT INTO "media" ("filename", "mime_type", "filesize", "url", "alt", "focal_x", "focal_y", "updated_at", "created_at")
             VALUES ('${filename}', '${mimeType}', ${blob.size}, '${blob.url}', '${alt}', 50, 50, NOW(), NOW())`
          )
          synced.push(filename)
        } catch (e: any) {
          errors.push(`${filename}: ${e.message}`)
        }
      }

      return NextResponse.json({ synced, skipped, errors })
    }

    // Default: show status
    const payload = await getPayload({ config })
    const blobs = await list({ token })
    const existing = await payload.find({
      collection: "media",
      limit: 100,
      overrideAccess: true,
    })

    return NextResponse.json({
      blobCount: blobs.blobs.length,
      dbCount: existing.totalDocs,
      blobFiles: blobs.blobs.map((b: any) => b.pathname),
      dbFiles: existing.docs.map((d: any) => d.filename),
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message, stack: error.stack?.split("\n").slice(0, 5) })
  }
}
