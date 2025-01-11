import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
  const { userId, items } = await request.json()

  if (!userId || !items) {
    return NextResponse.json({ error: 'User ID and items are required' }, { status: 400 })
  }

  try {
    const { collections } = await connectToDatabase()
    await collections.cart.updateOne(
      { userId: new ObjectId(userId) },
      { $set: { items } },
      { upsert: true }
    )

    return NextResponse.json({ success: true, items })
  } catch (error) {
    console.error('Error syncing cart:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

