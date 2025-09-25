import express from "express";
import {registerUser, loginUser, UserProfile, logoutUser, validateToken, updateProfile} from "../controllers/auth.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import { body } from "express-validator";


const router = express.Router();


router.post("/register",
    body("username").isLength({min:3}).withMessage("Username must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    registerUser);

router.post("/login",
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    loginUser);
    
router.get("/profile", authMiddleware , UserProfile);

router.put("/profile", authMiddleware, 
    body("username").isLength({min:3}).withMessage("Username must be at least 3 characters long"),
    updateProfile);

router.get("/validate", authMiddleware, validateToken);

router.post("/logout", logoutUser);

export default router;
