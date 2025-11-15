import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModel";

export const fetchAllUsers = expressAsyncHandler(async(req,res)=>{
    try {
        const users = await userModel.find({})
        return res.json(users)
    } catch (err) {
        console.log(" Error from getAll users, for admin",err)
        return res.status(500).json({
            message: `Internal Server Error ${err.message}`
        })
    }
})

export const createUser = expressAsyncHandler(async(req,res)=>{
    try {
        const {email, name, role, address,avatar,password } = req.body
        
        const user = await userModel.create(req.body)
        res.json(user)
        
    } catch (err) {
        console.log("Error from create user by admin", err)
        return res.status(500).json({
            message: `Internal Server Error ${err.message}`
        })        
    }
})

export const fetchUserById = expressAsyncHandler(async(req,res)=>{
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(401).json({
                message: "userId not found"
            })
        }
        
        const user = await userModel.findById(userId).select("-password")
        if(!user){
            return res.status(404).json({
                message: "User not found by Id"
            })
        }
        return res.json(user)
    } catch (err) {
        console.log("Error from get user by id",err)
        return res.status(500).json({
            message: `Internal Server Error ${err.message}`
        })
    }
})

export const updateUserById = expressAsyncHandler(async(req,res)=>{
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(401).json({
                message: "User id not found"
            })

        }

        let user = await userModel.findById(userId).select("-password")
        if(!user){
            return res.status(401).json({
                message: "Unauthorized "
            })
        }
        
        user.name = req.body.name  || user.name

        if(req.body.password){
            user.password = req.body.password
        }

        if(req.body.role){
            user.role = req.body.role
        }

        
    } catch (err) {
        console.log("Error from update user by id",err)
        return res.status(500).json({
            message : `Internal Server Error ${err.message}`
        })
        
    }
})

export const deleteUserById = expressAsyncHandler(async(req,res)=>{
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(404).json({
                message:"user id not found"
            })
        }
        const user = userModel.findById(userId).select("-password")
        if(user){
            // delete cart of this user
            // deleet user order if nay exists
            // delet user 
            await user.deleteOne()
        }
        else{
            return res.status(404).json({
                message: "user not found"
            })
        }


        return res.json({
            message: "user deleted Successfully"
        })

        
    } catch (error) {
        console.log("Error from delete user by id ", err)
        if(err instanceof Error){
            return res.status(500).json({
                message: err.message
            })
        }
        
    }
})