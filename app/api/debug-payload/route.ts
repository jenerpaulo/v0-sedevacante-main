import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Test 1: Import payload config
    const config = await import("@payload-config")

    // Test 2: Try to import the admin views
    const views = await import("@payloadcms/next/views")

    // Test 3: Try to import the importMap
    const importMapModule = await import("../../../(payload)/admin/importMap.js")
    const importMapKeys = Object.keys(importMapModule.importMap || {})

    return NextResponse.json({
      status: "ok",
      configLoaded: !!config.default,
      viewsLoaded: !!views.RootPage,
      importMapKeys: importMapKeys.length,
      importMapSample: importMapKeys.slice(0, 3),
    })
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.message,
      stack: error.stack?.split("\n").slice(0, 10),
      name: error.name,
    }, { status: 500 })
  }
}
