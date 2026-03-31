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

    if (test === "all" || test === "schema") {
      try {
        const db = payload.db as any
        if (db.drizzle) {
          // Check articles table columns
          const cols = await db.drizzle.execute(
            `SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'articles' ORDER BY ordinal_position`
          )
          results.tests.push({
            name: "articles-schema",
            status: "ok",
            columns: cols.rows || cols,
          })

          // Check locked documents
          const locked = await db.drizzle.execute(
            `SELECT * FROM payload_locked_documents LIMIT 5`
          )
          results.tests.push({
            name: "locked-docs",
            status: "ok",
            count: (locked.rows || locked).length,
            docs: locked.rows || locked,
          })

          // Check users table - specifically the role column
          const userCols = await db.drizzle.execute(
            `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users' ORDER BY ordinal_position`
          )
          results.tests.push({
            name: "users-schema",
            status: "ok",
            columns: userCols.rows || userCols,
          })

          // Check current user data
          const users = await db.drizzle.execute(
            `SELECT id, name, email, role FROM users LIMIT 5`
          )
          results.tests.push({
            name: "users-data",
            status: "ok",
            users: users.rows || users,
          })
        }
      } catch (e: any) {
        results.tests.push({ name: "schema-check", status: "error", error: e.message, stack: e.stack?.slice(0, 500) })
      }
    }

    if (test === "all" || test === "render") {
      // Try to simulate what the admin page does
      try {
        const article = await payload.findByID({
          collection: "articles",
          id: 23,
          depth: 2,
          overrideAccess: true,
        })
        
        // Check if content is serializable
        const serialized = JSON.stringify(article)
        results.tests.push({
          name: "article-serialize",
          status: "ok",
          size: serialized.length,
          contentSize: JSON.stringify(article.content).length,
        })
      } catch (e: any) {
        results.tests.push({ name: "article-serialize", status: "error", error: e.message })
      }
    }

  } catch (e: any) {
    results.tests.push({ name: "payload-init", status: "error", error: e.message, stack: e.stack?.slice(0, 500) })
  }

  return NextResponse.json(results, { status: 200 })
}
