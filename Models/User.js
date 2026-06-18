import { json } from "express";
import mongoose from "mongoose";


// user model 
const userSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    createdAt:{
        type:Date,
        default: Date.now
    },
    
})

// create a model
export  const User = mongoose.model("Userc",userSchema);


