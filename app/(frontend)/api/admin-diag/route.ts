import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const maxDuration = 60

export async function GET(req: Request) {
  const url = new URL(req.url)
  const test = url.searchParams.get("test") || "all"
  const results: any = { tests: [] }

  try {
    const payload = await getPayload({ config })
    results.tests.push({ name: "payload-init", status: "ok" })

    // Check all tables and their columns
    try {
      const db = payload.db as any
      if (db.drizzle) {
        // Check payload_locked_documents_rels schema
        const lockedRels = await db.drizzle.execute(
          `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'payload_locked_documents_rels' ORDER BY ordinal_position`
        )
        results.tests.push({
          name: "locked-docs-rels-schema",
          status: "ok",
          columns: lockedRels.rows || lockedRels,
        })

        // Check payload_migrations
        const migrations = await db.drizzle.execute(
          `SELECT * FROM payload_migrations ORDER BY created_at DESC LIMIT 5`
        )
        results.tests.push({
          name: "migrations",
          status: "ok",
          data: migrations.rows || migrations,
        })

        // Check payload_preferences - these can affect admin rendering
        const prefs = await db.drizzle.execute(
          `SELECT * FROM payload_preferences LIMIT 5`
        )
        results.tests.push({
          name: "preferences",
          status: "ok",
          count: (prefs.rows || prefs).length,
          data: prefs.rows || prefs,
        })

        // Check payload_kv
        const kv = await db.drizzle.execute(
          `SELECT * FROM payload_kv LIMIT 5`
        )
        results.tests.push({
          name: "kv",
          status: "ok",
          count: (kv.rows || kv).length,
          data: kv.rows || kv,
        })

        // Check if there are any articles_rels or similar tables
        const allTables = await db.drizzle.execute(
          `SELECT table_name, (SELECT count(*) FROM information_schema.columns c WHERE c.table_name = t.table_name) as col_count FROM information_schema.tables t WHERE table_schema = 'public' ORDER BY table_name`
        )
        results.tests.push({
          name: "all-tables",
          status: "ok",
          tables: (allTables.rows || allTables).map((r: any) => ({ name: r.table_name, cols: r.col_count })),
        })

        // Check what Drizzle schema knows about
        const schemaKeys = Object.keys(db.drizzle?._.schema || {}).sort()
        results.tests.push({
          name: "drizzle-schema-keys",
          status: "ok",
          keys: schemaKeys,
        })
      }
    } catch (e: any) {
      results.tests.push({ name: "deep-schema-check", status: "error", error: e.message, stack: e.stack?.slice(0, 500) })
    }

    // Try to call the admin init handler
    try {
      const collections = payload.collections
      const collSlugs = Object.keys(collections)
      results.tests.push({
        name: "payload-collections",
        status: "ok",
        slugs: collSlugs,
      })

      // Check config.admin
      const adminConfig = payload.config?.admin
      results.tests.push({
        name: "admin-config",
        status: "ok",
        user: adminConfig?.user,
        hasImportMap: !!adminConfig?.importMap,
        hasMeta: !!adminConfig?.meta,
      })
    } catch (e: any) {
      results.tests.push({ name: "admin-check", status: "error", error: e.message })
    }

  } catch (e: any) {
    results.tests.push({ name: "payload-init", status: "error", error: e.message, stack: e.stack?.slice(0, 500) })
  }

  return NextResponse.json(results, { status: 200 })
}
