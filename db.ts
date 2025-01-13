import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbPromise = mongoose.connect(process.env.MONGO_URI!!);

export default dbPromise;
