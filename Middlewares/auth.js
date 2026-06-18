import jwt from 'jsonwebtoken';
import { User } from '../Models/User.js';

export const isAuthenticated = async (req,res,next)=>{
    const token = req.header('Auth') // taking data from header
    console.log(token);  // printing header
    if(!token) return res.json({message:"login first"})

    const decoded = jwt.verify(token,process.env.JWT);
    console.log("Token is = ", decoded)
    const id = decoded.userId;
    console.log( "id = ",id)
    
    let user = await User.findById(id)
    console.log( "user is = ", user)  
    if(!user) return res.json({message:"User not found"})
    req.user = user;
     
    next();
}