import {Request,Response} from "express"
import User from "../models/User"
import {verifyLogin, verifyRegister} from "../utils/joi/authValidation"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const loginController = async (req: Request,res: Response) => {
    const {email,password} = req.body
    const {error} = verifyLogin(req.body)
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }


    
    
    return res.status(200).json({message : "hello"})
}

const registerController = async (req: Request,res: Response) => {
    const {username,email,password} = req.body
    const {error} = verifyRegister(req.body)
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }
    let user = await User.findOne({
        email 
    })
    if (user) {
        return res.status(400).json({message : "email or password are incorrect"})
    }
    
    user = await User.create({
        username,
        email,
        password : bcrypt.hash(password,10),
    })
    const token = jwt.sign({id : user._id,role : user.role},process.env.JWT_SECRET as string,{expiresIn : "1y"})
    res.cookie("token",token,{
        maxAge : 1000 * 60 * 60 * 24 * 365,
        httpOnly : true,
        secure : false,
        sameSite : "strict"
    })

    user.password = ""

    

    return res.status(201).json({data : user,message : "created succefully"})
}



export {loginController,registerController}