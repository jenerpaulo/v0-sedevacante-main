import { NextResponse } from "next/server"
import { put, list } from "@vercel/blob"

export const dynamic = "force-dynamic"

export async function GET() {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  const results: any = {
    tokenExists: !!token,
    tokenLength: token?.length || 0,
    tokenPrefix: token?.substring(0, 10) || "empty",
  }

  try {
    // Try listing blobs
    const blobs = await list({ token: token || "" })
    results.blobCount = blobs.blobs.length
    results.blobs = blobs.blobs.slice(0, 5).map((b: any) => ({
      pathname: b.pathname,
      url: b.url?.substring(0, 80),
      size: b.size,
    }))
  } catch (e: any) {
    results.listError = e.message
  }

  try {
    // Try uploading a tiny test file
    const blob = await put("test/ping.txt", "hello", {
      access: "public",
      token: token || "",
      addRandomSuffix: false,
    })
    results.uploadSuccess = true
    results.uploadUrl = blob.url
  } catch (e: any) {
    results.uploadError = e.message
  }

  return NextResponse.json(results)
}
