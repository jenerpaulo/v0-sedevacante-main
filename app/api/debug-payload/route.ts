import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export async function GET() {
  try {
    // Initialize payload - this should trigger db push/migration
    const payload = await getPayload({ config })

    // Try to count users to test if tables exist
    try {
      const users = await payload.find({
        collection: "users",
        limit: 1,
      })
      return NextResponse.json({
        status: "ok",
        message: "Database tables exist",
        userCount: users.totalDocs,
      })
    } catch (dbError: any) {
      // Tables don't exist, try to create them
      return NextResponse.json({
        status: "db_error",
        message: dbError.message?.slice(0, 500),
        hint: "Tables may not exist. Need to run db:push or migrate.",
      })
    }
  } catch (e: any) {
    return NextResponse.json({
      status: "error",
      message: e.message?.slice(0, 500),
    }, { status: 500 })
  }
}
