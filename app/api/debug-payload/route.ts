import { NextResponse } from "next/server"
import config from "@payload-config"

export async function GET() {
  const results: Record<string, any> = {}

  // Test 1: RootPage with create-first-user
  try {
    const { RootPage } = await import("@payloadcms/next/views")
    const { importMap } = await import("../../(payload)/admin/importMap")

    const params = Promise.resolve({ segments: ["create-first-user"] })
    const searchParams = Promise.resolve({})

    const element = await RootPage({ config, params, searchParams, importMap })
    results.createFirstUser = { success: true, type: typeof element }
  } catch (e: any) {
    results.createFirstUser = {
      error: e.message?.slice(0, 500),
      digest: e.digest,
      name: e.name,
    }
  }

  // Test 2: RootLayout
  try {
    const { RootLayout } = await import("@payloadcms/next/layouts")
    const { importMap } = await import("../../(payload)/admin/importMap")
    const React = await import("react")

    const element = await RootLayout({
      children: React.createElement("div", null, "test"),
      config,
      importMap,
    })
    results.rootLayout = { success: true, type: typeof element }
  } catch (e: any) {
    results.rootLayout = {
      error: e.message?.slice(0, 500),
      stack: e.stack?.split("\n").slice(0, 8),
      name: e.name,
    }
  }

  // Test 3: generatePageMetadata
  try {
    const { generatePageMetadata } = await import("@payloadcms/next/views")
    const params = Promise.resolve({ segments: ["create-first-user"] })
    const searchParams = Promise.resolve({})
    const metadata = await generatePageMetadata({ config, params, searchParams })
    results.metadata = { success: true, title: metadata?.title }
  } catch (e: any) {
    results.metadata = { error: e.message?.slice(0, 500) }
  }

  results.nodeVersion = process.version
  return NextResponse.json(results)
}
