import mongoose from "mongoose";
import { config } from "dotenv";
config();

let url = process.env.MONGO_URI;

const dbConnect = async () => {
    try {
        await mongoose.connect(url);
        console.log("Database Connected👍")
    } catch (error) {
        console.log("Database Connection Error❌",error.message);
    }
}

export default dbConnect;