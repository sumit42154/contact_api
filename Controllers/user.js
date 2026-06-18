import { User } from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req,res)=>{
    const {name,email,password} = req.body 
    // // console.log("Printing the data =", req.body)

    let user = await User.findOne({email})
    if(user) return res.json({
        massage : "User already exist",
        succes: false,
        user: user
    })

    const hashPassword = await bcrypt.hash(password,10)

    
    if((name=="" || email=="" || password=="")){
        return res.json({massage:'All fields are required'})
    }

    user = await User.create({name,email,password:hashPassword})

    res.json({
        massage:"User created Succesfully",
        succes : true,
        
    })

}

export const login = async (req,res)=>{

    const {email,password} =  req.body;
    if((email == "" || password == "")){
        res.json({
            massage : 'please fill all the details',
            succes : false
        })
    }

    const user = await User.findOne({email})
    if(!user) return res.json({massage : 'User does not exist', succes : false});

    const validPassword = await bcrypt.compare(password,user.password)
    
    if(!validPassword) return res.json({massage : 'Password not valid', succes : false});

    const token = jwt.sign({userId:user._id},process.env.JWT,{expiresIn:'1d'})
        
    res.json({
        name : user.name,
        email : user.email,
        originalPassword: password,
        password: user.password,
        token:token,
        succes:true
    })
}