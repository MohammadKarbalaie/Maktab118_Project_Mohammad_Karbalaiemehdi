import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
  try {
    const { user, products, totalPrice, phone, address, deliveryDate, paymentMethod, deliveryMethod } = await request.json()

    if (!user || !products || !totalPrice || !deliveryDate) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      )
    }

    const { collections } = await connectToDatabase()

    const order = {
      _id: new ObjectId(),
      user: new ObjectId(user),
      products,
      totalPrice,
      deliveryDate: new Date(deliveryDate),
      deliveryStatus: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
      ...(phone && { phone }),
      ...(address && { address }),
      ...(paymentMethod && { paymentMethod }),
      ...(deliveryMethod && { deliveryMethod })
    }

    const result = await collections.orders.insertOne(order)

    await collections.cart.deleteOne({ userId: new ObjectId(user) })

    return NextResponse.json({ success: true, orderId: result.insertedId })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 })
  }
}

