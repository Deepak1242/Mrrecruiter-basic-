import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { mockDB } from "../database/mockDB.js";

export const registerUser = async(req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {username,email,password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

       
        const existingUser = await mockDB.users.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await mockDB.users.create({
            username,
            email,
            password: hashedPassword,
            comparePassword: async function(password) {
                return await bcrypt.compare(password, this.password);
            }
        });

        const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn:"24h"});
        
        res.cookie("validationcookie",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge:24*60*60*1000, // 24 hours
        })

        
        const { password: _pw, ...safeUser } = newUser.toObject();
        res.status(201).json({message:"User registered successfully", token, user: safeUser});
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const loginUser = async(req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user = await mockDB.users.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"24h"});
        res.cookie("validationcookie",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge:24*60*60*1000, // 24 hours
        })
        const { password: _pw, ...safeUser } = user;
        return res.status(200).json({message:"User logged in successfully", token, user: safeUser});
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const UserProfile = async(req,res)=>{
    try {
        const user = req.user;
        res.status(200).json({message:"User profile fetched successfully", user});
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const validateToken = async(req,res)=>{
    try {
       
        const user = req.user;
        res.status(200).json({message:"Token is valid", user});
    } catch (error) {
        console.error('Token validation error:', error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const updateProfile = async(req,res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const { username, headline } = req.body;
        const userId = req.user._id;

        if (!username || username.trim().length < 3) {
            return res.status(400).json({message:"Username must be at least 3 characters long"});
        }

        
        const user = await mockDB.users.findById(userId);
        if (!user) {
            return res.status(404).json({message:"User not found"});
        }


        user.username = username.trim();
        user.headline = headline ? headline.trim() : '';

       
        const { password, ...safeUser } = user;
        res.status(200).json({
            message:"Profile updated successfully", 
            user: safeUser
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const logoutUser = async(req,res)=>{
    try{
        res.clearCookie("validationcookie",{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });
        return res.status(200).json({message:"Logged out successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}
    
