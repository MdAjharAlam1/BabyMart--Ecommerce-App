import expressAsyncHandler from 'express-async-handler'
import userModel from '../models/userModel.js'
import generateToken  from '../utils/generateToken.js'


export const registerUser = expressAsyncHandler(async(req,res)=>{
    try {
        const {name, email, password,role} = req.body
        if(!email || !name || !password || !role){
            return res.status(400).json({
                message:"All Field are required"
            })
        }
        const userExist = await userModel.findOne({email:email})
        if(userExist){
            return res.status(404).json({
                message:"User Alrady Exits, Try Login "
            })
        }

        const user = await userModel.create(req.body)
        return res.json(user)
    } catch (err) {
        console.log("Error from User Register Controller")
        return res.status(500).json({
            message:`Internal Server Error ${err.message}`
        })
    }
})

export const loginUser = expressAsyncHandler(async(req,res)=>{
    try {
        const {email, password} = req.body
        if(!email || !password ){
            return res.status(400).json({
                message:"All Fields are required"
            })
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).json({
                message:"User not found, Please Register First"
            })
        }

        const isMatchpassword = user.matchPassword(password)
        if(!isMatchpassword){
            return res.status(401).json({
                message:"Password does not match"
            })
        }

        const token = generateToken(user._id)

        return res.json({
            id : user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            address: user.address || [],
            token: token
            
        })
        
    } catch (err) {
        console.log("Error from login user controller")
        return res.status(500).json({
            message:`Internal Server Error ${err.message}`
        })
        
    }
})

export const getProfileUser = expressAsyncHandler(async(req,res)=>{
    try {

        const user = await userModel.findById(req.user._id)
        if(!user){
            return res.status(404).json({
                message:"Unauthorized"                
            })
        }

        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role : user.role,
            address: user.address,
            avatar : user.avatar

        })
        
    } catch (err) {
        console.log("Error from get profile user")
        return res.status(500).json({
            message: `Internal Server Error ${err.message}`
        })
    }
})

export const logoutUser = expressAsyncHandler(async(req,res)=>{
    try {
        return res.json({
            success:true,
            message:"Logout Sucessfully"
        })
        
    } catch (error) {
        console.log("error from logout user")
        return res.status(500).json({
            message:`Internal Server Error ${error.message}`
        })
    }
})