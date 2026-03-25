import { sql } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rows = await sql`
    SELECT achievement_id, title, description, unlocked_at
    FROM user_achievements WHERE user_id = ${userId}
  `
  return NextResponse.json({ achievements: rows })
}

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { achievement_id, title, description } = await req.json()

  await sql`
    INSERT INTO user_achievements (user_id, achievement_id, title, description)
    VALUES (${userId}, ${achievement_id}, ${title}, ${description})
    ON CONFLICT (user_id, achievement_id) DO NOTHING
  `
  return NextResponse.json({ ok: true })
}