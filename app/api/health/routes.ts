import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const result = await sql`SELECT 1 AS ok`
    return NextResponse.json({ status: 'connected', db: result[0] })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 })
  }
}