import { sql } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rows = await sql`
    SELECT sessions FROM user_sessions WHERE user_id = ${userId}
  `
  return NextResponse.json({ sessions: rows[0]?.sessions ?? [] })
}

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { sessions } = await req.json()

  await sql`
    INSERT INTO user_sessions (user_id, sessions, updated_at)
    VALUES (${userId}, ${JSON.stringify(sessions)}, now())
    ON CONFLICT (user_id)
    DO UPDATE SET sessions = ${JSON.stringify(sessions)}, updated_at = now()
  `
  return NextResponse.json({ ok: true })
}