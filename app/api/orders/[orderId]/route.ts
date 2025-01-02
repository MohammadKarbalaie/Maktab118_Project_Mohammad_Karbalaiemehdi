import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function PATCH(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  console.log('PATCH request received for order:', params.orderId);
  
  try {
    const { deliveryStatus } = await request.json()
    const orderId = params.orderId

    console.log(`Updating order ${orderId} with delivery status:`, deliveryStatus);

    if (!orderId || deliveryStatus === undefined) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      )
    }

    const { collections } = await connectToDatabase()
    console.log('Connected to database successfully');

    // Check if the order exists before updating
    const existingOrder = await collections.orders.findOne({ _id: new ObjectId(orderId) });
    if (!existingOrder) {
      console.log(`Order ${orderId} not found`);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    console.log('Existing order:', existingOrder);

    // Validate the products array
    if (!Array.isArray(existingOrder.products) || existingOrder.products.length === 0) {
      console.log(`Order ${orderId} has invalid products array`);
      return NextResponse.json({ error: 'Invalid products array in order' }, { status: 400 });
    }

    for (const product of existingOrder.products) {
      if (!product.count || !product.product || !product.product._id || !product.product.price) {
        console.log(`Order ${orderId} has invalid product:`, product);
        return NextResponse.json({ error: 'Invalid product in order' }, { status: 400 });
      }
    }

    const result = await collections.orders.updateOne(
      { _id: new ObjectId(orderId) },
      { 
        $set: { 
          deliveryStatus: deliveryStatus,
          updatedAt: new Date()
        } 
      }
    );

    console.log('MongoDB update result:', result);

    if (result.matchedCount === 0) {
      console.log(`Order ${orderId} was not modified`);
      return NextResponse.json({ error: 'Order was not modified' }, { status: 400 })
    }

    const updatedOrder = await collections.orders.findOne({ _id: new ObjectId(orderId) });
    console.log(`Successfully updated order ${orderId}:`, updatedOrder);
    return NextResponse.json({ status: 'success', data: { order: updatedOrder } })
  } catch (error: unknown) {
    console.error('Error updating order:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Internal Server Error', details: error.message, stack: error.stack }, { status: 500 })
    } else {
      return NextResponse.json({ error: 'Internal Server Error', details: 'An unknown error occurred' }, { status: 500 })
    }
  }
}

