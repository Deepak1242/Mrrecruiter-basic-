import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { mockDB } from "../database/mockDB.js";

export const authMiddleware = async (req, res, next) => {
    try{

        const token = req.cookies?.validationcookie || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

        if (!token){
            return res.status(401).json({message:"Unauthorized Access"});
        }

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
            const user = await mockDB.users.findById(decoded.id);

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            
            const { password, ...safeUser } = user;
            req.user = safeUser;
            next();

        }catch(error){
            console.error('Token verification error:', error);
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expired, please log in again" });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: "Invalid token" });
            }
            throw error;
        }

    }catch(error){
        console.log(error); 
        return res.status(500).json({message:"Internal server error"});
    }
}

