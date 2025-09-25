import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async() => {  

    try {

        await mongoose.connect(MONGO_URI).then(()=>{
            console.log("MongoDB connected")
        });

    } catch (error) {
        console.log("an error occuredd in the connectDB function")
        console.log("error => ", error);
    }

}