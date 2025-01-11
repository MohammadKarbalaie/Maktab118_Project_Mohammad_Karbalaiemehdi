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
    console.error('Error fetching cart:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { userId, items } = await request.json()

  if (!userId || !items) {
    return NextResponse.json({ error: 'User ID and items are required' }, { status: 400 })
  }

  try {
    const { collections } = await connectToDatabase()
    const result = await collections.cart.updateOne(
      { userId: new ObjectId(userId) },
      { $set: { items } },
      { upsert: true }
    )

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('Error saving cart:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const { collections } = await connectToDatabase()
    const result = await collections.cart.deleteOne({ userId: new ObjectId(userId) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Cart was already empty' }, { status: 200 })
    }

    return NextResponse.json({ success: true, message: 'Cart cleared successfully' })
  } catch (error) {
    console.error('Error deleting cart:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

