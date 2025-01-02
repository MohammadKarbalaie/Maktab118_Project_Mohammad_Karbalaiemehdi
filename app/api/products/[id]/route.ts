import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET(request: Request, { params }: { params: { _id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const product = await db.collection('products').findOne({ _id: new ObjectId(params._id) })
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { _id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const updates = await request.json()
    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(params._id) },
      { $set: updates }
    )
    if (result.matchedCount === 1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Product updated successfully' })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { _id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const result = await db.collection('products').deleteOne({ _id: new ObjectId(params._id) })
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}