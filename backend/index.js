import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";



import { connectDB } from "./database/config.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cookieParser());
dotenv.config();

app.use(cors({
    origin: [
        "http://localhost:5173", 
        "https://mrinterviewer.netlify.app"
    ],
    credentials:true,
    exposedHeaders:["set-cookie"],
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}));

app.use(express.json());

connectDB();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Server is alive");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    