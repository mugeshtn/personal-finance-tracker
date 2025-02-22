import mongoose from "mongoose";


const mongo_uri = process.env.MONGO_DB_URI;

if (!mongo_uri) throw new Error("Please define MONGO_DB_URI in the environment variables")

let cached = (global as any).mongoose || { conn: null, promise: null }

export const connectDB = async () => {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(mongo_uri, {
            dbName: "FinTrack"
        })
            .then((mongoose) => {
                console.log("MongoDB Connected!")
                return mongoose;
            })
            .catch((err) => {
                console.error("MongoDB connection Error: ", err)
                throw err;
            });
    }
    cached.conn = await cached.promise;
    (global as any).mongoose = cached;
    return cached.conn;
}