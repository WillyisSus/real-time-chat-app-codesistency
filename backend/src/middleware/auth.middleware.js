import jwt, { decode } from "jsonwebtoken"
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token){
            return res.status(400).json({message: "Unauthorized - Missing Token"})
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded){
            return res.status(401).json({message:"Unauthorized - Invalid Token"})
        }

        const user = await User.findById(decode.userId).select("-password")
        if (!user){
            return res.status(400).json({message:"User not found"})
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in updateProfile controller", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }


}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller")
        return res.status(500).json({message:"Internal Server Error"})
    }

}