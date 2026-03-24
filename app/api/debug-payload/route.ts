import { NextResponse } from "next/server"
import config from "@payload-config"

export async function GET() {
  const results: Record<string, any> = {}

  try {
    const { RootPage } = await import("@payloadcms/next/views")
    const { importMap } = await import("../../(payload)/admin/importMap")

    results.importMapKeys = Object.keys(importMap).length

    const params = Promise.resolve({ segments: ["login"] })
    const searchParams = Promise.resolve({})

    const element = await RootPage({ config, params, searchParams, importMap })
    results.renderSuccess = true
    results.elementType = typeof element
  } catch (e: any) {
    results.renderError = e.message?.slice(0, 1000)
    results.renderStack = e.stack?.split("\n").slice(0, 15)
    results.renderName = e.name
    if (e.digest) {
      results.digest = e.digest
    }
  }

  results.nodeVersion = process.version
  return NextResponse.json(results)
}
