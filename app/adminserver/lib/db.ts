import mongoose, { Connection } from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

const MONGODB_URI = "mongodb://localhost:27017/maktab90";


if (!MONGODB_URI) {
  throw new Error("لطفاً URI مربوط به MongoDB را تنظیم کنید");
}


let cached: { conn: Connection | null; promise: Promise<Connection> | null } = global.mongoose;


if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {

  if (cached.conn) {
    return cached.conn;
  }


  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      console.log("Connected to MongoDB");
      return mongooseInstance.connection; 
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
