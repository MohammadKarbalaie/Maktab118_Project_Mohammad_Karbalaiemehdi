import { MongoClient, Db, ObjectId } from "mongodb";
import { CartItem } from "../store/cartStore";

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI is not set in the environment variables");
  throw new Error("MONGODB_URI not set");
}

let cachedDb: Db | null = null;

async function connectToDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const client = new MongoClient(uri as string);
    await client.connect();
    console.log("Successfully connected to MongoDB");
    const db = client.db("maktab90");
    cachedDb = db;
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// zakhire dar sabad kharid
export async function saveCart(
  userId: string,
  cart: Array<{ id: string; quantity: number ; status:boolean}>
) {
  try {
    const db = await connectToDatabase();
    const cartCollection = db.collection("cart");

    // hazf sabad kharid ghadimi va jaigozineie sabad jadid
    await cartCollection.deleteMany({ userId });

    await Promise.all(
      cart.map(async (item) => {
        const product = await db
          .collection("products")
          .findOne({ _id: new ObjectId(item.id) });
        if (!product) {
          throw new Error(`Product with ID ${item.id} not found`);
        }
        await cartCollection.insertOne({
          userId,
          productId: item.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          status:item.status,
        });
      })
    );

    return { success: true, message: "سبد خرید با موفقیت ذخیره شد." };
  } catch (error) {
    console.error("Error saving cart:", error);
    return {
      success: false,
      message: "خطایی در ذخیره‌سازی داده‌ها رخ داده است.",
    };
  }
}

// daryaft sabad kharid
export async function getCart(
  userId: string
): Promise<{ success: boolean; cart?: CartItem[]; message?: string }> {
  try {
    const db = await connectToDatabase();
    const cartCollection = db.collection("cart");

    const cartItems = await cartCollection.find({ userId }).toArray();
    if (!cartItems.length) {
      return { success: false, message: "سبد خرید خالی است." };
    }

    const formattedCart: CartItem[] = cartItems.map((item) => ({
      _id: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      status: item.status,
    }));

    return { success: true, cart: formattedCart };
  } catch (error) {
    console.error("Error fetching cart:", error);
    return {
      success: false,
      message: "خطایی در بازیابی سبد خرید رخ داده است.",
    };
  }
}

// cros handle
export function handleCORS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
