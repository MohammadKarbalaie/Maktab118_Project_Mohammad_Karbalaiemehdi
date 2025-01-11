import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const { collections } = await connectToDatabase()
    const cart = await collections.cart.findOne({ userId: new ObjectId(userId) })

    return NextResponse.json(cart ? cart.items : [])
  } catch (error) {
    console.error('Error initializing cart:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

