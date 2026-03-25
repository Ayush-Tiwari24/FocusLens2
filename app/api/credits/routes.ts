import { sql } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rows = await sql`SELECT credits FROM user_credits WHERE user_id = ${userId}`
  return NextResponse.json({ credits: rows[0]?.credits ?? 0 })
}

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { credits, reason } = await req.json()

  // Update balance
  await sql`
    INSERT INTO user_credits (user_id, credits, updated_at)
    VALUES (${userId}, ${credits}, now())
    ON CONFLICT (user_id)
    DO UPDATE SET credits = ${credits}, updated_at = now()
  `

  // Log to history
  await sql`
    INSERT INTO credit_history (user_id, amount, reason)
    VALUES (${userId}, ${credits}, ${reason ?? 'Focus session'})
  `

  return NextResponse.json({ ok: true, credits })
}